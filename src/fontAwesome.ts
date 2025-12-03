// src/fontAwesome.ts
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add the entire free solid icon pack to the library.
// This allows us to use any solid icon by its string name (e.g., 'shopping-cart')
// without importing them individually.
library.add(fas);
