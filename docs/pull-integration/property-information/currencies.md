---
sidebar_position: 3
sidebar_label: Currencies
description: "Returns the property’s currency configuration and exchange rates."
---

# Currencies

## Overview

The **Currencies** endpoint returns the currency configuration for the property. It includes the local currency indicator and the exchange rate currently used by the system.

## Request Endpoint
- **HTTP Method:** `POST`
- **Secure URL Path:** `{{base_url}}/api/hq/currencies`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | `array<object>` | Yes (on success) | Array of currency objects. |

### Currency Object Fields
| Field | Type | Description | Example |
|---|---:|---|---|
| `iso_code` | string | Currency code (commonly ISO 4217, for example: `IDR`, `USD`). | `IDR` |
| `is_local` | number | `1` for the property’s default/local currency, `0` otherwise. Treat as boolean-like flag. | `1` |
| `is_active` | number | `1` if enabled for use, `0` if disabled. Treat as boolean-like flag. | `1` |
| `current_exchange_rate` | number | Exchange rate used by the system. May be integer or decimal depending on configuration. | `13000` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": [
    {
      "iso_code": "IDR",
      "is_local": 1,
      "is_active": 1,
      "current_exchange_rate": 1
    },
    {
      "iso_code": "USD",
      "is_local": 0,
      "is_active": 1,
      "current_exchange_rate": 13000
    }
  ]
}
```
