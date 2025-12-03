
# GetDashboardQueryResult


## Properties

Name | Type
------------ | -------------
`balance` | [DashboardBalance](DashboardBalance.md)
`recentTransactions` | [Array&lt;Transaction&gt;](Transaction.md)
`calendarView` | [CalendarView](CalendarView.md)

## Example

```typescript
import type { GetDashboardQueryResult } from ''

// TODO: Update the object below with actual values
const example = {
  "balance": null,
  "recentTransactions": null,
  "calendarView": null,
} satisfies GetDashboardQueryResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GetDashboardQueryResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


