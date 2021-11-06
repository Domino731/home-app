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




