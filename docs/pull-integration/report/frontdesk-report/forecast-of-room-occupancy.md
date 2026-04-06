---
sidebar_position: 2
sidebar_label: Forecast of Room Occupancy
description: "Date-by-date occupancy forecast for a selected period."
---

# Forecast of Room Occupancy

## Overview

Provides a date-by-date occupancy forecast for the selected period, summarizing total rooms, rooms sold, rooms available, and the resulting occupancy rate. The response typically also includes forecasted guest counts (adults and children) per day, which can be used for staffing, inventory planning, and operational forecasting.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/report/api/forecast_of_room_occ`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields
| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `start_date` | string | Yes | Start date (YYYY-MM-DD) for the forecast period. |
| `end_date` | string | Yes | End date (YYYY-MM-DD) for the forecast period. |

### Response Body Fields

| Field | Type | Always present | Description |
| --- | --- | :---: | --- |
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object/array | Yes (on success) | Forecast data object or array. |

### Response `data` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `date` | string | Date for the forecast (YYYY-MM-DD). | `2025-01-01` |
| `totalRoom` | number | Total number of rooms. | `16` |
| `roomSold` | number | Number of rooms forecasted to be sold. | `10` |
| `roomAvailable` | number | Number of rooms available. | `6` |
| `occupancyRate` | number | Occupancy rate (0-1, or percent if formatted). | `0.625` |
| `noOfAdult` | number | Forecasted number of adult guests. | `20` |
| `noOfChildren` | number | Forecasted number of child guests. | `4` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": [
    {
      "date": "2025-01-01",
      "totalRoom": 16,
      "roomSold": 10,
      "roomAvailable": 6,
      "occupancyRate": 0.625,
      "noOfAdult": 20,
      "noOfChildren": 4
    },
    {
      "date": "2025-01-02",
      "totalRoom": 16,
      "roomSold": 12,
      "roomAvailable": 4,
      "occupancyRate": 0.75,
      "noOfAdult": 24,
      "noOfChildren": 5
    }
  ]
}
```
