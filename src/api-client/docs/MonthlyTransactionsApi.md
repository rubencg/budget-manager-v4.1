# MonthlyTransactionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiMonthlyTransactionsGet**](MonthlyTransactionsApi.md#apimonthlytransactionsget) | **GET** /api/monthly-transactions |  |
| [**apiMonthlyTransactionsIdDelete**](MonthlyTransactionsApi.md#apimonthlytransactionsiddelete) | **DELETE** /api/monthly-transactions/{id} |  |
| [**apiMonthlyTransactionsIdGet**](MonthlyTransactionsApi.md#apimonthlytransactionsidget) | **GET** /api/monthly-transactions/{id} |  |
| [**apiMonthlyTransactionsIdPut**](MonthlyTransactionsApi.md#apimonthlytransactionsidput) | **PUT** /api/monthly-transactions/{id} |  |
| [**apiMonthlyTransactionsPost**](MonthlyTransactionsApi.md#apimonthlytransactionspost) | **POST** /api/monthly-transactions |  |



## apiMonthlyTransactionsGet

> Array&lt;MonthlyTransaction&gt; apiMonthlyTransactionsGet()



### Example

```ts
import {
  Configuration,
  MonthlyTransactionsApi,
} from '';
import type { ApiMonthlyTransactionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MonthlyTransactionsApi(config);

  try {
    const data = await api.apiMonthlyTransactionsGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;MonthlyTransaction&gt;**](MonthlyTransaction.md)

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


## apiMonthlyTransactionsIdDelete

> apiMonthlyTransactionsIdDelete(id)



### Example

```ts
import {
  Configuration,
  MonthlyTransactionsApi,
} from '';
import type { ApiMonthlyTransactionsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MonthlyTransactionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiMonthlyTransactionsIdDeleteRequest;

  try {
    const data = await api.apiMonthlyTransactionsIdDelete(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | No Content |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiMonthlyTransactionsIdGet

> MonthlyTransaction apiMonthlyTransactionsIdGet(id)



### Example

```ts
import {
  Configuration,
  MonthlyTransactionsApi,
} from '';
import type { ApiMonthlyTransactionsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MonthlyTransactionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiMonthlyTransactionsIdGetRequest;

  try {
    const data = await api.apiMonthlyTransactionsIdGet(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**MonthlyTransaction**](MonthlyTransaction.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |
| **404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiMonthlyTransactionsIdPut

> MonthlyTransaction apiMonthlyTransactionsIdPut(id, updateMonthlyTransactionCommand)



### Example

```ts
import {
  Configuration,
  MonthlyTransactionsApi,
} from '';
import type { ApiMonthlyTransactionsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MonthlyTransactionsApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateMonthlyTransactionCommand (optional)
    updateMonthlyTransactionCommand: ...,
  } satisfies ApiMonthlyTransactionsIdPutRequest;

  try {
    const data = await api.apiMonthlyTransactionsIdPut(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |
| **updateMonthlyTransactionCommand** | [UpdateMonthlyTransactionCommand](UpdateMonthlyTransactionCommand.md) |  | [Optional] |

### Return type

[**MonthlyTransaction**](MonthlyTransaction.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success |  -  |
| **404** | Not Found |  -  |
| **400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiMonthlyTransactionsPost

> MonthlyTransaction apiMonthlyTransactionsPost(createMonthlyTransactionCommand)



### Example

```ts
import {
  Configuration,
  MonthlyTransactionsApi,
} from '';
import type { ApiMonthlyTransactionsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MonthlyTransactionsApi(config);

  const body = {
    // CreateMonthlyTransactionCommand (optional)
    createMonthlyTransactionCommand: ...,
  } satisfies ApiMonthlyTransactionsPostRequest;

  try {
    const data = await api.apiMonthlyTransactionsPost(body);
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
| **createMonthlyTransactionCommand** | [CreateMonthlyTransactionCommand](CreateMonthlyTransactionCommand.md) |  | [Optional] |

### Return type

[**MonthlyTransaction**](MonthlyTransaction.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Created |  -  |
| **400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

