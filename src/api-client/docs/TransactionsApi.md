# TransactionsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiTransactionsIdDelete**](TransactionsApi.md#apitransactionsiddelete) | **DELETE** /api/Transactions/{id} |  |
| [**apiTransactionsIdGet**](TransactionsApi.md#apitransactionsidget) | **GET** /api/Transactions/{id} |  |
| [**apiTransactionsIdPut**](TransactionsApi.md#apitransactionsidput) | **PUT** /api/Transactions/{id} |  |
| [**apiTransactionsMonthYearMonthGet**](TransactionsApi.md#apitransactionsmonthyearmonthget) | **GET** /api/Transactions/month/{year}/{month} |  |
| [**apiTransactionsPost**](TransactionsApi.md#apitransactionspost) | **POST** /api/Transactions |  |



## apiTransactionsIdDelete

> apiTransactionsIdDelete(id)



### Example

```ts
import {
  Configuration,
  TransactionsApi,
} from '';
import type { ApiTransactionsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TransactionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiTransactionsIdDeleteRequest;

  try {
    const data = await api.apiTransactionsIdDelete(body);
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


## apiTransactionsIdGet

> Transaction apiTransactionsIdGet(id)



### Example

```ts
import {
  Configuration,
  TransactionsApi,
} from '';
import type { ApiTransactionsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TransactionsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiTransactionsIdGetRequest;

  try {
    const data = await api.apiTransactionsIdGet(body);
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

[**Transaction**](Transaction.md)

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


## apiTransactionsIdPut

> Transaction apiTransactionsIdPut(id, updateTransactionCommand)



### Example

```ts
import {
  Configuration,
  TransactionsApi,
} from '';
import type { ApiTransactionsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TransactionsApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateTransactionCommand (optional)
    updateTransactionCommand: ...,
  } satisfies ApiTransactionsIdPutRequest;

  try {
    const data = await api.apiTransactionsIdPut(body);
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
| **updateTransactionCommand** | [UpdateTransactionCommand](UpdateTransactionCommand.md) |  | [Optional] |

### Return type

[**Transaction**](Transaction.md)

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


## apiTransactionsMonthYearMonthGet

> GetTransactionsByMonthQueryResult apiTransactionsMonthYearMonthGet(year, month, type, categoryId)



### Example

```ts
import {
  Configuration,
  TransactionsApi,
} from '';
import type { ApiTransactionsMonthYearMonthGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TransactionsApi(config);

  const body = {
    // number
    year: 56,
    // number
    month: 56,
    // TransactionType (optional)
    type: ...,
    // string (optional)
    categoryId: categoryId_example,
  } satisfies ApiTransactionsMonthYearMonthGetRequest;

  try {
    const data = await api.apiTransactionsMonthYearMonthGet(body);
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
| **year** | `number` |  | [Defaults to `undefined`] |
| **month** | `number` |  | [Defaults to `undefined`] |
| **type** | `TransactionType` |  | [Optional] [Defaults to `undefined`] [Enum: 0, 1, 2, 3, 4] |
| **categoryId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**GetTransactionsByMonthQueryResult**](GetTransactionsByMonthQueryResult.md)

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


## apiTransactionsPost

> Transaction apiTransactionsPost(createTransactionCommand)



### Example

```ts
import {
  Configuration,
  TransactionsApi,
} from '';
import type { ApiTransactionsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TransactionsApi(config);

  const body = {
    // CreateTransactionCommand (optional)
    createTransactionCommand: ...,
  } satisfies ApiTransactionsPostRequest;

  try {
    const data = await api.apiTransactionsPost(body);
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
| **createTransactionCommand** | [CreateTransactionCommand](CreateTransactionCommand.md) |  | [Optional] |

### Return type

[**Transaction**](Transaction.md)

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

