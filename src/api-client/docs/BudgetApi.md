# BudgetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiBudgetIncomeAfterFixedExpensesYearMonthGet**](BudgetApi.md#apibudgetincomeafterfixedexpensesyearmonthget) | **GET** /api/budget/incomeAfterFixedExpenses/{year}/{month} |  |



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

