---
sidebar_position: 7
sidebar_label: Rooms
description: "Returns the list of physical rooms configured for the property."
---

# Rooms

## Overview

The **Rooms** endpoint returns the list of physical rooms configured for the property. Each room includes a reference to its linked room type.

This master data is commonly used for mapping, operational dashboards, and internal reconciliation.

## Request Endpoint
- **HTTP Method:** `POST`
- **Secure URL Path:** `{{base_url}}/api/hq/rooms`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description |
|---|---:|:---:|---|
| `offset` | number | No | Pagination offset/page start (backend-specific). |
| `limit` | number | No | Page size (backend-specific). |

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | `array<object>` | Yes (on success) | Array of room objects. |
| `total` | number | Yes (on success) | Total number of rooms in the property (independent from the current page size). |

### Response `data` Fields

| Field | Type | Description | Example |
|---|---:|---|---|
| `id` | string | Room identifier. | `0e7e2380-ca85-11ec-a1c6-2743a1e38e25` |
| `room_number` | string (nullable) | Room number (may be null). | `102` |
| `description` | string | Room description / label. | `Room Deluxe Deluxe` |
| `createdAt` | string | Creation timestamp. | `2022-05-03 10:02:15` |
| `room_type_id` | string | Linked room type ID. | `123fe740-3869-11eb-a57f-950037ff4988` |
| `room_type.id` | string | Room type ID. | `123fe740-3869-11eb-a57f-950037ff4988` |
| `room_type.name` | string | Room type name. | `Deluxe Villa` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": [
    {
      "id": "0e7e2380-ca85-11ec-a1c6-2743a1e38e25",
      "room_number": "102",
      "description": "Room Deluxe Deluxe",
      "createdAt": "2022-05-03 10:02:15",
      "room_type_id": "123fe740-3869-11eb-a57f-950037ff4988",
      "room_type": {
        "id": "123fe740-3869-11eb-a57f-950037ff4988",
        "name": "Deluxe Villa"
      }
    },
    {
      "id": "15e11ee0-ac30-11ed-a31e-ff5064a500a7",
      "room_number": null,
      "description": "2 Bedroom",
      "createdAt": "2023-02-14 14:23:24",
      "room_type_id": "b0cb41b0-ac2f-11ed-a9ac-a72e59437084",
      "room_type": {
        "id": "b0cb41b0-ac2f-11ed-a9ac-a72e59437084",
        "name": "2 Bedroom"
      }
    }
  ],
  "total": 20
}
```
