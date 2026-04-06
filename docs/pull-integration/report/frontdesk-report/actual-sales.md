---
sidebar_position: 10
sidebar_label: Actual Sales
description: "Detailed actual sales rows over a date range for auditing and reconciliation."
---

# Actual Sales

## Overview

Returns detailed actual sales rows for the requested date range, suitable for revenue auditing, reconciliation, and downstream analytics. Each row ties financial totals (room charge, extra charge, taxes, service, commission, and net room revenue) to reservation and folio identifiers and includes contextual dimensions such as room, rate, reservation source/agent, guest attributes, and stay dates; optional filters allow narrowing the dataset by agent, room, guest, market segment, and geography.

## Request Endpoint
- **Method:** `POST`
- **Path:** `{{base_url}}/api/hq/reports/actual-sales`


## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Request Body Fields

| Field | Type | Required | Description | Example |
| --- | --- | :---: | --- | --- |
| `start_date` | string | Yes | Start date (YYYY-MM-DD) for the report. | `2025-06-01` |
| `end_date` | string | Yes | End date (YYYY-MM-DD) for the report. | `2025-06-30` |
| `agent_id` | string | No | Agent ID to filter (or `all`). | `all` |
| `room_type_id` | string | No | Room type ID to filter (or `all`). | `all` |
| `folio_no` | string | No | Folio number to filter. |  |
| `guest_profile_id` | string | No | Guest profile ID to filter (or `all`). | `all` |
| `room_id` | string | No | Room ID to filter (or `all`). | `all` |
| `market_segment_id` | string | No | Market segment ID to filter (or `all`). | `all` |
| `country` | string | No | Country to filter (or `all`). | `all` |
| `nationality` | string | No | Nationality to filter (or `all`). | `all` |
| `region` | string | No | Region to filter (or `all`). | `all` |

### Response Body Fields

| Field | Type | Always present | Description |
| --- | --- | :---: | --- |
| `error` | boolean | Yes | Indicates whether the request failed. |
| `status` | string | Yes | Status string. On success returns e.g. `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | array of object | Yes (on success) | List of actual sales rows. |

### Response `data[]` Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `reservation_detail_id` | string | Reservation detail unique ID. | `456fb120-...` |
| `main_folio` | string | Main folio ID. | `456ff1c0-...` |
| `folio_no` | number | Folio number. | `1650` |
| `dates` | string | Date of the sale (YYYY-MM-DD). | `2025-06-24` |
| `reference_no` | string | Reference number (nullable). | `null` |
| `room_name` | string | Room name. | `Deluxe Villas 102` |
| `room_type_name` | string | Room type name (nullable). | `null` |
| `company_name` | string | Company name. | `Gus Adi Dev Test` |
| `room_id` | string | Room ID. | `73ba0860-...` |
| `room_type_id` | string | Room type ID (nullable). | `null` |
| `name` | string | Guest name. | `Mr xiao li` |
| `country` | string | Guest country (nullable). | `Indonesia` |
| `nationality` | string | Guest nationality (nullable). | `Indonesia` |
| `source` | string | Reservation source. | `Walk In` |
| `market_segment` | string | Market segment (nullable). | `null` |
| `rates` | string | Rate description. | `Breakfast` |
| `region` | string | Region (nullable). | `Asia` |
| `agent_id` | string | Agent ID. | `ag1` |
| `agent_name` | string | Agent name. | `Walkin` |
| `arrival_date` | string | Arrival date (YYYY-MM-DD). | `2025-06-23` |
| `departure_date` | string | Departure date (YYYY-MM-DD). | `2025-06-25` |
| `extended_date` | string | Extended departure date (YYYY-MM-DD). | `2025-06-25` |
| `person` | number | Number of persons. | `1` |
| `company_id` | string | Company ID. | `ef084830-...` |
| `created_by` | string | User who created the record. | `admin` |
| `status` | string | Reservation status (e.g., `CHECK_OUT`). | `CHECK_OUT` |
| `special_request` | string | Special request (nullable, may contain HTML). | `<p>ini special request</p>` |
| `total_night` | string | Number of nights. | `2` |
| `total` | number | Total amount for the sale. | `2000000` |
| `total_room_charge` | number | Total room charge. | `2000000` |
| `total_extra_charge` | number | Total extra charge. | `0` |
| `total_pos` | number | Total POS (nullable). | `null` |
| `total_rebate` | number | Total rebate. | `0` |
| `total_taxes` | number | Total taxes. | `181818.18` |
| `total_service` | number | Total service charge. | `165289.25` |
| `total_commission` | number | Total commission. | `0` |
| `total_room_net` | number | Net room revenue after deductions. | `1619834.71` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": [
    {
      "reservation_detail_id": "456fb120-50cb-11f0-acff-298a1109e825",
      "main_folio": "456ff1c0-50cb-11f0-abb2-b7b74660781b",
      "folio_no": 1650,
      "dates": "2025-06-24",
      "reference_no": null,
      "room_name": "Deluxe Villas 102",
      "room_type_name": null,
      "company_name": "Gus Adi Dev Test",
      "room_id": "73ba0860-3869-11eb-9c04-0f7fa94c8a1b",
      "room_type_id": null,
      "name": "Mr xiao li",
      "country": null,
      "nationality": null,
      "source": "Walk In",
      "market_segment": null,
      "rates": "Breakfast",
      "region": null,
      "agent_id": "ag1",
      "agent_name": "Walkin",
      "arrival_date": "2025-06-23",
      "departure_date": "2025-06-25",
      "extended_date": "2025-06-25",
      "person": 1,
      "company_id": "ef084830-3864-11eb-8731-6b25a1bb66ea",
      "created_by": "admin",
      "status": "CHECK_OUT",
      "special_request": "",
      "total_night": "2",
      "total": 2000000,
      "total_room_charge": 2000000,
      "total_extra_charge": 0,
      "total_pos": null,
      "total_rebate": 0,
      "total_taxes": 181818.18181818182,
      "total_service": 165289.25619834714,
      "total_commission": 0,
      "total_room_net": 1619834.7107438017
    }
  ]
}
```
