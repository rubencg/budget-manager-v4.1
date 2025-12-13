
# MonthlyTransaction


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`amount` | number
`monthlyTransactionType` | [MonthlyTransactionType](MonthlyTransactionType.md)
`notes` | string
`dayOfMonth` | number
`accountId` | string
`accountName` | string
`categoryId` | string
`categoryName` | string
`subcategory` | string
`createdAt` | Date
`updatedAt` | Date
`type` | string

## Example

```typescript
import type { MonthlyTransaction } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "amount": null,
  "monthlyTransactionType": null,
  "notes": null,
  "dayOfMonth": null,
  "accountId": null,
  "accountName": null,
  "categoryId": null,
  "categoryName": null,
  "subcategory": null,
  "createdAt": null,
  "updatedAt": null,
  "type": null,
} satisfies MonthlyTransaction

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MonthlyTransaction
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


