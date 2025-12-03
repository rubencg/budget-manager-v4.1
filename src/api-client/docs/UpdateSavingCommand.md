
# UpdateSavingCommand


## Properties

Name | Type
------------ | -------------
`name` | string
`icon` | string
`color` | string
`goalAmount` | number
`savedAmount` | number
`amountPerMonth` | number
`savingId` | string

## Example

```typescript
import type { UpdateSavingCommand } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "icon": null,
  "color": null,
  "goalAmount": null,
  "savedAmount": null,
  "amountPerMonth": null,
  "savingId": null,
} satisfies UpdateSavingCommand

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateSavingCommand
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


