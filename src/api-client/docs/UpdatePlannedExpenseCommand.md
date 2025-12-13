
# UpdatePlannedExpenseCommand


## Properties

Name | Type
------------ | -------------
`name` | string
`date` | Date
`dayOfMonth` | number
`isRecurring` | boolean
`totalAmount` | number
`categoryId` | string
`categoryName` | string
`categoryImage` | string
`categoryColor` | string
`subCategory` | string
`plannedExpenseId` | string

## Example

```typescript
import type { UpdatePlannedExpenseCommand } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "date": null,
  "dayOfMonth": null,
  "isRecurring": null,
  "totalAmount": null,
  "categoryId": null,
  "categoryName": null,
  "categoryImage": null,
  "categoryColor": null,
  "subCategory": null,
  "plannedExpenseId": null,
} satisfies UpdatePlannedExpenseCommand

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdatePlannedExpenseCommand
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


