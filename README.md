# DOMIX App
It's an app created by react. In this app I have nested 3 diffrent sections which are to make your house management easier.
*  Recipes section - place where you can storage all of your recipes. There are 7 diffrent types of recipes, they are there to make it easier to navigate in this section. This types are from firestore database (`recipesRendering` collection) . If you want to add a new type for a recipe, everything is described below.
* Tasks section - place where user can add his tasks for a day. 
* Kitchen section - user can there add his products. There are also diffrent types of products. These types are from firestore database - `productsRendering` collection, and based on this data the relevant product subsections will be rendered. If you want to add new type of product look below.


 Back-end for this project was realized by using Google Firebase service. Data structure is described below. Everything is created in order to make this project easy to develop without making any changings in code :)

 ## Technology
 * Create React App - https://github.com/facebook/create-react-app
 * React (function components)
 * React Router
 * React Redux
 * Sass
 * Google Firebase
 
 ## React Router
 ### Custom routes components
 * `<PrivateRoute>` - Route for component which is only available for only logged user. 
 * `<AuthRoute>` - Route for component for user which is not logged in.
 ### Available routes
 **path - Type of route - component - description**
 *  `/` - Private - `<HomePage>` - Page with navigation 
 * `/mykitchen` - Private - `<MyKitchen>` - section with user's products
 * `/myRecipes` - Private - `<MyRecipes>` - list with all recipes types
 * `/myRecipes/:type` - Private - `<MyRecipesList>` - List with all user's recipes of particular type (`type` param)
 * `/myRecipes/:type/add` - Private - `<MyRecipesAddForm>` - Page where user can add new recipe for a specific type of recipes (`type` param)
 * `/myRecipe/:id` - Private - `<MyRecipeSingleRecipe>` - Page with content for particular recipes (`id` param)
 * `/myRecipe/edit/:id` - Private - `<MyRecipeEdit>` - Page where user can edit his recipes (`id` param)
 * `/tasks` - Private - `<ToDo>` - List with all user's tasks
 * `/register` - Auth - `<Register>` - form to register a user and create his account in Firestore database
 * `/login` - Auth - `<Login>` - form responsible for user login 
 * `/password-recovery` - Auth - `<PasswordRecovery>` - form responsible for password recovery

 ## Google Firebase
 Based on this service I was created back-end for this project - storage for user data and user authentication.
### Authentication
All components responsible for user authentication are placed in `<PrivateRoute>`. 
* `/login` - form for loggin user
* `/password-recovery` - recovering user's password
* `/register` - creating user profile in firestore - `users` collection, with 3 nested subcollections - `products, recipes, ToDo` in order. So that the user can store and modify their data in diffrent sections in this project.

### Firestore
 **`productsRendering`** - data about available types for products. Data structure:

| key | value type | description |
| ---- | ---- | ---- |
|icon | string | class name which is representing icon for a product, (class name must be from fontawesome.com). For example - `fas fa-apple-alt` |
| number | number | a number that determines the priority of the product and its position in the list in `<Mykitchen>` component|
| productType | string | type of product. This name is needed to filter products by type in `<MyKitchenCategory>` component. This product type name is also used in `<MyKitchenAddProductForm>` where user is adding new product with this type |
| title | string | Name of product type which will displayed in `<MyKitchenCategory>` component |

**`recipesRendering`** - data about available recipes types. Data structure:

| key | value type | description |
| ---- | ---- | ---- |
| colorPrimary | string | primary color for recipe, used in `<MyRecipeSingleRecipe>` subcomponents - background color, font color |
| colorSecondary | string | secondary color for recipe, used in `<MyRecipeSingleRecipe>` subcomponents - background color, font color |
|icon| string| svg tag used to display icon of recipe type in `<SingleRecipeHeader>` component|
 | number | number | a number that determines the priority of the product and its position in the list in `<MyRecipes>` component. Special type must be always at the end of the list |
|path| string| recipe type, needed to fetch all recipes with this type in `<MyRecipesList>` component. And this value is also used in `<MyRecipesAddForm>` component where newly created recipes will be with this path name (`type` key)|
|title| string | title for recipes with the same type, used in `<MyRecipesList>` component and in `<MyRecipes>` | 

**`users`** - data with all users and their subcolletions - `products, recipes, Todo`.

**`users/{docId}/products`** - data including user's products. Data structure:

| key | value type | description |
| ---- | ---- | ---- |
| amount | string | amount of product |
| name | string | product name |
| type | string | type of product |
| unit | string | product weight unit |

**`users/{docId}/recipes`** - data including user's recipes. Data structure:

| key | value type | description |
| ---- | ---- | ---- |
| title | string | recipe title|
| ingredients| array with objects | data about ngredients, each element containing amount, name and weight unit|
|instructions| array with strings | instructions for recipe |
|type | string | type of recipe - cake, dinner, special... (types from `recipesRendering` collection )|
|description (optional) | string | recipe description |    
|kcal (optional) | string | calories for one serving |
|notes (optional)| string| recipes notes |
|prepareTime| string |  time in minutes needed to prepare a dish |
|servingWeigth (optional)| string | weigth per one serving |

### Firestore functions 
* `addNewElement()` -  add new element to specific subcollection 
* `createUserDatabase()` - create initial user data in firestore database in `users` collection
* `deleteDataFirestore()` - delete specific document from firestore database (from specific nested collection in `user` collection)
* `getDataFromFirestore()` -  fetch data from specific subcollection in user's account 
* `getRecipeData()` -  fetch data about specific recipe 
* `getRecipesOfParticularType()` - fetch all recipes of specific type
* `getRecipeStyles()` - fetch data about specific recipe styles (svg icon and color) from firestore database - collection `recipes rendering`
* `getTasksDataFromFirestore()` - fetch tasks data from firestore (`ToDo` subcollection)
* `renderByFirebase()` - fetch data with informations about available content for a specific section 
* `updateDataFirestore()` - update document in specific subcollection in firestore (`users` collection)

