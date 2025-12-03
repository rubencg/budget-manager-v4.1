
# UpdateAccountCommand


## Properties

Name | Type
------------ | -------------
`name` | string
`currentBalance` | number
`accountType` | [AccountType](AccountType.md)
`color` | string
`image` | string
`isArchived` | boolean
`accountId` | string

## Example

```typescript
import type { UpdateAccountCommand } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "currentBalance": null,
  "accountType": null,
  "color": null,
  "image": null,
  "isArchived": null,
  "accountId": null,
} satisfies UpdateAccountCommand

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateAccountCommand
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


