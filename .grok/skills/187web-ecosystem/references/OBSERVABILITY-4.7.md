# LLM Observability, Monitoring, Evaluation & Security: 2025–2026 Industry-Standard Landscape

*Vendor-neutral source material for an "LLM observability best practices" documentation package and Claude Code skill. Organized by the nine requested areas, with exact attribute names, metric formulas, framework lists, and version/date annotations. Primary sources (OTel, OWASP, NIST, RAGAS, arXiv, EU AI Act) prioritized throughout.*

**187web Ecosystem v2 extension (v4.7):** optional, toggleable observability module — not a Charlotte rebrand. UI product mark: **187aiEYE**.

## TL;DR
- The industry is converging on **OpenTelemetry GenAI semantic conventions** (the `gen_ai.*` namespace, currently at semconv v1.42.0, still "Development"/experimental, now in the dedicated `open-telemetry/semantic-conventions-genai` repo) as the vendor-neutral spec, with **OpenInference** (Arize, Apache 2.0) as the complementary instrumentation standard; both emit OTLP spans any backend can ingest.
- Four measurement pillars now have standard definitions: operational metrics (tokens, cost, latency percentiles, TTFT, inter-token latency), functional quality (RAGAS/DeepEval metrics — e.g., faithfulness = supported claims ÷ total claims), security (OWASP Top 10 for LLM Apps 2025), and drift/agent-trajectory evaluation.
- For a vendor-neutral skill, anchor instrumentation to OTel GenAI + OpenInference, keep prompt/output content capture opt-in (PII risk), gate CI on eval regressions, layer guardrails defense-in-depth, and map logging to EU AI Act Article 12 and the NIST AI RMF GenAI Profile.
- **187web extension:** observability is `off | minimal | full` by default `off`; **Langfuse self-host** via OTLP; **187aiEYE** is the standalone command UI; `agent-charlotte` crawl spans are an optional extension when `charlotte_crawl: true`.

## Key Findings

