
# Transaction


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`transactionType` | [TransactionType](TransactionType.md)
`amount` | number
`date` | Date
`createdAt` | Date
`updatedAt` | Date
`accountId` | string
`accountName` | string
`toAccountId` | string
`toAccountName` | string
`fromAccountId` | string
`fromAccountName` | string
`categoryId` | string
`categoryName` | string
`categoryImage` | string
`categoryColor` | string
`subcategory` | string
`notes` | string
`isApplied` | boolean
`appliedAmount` | number
`isMonthly` | boolean
`isRecurring` | boolean
`monthlyKey` | string
`recurringTimes` | number
`recurringType` | string
`savingKey` | string
`transferId` | string
`removeFromSpendingPlan` | boolean
`yearMonth` | string
`year` | number
`month` | number
`day` | number
`metadata` | { [key: string]: any; }
`type` | string

## Example

```typescript
import type { Transaction } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "transactionType": null,
  "amount": null,
  "date": null,
  "createdAt": null,
  "updatedAt": null,
  "accountId": null,
  "accountName": null,
  "toAccountId": null,
  "toAccountName": null,
  "fromAccountId": null,
  "fromAccountName": null,
  "categoryId": null,
  "categoryName": null,
  "categoryImage": null,
  "categoryColor": null,
  "subcategory": null,
  "notes": null,
  "isApplied": null,
  "appliedAmount": null,
  "isMonthly": null,
  "isRecurring": null,
  "monthlyKey": null,
  "recurringTimes": null,
  "recurringType": null,
  "savingKey": null,
  "transferId": null,
  "removeFromSpendingPlan": null,
  "yearMonth": null,
  "year": null,
  "month": null,
  "day": null,
  "metadata": null,
  "type": null,
} satisfies Transaction

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Transaction
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


