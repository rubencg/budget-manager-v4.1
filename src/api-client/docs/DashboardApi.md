# DashboardApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiDashboardGet**](DashboardApi.md#apidashboardget) | **GET** /api/Dashboard |  |



## apiDashboardGet

> GetDashboardQueryResult apiDashboardGet(year, month)



### Example

```ts
import {
  Configuration,
  DashboardApi,
} from '';
import type { ApiDashboardGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DashboardApi(config);

  const body = {
    // number (optional)
    year: 56,
    // number (optional)
    month: 56,
  } satisfies ApiDashboardGetRequest;

  try {
    const data = await api.apiDashboardGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **year** | `number` |  | [Optional] [Defaults to `undefined`] |
| **month** | `number` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**GetDashboardQueryResult**](GetDashboardQueryResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

