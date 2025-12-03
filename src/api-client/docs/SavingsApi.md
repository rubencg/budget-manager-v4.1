# SavingsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiSavingsIdDelete**](SavingsApi.md#apisavingsiddelete) | **DELETE** /api/Savings/{id} |  |
| [**apiSavingsIdGet**](SavingsApi.md#apisavingsidget) | **GET** /api/Savings/{id} |  |
| [**apiSavingsIdPut**](SavingsApi.md#apisavingsidput) | **PUT** /api/Savings/{id} |  |
| [**apiSavingsPost**](SavingsApi.md#apisavingspost) | **POST** /api/Savings |  |



## apiSavingsIdDelete

> apiSavingsIdDelete(id)



### Example

```ts
import {
  Configuration,
  SavingsApi,
} from '';
import type { ApiSavingsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SavingsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiSavingsIdDeleteRequest;

  try {
    const data = await api.apiSavingsIdDelete(body);
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


## apiSavingsIdGet

> Saving apiSavingsIdGet(id)



### Example

```ts
import {
  Configuration,
  SavingsApi,
} from '';
import type { ApiSavingsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SavingsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiSavingsIdGetRequest;

  try {
    const data = await api.apiSavingsIdGet(body);
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

[**Saving**](Saving.md)

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


## apiSavingsIdPut

> Saving apiSavingsIdPut(id, updateSavingCommand)



### Example

```ts
import {
  Configuration,
  SavingsApi,
} from '';
import type { ApiSavingsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SavingsApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateSavingCommand (optional)
    updateSavingCommand: ...,
  } satisfies ApiSavingsIdPutRequest;

  try {
    const data = await api.apiSavingsIdPut(body);
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
| **updateSavingCommand** | [UpdateSavingCommand](UpdateSavingCommand.md) |  | [Optional] |

### Return type

[**Saving**](Saving.md)

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


## apiSavingsPost

> Saving apiSavingsPost(createSavingCommand)



### Example

```ts
import {
  Configuration,
  SavingsApi,
} from '';
import type { ApiSavingsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SavingsApi(config);

  const body = {
    // CreateSavingCommand (optional)
    createSavingCommand: ...,
  } satisfies ApiSavingsPostRequest;

  try {
    const data = await api.apiSavingsPost(body);
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
| **createSavingCommand** | [CreateSavingCommand](CreateSavingCommand.md) |  | [Optional] |

### Return type

[**Saving**](Saving.md)

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

