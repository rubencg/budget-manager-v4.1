# CategoriesApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiCategoriesIdDelete**](CategoriesApi.md#apicategoriesiddelete) | **DELETE** /api/Categories/{id} |  |
| [**apiCategoriesIdGet**](CategoriesApi.md#apicategoriesidget) | **GET** /api/Categories/{id} |  |
| [**apiCategoriesIdPut**](CategoriesApi.md#apicategoriesidput) | **PUT** /api/Categories/{id} |  |
| [**apiCategoriesPost**](CategoriesApi.md#apicategoriespost) | **POST** /api/Categories |  |



## apiCategoriesIdDelete

> apiCategoriesIdDelete(id)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CategoriesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiCategoriesIdDeleteRequest;

  try {
    const data = await api.apiCategoriesIdDelete(body);
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


## apiCategoriesIdGet

> Category apiCategoriesIdGet(id)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CategoriesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiCategoriesIdGetRequest;

  try {
    const data = await api.apiCategoriesIdGet(body);
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

[**Category**](Category.md)

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


## apiCategoriesIdPut

> Category apiCategoriesIdPut(id, updateCategoryCommand)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CategoriesApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateCategoryCommand (optional)
    updateCategoryCommand: ...,
  } satisfies ApiCategoriesIdPutRequest;

  try {
    const data = await api.apiCategoriesIdPut(body);
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
| **updateCategoryCommand** | [UpdateCategoryCommand](UpdateCategoryCommand.md) |  | [Optional] |

### Return type

[**Category**](Category.md)

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


## apiCategoriesPost

> Category apiCategoriesPost(createCategoryCommand)



### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { ApiCategoriesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CategoriesApi(config);

  const body = {
    // CreateCategoryCommand (optional)
    createCategoryCommand: ...,
  } satisfies ApiCategoriesPostRequest;

  try {
    const data = await api.apiCategoriesPost(body);
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
| **createCategoryCommand** | [CreateCategoryCommand](CreateCategoryCommand.md) |  | [Optional] |

### Return type

[**Category**](Category.md)

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

