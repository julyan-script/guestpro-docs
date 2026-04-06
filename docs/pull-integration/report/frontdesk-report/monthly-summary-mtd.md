---
sidebar_position: 5
sidebar_label: Monthly Summary (MTD)
description: "Month-to-date performance snapshot as of a report date."
---

# Monthly Summary (MTD)

## Overview

Provides a month-to-date (MTD) performance snapshot as of the requested `report_date`, aggregating results from the beginning of the month through that date. The response mirrors the Daily Summary structure at MTD scope by returning room and guest statistics, room revenue metrics (including average room rate and RevPAR with commission adjustments where applicable), and a breakdown by reservation source/agent.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/mtd-summary`

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
| `data` | object | Yes (on success) | MTD summary object. |

### Response `data` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `date` | string | Report date (YYYY-MM-DD). | `2023-01-01` |
| `statistics` | object | Room and guest statistics (see below). | `{...}` |
| `roomRevenue` | object | Room revenue summary (see below). | `{...}` |
| `reservationAgent` | array of objects | Breakdown by reservation agent (see below). | [...] |

### Response `data.statistics` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `totalRoom` | number | Total number of rooms. | `17` |
| `roomSold` | number | Number of rooms sold. | `1` |
| `roomSoldPercent` | object | Occupancy percent (see below). | `{...}` |
| `roomAvailable` | number | Number of rooms available. | `16` |
| `noOfAdult` | number | Number of adult guests. | `1` |
| `noOfChildren` | number | Number of child guests. | `0` |
| `noOfPax` | number | Total number of guests (adults + children). | `1` |
| `complimentary` | number | Number of complimentary rooms. | `0` |

### Response `data.statistics.roomSoldPercent` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `value` | number | Fractional value (0-1). | `0.06` |
| `formattedString` | string | Formatted percent string. | `5.88%` |
| `percentValue` | number | Percent value (0-100). | `5.88` |

### Response `data.roomRevenue` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `code` | string | Revenue code. | `RR` |
| `name` | string | Revenue name. | `Room Revenue` |
| `averageRoomRate` | number | Average room rate. | `785123.97` |
| `averageRoomRateLessCommission` | number | Avg. room rate after commission. | `785123.97` |
| `revPar` | number | Revenue per available room. | `46183.76` |
| `revParLessCommission` | number | RevPAR after commission. | `46183.76` |
| `commission` | number | Total commission. | `0` |
| `amount` | number | Total room revenue. | `1000000` |
| `amountLessCommission` | number | Room revenue after commission. | `1000000` |

### Response `data.reservationAgent` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `code` | string | Reservation source code. | `S1` |
| `name` | string | Reservation source name. | `Walk In` |
| `roomRevenue` | number | Room revenue for this agent. | `14492148.76` |
| `roomRevenueLessCommission` | number | Room revenue after commission. | `14492148.76` |
| `commission` | number | Commission for this agent. | `0` |
| `roomSold` | string/number | Number of rooms sold by this agent. | `17` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "date": "2023-01-01",
    "statistics": {
      "totalRoom": 17,
      "roomSold": 1,
      "roomSoldPercent": {
        "value": 0.06,
        "formattedString": "5.88%",
        "percentValue": 5.88
      },
      "roomAvailable": 16,
      "noOfAdult": 1,
      "noOfChildren": 0,
      "noOfPax": 1,
      "complimentary": 0
    },
    "roomRevenue": {
      "code": "RR",
      "name": "Room Revenue",
      "averageRoomRate": 785123.9669421487,
      "averageRoomRateLessCommission": 785123.9669421487,
      "revPar": 46183.76,
      "revParLessCommission": 46183.76,
      "commission": 0,
      "amount": 1000000,
      "amountLessCommission": 1000000
    },
    "reservationAgent": [
      {
        "code": "S1",
        "name": "Walk In",
        "roomRevenue": 14492148.760330575,
        "roomRevenueLessCommission": 14492148.760330575,
        "commission": 0,
        "roomSold": "17"
      },
      {
        "code": "S4",
        "name": "Online Travel Agent",
        "roomRevenue": 5846074.380165288,
        "roomRevenueLessCommission": 5846074.380165288,
        "commission": 0,
        "roomSold": "8"
      },
      {
        "code": "S5",
        "name": "Travel Agent",
        "roomRevenue": 7933884.29752066,
        "roomRevenueLessCommission": 7733884.29752066,
        "commission": 200000,
        "roomSold": "7"
      },
      {
        "code": "S9",
        "name": "Complimentary",
        "roomRevenue": 375000,
        "roomRevenueLessCommission": 375000,
        "commission": 0,
        "roomSold": "1"
      }
    ]
  }
}
```