### 1. Standards & Semantic Conventions
- **OpenTelemetry GenAI semantic conventions** are the emerging vendor-neutral standard, developed by the OTel GenAI SIG (started April 2024). As of mid-2026 they moved to a dedicated repo `open-telemetry/semantic-conventions-genai`; current overall semconv version is **1.42.0** and the GenAI conventions remain **Status: Development** (experimental — attribute names can change without a major version bump).
- Core span attributes: `gen_ai.provider.name`, `gen_ai.operation.name` (values: `chat`, `generate_content`, `text_completion`, `embeddings`, `execute_tool`, `invoke_agent`, `create_agent`), `gen_ai.request.model`, `gen_ai.response.model`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.usage.reasoning.output_tokens`, `gen_ai.usage.cache_read.input_tokens`, `gen_ai.usage.cache_creation.input_tokens`, `gen_ai.response.finish_reasons`, `gen_ai.conversation.id` (session/thread), `gen_ai.request.temperature/top_p/top_k/max_tokens`, `gen_ai.response.time_to_first_chunk`.
- Content attributes (opt-in, PII-sensitive): `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`, `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result`. These may instead be recorded via the opt-in event `gen_ai.client.inference.operation.details`. **v1.37 was a turning point**: it replaced per-message events (one event per message, which flooded multi-turn conversations) with three aggregated attributes.
- RAG/agent attributes: `gen_ai.data_source.id`, `gen_ai.retrieval.documents`, `gen_ai.retrieval.query.text`, `gen_ai.embeddings.dimension.count`, `gen_ai.tool.name/type/definitions`, `gen_ai.agent.name/id/description/version`, `gen_ai.workflow.name`, plus evaluation attributes `gen_ai.evaluation.name`, `gen_ai.evaluation.score.value`, `gen_ai.evaluation.score.label`, `gen_ai.evaluation.explanation`.
- Span naming: `{gen_ai.operation.name} {gen_ai.request.model}`; span kind CLIENT (or INTERNAL for in-process calls). Use low-cardinality `error.type` for failure classes.
- **OpenInference** (Arize, Apache 2.0) defines 10 span kinds via the `openinference.span.kind` attribute: LLM, CHAIN, RETRIEVER, RERANKER, TOOL, EMBEDDING, AGENT, GUARDRAIL, EVALUATOR, PROMPT; attribute namespaces `llm.*`, `embedding.*`, `retrieval.*`, `message.*`, `tool.*`, `reranker.*`, `document.*`, `metadata`. List attributes use zero-based flattened indices (e.g., `llm.input_messages.0.message.role`). It predates and converges with OTel GenAI — practically: instrument with OpenInference, export via OTLP.
- **OpenLLMetry** (Traceloop, Apache 2.0 SDK) is a vendor-neutral OTel-based instrumentation SDK; Traceloop co-leads the OTel LLM semantic-convention working group. Its portability makes it a safe instrumentation choice when the backend is undecided.
- Agentic conventions (multi-agent tasks/actions/teams/artifacts/memory) are proposed but still in development. **MCP** semantic conventions (`mcp.method.name`, `mcp.session.id`) also exist in Development status.
- **Modeling for chains/RAG/multi-agent**: traces are span trees rooted at the user request; RAG models retrieval, embedding, and rerank as child spans; multi-agent systems model `invoke_agent`/`create_agent` boundaries with nested `chat` and `execute_tool` spans; sessions/conversations grouped via `gen_ai.conversation.id`.

### 2. Core Operational Metrics
- **OTel GenAI metrics** (all **Histograms**): `gen_ai.client.token.usage` (unit `{token}`, Required but conditionally emitted — only when counts are readily available; report billable tokens if both billable and used are available), `gen_ai.client.operation.duration` (unit `s`, **Required**), and Recommended server-side metrics: `gen_ai.server.request.duration`, `gen_ai.server.time_to_first_token`, `gen_ai.server.time_per_output_token` (all unit `s`). Token counts use powers-of-four bucket boundaries (up to ~67M); durations use powers-of-two up to ~82s. These two client metrics are the "floor" — without them you cannot reason about cost or speed.
- **TTFT** (Time to First Token) = t_first_token − t_request; captures scheduling delay + prefill. Primary UX metric for interactive apps. **Inter-Token Latency (ITL)** / **TPOT** (Time Per Output Token) = T_gen ÷ N_tokens; reflects decode phase. **TPS** (tokens/sec) = N_tokens ÷ T_gen. Total latency ≈ TTFT + (output tokens × ITL). A response that starts in 400ms and streams over 4s feels faster than one that takes 2s to start then dumps instantly — optimize TTFT, not just total latency.
- Track **p50/p95/p99** percentiles, not averages (the p95/p99 tail is where users churn). Standard metrics: token usage (prompt/completion/total), cost per request, request volume, error rate + taxonomy (low-cardinality `error.type`), throughput, context-window utilization, and prompt-cache hit rates (via `gen_ai.usage.cache_read.input_tokens`).
- **Alerting best practices**: alert on p95/p99 latency and TTFT regressions, error-rate spikes, cost/token spikes (denial-of-wallet), and cache-hit-rate drops; segment by model/route/prompt version using the standard attribute names so a single dashboard (e.g., "tokens per model per route") works across OpenAI, Anthropic, and Cohere with no code changes.

### 3. Functional Quality Evaluation
- **LLM-as-a-judge** originates from Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" (arXiv 2306.05685, NeurIPS 2023). The paper introduces **MT-bench** ("a benchmark consisting of 80 high-quality multi-turn questions" across writing, reasoning, math, coding, knowledge, and roleplay, with GPT-4 as judge) and finds that "strong LLM judges like GPT-4 can match both controlled and crowdsourced human preferences well, achieving over 80% agreement, the same level of agreement between humans" (verified against expert raters on MT-bench). The same paper names the core biases and proposes mitigations: it "examine[s] the usage and limitations of LLM-as-a-judge, including position, verbosity, and self-enhancement biases, as well as limited reasoning ability, and propose[s] solutions to mitigate some of them."
  - **Position bias** (order sensitivity — mitigate by swapping/shuffling option order); **verbosity bias** (favors longer answers — length penalties; Saito et al. 2023 quantified it in GPT-4/GPT-3.5); **self-preference/self-enhancement bias** (favors own outputs; Wataoka et al. 2024, arXiv 2410.21819, showed GPT-4's self-preference correlates with lower-perplexity outputs). Additional mitigations: multi-judge ensembles, per-criterion atomic scoring, pinned judge version.
- **RAGAS metrics** (reference-free, 0–1 scale):
  - **Faithfulness** = (number of claims in the response supported by retrieved context) ÷ (total claims in the response) — flagship anti-hallucination metric; two-pass claim extraction + per-claim verification. Score 1.0 = every claim grounded.
  - **Answer Relevancy** = mean cosine similarity between embeddings of LLM-generated questions (derived from the answer) and the input query.
  - **Context Precision** = mean precision@k / Average Precision over retrieved chunks (are relevant chunks ranked high); binary useful/not-useful judge verdicts combined via Average Precision.
  - **Context Recall** = (reference claims supported by retrieved context) ÷ (total reference claims).
  - Aggregate "RAGAS score" = arithmetic mean of the four. Diagnostic reading: high faithfulness + low answer relevance = grounded but retrieving wrong content; high context precision + low recall = relevant but incomplete retrieval.
- **DeepEval** (Confident AI, open source, Apache 2.0): 14+ purpose-built metrics (FaithfulnessMetric, AnswerRelevancyMetric, BiasMetric, ToxicityMetric, ToolCorrectnessMetric, TaskCompletionMetric, SummarizationMetric) plus **G-Eval** (LLM-as-judge with chain-of-thought over any custom rubric; generates a 1–5 score normalized by output-token probabilities) and DAGMetric (deterministic decision-tree scoring). Pytest-style; strong for CI and multi-step agent traces.
- **promptfoo** (open source, MIT): YAML/CLI-first, 50+ assertions (contains, equals, llm-rubric, similarity, g-eval, javascript, python) + 40+ red-team plugins (jailbreak, prompt injection, data exfiltration); response caching, concurrent matrix comparisons; best for bulk model comparisons and red-teaming.
- Other frameworks: **OpenAI Evals**; **LangSmith evals** (dataset + `evaluate()` CI gating, deepest LangGraph integration, most mature built-in evals); **Braintrust** (eval-first, deployment blocking, used by Perplexity/Airtable/Replit to block prompt regressions in PRs); **Arize Phoenix evals** (notebook/OSS, LLM-as-judge). Standard quality metrics across tools: faithfulness, answer relevancy, context precision/recall, hallucination detection, groundedness, toxicity, sentiment.
- **Online vs offline**: offline = golden/regression datasets in CI; online = sampling production traces, writing eval scores back to traces (LangSmith's model: production traces become the eval dataset). Use golden datasets + regression testing, human-in-the-loop annotation queues, and A/B testing for prompt/model changes. Sample 5–10% of judge-flagged cases for human review, especially for bias/toxicity.

### 4. Security & Safety Monitoring
- **OWASP Top 10 for LLM Applications 2025** (OWASP GenAI Security Project — the authoritative list, verbatim from genai.owasp.org):
  1. **LLM01:2025 Prompt Injection**
  2. **LLM02:2025 Sensitive Information Disclosure**
  3. **LLM03:2025 Supply Chain**
  4. **LLM04:2025 Data and Model Poisoning**
  5. **LLM05:2025 Improper Output Handling**
  6. **LLM06:2025 Excessive Agency**
  7. **LLM07:2025 System Prompt Leakage** (new in 2025)
  8. **LLM08:2025 Vector and Embedding Weaknesses** (new in 2025)
  9. **LLM09:2025 Misinformation**
  10. **LLM10:2025 Unbounded Consumption**
  - Key 2025 changes: two new categories (System Prompt Leakage; Vector & Embedding Weaknesses); Sensitive Information Disclosure "jumped from sixth to second place in the 2025 edition" (the single biggest rank move); Improper Output Handling dropped from second to fifth; "Unbounded Consumption" broadened the prior "Denial of Service" entry to include denial-of-wallet.
- **Prompt injection**: direct (user overrides instructions) and indirect (hidden instructions in retrieved/external content — the root cause is that LLMs process instructions and data in the same channel). Detection tools: **Lakera Guard** (per Check Point's September 2025 acquisition press release, Lakera "delivers detection rates above 98 percent with sub-50ms latency and false positives below 0.5 percent"; Lakera was acquired by Check Point in September 2025); **Rebuff** (heuristics + VectorDB + model-based + canary word); **Vigil** (YARA + transformer + VectorDB + prompt-response similarity + canary); **LLM Guard** (Protect AI, BERT-based prompt-injection scanner). Jailbreak detection often via classifier models (Llama Guard; LlamaFirewall's AlignmentCheck uses LLM-as-judge on agent outputs).
- **PII detection/redaction**: Microsoft **Presidio** (NER via spaCy + regex + checksum validation; analyze → anonymize) is the open-source standard. Redact both user input AND retrieved chunks (chunks often contain more PII than the user's latest message) and before writing to traces. The OTel spec explicitly warns that `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`, `gen_ai.tool.call.arguments`, and `gen_ai.tool.call.result` are "likely to contain sensitive information including user/PII data" — keep content capture opt-in by default. Presidio (or Microsoft's own DLP) can also run in the OTel Collector's redaction processor or a sidecar.
- **Guardrails frameworks**:
  - **NeMo Guardrails** (NVIDIA, Apache 2.0; Colang DSL; five rail types — input, dialog, retrieval, tool-input, tool-output; sub-50ms per check on GPU; built-in `jailbreak_detection`, `content_safety`, `topic_safety`).
  - **Llama Guard** (Meta, open-weight safety classifier fine-tuned from Llama; returns safe/unsafe + category codes with customizable taxonomy; ~⅓ the false-positive rate of GPT-4-as-moderator on Meta's benchmark).
  - **Guardrails AI** (Python validator hub, RAIL/XML specs, 50+ validators, structured-output enforcement; ~50–200ms per validation).
  - Common production stack: fast scanner (LLM Guard) → dialog control (NeMo) → output enforcement (Guardrails AI / Llama Guard), running cheapest-first. Guardrails reduce but do not eliminate attack success — published prompt-injection benchmarks show adaptive/composite attacks getting through layered defenses. Pair with architectural controls: least-privilege tool scoping and human escalation on high-risk actions.
- **NIST AI RMF**: AI RMF 1.0 (Jan 2023) + the **Generative AI Profile (NIST AI 600-1, released July 26 2024)** defines 12 GenAI risk categories (confabulation/hallucination, data privacy, information security incl. direct/indirect prompt injection & data poisoning, harmful bias, information integrity, value-chain/supply-chain integrity, etc.), with suggested actions organized around Governance, Content Provenance, Pre-deployment Testing, and Incident Disclosure and mapped to the four functions Govern/Map/Measure/Manage. It is voluntary, governance-level, and explicitly encourages continuous post-deployment monitoring (risks emerge from model updates, new prompts, novel use cases).

### 5. Tracing & Debugging Practices
- End-to-end traces are span trees rooted at the user request. **RAG span hierarchy**: CHAIN → RETRIEVER (vector-store/DB query) → EMBEDDING (vector generation) → RERANKER (cross-encoder relevance scoring) → LLM. **Agent hierarchy**: `invoke_agent` (INTERNAL) → `chat` (CLIENT) → `execute_tool` / MCP `tools/call` (CLIENT→SERVER). Tool calls carry `gen_ai.tool.name`, arguments, and results.
- Group by session/conversation via `gen_ai.conversation.id`; platforms (Langfuse, Phoenix) offer session replay of the entire interaction.
- **Sampling** for high volume: tail-sampling — keep 100% of error traces and slow turns (e.g., TTFT > threshold), ~5% of everything else. Store large payloads in external object storage with a span pointer rather than inline (avoids cardinality/size blowups in metric backends).
- **Agent trajectory evaluation**: score planning, execution, and outcome tiers over full traces, not just the final answer, and localize which step failed. Replay/debugging uses captured spans; coding-agent debuggers (Claude Code, Codex, Copilot) emit OTel GenAI telemetry.

### 6. Drift & Anomaly Detection
- **Data drift** = input-distribution shift (measured as shift in the distribution of input-prompt embeddings). **Concept drift** = input→intent relationship change (needs outcome tracking / human eval — e.g., a support bot's user intent shifting from billing to product questions). **Semantic/embedding drift** is most relevant to RAG (query terminology drifting from what embeddings were optimized for).
- Methods: embedding-cluster analysis (UMAP/t-SNE projection + compare cluster proportions vs a baseline period), distributional distances — Jensen-Shannon Divergence, Population Stability Index (Fiddler's clustering approach), cosine/Euclidean distance, Maximum Mean Discrepancy, and share-of-drifted-embeddings (the open-source **Evidently** library implements 5 methods). Output-distribution monitoring: response-length distribution, sentiment drift, topic modeling for scope creep, embedding-centroid movement.
- Two-stage pattern (AWS Prescriptive Guidance): a statistical alert triggers → an LLM-as-judge classifies the *nature* of the drift on sampled prompts vs baseline. Monitor model-version changes (providers silently update models). Retrieval-precision sampling: run 50–100 probe query-context pairs periodically and track hit rate — a declining hit rate is a clear retrieval-drift signal.

### 7. Governance, Cost & FinOps
- Token-budget management, cost attribution per feature/team/user (tag spans), model routing & fallback monitoring, rate-limit monitoring, SLOs for LLM apps (typically p95 TTFT + latency).
- Cost levers: **response caching** (commonly cited at ~15–30% reduction on repetitive queries — a community rule of thumb, not a single authoritative figure), smart routing of simple queries to cheaper models, and prompt optimization. Monitor prompt-cache hit rates via `gen_ai.usage.cache_read.input_tokens`.
- **EU AI Act** (Regulation 2024/1689): **Article 12** requires high-risk AI systems to "technically allow for the automatic recording of events (logs) over the lifetime of the system," serving three purposes — identifying risk situations (Art. 79(1)) or substantial modifications, facilitating post-market monitoring (Art. 72), and operational monitoring by deployers (Art. 26(5)). For remote biometric ID systems, Art. 12(3) mandates additional fields (usage periods, reference database, matching input data, verifying personnel). **Article 19** requires providers to keep auto-generated logs for a minimum of **six months** (unless other Union/national law requires longer). High-risk Annex III obligations apply from **2 August 2026**. Best practice: tamper-evident audit trails, correlation IDs linking events across servers, model/prompt version lineage, and pseudonymous entity IDs to minimize privacy risk. No finalized technical logging standard exists yet (prEN 18229-1 and ISO/IEC DIS 24970 are in draft).
- **NIST AI RMF GenAI Profile** provides the governance overlay; **ISO/IEC 42001:2023** is the certifiable AI management-system standard (most programs run NIST AI RMF inside an ISO 42001 AIMS).

### 8. Tool Landscape (vendor-neutral, comparative)
- **Open-source**: **Langfuse** (MIT, OTel-native since v3, self-hosting first-class, ClickHouse backend, prompt management + annotation queues); **Arize Phoenix** (Elastic License 2.0, OTel/OpenInference-native, notebook/eval + RAG-retrieval-diagnosis focus; Arize raised $70M Series C Feb 2025); **Helicone** (Apache 2.0 proxy, zero-code base-URL swap, cost tracking, caching, ~50–80ms added latency); **OpenLLMetry/Traceloop** (Apache 2.0 instrumentation SDK, portable); **MLflow** (GenAI tracing on its ML-experiment foundation); **Evidently** (drift).
- **Closed-source SaaS**: **LangSmith** (LangChain/LangGraph-first, mature evals with `evaluate()` CI gating, proprietary tracing format); **Braintrust** (eval-first, CI deployment blocking); **W&B Weave** (for W&B-native ML teams); **PromptLayer**; **Datadog LLM Observability** (natively maps OTel GenAI semconv v1.37+ into its product UI; MCP client tracing); **New Relic AI monitoring**.
- **DIY / OTel-based**: OpenTelemetry Collector → Prometheus (metrics via `prometheusremotewrite`) + Tempo/Jaeger (traces) + Loki (logs) + Grafana dashboards; the Collector can apply redaction/sampling/enrichment before data leaves the network. Jaeger v2 was rebuilt on the OTel Collector.
- **Shared design patterns**: OTel/OpenInference span model, opt-in content capture, LLM-as-judge evals, session grouping, cost/token dashboards built on standard attribute names, and OTLP export for portability. **Choose by deployment model first**: self-host (Langfuse, Phoenix) for data residency/cost control; managed SDK (LangSmith, Braintrust) for speed and built-in evals; proxy gateway (Helicone) for zero-code-change cost tracking. Whatever you pick, instrument against OTel GenAI conventions rather than a proprietary SDK where supported, so you can switch backends without re-instrumenting.

### 9. Agent-Specific Observability (2025–2026 state of the art)
- Agents fail differently from ordinary software — well-formed but semantically wrong outputs, redundant tool calls, non-deterministic tool sequences (the same input can trigger different sequences across runs). **Step-level tracing is the minimum viable signal**, not pass/fail health checks.
- Anchor spans: `create_agent`, `invoke_agent`, `execute_tool`; required metrics `gen_ai.client.operation.duration` + `gen_ai.client.token.usage`. Frameworks shipping OTel GenAI emitters include OpenAI Agents SDK, LangChain, LlamaIndex, AutoGen, CrewAI, Pydantic AI.
- **MCP (Model Context Protocol) monitoring**: instrument the full lifecycle — session init/capability negotiation (`initialize`), registry discovery (`tools/list`), and tool invocation (`call_tool`) — with `mcp.method.name`, `mcp.session.id`, tool parameters, response payloads, and JSON-RPC error codes, each span linked to the parent LLM span. MCP-specific security risks (tool poisoning, full schema poisoning, rug-pull update attacks, lack of observability) warrant runtime behavioral monitoring and a **gateway as a single enforcement/audit point**. Note that code-level OTel instrumentation can be stripped by a compromised tool — combine protocol-level, agent-layer, and (where possible) kernel-level telemetry with cross-layer correlation. Datadog, Grafana Cloud (OpenLIT), Elastic APM, and MCP gateways (Obot, MintMCP) offer MCP tracing.
- **Agent evaluation benchmarks**: **τ-bench / τ²-bench** (Sierra; tool-agent-user interaction across retail/airline/telecom, end-to-end task completion with pass@k / MaxProgressRate@k), **BFCL** (function-calling accuracy — correct tool name + arguments), **AgentBench**, plus trajectory-level reward benchmarks (**AgentRewardBench**, **Plan-RewardBench**, **R-Judge**, **Agent-SafetyBench**). Trajectory scoring evaluates planning + execution + outcome tiers and tool-call correctness; these move beyond single end-to-end correctness numbers to localize *where* in the pipeline a failure originates.
- **Cost/loop guards** for autonomous agents: max-iteration/step limits, per-run token/cost budgets, timeouts, and loop detection; alert on runaway trajectories (this maps directly to OWASP LLM10:2025 Unbounded Consumption / denial-of-wallet).

---

## §10 — 187web Ecosystem integration (toggleable module)

Observability is an **optional extension** inside 187web Ecosystem v2 — not a Charlotte product rebrand.

### Configuration surfaces

**Vault YAML frontmatter** (per-note):

```yaml
observability:
  enabled: true
  mode: minimal          # off | minimal | full
  content_capture: false
  eval: false
  security: true
  charlotte_crawl: false
