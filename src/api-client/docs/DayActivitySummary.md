
# DayActivitySummary


## Properties

Name | Type
------------ | -------------
`date` | Date
`hasExpenses` | boolean
`hasNotAppliedExpenses` | boolean
`hasIncome` | boolean
`hasNotAppliedIncome` | boolean
`hasTransfers` | boolean
`expenseCount` | number
`notAppliedExpenseCount` | number
`incomeCount` | number
`notAppliedIncomeCount` | number
`transferCount` | number

## Example

```typescript
import type { DayActivitySummary } from ''

// TODO: Update the object below with actual values
const example = {
  "date": null,
  "hasExpenses": null,
  "hasNotAppliedExpenses": null,
  "hasIncome": null,
  "hasNotAppliedIncome": null,
  "hasTransfers": null,
  "expenseCount": null,
  "notAppliedExpenseCount": null,
  "incomeCount": null,
  "notAppliedIncomeCount": null,
  "transferCount": null,
} satisfies DayActivitySummary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DayActivitySummary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


