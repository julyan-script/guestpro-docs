---
sidebar_position: 1
sidebar_label: Payment
description: "Payment report over a date range with optional filters and summary totals."
---

# Payment

## Overview

Returns a payment report for the selected date range, designed for cashiering and accounting reconciliation. On success, `data.list` contains the detailed payment entries (date/time, user, amounts, reference context, account and payment method, and payment source), while `data.summary` provides an aggregated view of totals by payment method/status; optional request fields let you filter by account, payment source/type, user, POS, and control grouping or settlement-related display behavior.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/payment`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description |
| --- | ---: | :---: | --- |
| `start_date` | string (date) | Yes | Start date (YYYY-MM-DD) for the report. |
| `end_date` | string (date) | Yes | End date (YYYY-MM-DD) for the report. |
| `account_id` | string | No | Account filter. Use `all` for all accounts. |
| `payment_from` | string | No | Payment source filter. Use `[]` for all. |
| `payment_type` | string | No | Payment type filter. Use `all` for all types. |
| `user` | string | No | User filter. Use `all` for all users. |
| `show_payment_settlement` | string/number | No | Show payment settlement (0/1). |
| `pos_id` | string | No | POS filter. |
| `filter_type` | string | No | Filter type, e.g. `PAYMENT_DATE`. |
| `show_deposit_usage_on_payment` | string/number | No | Show deposit usage on payment (0/1). |
| `group_by` | string | No | Grouping field, e.g. `payment_date`. |

### Response Body Fields

| Field | Type | Always present | Description |
| --- | ---: | :---: | --- |
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object | Yes (on success) | Payment report data. |

### Response `data.list` Fields

| Field | Type | Description | Example |
| --- | ---: | --- | --- |
| `id` | string | Payment entry ID. | `ff988ba0-50ca-11f0-ae4c-235b679d1023` |
| `payment_status` | string/null | Payment status. | `null` |
| `payment_date` | string (date) | Payment date (YYYY-MM-DD). | `2025-06-23` |
| `created_at` | string (datetime) | Creation timestamp. | `2025-06-24 15:15:24` |
| `created_by` | string | User who created the entry. | `admin` |
| `total_paid` | number | Total paid amount. | `1000000` |
| `name_on_card` | string/null | Name on card (if applicable). | `null` |
| `card_no` | string/null | Card number (if applicable). | `null` |
| `notes` | string/null | Notes. | `null` |
| `bookeepingrate` | number | Bookkeeping rate. | `1` |
| `transaction_no` | string | Transaction number. | `PAY-2849` |
| `reference_no` | string | Reference information. | `Folio no : 1649, Guest Profile Name :  Hupo , ...` |
| `account_name` | string | Account name. | `1.1.01.01 - INI TEST` |
| `payment_method_name` | string | Payment method name. | `Cash with Fee` |
| `payment_from` | string | Payment source. | `RESERVATION` |

### Response `data.summary` Fields
| Field | Type | Description | Example |
| --- | ---: | --- | --- |
| `payment_method_name` | string | Payment method name. | `Cash with Fee` |
| `payment_status` | string/null | Payment status. | `null` |
| `total_paid` | number | Total paid for this method. | `5272331` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "list": [
      {
        "id": "ff988ba0-50ca-11f0-ae4c-235b679d1023",
        "payment_status": null,
        "payment_date": "2025-06-23",
        "created_at": "2025-06-24 15:15:24",
        "created_by": "admin",
        "total_paid": 1000000,
        "name_on_card": null,
        "card_no": null,
        "notes": null,
        "bookeepingrate": 1,
        "transaction_no": "PAY-2849",
        "reference_no": "Folio no : 1649, Guest Profile Name :  Hupo , Room Type : , Room  : Deluxe Villa 101 renamed",
        "account_name": "1.1.01.01 - INI TEST",
        "payment_method_name": "Cash with Fee",
        "payment_from": "RESERVATION"
      }
    ],
    "summary": [
      {
        "payment_method_name": "Cash with Fee",
        "payment_status": null,
        "total_paid": 5272331
      }
    ]
  }
}
```