```

**Environment:** `E187WEB_OBSERVABILITY=off|minimal|full`

**Compiler JSON** (`~/.187web/last-compile.json`): `observability_profile` + `active_agents[]`

### Mode matrix

| Mode | Traces | Langfuse | 187aiEYE panels | Content capture |
|------|--------|----------|-----------------|-----------------|
| `off` | Compiler SSE only | No | Routing + neuro-toxin | Never |
| `minimal` | Duration + tokens + tags | Yes | Ops tiles | Never |
| `full` | Full span tree + eval + guardrails | Yes | Ops + eval + security | Opt-in + Presidio |

### Kill-chain span mapping

| Skill | When on | Contribution |
|-------|---------|--------------|
| 187web-manifest | Always | Compile event + `trace_id` |
| widow-weaver | minimal+ | CHAIN / PROMPT |
| neuro-toxin | minimal+ | `gen_ai.request.*` + `187web.neuro.*` |
| swarm-mind | minimal+ | AGENT / `gen_ai.agent.name` |
| agent-charlotte | `charlotte_crawl: true` | RETRIEVER + crawl audit attrs |
| silk-sandbox | `security: true` | GUARDRAIL + TOOL |
| Red-Team Widow | security/eval | EVALUATOR + OWASP LLM01–10 labels |

**Backend:** self-hosted **Langfuse** (OTLP ingest). Set `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`.

---

## §11 — agent-charlotte extension (optional)

When `observability.charlotte_crawl: true`:

- Emit RETRIEVER spans per fetched URL (depth, status, robots.txt respected)
- Attributes: `charlotte.crawl.seed`, `charlotte.crawl.depth`, `charlotte.crawl.urls_fetched`, `charlotte.crawl.entities_woven`
- Indirect injection surface (OWASP LLM01): sanitize crawled markdown before vault weave
- Rate-limit metrics; no content in traces unless `content_capture: true`

Charlotte appears in **187aiEYE** only as a crawl-status chip when this extension is active.

---

## §12 — 187aiEYE UI (standalone command surface)

**Product mark:** **187aiEYE** — visual front-end for the Obsidian Local Brain.

**Route:** `/187ai-eye` in 187webdesign Next.js app.

| Zone | Template pole | Purpose |
|------|---------------|---------|
| Chrome | Forge API | SSE live status, mono labels |
| Agent rail | Nimbus | Primary agent + 27 manifest sub-agent chips |
| Brain pane | Lattice Lab | Active note preview from compile JSON (B1) |
| Module drawer | Vault | Observability / sandbox / crawl / eval toggles |
| Journal | Lattice Lab | PLAN.md session stream |

**Brain integration phases:**
- **B1:** `~/.187web/last-compile.json` + telemetry-relay SSE (shipped)
- **B2:** Obsidian Local REST API / MCP — live active-note sync
- **B3:** Bidirectional vault writes (widow-weaver grey blockquotes)

**Palette:** Abyssal `#080808`, Toxic `#39FF14`, Widow `#FF0000`, Ash `#CCCCCC` — ecosystem tokens unchanged.

