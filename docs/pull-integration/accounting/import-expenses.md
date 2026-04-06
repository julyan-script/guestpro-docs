---
sidebar_position: 1
sidebar_label: Import Expenses
description: "Bulk import expense transactions into GuestPro Accounting."
---

# Import Expenses

## Overview

Use this endpoint to push one or more supplier/vendor expense records (AP/expense entries) from an external system into GuestPro Accounting. Each expense item is sent inside `transaction_list` and includes the basic bookkeeping fields such as reference number, supplier name, account/COA code, invoice & payment dates, amount, and payment method.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/integration/import_expenses`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description | Example |
|---|---:|:---:|---|---|
| `transaction_list` | array of object | Yes | List of expense transactions to import. See `transaction_list` object below. | `[...]` |

### Request `transaction_list` Fields

| Field | Type | Required | Description | Example |
|---|---:|:---:|---|---|
| `reference_no` | string | Yes | Reference number for the expense. | `12345` |
| `supplier_name` | string | Yes | Supplier/vendor name. | `Supplier Ayam` |
| `account_code` | string | Yes | Account code for expense. | `1.1.04.04` |
| `invoice_date` | string (date) | Yes | Invoice date in `YYYY-MM-DD`. | `2023-11-30` |
| `payment_date` | string (date) | Yes | Payment date in `YYYY-MM-DD`. | `2023-12-01` |
| `amount` | number | Yes | Expense amount. | `400000` |
| `notes` | string | No | Notes for the transaction. | `invoice 1` |
| `remark` | string | No | Additional remark. | `Purchase` |
| `payment_method` | string | Yes | Payment method. | `Cash` |
| `img_base64` | string | No | Image attachment as base64 data URL. | `data:image/png;base64,<<base64>>` |

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `success` | boolean | Yes | Indicates whether the request succeeded. |
| `message` | string | Yes | Human-readable message. |
| `data` | object | Yes (on success) | May contain additional info or be empty. |

## Expected System Request
```json
{
  "company_id": "5bae2b00-9849-11eb-bebf-fd10f16383f2",
  "username": "admin",
  "password": "admin",
  "transaction_list": [
    {
      "reference_no": "12345",
      "supplier_name": "Supplier Ayam",
      "account_code": "1.1.04.04",
      "invoice_date": "2023-11-30",
      "payment_date": "2023-12-01",
      "amount": 400000,
      "notes": "invoice 1",
      "remark": "Purchase",
      "payment_method": "Cash",
      "img_base64": "data:image/png;base64,<<base64>>"
    }
  ]
}
```
