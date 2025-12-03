# PlannedExpensesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiPlannedExpensesIdDelete**](PlannedExpensesApi.md#apiplannedexpensesiddelete) | **DELETE** /api/PlannedExpenses/{id} |  |
| [**apiPlannedExpensesIdGet**](PlannedExpensesApi.md#apiplannedexpensesidget) | **GET** /api/PlannedExpenses/{id} |  |
| [**apiPlannedExpensesIdPut**](PlannedExpensesApi.md#apiplannedexpensesidput) | **PUT** /api/PlannedExpenses/{id} |  |
| [**apiPlannedExpensesPost**](PlannedExpensesApi.md#apiplannedexpensespost) | **POST** /api/PlannedExpenses |  |



## apiPlannedExpensesIdDelete

> apiPlannedExpensesIdDelete(id)



### Example

```ts
import {
  Configuration,
  PlannedExpensesApi,
} from '';
import type { ApiPlannedExpensesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlannedExpensesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiPlannedExpensesIdDeleteRequest;

  try {
    const data = await api.apiPlannedExpensesIdDelete(body);
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


## apiPlannedExpensesIdGet

> PlannedExpense apiPlannedExpensesIdGet(id)



### Example

```ts
import {
  Configuration,
  PlannedExpensesApi,
} from '';
import type { ApiPlannedExpensesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlannedExpensesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiPlannedExpensesIdGetRequest;

  try {
    const data = await api.apiPlannedExpensesIdGet(body);
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

[**PlannedExpense**](PlannedExpense.md)

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


## apiPlannedExpensesIdPut

> PlannedExpense apiPlannedExpensesIdPut(id, updatePlannedExpenseCommand)



### Example

```ts
import {
  Configuration,
  PlannedExpensesApi,
} from '';
import type { ApiPlannedExpensesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlannedExpensesApi(config);

  const body = {
    // string
    id: id_example,
    // UpdatePlannedExpenseCommand (optional)
    updatePlannedExpenseCommand: ...,
  } satisfies ApiPlannedExpensesIdPutRequest;

  try {
    const data = await api.apiPlannedExpensesIdPut(body);
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
| **updatePlannedExpenseCommand** | [UpdatePlannedExpenseCommand](UpdatePlannedExpenseCommand.md) |  | [Optional] |

### Return type

[**PlannedExpense**](PlannedExpense.md)

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


## apiPlannedExpensesPost

> PlannedExpense apiPlannedExpensesPost(createPlannedExpenseCommand)



### Example

```ts
import {
  Configuration,
  PlannedExpensesApi,
} from '';
import type { ApiPlannedExpensesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PlannedExpensesApi(config);

  const body = {
    // CreatePlannedExpenseCommand (optional)
    createPlannedExpenseCommand: ...,
  } satisfies ApiPlannedExpensesPostRequest;

  try {
    const data = await api.apiPlannedExpensesPost(body);
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
| **createPlannedExpenseCommand** | [CreatePlannedExpenseCommand](CreatePlannedExpenseCommand.md) |  | [Optional] |

### Return type

[**PlannedExpense**](PlannedExpense.md)

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

