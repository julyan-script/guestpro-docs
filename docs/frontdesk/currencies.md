---
sidebar_position: 3
title: Currencies
---

Retrieve the list of currencies available in the PMS.

---

## Endpoint

<span style={{color:"#facc15", fontWeight:"bold"}}>POST</span> `{{base_url}}/api/hq/currencies`

---

## Body (form-data)

| Field | Type | Required | Description |
|------|------|----------|-------------|
| username | string | Yes | API username |
| password | string | Yes | API password |
| company_code | string | Yes | Unique company identifier |

---

## Example Request

```jsx title="Curl"
curl --location -g '{{base_url}}/api/hq/currencies' \
--form 'username="{{username}}"' \
--form 'password="{{password}}"' \
--form 'company_code="{{company_code}}"'
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example Response

<div style={{position:"relative"}}> 

  <span style={{
  position:"absolute",
  top:"22px",
  right:"10px",  
  height:"20px",
  padding:"0px 10px",
  background:"#1f2937",
  borderRadius:"6px",
  fontSize:"12px",
  color:"#22c55e",
  fontWeight:"600"
}}>
200 OK
</span>

<Tabs> 
    <TabItem value="body" label="Body" default> 
```jsx title="json"
{
  "error": false,
  "status": "ok",
  "message": "",
  "data": [
    {
      "iso_code": "IDR",
      "is_local": 1,
      "is_active": 1,
      "current_exchange_rate": 1
    },
    {
      "iso_code": "USD",
      "is_local": 0,
      "is_active": 1,
      "current_exchange_rate": 13000
    }
  ]
}
```
  </TabItem>
  <TabItem value="headers" label="Headers">
    ```http
HTTP/1.1 200 OK
Date: Wed, 14 Aug 2024 07:37:50 GMT
Server: Apache/2.4.54 (Win64) OpenSSL/1.1.1k PHP/7.4.19
X-Powered-By: PHP/7.4.19
Cache-Control: no-cache, no-store, must-revalidate
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
ETag: "d7f79e976cd34121b37f29c50a7427573a6060a9"
Set-Cookie: pms_session=0IlCuimj5TelY0Cvy42dnwmzXC2CoG6wCuPuykDJ; expires=Wed, 14-Aug-2024 09:37:51 GMT; Max-Age=7200; path=/; httponly
Pragma: no-cache
Expires: 0
Connection: close
Content-Type: application/json
```  
  </TabItem>
</Tabs>
</div>