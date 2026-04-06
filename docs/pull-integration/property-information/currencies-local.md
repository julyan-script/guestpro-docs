---
sidebar_position: 4
sidebar_label: Currencies Local
description: "Returns the property’s default local currency configuration."
---

# Currencies Local

The **Currencies Local** endpoint returns the property’s default currency configuration. This endpoint is commonly used to display the property’s default currency in UI and reports, and to determine the default currency code when a workflow does not explicitly provide one.

## Request Endpoint
- **HTTP Method:** `POST`
- **Secure URL Path:** `{{base_url}}/api/hq/currencies/@local`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object | Yes (on success) | Array of currency objects. |

### Response `data` Fields

| Field | Type | Description | Example |
|---|---:|---|---|
| `iso_code` | string | Currency code. | `IDR` |
| `is_local` | number | `1` indicates local currency. Treat as boolean-like flag. | `1` |
| `isActive` | number | Active flag (`1`/`0`). Treat as boolean-like flag. | `1` |
| `currentExchangeRate` | number | Exchange rate. | `1` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "iso_code": "IDR",
    "is_local": 1,
    "isActive": 1,
    "currentExchangeRate": 1
  }
}
```
