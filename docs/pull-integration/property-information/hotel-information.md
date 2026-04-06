---
sidebar_position: 1
sidebar_label: Hotel Information
description: "Returns the master profile of the property, including timezone configuration."
---

# Hotel Information

## Overview

The **Hotel Information** endpoint returns the master profile of the property. It includes identity and contact details as well as timezone configuration used by the platform.

## Request Endpoint
- **Method:** `POST`
- **Secure URL Path:** `{{base_url}}/api/hq/hotel-info`

## Payload Construction and Schema Definition

The request payload is submitted as `form-data` fields.

### Response Body Fields

| Field | Type | Always present | Description |
|---|---:|:---:|---|
| `error` | boolean | Yes | Indicates whether the request failed. `false` means success. |
| `status` | string | Yes | Status string. On success the example returns `"ok"`. |
| `message` | string | Yes | Human-readable message. Often empty on success. |
| `data` | object | Yes (on success) | Hotel profile object. |

### Response `data` Fields

| Field | Type | Description | Example |
|---|---:|---|---|
| `hotelName` | string | Property display name. | `Gus Adi Dev` |
| `hotelCode` | string | Property code (often matches `company_code`). | `gusadidev` |
| `address` | string | Property address saved in PMS (free-text mailing/physical address). May include street/city/region/postal code and can contain line breaks depending on how it is stored. | `bali` |
| `phone` | string | **Mobile Phone** from the property/company setting in PMS. Commonly used as the default hotel contact number for WhatsApp/Telegram. Free-text: may include country code, spaces, parentheses, or separators (not guaranteed to be E.164). Treat as a contact/display value (do not assume numeric-only). | `89354234522` |
| `website` | string | Property website. May be a domain or URL. | `www.adityavillas.com` |
| `email` | string | Primary contact email saved in PMS. Typically a single email address, but treat as free-text (may be blank or contain multiple addresses depending on configuration). | `adigus248@gmail.com` |
| `initializeHotelDate` | string (date) | **PMS System Date / Hotel Date** for the property (business date) in `YYYY-MM-DD`. This date is sourced from the PMS “Date System” configuration and is used by the property as its current operational date (may differ from the calendar date depending on night-audit/business-day rules). | `2023-01-17` |
| `appTimeZone` | string | IANA timezone name used by the property. | `Asia/Singapore` |
| `appTimeZoneUtcOffsetMilliseconds` | number | UTC offset in milliseconds for `appTimeZone` at the time of response. Example: $28800000$ ms = $8$ hours. | `28800000` |
| `hotelLogo.url` | string (url) | Public URL to the logo image. | `https://.../company_logo/...png` |

## Expected System Responses

The system responds with HTTP `200 OK`.

```json
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": {
    "hotelName": "Gus Adi Dev",
    "hotelCode": "gusadidev",
    "address": "bali",
    "phone": "89354234522",
    "website": "www.adityavillas.com",
    "email": "adigus248@gmail.com",
    "initializeHotelDate": "2023-01-17",
    "appTimeZone": "Asia/Singapore",
    "appTimeZoneUtcOffsetMilliseconds": 28800000,
    "hotelLogo": {
      "url": "https://s3-ap-southeast-1.amazonaws.com/gp-cloud-pms/uploads/cloud-pms/company_logo/b7beab20-3868-11eb-958f-f70fc38eaffd.png"
    }
  }
}
```
