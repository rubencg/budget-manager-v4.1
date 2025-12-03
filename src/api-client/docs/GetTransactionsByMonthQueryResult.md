
# GetTransactionsByMonthQueryResult


## Properties

Name | Type
------------ | -------------
`yearMonth` | string
`totalCount` | number
`totalExpenses` | number
`totalIncome` | number
`transactions` | [Array&lt;Transaction&gt;](Transaction.md)

## Example

```typescript
import type { GetTransactionsByMonthQueryResult } from ''

// TODO: Update the object below with actual values
const example = {
  "yearMonth": null,
  "totalCount": null,
  "totalExpenses": null,
  "totalIncome": null,
  "transactions": null,
} satisfies GetTransactionsByMonthQueryResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetTransactionsByMonthQueryResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


