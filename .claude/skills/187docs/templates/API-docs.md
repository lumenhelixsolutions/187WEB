# {{API_name}} API Reference

## Base URL

```text
{{base_url}}
```

## Authentication

{{how authentication works}}

## Endpoints

### {{method}} {{path}}

{{short description}}

#### Request

```http
{{method}} {{path}} HTTP/1.1
Host: {{host}}
Content-Type: {{content_type}}
Authorization: {{auth_header}}
```

#### Parameters

| Name | In | Type | Required | Description |
|---|---|---|---|---|
| {{param_1}} | {{path/query/body}} | {{type}} | {{yes/no}} | {{description}} |
| {{param_2}} | {{path/query/body}} | {{type}} | {{yes/no}} | {{description}} |

#### Response

```json
{
  "{{field_1}}": "{{value_1}}",
  "{{field_2}}": "{{value_2}}"
}
```

#### Status codes

| Code | Meaning |
|---|---|
| {{code_1}} | {{meaning}} |
| {{code_2}} | {{meaning}} |

## Errors

```json
{
  "error": "{{error_code}}",
  "message": "{{human_readable_message}}"
}
```

## Rate limits

{{limits and reset behavior}}

## Changelog

| Version | Change |
|---|---|
| {{version}} | {{change}} |
