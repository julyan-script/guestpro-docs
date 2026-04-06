---
sidebar_position: 7
sidebar_label: Inhouse Reservations
description: "In-house reservations list over a date range with paging metadata."
---

# Inhouse Reservations

## Overview

Returns an in-house reservations report over the requested date range, intended to list currently staying guests with key reservation identifiers and totals. The response includes paging metadata and overall pax totals, and the data array contains one object per reservation detail with confirmation and source information, guest identity, rate code and room type, stay dates and night count, pax counts, and the reservation total.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/inhouse-reservations`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `start_date` | string | Yes | Start date (YYYY-MM-DD) for the report. |
| `end_date` | string | Yes | End date (YYYY-MM-DD) for the report. |
| `room_type` | string | No | Room type ID to filter results. |

### Response Body Fields

| Field | Type | Always present | Description |
| --- | --- | :---: | --- |
| `error` | boolean | Yes | Indicates whether the request failed. |
| `status` | string | Yes | Status string. On success returns e.g. `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object | Yes (on success) | Inhouse reservation report object. |

### Response `data` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `date` | string | Report date (YYYY-MM-DD). | `2023-01-17` |
| `pageStart` | number | Paging: start index of the current page. | `1` |
| `pageLength` | number | Paging: number of records per page. | `1` |
| `totalCount` | number | Total number of inhouse reservations in the result. | `7` |
| `totalNoOfAdult` | number | Total number of adult guests. | `7` |
| `totalNoOfChildren` | number | Total number of child guests. | `0` |
| `totalNoOfPax` | number | Total number of guests (adults + children). | `7` |
| `data` | array of object | List of inhouse reservation objects (see below). | `[ ... ]` |

### Response `data.data` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `id` | string | Reservation detail unique ID. | `cd1af1b0-...` |
| `reservationId` | string | Reservation unique ID. | `cce068f0-...` |
| `status` | string | Reservation status (e.g., `CHECK_IN`). | `CHECK_IN` |
| `confirmationNo` | string | Reservation confirmation number. | `gusadidev-...` |
| `reservationSource` | string | Reservation source (e.g., `Walk In`). | `Walk In` |
| `guest` | object | Guest information (see below). | `{...}` |
| `rateCode` | object | Rate code info (see below). | `{...}` |
| `roomType` | object | Room type info (see below). | `{...}` |
| `reservationDate` | string | Reservation creation date (YYYY-MM-DD). | `2022-03-12` |
| `checkInDate` | string | Check-in date (YYYY-MM-DD). | `2022-03-12` |
| `checkOutDate` | string | Check-out date (YYYY-MM-DD or null if inhouse). | `null` |
| `noOfNight` | number | Number of nights. | `1` |
| `roomNo` | string | Room number or name. | `Deluxe Villas 102` |
| `specialNote` | string | Special note (nullable). | `null` |
| `noOfAdult` | number | Number of adults in reservation. | `1` |
| `noOfChildren` | number | Number of children in reservation. | `0` |
| `noOfPax` | number | Total number of guests in reservation. | `1` |
| `total` | number | Total amount for the reservation. | `1100000` |

### Response `data.data.guest` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `surName` | string | Guest surname. | `""` |
| `fullname` | string | Guest full name. | `Made Sari` |
| `giveName` | string | Guest given name. | `Made Sari` |
| `countryCode` | string | Guest country code (nullable). | `ID` |
| `countryName` | string | Guest country name (nullable). | `Indonesia` |

### Response `data.data.rateCode` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `code` | string | Rate code ID. | `0bfa9410-...` |
| `description` | string | Rate code description. | `Room And Breakfast1` |

### Response `data.data.roomType` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `code` | string | Room type ID. | `123fe740-...` |
| `name` | string | Room type name. | `Deluxe Villa` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "date": "2023-01-17",
    "pageStart": 1,
    "pageLength": 1,
    "totalCount": 7,
    "totalNoOfAdult": 7,
    "totalNoOfChildren": 0,
    "totalNoOfPax": 7,
    "data": [
      {
        "id": "cd1af1b0-7e85-11ec-8cb0-d37634e3f66a",
        "reservationId": "cce068f0-7e85-11ec-a0c8-597225ae10c3",
        "status": "CHECK_IN",
        "confirmationNo": "gusadidev-20220126-045607",
        "reservationSource": "Walk In",
        "guest": {
          "surName": "",
          "fullname": " Made Sari ",
          "giveName": " Made Sari",
          "countryCode": null,
          "countryName": null
        },
        "rateCode": {
          "code": "0bfa9410-1f66-11ec-9a65-e51e54f659e2",
          "description": "Room And Breakfast1"
        },
        "roomType": {
          "code": "123fe740-3869-11eb-a57f-950037ff4988",
          "name": "Deluxe Villa"
        },
        "reservationDate": "2022-03-12",
        "checkInDate": "2022-03-12",
        "checkOutDate": null,
        "noOfNight": 1,
        "roomNo": "Deluxe Villas 102",
        "specialNote": null,
        "noOfAdult": 1,
        "noOfChildren": 0,
        "noOfPax": 1,
        "total": 1100000
      }
    ]
  }
}
```