---

## §13 — Implementation phases (PHASE-ROADMAP alignment)

| Phase | Deliverable | Observability gate |
|-------|-------------|-------------------|
| I ✅ | OmniQube + relay | Compiler SSE baseline |
| II | KNOTstore + Safety Sentinel | Trace metadata store; sandbox GUARDRAIL |
| III | 187aiEYE components + Langfuse compose | Module drawer drives panel visibility |
| IV | Red-team journal | OWASP findings in PLAN.md when `security: true` |

---

## §14 — Langfuse self-host runbook

```yaml
# docker-compose overlay (add to 187webdesign/docker-compose.yml when ready)
services:
  langfuse:
    image: langfuse/langfuse:2
    ports: ["3001:3000"]
    environment:
      DATABASE_URL: postgresql://...
      CLICKHOUSE_URL: http://clickhouse:8123
```

**OTLP:** point SDK / collector to Langfuse ingest endpoint.

**Presidio:** run as OTel Collector processor before Langfuse — redact `gen_ai.input.messages` / `output.messages` even when opt-in capture is enabled.

**Secrets:** `LANGFUSE_*` keys in `~/.187web/secrets/` — never in MANIFEST.xml.

---

## Recommendations (extended)

7. **Default observability to `off`.** Enable `minimal` in dev, `full` only for eval/security sessions. Compiler and relay remain backward compatible.
8. **Use 187aiEYE as the control plane.** Module toggles in the UI mirror YAML; do not require vault edits for quick experiments.
9. **Gate Charlotte crawl observability separately.** `charlotte_crawl` is independent of ops tracing — avoids noise when not researching.
10. **Pin Langfuse + OTel semconv versions** in `PLAN.md` session log when upgrading.

## Caveats (extended)

- **187web observability module has no runtime OTLP emitter yet** — Phase II+; today: compiler JSON + 187aiEYE UI scaffold.
- **187aiEYE B1 does not read Obsidian directly** — requires B2 REST/MCP for live brain sync.

## Details
The nine Key Findings sections above contain the consensus best practices, exact standard terminology, precise metric definitions and formulas (RAGAS faithfulness/relevancy/precision/recall; TTFT/ITL/TPOT/TPS; OTel metric names, instruments, units, and requirement levels), the verbatim OWASP LLM Top 10 2025 numbering, framework lists, and authoritative sources (OpenTelemetry semantic-conventions-genai repo; OWASP GenAI Security Project; NIST AI 600-1; RAGAS docs; Zheng et al. arXiv 2306.05685; Wataoka et al. arXiv 2410.21819; EU AI Act Articles 12/19), with version numbers and dates. Recent changes/deprecations of note: the GenAI conventions moved out of the main semconv repo into `semantic-conventions-genai`; v1.37 replaced per-message events with aggregated message attributes; OWASP 2025 added System Prompt Leakage and Vector & Embedding Weaknesses and renamed DoS to Unbounded Consumption; OTel `gen_ai.*` attributes remain experimental (opt in via `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`).