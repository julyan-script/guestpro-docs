---
sidebar_position: 2
sidebar_label: Hotel Date
description: "Returns the property’s current business date."
---

# Hotel Date

## Overview

The **Hotel Date** endpoint returns the property’s current business date. This date is evaluated according to the hotel configuration and timezone.

## Request Endpoint
- **HTTP Method:** `POST`
- **Secure URL Path:** `{{base_url}}/api/hq/hotel-date`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | string (date) | Yes (on success) | Hotel business date in `YYYY-MM-DD`. |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": "2023-01-17"
}
```
