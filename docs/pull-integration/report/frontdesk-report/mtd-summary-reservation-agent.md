---
sidebar_position: 6
sidebar_label: Monthly Summary (MTD) - Reservation Agent
description: "MTD summary grouped by reservation source/agent as of a report date."
---

# Monthly Summary (MTD) - Reservation Agent

## Overview

Provides a month-to-date (MTD) summary grouped by reservation source/agent as of the requested `report_date`. Each entry represents one agent/source and reports rooms sold, pax counts (adults, children, total), complimentary rooms, and room revenue values including commission and revenue after commission for the MTD period.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/mtd-summary/reservation-agent`

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
| `date` | string | Report date (YYYY-MM-DD). | `2023-01-17` |
| `reservationAgent` | array of objects | List of agent/source summary objects (see below). | [...] |

### Response `data.reservationAgent` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `reservationSourceName` | string | Reservation source/agent name. | `Walkin` |
| `roomSold` | string/number | Number of rooms sold by this agent. | `17` |
| `complimentary` | number | Number of complimentary rooms. | `0` |
| `noOfAdult` | string/number | Number of adult guests. | `19` |
| `noOfChildren` | string/number | Number of child guests. | `0` |
| `noOfPax` | string/number | Total number of guests (adults + children). | `19` |
| `roomRevenueAmount` | number | Room revenue for this agent. | `14492148.76` |
| `roomRevenueCommission` | number | Commission for this agent. | `0` |
| `roomRevenueLessCommission` | number | Room revenue after commission. | `14492148.76` |

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
        "reservationSourceName": "Walkin",
        "roomSold": "17",
        "complimentary": 0,
        "noOfAdult": "19",
        "noOfChildren": "0",
        "noOfPax": "19",
        "roomRevenueAmount": 14492148.760330575,
        "roomRevenueCommission": 0,
        "roomRevenueLessCommission": 14492148.760330575
      },
      {
        "reservationSourceName": "Aditya Agoda",
        "roomSold": "6",
        "complimentary": 0,
        "noOfAdult": "6",
        "noOfChildren": "0",
        "noOfPax": "6",
        "roomRevenueAmount": 6462809.917355371,
        "roomRevenueCommission": 0,
        "roomRevenueLessCommission": 6462809.917355371
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
      }
    ]
  }
}
```
