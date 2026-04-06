---
sidebar_position: 9
sidebar_label: Expected Departure
description: "Reservations expected to depart within a date range for operational planning."
---

# Expected Departure

## Overview

Returns reservations expected to depart within the requested date range, which is commonly used for housekeeping and front office planning. The response includes paging metadata and overall pax totals, and each record provides confirmation and source information, guest and room type details, stay dates and night count, pax counts, and the reservation total.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/expected-departure`

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
| `data` | object | Yes (on success) | Expected departure report object. |

### Response `data` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `date` | string | Report date (YYYY-MM-DD). | `2023-01-13` |
| `pageStart` | number | Paging: start index of the current page. | `1` |
| `pageLength` | number | Paging: number of records per page. | `1` |
| `totalCount` | number | Total number of expected departures in the result. | `7` |
| `totalNoOfAdult` | number | Total number of adult guests. | `11` |
| `totalNoOfChildren` | number | Total number of child guests. | `2` |
| `totalNoOfPax` | number | Total number of guests (adults + children). | `13` |
| `data` | array of object | List of expected departure reservation objects (see below). | `[ ... ]` |

### Response `data.data` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `id` | string | Reservation detail unique ID. | `11a62c60-...` |
| `reservationId` | string | Reservation unique ID. | `113d5ae0-...` |
| `status` | string | Reservation status (e.g., `DEFINITE`). | `DEFINITE` |
| `confirmationNo` | string | Reservation confirmation number. | `gusadidev-...` |
| `reservationSource` | string | Reservation source (e.g., `Online Travel Agent`). | `Complimentary` |
| `guest` | object | Guest information (see below). | `{...}` |
| `rateCode` | object | Rate code info (see below). | `{...}` |
| `roomType` | object | Room type info (see below). | `{...}` |
| `reservationDate` | string | Reservation creation date (YYYY-MM-DD). | `2024-08-01` |
| `checkInDate` | string | Check-in date (YYYY-MM-DD or null). | `null` |
| `checkOutDate` | string | Check-out date (YYYY-MM-DD or null). | `null` |
| `noOfNight` | number | Number of nights. | `1` |
| `roomNo` | string | Room number or name. | `Deluxe Villas 103` |
| `specialNote` | string | Special note (nullable). | `null` |
| `noOfAdult` | number | Number of adults in reservation. | `1` |
| `noOfChildren` | number | Number of children in reservation. | `0` |
| `noOfPax` | number | Total number of guests in reservation. | `1` |
| `total` | number | Total amount for the reservation. | `500000` |

### Response `data.data.guest` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `surName` | string | Guest surname. | `Puniatmaja` |
| `fullname` | string | Guest full name. | `Mr Yoga Puniatmaja` |
| `giveName` | string | Guest given name. | `Mr Yoga` |
| `countryCode` | string | Guest country code. | `AF` |
| `countryName` | string | Guest country name. | `Afghanistan` |

### Response `data.data.rateCode` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `code` | string | Rate code ID. | `04c22000-...` |
| `description` | string | Rate code description. | `Package` |

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
    "date": "2023-01-13",
    "pageStart": 1,
    "pageLength": 1,
    "totalCount": 7,
    "totalNoOfAdult": 11,
    "totalNoOfChildren": 2,
    "totalNoOfPax": 13,
    "data": [
      {
        "id": "11a62c60-4faf-11ef-80f1-5319c70e4cad",
        "reservationId": "113d5ae0-4faf-11ef-92e7-dbd5f158598d",
        "status": "DEFINITE",
        "confirmationNo": "gusadidev-20240801-103759",
        "reservationSource": "Complimentary",
        "guest": {
          "surName": "Puniatmaja",
          "fullname": "Mr Yoga Puniatmaja",
          "giveName": "Mr Yoga",
          "countryCode": "AF",
          "countryName": "Afghanistan"
        },
        "rateCode": {
          "code": "04c22000-a7cf-11eb-928a-69db90ee6a0d",
          "description": "Package"
        },
        "roomType": {
          "code": "123fe740-3869-11eb-a57f-950037ff4988",
          "name": "Deluxe Villa"
        },
        "reservationDate": "2024-08-01",
        "checkInDate": null,
        "checkOutDate": null,
        "noOfNight": 1,
        "roomNo": "Deluxe Villas 103",
        "specialNote": null,
        "noOfAdult": 1,
        "noOfChildren": 0,
        "noOfPax": 1,
        "total": 500000
      }
    ]
  }
}
```
