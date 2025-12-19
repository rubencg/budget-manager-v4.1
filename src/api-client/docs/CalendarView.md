
# CalendarView


## Properties

Name | Type
------------ | -------------
`yearMonth` | string
`days` | [Array&lt;DayActivitySummary&gt;](DayActivitySummary.md)
`transfersCount` | number
`expensesCount` | number
`incomesCount` | number

## Example

```typescript
import type { CalendarView } from ''

// TODO: Update the object below with actual values
const example = {
  "yearMonth": null,
  "days": null,
  "transfersCount": null,
  "expensesCount": null,
  "incomesCount": null,
} satisfies CalendarView

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CalendarView
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


