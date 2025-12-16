
# BudgetSectionItemDto


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`amount` | number
`isApplied` | boolean
`notes` | string
`dayOfMonth` | number
`icon` | string
`color` | string
`name` | string
`monthlyTransactionType` | [MonthlyTransactionType](MonthlyTransactionType.md)
`accountId` | string
`accountName` | string
`categoryId` | string
`categoryName` | string
`subcategory` | string
`goalAmount` | number
`savedAmount` | number
`amountPerMonth` | number
`createdAt` | Date
`updatedAt` | Date
`type` | string

## Example

```typescript
import type { BudgetSectionItemDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "amount": null,
  "isApplied": null,
  "notes": null,
  "dayOfMonth": null,
  "icon": null,
  "color": null,
  "name": null,
  "monthlyTransactionType": null,
  "accountId": null,
  "accountName": null,
  "categoryId": null,
  "categoryName": null,
  "subcategory": null,
  "goalAmount": null,
  "savedAmount": null,
  "amountPerMonth": null,
  "createdAt": null,
  "updatedAt": null,
  "type": null,
} satisfies BudgetSectionItemDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BudgetSectionItemDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


