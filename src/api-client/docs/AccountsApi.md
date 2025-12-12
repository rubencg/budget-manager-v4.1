# AccountsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAccountsArchivedGet**](AccountsApi.md#apiaccountsarchivedget) | **GET** /api/Accounts/archived |  |
| [**apiAccountsDashboardGet**](AccountsApi.md#apiaccountsdashboardget) | **GET** /api/Accounts/dashboard |  |
| [**apiAccountsIdDelete**](AccountsApi.md#apiaccountsiddelete) | **DELETE** /api/Accounts/{id} |  |
| [**apiAccountsIdGet**](AccountsApi.md#apiaccountsidget) | **GET** /api/Accounts/{id} |  |
| [**apiAccountsIdPut**](AccountsApi.md#apiaccountsidput) | **PUT** /api/Accounts/{id} |  |
| [**apiAccountsPost**](AccountsApi.md#apiaccountspost) | **POST** /api/Accounts |  |



## apiAccountsArchivedGet

> AccountPagedResult apiAccountsArchivedGet(pageNumber, pageSize, sortBy, sortDirection)



### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ApiAccountsArchivedGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AccountsApi(config);

  const body = {
    // number (optional)
    pageNumber: 56,
    // number (optional)
    pageSize: 56,
    // string (optional)
    sortBy: sortBy_example,
    // string (optional)
    sortDirection: sortDirection_example,
  } satisfies ApiAccountsArchivedGetRequest;

  try {
    const data = await api.apiAccountsArchivedGet(body);
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
| **pageNumber** | `number` |  | [Optional] [Defaults to `1`] |
| **pageSize** | `number` |  | [Optional] [Defaults to `10`] |
| **sortBy** | `string` |  | [Optional] [Defaults to `&#39;updatedAt&#39;`] |
| **sortDirection** | `string` |  | [Optional] [Defaults to `&#39;desc&#39;`] |

### Return type

[**AccountPagedResult**](AccountPagedResult.md)

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


## apiAccountsDashboardGet

> Array&lt;AccountDashboardGroupDto&gt; apiAccountsDashboardGet()



### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ApiAccountsDashboardGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AccountsApi(config);

  try {
    const data = await api.apiAccountsDashboardGet();
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

[**Array&lt;AccountDashboardGroupDto&gt;**](AccountDashboardGroupDto.md)

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


## apiAccountsIdDelete

> apiAccountsIdDelete(id)



### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ApiAccountsIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AccountsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiAccountsIdDeleteRequest;

  try {
    const data = await api.apiAccountsIdDelete(body);
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


## apiAccountsIdGet

> Account apiAccountsIdGet(id)



### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ApiAccountsIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AccountsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies ApiAccountsIdGetRequest;

  try {
    const data = await api.apiAccountsIdGet(body);
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

[**Account**](Account.md)

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


## apiAccountsIdPut

> Account apiAccountsIdPut(id, updateAccountCommand)



### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ApiAccountsIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AccountsApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateAccountCommand (optional)
    updateAccountCommand: ...,
  } satisfies ApiAccountsIdPutRequest;

  try {
    const data = await api.apiAccountsIdPut(body);
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
| **updateAccountCommand** | [UpdateAccountCommand](UpdateAccountCommand.md) |  | [Optional] |

### Return type

[**Account**](Account.md)

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


## apiAccountsPost

> Account apiAccountsPost(createAccountCommand)



### Example

```ts
import {
  Configuration,
  AccountsApi,
} from '';
import type { ApiAccountsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AccountsApi(config);

  const body = {
    // CreateAccountCommand (optional)
    createAccountCommand: ...,
  } satisfies ApiAccountsPostRequest;

  try {
    const data = await api.apiAccountsPost(body);
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
| **createAccountCommand** | [CreateAccountCommand](CreateAccountCommand.md) |  | [Optional] |

### Return type

[**Account**](Account.md)

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

