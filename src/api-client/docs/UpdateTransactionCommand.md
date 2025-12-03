
# UpdateTransactionCommand


## Properties

Name | Type
------------ | -------------
`transactionType` | [TransactionType](TransactionType.md)
`amount` | number
`date` | Date
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
`metadata` | { [key: string]: any; }
`transactionId` | string

## Example

```typescript
import type { UpdateTransactionCommand } from ''

// TODO: Update the object below with actual values
const example = {
  "transactionType": null,
  "amount": null,
  "date": null,
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
  "metadata": null,
  "transactionId": null,
} satisfies UpdateTransactionCommand

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateTransactionCommand
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


