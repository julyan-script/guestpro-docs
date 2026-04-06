---
sidebar_position: 5
sidebar_label: Reservation Source
description: "Returns the master list of reservation sources configured for the property."
---

# Reservation Sources

## Overview

The **Reservation Sources** endpoint returns the master list of reservation sources configured for the property. These sources are commonly used to categorize bookings (for example: Walk In, Direct, Booking Engine, OTA).

## Request Endpoint
- **HTTP Method:** `POST`
- **Secure URL Path:** `{{base_url}}/api/hq/reservation-source`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | `array<object>` | Yes (on success) | Array of reservation source objects. |

### Source `data` Fields

| Field | Type | Description | Example |
|---|---:|---|---|
| `code` | string | Source code. Use this as the stable reference key. | `S1` |
| `name` | string | Source display name. | `Walk In` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": [
    { "code": "S1", "name": "Walk In" },
    { "code": "S10", "name": "Social Media" },
    { "code": "S2", "name": "Direct" },
    { "code": "S3", "name": "Booking Engine" },
    { "code": "S4", "name": "Online Travel Agent" },
    { "code": "S5", "name": "Travel Agent" },
    { "code": "S6", "name": "Company" },
    { "code": "S7", "name": "Wholesaler" },
    { "code": "S8", "name": "Government" },
    { "code": "S9", "name": "Complimentary" }
  ]
}
```
