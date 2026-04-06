---
sidebar_position: 4
sidebar_label: Daily Summary - Reservation Agent
description: "Daily summary grouped by reservation source/agent for a selected date."
---

# Daily Summary - Reservation Agent

## Overview

Provides a daily summary aggregated by reservation source/agent for the requested `report_date`. Each entry in the response represents one agent/source and includes rooms sold, pax counts (adults, children, total), complimentary rooms, and room revenue values including commission and revenue after commission.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/daily-summary/reservation-agent`

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
| `reservationAgent` | array of objects | List of agent/source summary objects (see below). | [...] |

### Response `data.reservationAgent` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `reservationSourceName` | string | Reservation source/agent name. | `Walkin` |
| `roomSold` | string/number | Number of rooms sold by this agent. | `3` |
| `complimentary` | number | Number of complimentary rooms. | `0` |
| `noOfAdult` | string/number | Number of adult guests. | `7` |
| `noOfChildren` | string/number | Number of child guests. | `2` |
| `noOfPax` | string/number | Total number of guests (adults + children). | `9` |
| `roomRevenueAmount` | number | Room revenue for this agent. | `2347107.44` |
| `roomRevenueCommission` | number | Commission for this agent. | `0` |
| `roomRevenueLessCommission` | number | Room revenue after commission. | `2347107.44` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "date": "2023-01-17",
    "reservationAgent": [
      {
        "reservationSourceName": "Aditya Agent",
        "roomSold": "3",
        "complimentary": 0,
        "noOfAdult": "7",
        "noOfChildren": "2",
        "noOfPax": "9",
        "roomRevenueAmount": 2347107.4380165287,
        "roomRevenueCommission": 0,
        "roomRevenueLessCommission": 2347107.4380165287
      },
      {
        "reservationSourceName": "Complimentary",
        "roomSold": "1",
        "complimentary": 1,
        "noOfAdult": "1",
        "noOfChildren": "0",
        "noOfPax": "1",
        "roomRevenueAmount": 375000,
        "roomRevenueCommission": 0,
        "roomRevenueLessCommission": 375000
      },
      {
        "reservationSourceName": "Walkin",
        "roomSold": "0",
        "complimentary": 0,
        "noOfAdult": "1",
        "noOfChildren": "0",
        "noOfPax": "1",
        "roomRevenueAmount": -1652.892561983471,
        "roomRevenueCommission": 0,
        "roomRevenueLessCommission": -1652.892561983471
      }
    ]
  }
}
```
