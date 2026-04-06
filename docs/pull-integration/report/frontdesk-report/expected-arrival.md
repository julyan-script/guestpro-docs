---
sidebar_position: 8
sidebar_label: Expected Arrival
description: "Reservations expected to arrive within a date range for arrival planning."
---

# Expected Arrival

## Overview

Returns reservations expected to arrive within the requested date range for arrival planning and front office operations. The response includes paging metadata and overall pax totals, and each reservation record provides confirmation and source information, guest and room type details, stay dates and night count, a day-use flag, and optional reservation set or transfer metadata when relevant; request flags can be used to include in-house and/or historical reservations.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/expected-arrival`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description |
| --- | --- | :---: | --- |
| `start_date` | string | Yes | Start date (YYYY-MM-DD) for the report. |
| `end_date` | string | Yes | End date (YYYY-MM-DD) for the report. |
| `room_type` | string | No | Room type ID to filter results. |
| `include_inhouse` | string | No | Include inhouse reservations (`true`/`false`). |
| `include_history` | string | No | Include historical reservations (`true`/`false`). |

### Response Body Fields

| Field | Type | Always present | Description |
| --- | --- | :---: | --- |
| `error` | boolean | Yes | Indicates whether the request failed. |
| `status` | string | Yes | Status string. On success returns e.g. `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object | Yes (on success) | Expected arrival report object. |

### Response `data` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `date` | string | Report date (YYYY-MM-DD). | `2023-01-13` |
| `pageStart` | number | Paging: start index of the current page. | `1` |
| `pageLength` | number | Paging: number of records per page. | `1` |
| `totalCount` | number | Total number of expected arrivals in the result. | `4` |
| `totalNoOfAdult` | number | Total number of adult guests. | `8` |
| `totalNoOfChildren` | number | Total number of child guests. | `2` |
| `totalNoOfPax` | number | Total number of guests (adults + children). | `10` |
| `data` | array of object | List of expected arrival reservation objects (see below). | `[ ... ]` |

### Response `data.data` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `id` | string | Reservation detail unique ID. | `c3c2a7c0-...` |
| `reservationId` | string | Reservation unique ID. | `c3ba3740-...` |
| `status` | string | Reservation status (e.g., `DEFINITE`). | `DEFINITE` |
| `confirmationNo` | string | Reservation confirmation number. | `gusadidev-...` |
| `reservationSource` | string | Reservation source (e.g., `Online Travel Agent`). | `Online Travel Agent` |
| `guest` | object | Guest information (see below). | `{...}` |
| `rateCode` | object | Rate code info (see below). | `{...}` |
| `roomType` | object | Room type info (see below). | `{...}` |
| `reservationDate` | string | Reservation creation date (YYYY-MM-DD). | `2024-05-14` |
| `checkInDate` | string | Check-in date (YYYY-MM-DD or null). | `2024-05-14` |
| `checkOutDate` | string | Check-out date (YYYY-MM-DD or null). | `2024-05-17` |
| `noOfNight` | number | Number of nights. | `1` |
| `roomNo` | string | Room number or name. | `Deluxe Villas 102` |
| `isDayUse` | string | Day use flag (`"0"` or `"1"`). | `"0"` |
| `specialNote` | string | Special note (nullable). | `null` |
| `noOfAdult` | number | Number of adults in reservation. | `1` |
| `noOfChildren` | number | Number of children in reservation. | `0` |
| `noOfPax` | number | Total number of guests in reservation. | `1` |
| `reservationSet` | object | Reservation set info (see below). | `{...}` |
| `transferFromReservationId` | object | Transfer from reservation info (see below). | `{...}` |
| `transferToReservationId` | object | Transfer to reservation info (see below). | `{...}` |
| `total` | number | Total amount for the reservation. | `500000` |

### Response `data.data.guest` Fields
| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `isVip` | number | VIP flag (0/1). | `0` |
| `surName` | string | Guest surname. | `""` |
| `vipCode` | string | VIP code. | `""` |
| `vipName` | string | VIP name. | `""` |
| `fullname` | string | Guest full name. | `Mr Yoga` |
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

### Response `data.data.reservationSet` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `setCheckInDate` | string | Set check-in date. | `""` |
| `setCheckOutDate` | string | Set check-out date. | `""` |
| `setReservationId` | string | Set reservation ID. | `""` |
| `setConfirmationNo` | string | Set confirmation number. | `""` |

### Response `data.data.[transferFromReservationId|transferToReservationId]` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `roomNumber` | string | Room number. | `""` |
| `confirmationNo` | string | Confirmation number. | `""` |

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
    "totalCount": 4,
    "totalNoOfAdult": 8,
    "totalNoOfChildren": 2,
    "totalNoOfPax": 10,
    "data": [
      {
        "id": "c3c2a7c0-11ca-11ef-887a-6fc26d6fa04a",
        "reservationId": "c3ba3740-11ca-11ef-a072-611aceb3c9fd",
        "status": "CHECK_OUT",
        "confirmationNo": "gusadidev-20240514-042003",
        "reservationSource": "Online Travel Agent",
        "guest": {
          "isVip": 0,
          "surName": "",
          "vipCode": "",
          "vipName": "",
          "fullname": "Mr Yoga ",
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
        "reservationDate": "2024-05-14",
        "checkInDate": "2024-05-14",
        "checkOutDate": "2024-05-17",
        "noOfNight": 1,
        "roomNo": "Deluxe Villas 102",
        "isDayUse": "0",
        "specialNote": null,
        "noOfAdult": 1,
        "noOfChildren": 0,
        "noOfPax": 1,
        "reservationSet": {
          "setCheckInDate": "",
          "setCheckOutDate": "",
          "setReservationId": "",
          "setConfirmationNo": ""
        },
        "transferFromReservationId": {
          "roomNumber": "",
          "confirmationNo": ""
        },
        "transferToReservationId": {
          "roomNumber": "",
          "confirmationNo": ""
        },
        "total": 500000
      }
    ]
  }
}
```
