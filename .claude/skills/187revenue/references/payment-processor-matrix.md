# Payment Processor Matrix

Selection guide for 187REVENUE payment integrations.

| Provider | Best for | Regions | Subscriptions | Marketplace / Split | Notes |
|---|---|---|---|---|---|
| Stripe | SaaS, ecommerce, custom flows | 46+ countries | Native | Stripe Connect | Strong APIs, requires developer setup |
| PayPal | Broad consumer trust, quick start | 200+ markets | Available | Commerce Platform | Higher dispute rates reported in some categories |
| Paddle | SaaS, EU VAT handling | 200+ countries | Native | Merchant-of-record model | Handles tax compliance as MoR |
| Lemon Squeezy | Digital products, creators | Many | Native | Affiliate built-in | Merchant-of-record, simple setup |
| Chargebee | Complex B2B subscriptions | Many | Native | Add-ons | Best for metered/plan complexity |
| Adyen | Enterprise, omnichannel | Many | Available | Marketpay | Full-stack but complex |
| Square | Local retail, quick invoicing | Select countries | Available | Limited | Good POS + online bridge |
| Shopify Payments | Shopify stores | Many | Via Shopify | Native | Tied to Shopify platform |

## Selection criteria

1. Business model match (one-time, subscription, usage, marketplace).
2. Regional coverage and currency support.
3. Tax handling requirements (VAT, sales tax, GST).
4. Developer resources and API flexibility.
5. Dispute and fraud tools.
6. Payout schedule and reserve policy.
7. Accessibility of hosted checkout pages.

## Free-tier and bootstrap notes

- Stripe test mode is free to develop.
- PayPal developer sandbox is free.
- Lemon Squeezy has no upfront cost; takes per-transaction fee.
- Paddle requires application approval.

Route to `187free` for no-cost alternatives.
