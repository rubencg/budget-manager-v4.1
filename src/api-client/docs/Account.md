
# Account


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`name` | string
`currentBalance` | number
`accountType` | [AccountType](AccountType.md)
`isArchived` | boolean
`color` | string
`image` | string
`createdAt` | Date
`updatedAt` | Date
`metadata` | { [key: string]: any; }
`type` | string
`sumsToMonthlyBudget` | boolean

## Example

```typescript
import type { Account } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "name": null,
  "currentBalance": null,
  "accountType": null,
  "isArchived": null,
  "color": null,
  "image": null,
  "createdAt": null,
  "updatedAt": null,
  "metadata": null,
  "type": null,
  "sumsToMonthlyBudget": null,
} satisfies Account

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Account
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


