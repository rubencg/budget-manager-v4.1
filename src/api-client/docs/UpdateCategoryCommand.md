
# UpdateCategoryCommand


## Properties

Name | Type
------------ | -------------
`name` | string
`image` | string
`color` | string
`categoryType` | [CategoryType](CategoryType.md)
`subcategories` | Array&lt;string&gt;
`categoryId` | string

## Example

```typescript
import type { UpdateCategoryCommand } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "image": null,
  "color": null,
  "categoryType": null,
  "subcategories": null,
  "categoryId": null,
} satisfies UpdateCategoryCommand

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateCategoryCommand
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