## Components
### Home page

* `<HomePage>` - home page component where user can select specific section

### Loading
* `<Loading>` - component responsible for loading screen

### Kitchen products
* `<MyKitchen>` - component with the whole content for kitchen products
* `<MyKitchenBar>` - subcomponent for `<MyKitchen>`  with header for kitchen section 
* `<MyKitchenCategory>` - subcomponent for `<MyKitchen>` which is displaying all user products of a particular type.
* `<MyKitchenAddProductForm>` - subcomponent for `<MyKitchenCategory>`, by which user can add new product 
* `<MyKitchenProduct>`   - subcomponent for `<MyKitchenCategory>` which is rendering single product container with ability to display form by which user can edit this product 
### Tasks
* `<ToDo>` - Main component for tasks section, responsbile for fetching data about tasks and saving
* `<ToDoHeader>` - subcomponent for `<ToDo>`, with header for task component
* `<SingleTask>` - subcomponent for `<ToDo>`, with content about single task
* `<NewTaskForm>` -  subcomponent for `<ToDo>`, with form by which user can add new task into his account in firestore. 
### Recipes
* `<MyRecipes>` - with recipes types list
* `<MyRecipesHeader>` - header for `<MyRecipes>`
* `<MyRecipesList>` - Component with all recipes about particular type
* `<MyRecipeBox>` -  subcomponent for  `<MyRecipesList>`, with link to specific recipe
* `<MyRecipeEdit>` - form where your can edit his recipe
* `<MyRecipesAddForm>` - Form for new recipe.
* `<MyRecipeSingleRecipe>` - Component with content for single recipe
* `<SingleRecipeConfirmDelte>` - subcomponent  `<MyRecipeSingleRecipe>`, for with box to confirm deleting recipe
*  `SingleRecipeHeader` - subcomponent for `<MyRecipeSingleRecipe>`, with header for single recipe component
* `SingleRecipeOverview` - subcomponent for  `<MyRecipeSingleRecipe>`, including overview for recipe -> title, description, kcal, serving weight... 
* `<SingeRecipeContent>` - subcomponent for `<MyRecipeSingleRecipe>` -> instructions, ingredients, notes, options
* `<SingleRecipeIngredients>` - subcomponent for `<SingeRecipeContent>`, with list of recipe ingredients
* `<SingleRecipeInstructions>` - subcomponent for `<SingeRecipeContent>`, with list of recipe instructions
* `<SingleRecipeNots>` - subcomponent for `<SingeRecipeContent>`, with notes for recipe
* `<SingleRecipeOptions>` - subcomponent for `<SingeRecipeContent>`, with options for recipe - edit or delete recipe
### Authorization
* `<Login>` - component by which user can log into app
* `<PasswordRecovery>` - component with form by which user can reset his password
* `<Register>` - component by which user can create his account in firebase service (data structure is described in docs) 

## REDUX structure
### State
* `currentUser` - data about current logged user
* `products` - data about user's products
* `recipes` - data about user's recipes
* `toDo` - data about user's tasks
* `recipeData` - data about single recipe
* `recipeStyles` - data about styles for single recipe
* `deleteRecipeFlag` - flag which is using to toggle content in `<SingleRecipe>` component
### Actions
* `changeUser` - change `currentUser` state
* `changeDeleteRecipeFlagRDX` - change `deleteRecipeFlag` state
* `setProducts` - change `products` state
* `setToDos` - change `ToDo` state
* `setRecipes` - change `recipes` state
* `changeRecipeDataRDX` - change `recipeData` state
* `changeRecipeStylesRDX` - change `recipeState` state

## Available functions
* `formatDate()` - that function is formatting passed date
* `dayName()` - return day name (in Polish)
* `greeting()` - return greeting text (in Polish)


## Other
### **How to add new recipe type?**
In firestore, in 'recipesRendering' add new document with following data:
| key | value type | description |
| ---- | ---- | ---- |
| colorPrimary | string | primary color for recipe, used in `<MyRecipeSingleRecipe>` subcomponents - background color, font color |
| colorSecondary | string | secondary color for recipe, used in `<MyRecipeSingleRecipe>` subcomponents - background color, font color |
|icon| string| svg tag used to display icon of recipe type in `<SingleRecipeHeader>` component|
 | number | number | a number that determines the priority of the product and its position in the list in `<MyRecipes>` component. Special type must be always at the end of the list |
|path| string| recipe type, needed to fetch all recipes with this type in `<MyRecipesList>` component. And this value is also used in `<MyRecipesAddForm>` component where newly created recipes will be with this path name (`type` key)|
|title| string | title for recipes with the same type, used in `<MyRecipesList>` component and in `<MyRecipes>` | 

### **How to add new product type?** 
In firestore, in 'productsRendering' add new document with following data:
| key | value type | description |
| ---- | ---- | ---- |
|icon | string | class name which is representing icon for a product, (class name must be from fontawesome.com). For example - `fas fa-apple-alt` |
| number | number | a number that determines the priority of the product and its position in the list in `<Mykitchen>` component|
| productType | string | type of product. This name is needed to filter products by type in `<MyKitchenCategory>` component. This product type name is also used in `<MyKitchenAddProductForm>` where user is adding new product with this type |
| title | string | Name of product type which will displayed in `<MyKitchenCategory>` component |































