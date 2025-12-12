
# TransactionPagedResult


## Properties

Name | Type
------------ | -------------
`pageNumber` | number
`pageSize` | number
`totalItems` | number
`totalPages` | number
`hasNextPage` | boolean
`hasPreviousPage` | boolean
`data` | [Array&lt;Transaction&gt;](Transaction.md)

## Example

```typescript
import type { TransactionPagedResult } from ''

// TODO: Update the object below with actual values
const example = {
  "pageNumber": null,
  "pageSize": null,
  "totalItems": null,
  "totalPages": null,
  "hasNextPage": null,
  "hasPreviousPage": null,
  "data": null,
} satisfies TransactionPagedResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransactionPagedResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


