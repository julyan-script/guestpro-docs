---
sidebar_position: 3
sidebar_label: Daily Summary
description: "Single-day operational snapshot including occupancy, revenue, and source/agent breakdowns."
---

# Daily Summary

## Overview

Provides a single-day operational snapshot for the property on the requested `report_date`. The response includes room and guest statistics (rooms sold and available, occupancy percentage, pax counts, complimentary rooms), a room revenue summary (average room rate and RevPAR with commission adjustments where applicable), and a breakdown of rooms sold and room revenue by reservation source/agent.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/daily-summary`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `report_date` | string | Yes | Date for the report (YYYY-MM-DD). |

### Response Body Fields
| Field | Type | Always present | Description |
| --- | --- | :---: | --- |
| `error` | boolean | Yes | Indicates whether the request failed. |
| `status` | string | Yes | Status string. On success returns e.g. `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object | Yes (on success) | Daily summary object. |

### Response `data` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `date` | string | Report date (YYYY-MM-DD). | `2023-01-17` |
| `statistics` | object | Room and guest statistics (see below). | `{...}` |
| `roomRevenue` | object | Room revenue summary (see below). | `{...}` |
| `reservationAgent` | array of objects | Breakdown by reservation agent (see below). | [...] |

### Response `data.statistics` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `totalRoom` | number | Total number of rooms. | `16` |
| `roomSold` | number | Number of rooms sold. | `3` |
| `roomSoldPercent` | object | Occupancy percent (see below). | `{...}` |
| `roomAvailable` | number | Number of rooms available. | `12` |
| `noOfAdult` | number | Number of adult guests. | `8` |
| `noOfChildren` | number | Number of child guests. | `2` |
| `noOfPax` | number | Total number of guests (adults + children). | `10` |
| `complimentary` | number | Number of complimentary rooms. | `1` |

### Response `data.statistics.roomSoldPercent` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `value` | number | Fractional value (0-1). | `0.19` |
| `formattedString` | string | Formatted percent string. | `18.75%` |
| `percentValue` | number | Percent value (0-100). | `18.75` |

### Response `data.roomRevenue` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `code` | string | Revenue code. | `RR` |
| `name` | string | Revenue name. | `Room Revenue` |
| `averageRoomRate` | number | Average room rate. | `782369.15` |
| `averageRoomRateLessCommission` | number | Avg. room rate after commission. | `782369.15` |
| `revPar` | number | Revenue per available room. | `146694.21` |
| `revParLessCommission` | number | RevPAR after commission. | `146694.21` |
| `commission` | number | Total commission. | `0` |
| `amount` | number | Total room revenue. | `3500000` |
| `amountLessCommission` | number | Room revenue after commission. | `3500000` |

### Response `data.reservationAgent` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `code` | string | Reservation source code. | `S4` |
| `name` | string | Reservation source name. | `Online Travel Agent` |
| `roomRevenue` | number | Room revenue for this agent. | `2347107.44` |
| `roomRevenueLessCommission` | number | Room revenue after commission. | `2347107.44` |
| `commission` | number | Commission for this agent. | `0` |
| `roomSold` | string/number | Number of rooms sold by this agent. | `3` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "date": "2023-01-17",
    "statistics": {
      "totalRoom": 16,
      "roomSold": 3,
      "roomSoldPercent": {
        "value": 0.19,
        "formattedString": "18.75%",
        "percentValue": 18.75
      },
      "roomAvailable": 12,
      "noOfAdult": 8,
      "noOfChildren": 2,
      "noOfPax": 10,
      "complimentary": 1
    },
    "roomRevenue": {
      "code": "RR",
      "name": "Room Revenue",
      "averageRoomRate": 782369.1460055095,
      "averageRoomRateLessCommission": 782369.1460055095,
      "revPar": 146694.21,
      "revParLessCommission": 146694.21,
      "commission": 0,
      "amount": 3500000,
      "amountLessCommission": 3500000
    },
    "reservationAgent": [
      {
        "code": "S4",
        "name": "Online Travel Agent",
        "roomRevenue": 2347107.4380165287,
        "roomRevenueLessCommission": 2347107.4380165287,
        "commission": 0,
        "roomSold": "3"
      },
      {
        "code": "S9",
        "name": "Complimentary",
        "roomRevenue": 375000,
        "roomRevenueLessCommission": 375000,
        "commission": 0,
        "roomSold": "1"
      },
      {
        "code": "S1",
        "name": "Walk In",
        "roomRevenue": -1652.892561983471,
        "roomRevenueLessCommission": -1652.892561983471,
        "commission": 0,
        "roomSold": "0"
      }
    ]
  }
}
```
