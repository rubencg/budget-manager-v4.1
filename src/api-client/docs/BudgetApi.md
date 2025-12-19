# BudgetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiBudgetIncomeAfterFixedExpensesYearMonthGet**](BudgetApi.md#apibudgetincomeafterfixedexpensesyearmonthget) | **GET** /api/budget/incomeAfterFixedExpenses/{year}/{month} |  |
| [**apiBudgetOtherExpensesYearMonthGet**](BudgetApi.md#apibudgetotherexpensesyearmonthget) | **GET** /api/budget/otherExpenses/{year}/{month} |  |
| [**apiBudgetPlannedExpensesYearMonthGet**](BudgetApi.md#apibudgetplannedexpensesyearmonthget) | **GET** /api/budget/plannedExpenses/{year}/{month} |  |



## apiBudgetIncomeAfterFixedExpensesYearMonthGet

> IncomeAfterFixedExpensesDto apiBudgetIncomeAfterFixedExpensesYearMonthGet(year, month)



### Example

```ts
import {
  Configuration,
  BudgetApi,
} from '';
import type { ApiBudgetIncomeAfterFixedExpensesYearMonthGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BudgetApi(config);

  const body = {
    // number
    year: 56,
    // number
    month: 56,
  } satisfies ApiBudgetIncomeAfterFixedExpensesYearMonthGetRequest;

  try {
    const data = await api.apiBudgetIncomeAfterFixedExpensesYearMonthGet(body);
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

### Return type

[**IncomeAfterFixedExpensesDto**](IncomeAfterFixedExpensesDto.md)

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


## apiBudgetOtherExpensesYearMonthGet

> OtherExpensesResponseDto apiBudgetOtherExpensesYearMonthGet(year, month)



### Example

```ts
import {
  Configuration,
  BudgetApi,
} from '';
import type { ApiBudgetOtherExpensesYearMonthGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BudgetApi(config);

  const body = {
    // number
    year: 56,
    // number
    month: 56,
  } satisfies ApiBudgetOtherExpensesYearMonthGetRequest;

  try {
    const data = await api.apiBudgetOtherExpensesYearMonthGet(body);
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

### Return type

[**OtherExpensesResponseDto**](OtherExpensesResponseDto.md)

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


## apiBudgetPlannedExpensesYearMonthGet

> PlannedExpensesResponseDto apiBudgetPlannedExpensesYearMonthGet(year, month, plannedExpenseId)



### Example

```ts
import {
  Configuration,
  BudgetApi,
} from '';
import type { ApiBudgetPlannedExpensesYearMonthGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: Bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BudgetApi(config);

  const body = {
    // number
    year: 56,
    // number
    month: 56,
    // string (optional)
    plannedExpenseId: plannedExpenseId_example,
  } satisfies ApiBudgetPlannedExpensesYearMonthGetRequest;

  try {
    const data = await api.apiBudgetPlannedExpensesYearMonthGet(body);
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
| **plannedExpenseId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**PlannedExpensesResponseDto**](PlannedExpensesResponseDto.md)

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

