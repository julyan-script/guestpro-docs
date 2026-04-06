---
sidebar_position: 1
sidebar_label: Send Reservation
description: "Create, update, cancel, and send payment info for reservations via the push API."
---

# Send Reservation

## Overview

Push reservation data into GuestPro using a **push API**. This endpoint is intended for external platforms (e.g., channel manager / booking engine / custom PMS integrations) to **create, update, cancel, or mark payment information** for a reservation in GuestPro.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/reservation_general_request`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description | Example |
|---|---:|:---:|---|---|
| `company_id` | string | Yes | Property/company UUID. | `60628770-0788-11e7-88c0-9f143c8ac640` |
| `booking_id` | string | Yes | Unique booking/reservation code. | `kubu1245` |
| `booking_date` | string (date) | Yes | Booking date in `YYYY-MM-DD`. | `2023-06-20` |
| `booking_status` | string | Yes | Reservation status. See supported values below. | `NEW` |
| `channel` | string | Yes | Reservation channel/source. | `gorila` |
| `currencycode` | string | Yes | Currency code (ISO 4217). | `IDR` |
| `room` | array of object | Yes | List of reserved rooms. See `room` object below. | `[{...}]` |
| `guest_profile` | object | Yes | Guest profile information. See `guest_profile` object below. | `{...}` |
| `payment` | object | Yes | Payment information. See `payment` object below. | `{...}` |

### Supported values for `booking_status`

| Value | Meaning | When to send | Notes |
|---|---|---|---|
| `NEW` | New reservation / reservation update | Send when creating a new booking, or when pushing changes to an existing booking (guest info, rooms, dates, rates, etc.). | Use the same `booking_id` for subsequent updates so GuestPro can correlate the booking. |
| `CANCEL` | Reservation canceled | Send when the booking is canceled on your side. | `booking_id` should refer to the booking that needs to be canceled. Still send the same base structure so GuestPro can identify the reservation. |
| `PAID` | Reservation paid | Send when the booking has been paid (fully or per your business rule) and you want to push payment info. | Pair this with a populated `payment` object. |

### Supported values for `payment_type`

| Value | Meaning | Typical usage | Notes |
|---|---|---|---|
| `VIRTUAL_ACCOUNT` | Virtual account payment | Guest pays via VA number issued by a bank/payment provider. | Provide the correct `payment_method_id` configured in GuestPro for VA. |
| `CREDIT_CARD` | Credit card payment | Card payment (online/offline). | `card_no` and `name_on_card` are optional in the Postman example (can be `null`). Only send if you are allowed to share/store them. |
| `E_WALLET` | E-wallet payment | Payment via e-wallet provider. | Ensure `payment_method_id` maps to the e-wallet method in GuestPro. |
| `QRIS` | QRIS payment | Payment via QRIS (Indonesia). | Typically used for QR code based payments. |
| `INTERNET_BANKING` | Internet banking payment | Payment via bank internet banking transfer. | Use when payment is completed via internet banking channel. |
| `BANK_TRANSFER` | Bank transfer payment | Manual/standard transfer between bank accounts. | Use for conventional bank transfers outside VA/IB flows. |

### Request `room` Fields

| Field | Type | Required | Description | Example |
|---|---:|:---:|---|---|
| `id` | string | Yes | Room UUID. | `1096b640-2171-11ea-9a24-2ffae9903d1e` |
| `qty` | number | Yes | Number of rooms. | `1` |
| `adult` | number | Yes | Number of adults. | `2` |
| `child` | number | Yes | Number of children. | `0` |
| `infant` | number | No | Number of infants. | `0` |
| `rate_id` | string | Yes | Rate UUID. | `deb605f0-e3ee-11e9-bc97-abff0550acd1` |
| `rates` | array of object | Yes | List of daily rates. See below. | - |
| `arrival_date` | string (date) | Yes | Arrival date. | `2023-07-04` |
| `departure_date` | string (date) | Yes | Departure date. | `2023-07-06` |
| `remark` | string | No | Room remark. | `, ` |
| `special_request` | string | No | Special request. | `` |

### Request `rates` Fields

| Field | Type | Required | Description | Example |
|---|---:|:---:|---|---|
| `amount` | number | Yes | Rate amount for the date. | `550000` |
| `date` | string (date) | Yes | Date for the rate. | `2023-07-04` |

### Request `guest_profile` Fields

| Field | Type | Required | Description | Example |
|---|---:|:---:|---|---|
| `address` | string | No | Guest address. | `` |
| `phone` | string | Yes | Guest phone number. | `+6281801234567` |
| `email` | string | Yes | Guest email address. | `info@gmail.com` |
| `countrycode` | string | Yes | Guest country. | `Indonesia` |
| `first_name` | string | Yes | Guest first name. | `Lan` |
| `last_name` | string | Yes | Guest last name. | `Uma` |
| `city` | string | No | Guest city. | `` |
| `zip` | string | No | Guest postal code. | `` |

### Request `payment` Fields

| Field | Type | Required | Description | Example |
|---|---:|:---:|---|---|
| `booking_status` | string | Yes | Payment status. | `paid` |
| `payment_type` | string | Yes | Payment type. See supported values above. | `CREDIT_CARD` |
| `total_paid` | number | Yes | Total amount paid. | `1100000` |
| `payment_method_id` | string | Yes | Payment method UUID. | `2f6a5e90-f318-11e9-bdbe-73f8af1ecd00` |
| `payment_date` | string (date) | Yes | Payment date. | `2023-04-14` |
| `card_no` | string | No | Card number (if applicable). | `null` |
| `name_on_card` | string | No | Name on card (if applicable). | `null` |


### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `success` | boolean | Yes | Indicates whether the request succeeded. |
| `message` | string | Yes | Human-readable message. |
| `data` | object | Yes (on success) | May contain additional info or be empty. |

## Expected System Request
```json
{
  "company_id": "60628770-0788-11e7-88c0-9f143c8ac640",
  "booking_id": "kubu1245",
  "booking_date": "2023-06-20",
  "booking_status": "NEW",
  "channel": "gorila",
  "currencycode": "IDR",
  "room": [
    {
      "id": "1096b640-2171-11ea-9a24-2ffae9903d1e",
      "qty": 1,
      "adult": 2,
      "child": 0,
      "infant": 0,
      "rate_id": "deb605f0-e3ee-11e9-bc97-abff0550acd1",
      "rates": [
        { "amount": 550000, "date": "2023-07-04" },
        { "amount": 550000, "date": "2023-07-05" }
      ],
      "arrival_date": "2023-07-04",
      "departure_date": "2023-07-06",
      "remark": ", ",
      "special_request": ""
    }
  ],
  "guest_profile": {
    "address": "",
    "phone": "+6281801234567",
    "email": "info@gmail.com",
    "countrycode": "Indonesia",
    "first_name": "Lan",
    "last_name": "Uma",
    "city": "",
    "zip": ""
  },
  "payment": {
    "booking_status": "paid",
    "payment_type": "CREDIT_CARD",
    "total_paid": 1100000,
    "payment_method_id": "2f6a5e90-f318-11e9-bdbe-73f8af1ecd00",
    "payment_date": "2023-04-14",
    "card_no": null,
    "name_on_card": null
  }
}
```
