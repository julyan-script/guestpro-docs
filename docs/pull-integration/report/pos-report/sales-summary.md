---
sidebar_position: 1
sidebar_label: Sales Summary
description: "POS sales recap with header totals and breakdowns by product and payment."
---

# Sales Summary

## Overview

Returns a POS sales summary for a date range (and optional time window), including summary totals, product breakdown, and Payment-method breakdown. This endpoint is typically used to build recap dashboards or export POS performance over a period.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/sales-summary`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description |
|---|---:|:---:|---|
| `start_date` | string (date) | Yes | Start date (YYYY-MM-DD) for the report. |
| `end_date` | string (date) | Yes | End date (YYYY-MM-DD) for the report. |
| `pos_id` | string | No | POS filter. Use `all` for all POS. |
| `product_group_type` | string | No | Product group type. |
| `start_time` | string (HH:mm) | No | Start time for filtering. |
| `end_time` | string (HH:mm) | No | End time for filtering. |

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object | Yes (on success) | Sales summary data. |

### Response `data.header` Fields
| Field | Type | Description | Example |
|---|---:|---|---|
| `start_date` | string (date) | Start date of the report. | `2023-01-13` |
| `end_date` | string (date) | End date of the report. | `2024-01-17` |
| `transaction_count` | string/number | Number of transactions. | `250` |
| `total_pax` | string/number | Total number of guests (if present). | `243` |
| `transaction_average` | number | Average transaction value. | `124986.775` |
| `total_trx` | number | Total transaction value. | `31208250.2` |
| `total_payment` | number | Total payment value. | `29755578.75` |
| `total_card_fee` | number | Total card fee. | `10000` |
| `total_rounding` | number | Total rounding adjustment. | `28443.55` |
| `pos_name` | string | POS name. | `All POS` |

### Response `data.product` Fields
| Field | Type | Description | Example |
|---|---:|---|---|
| `qty` | number | Quantity sold. | `81` |
| `product_name` | string | Product name. | `Ayam` |
| `total` | number | Total sales for the product. | `7720950` |

### Response `data.payment` Fields
| Field | Type | Description | Example |
|---|---:|---|---|
| `name` | string | Payment method name. | `Cash On Hand` |
| `qty` | number | Number of transactions for this payment method. | `37` |
| `value` | number | Total value for this payment method. | `4203180` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "header": {
      "start_date": "2023-01-13",
      "end_date": "2024-01-17",
      "transaction_count": "250",
      "total_pax": "243",
      "transaction_average": 124986.775,
      "total_trx": 31208250.2,
      "total_payment": 29755578.75,
      "total_card_fee": 10000,
      "total_rounding": 28443.55,
      "pos_name": "All POS"
    },
    "product": [
      { "qty": 81, "product_name": "Ayam", "total": 7720950 }
    ],
    "payment": [
      { "name": "Cash On Hand", "qty": 37, "value": 4203180 }
    ]
  }
}
```
