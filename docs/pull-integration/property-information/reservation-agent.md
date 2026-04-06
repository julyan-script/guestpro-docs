---
sidebar_position: 6
sidebar_label: Reservation Agent
description: "Returns the master list of reservation agents configured for the property."
---

# Reservation Agents

## Overview

The **Reservation Agents** endpoint returns the master list of reservation agents configured for the property.

Each agent record may be linked to a reservation source (for example: Booking Engine, Direct, OTA). Agent identifiers are commonly used as filter values in reporting and integrations.

## Request Endpoint
- **HTTP Method:** `POST`
- **Secure URL Path:** `{{base_url}}/api/hq/reservation-agent`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | `array<object>` | Yes (on success) | Array of reservation agent objects. |

### Response `data` Fields

| Field | Type | Description | Example |
|---|---:|---|---|
| `id` | string | Agent identifier. | `ag3` |
| `name` | string | Agent name. | `Booking Engine` |
| `email` | string (nullable) | Contact email. Can be `null` or an empty string. | `null` |
| `created_at` | string (nullable) | Creation timestamp. Can be `null`. | `2016-05-05 23:12:51` |
| `updated_at` | string (nullable) | Update timestamp. Can be `null`. | `2016-05-05 23:12:51` |
| `address` | string (nullable) | Address. Can be `null` or an empty string. | `null` |
| `phone` | string (nullable) | Phone. Can be `null` or an empty string. | `null` |
| `payment_status` | string | Payment status. | `NORMAL` |
| `isActive` | number | Active flag (`1`/`0`). Treat as boolean-like flag. | `1` |
| `source_id` | string | Linked reservation source identifier (source code). | `S3` |
| `reservation_source` | object | Linked reservation source object (denormalized snapshot). | - |

### Response `data.reservation_source` Fields

| Field | Type | Description | Example |
|---|---:|---|---|
| `id` | string | Source identifier. | `S3` |
| `code` | string | Source code. | `S3` |
| `reservation_source.name` | string | Source name. | `Booking Engine` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": [
    {
      "id": "ag3",
      "name": "Booking Engine",
      "email": null,
      "created_at": "2016-05-05 23:12:51",
      "updated_at": "2016-05-05 23:12:51",
      "address": null,
      "phone": null,
      "payment_status": "NORMAL",
      "isActive": 1,
      "source_id": "S3",
      "reservation_source": {
        "id": "S3",
        "code": "S3",
        "name": "Booking Engine"
      }
    },
    {
      "id": "complimentary",
      "name": "Complimentary",
      "email": null,
      "created_at": null,
      "updated_at": null,
      "address": null,
      "phone": null,
      "payment_status": "NORMAL",
      "isActive": 1,
      "source_id": "S9",
      "reservation_source": {
        "id": "S9",
        "code": "S9",
        "name": "Complimentary"
      }
    },
    {
      "id": "ag2",
      "name": "Direct",
      "email": null,
      "created_at": "2016-05-05 23:12:35",
      "updated_at": "2016-05-05 23:12:35",
      "address": null,
      "phone": null,
      "payment_status": "NORMAL",
      "isActive": 1,
      "source_id": "S2",
      "reservation_source": {
        "id": "S2",
        "code": "S2",
        "name": "Direct"
      }
    },
    {
      "id": "ag1",
      "name": "Walkin",
      "email": "",
      "created_at": "2016-05-05 23:04:21",
      "updated_at": "2016-05-05 23:12:13",
      "address": "",
      "phone": "",
      "payment_status": "NORMAL",
      "isActive": 1,
      "source_id": "S1",
      "reservation_source": {
        "id": "S1",
        "code": "S1",
        "name": "Walk In"
      }
    }
  ]
}
```
