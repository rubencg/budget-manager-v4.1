# AccountsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiAccountsIdDelete**](AccountsApi.md#apiaccountsiddelete) | **DELETE** /api/Accounts/{id} |  |
| [**apiAccountsIdGet**](AccountsApi.md#apiaccountsidget) | **GET** /api/Accounts/{id} |  |
| [**apiAccountsIdPut**](AccountsApi.md#apiaccountsidput) | **PUT** /api/Accounts/{id} |  |
| [**apiAccountsPost**](AccountsApi.md#apiaccountspost) | **POST** /api/Accounts |  |



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

