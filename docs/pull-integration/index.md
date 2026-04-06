---
sidebar_position: 1
sidebar_label: Pull Integration
description: "General requirements, authentication, and common response envelope for Pull Integration endpoints."
---

# PULL INTEGRATION

## General Requirements

### Authentication

All endpoints in this group authenticate using credentials sent in the request body as `form-data` fields:

| Field | Type | Required | Description | Example |
| --- | --- | --- | --- | --- |
| `username` | string | Yes | API account username provided by GuestPro. | `demo_user` |
| `password` | string | Yes | API account password provided by GuestPro. | `••••••••` |
| `company_code` | string | Yes | Property/company identifier bound to your API account. | `gusadidev` |

### Content Type

Requests for this group are submitted as `form-data` fields and responses are returned as JSON.

### Common Response

Most endpoints respond with a shared structure.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {}
}
```

If the `error` is `true`, the field `message` typically contains the validation or authentication failure reason.

```json
{
  "error": true,
  "status": "error",
  "message": "<<error_detail>>"
}
```
