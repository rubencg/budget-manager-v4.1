
# PlannedExpense


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`itemType` | string
`name` | string
`date` | Date
`isRecurring` | boolean
`totalAmount` | number
`categoryId` | string
`categoryName` | string
`categoryImage` | string
`categoryColor` | string
`subCategory` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { PlannedExpense } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "itemType": null,
  "name": null,
  "date": null,
  "isRecurring": null,
  "totalAmount": null,
  "categoryId": null,
  "categoryName": null,
  "categoryImage": null,
  "categoryColor": null,
  "subCategory": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies PlannedExpense

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PlannedExpense
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


