
# Saving


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`itemType` | string
`name` | string
`icon` | string
`color` | string
`goalAmount` | number
`savedAmount` | number
`amountPerMonth` | number
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Saving } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "itemType": null,
  "name": null,
  "icon": null,
  "color": null,
  "goalAmount": null,
  "savedAmount": null,
  "amountPerMonth": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Saving

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Saving
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


