# What this application is

It is an app written in react in which you can store your recipes, home products and to-do tasks. I used firebase from
google for authentication and storing all user elements what this application is

## How to add a new category to  recipes or products

everything happens automatically, so all you have to do is add a new document to the appropriate rendering collection,
with the appropriate information How to add a new category to a recipe

### -> information about new product

1. title - add new title, which will be displayed
2. number - place a new category in a specific location in MyKitchen component
3. productType - this is very important, because every new added product will be sent to firestore with this type and
   then downloaded in MyKitchenCategory component
4. icon - add a class name for the icon from the font awasome page this is very important, because every new added
   product will be sent to firestore with this type and then downloaded in MyKitchenCategory component

### -> information about new recipe category

1. number - place a new category in a specific location in MyRecipes component
2. title - add new title, which will be displayed
3. path - this is very important because using this path, components will fetch recipes from a specific category(
   MyRecipesList component) or add a new recipe to a specific category (MyRecipesAddForm component)

## Important information

### - > How to add a new component

when you create a component, import it into the App component and then add it to thePrivateRoute path, it is a component
that checks if user is logged in or not

### -> How it created user database in firestore

when user registers he gives the username and when user presses the register button the function checks if the given
username already exists in the users collection in firestore and if it does not exist it creates a new user with its
database

### -> where user's stuff are stored

They are stored in the redux state and are then retrieved by the components

### -> How user's stuff is downloaded

If the user is logged in, the PrivateRoute component retrieves the data using the getDataFormFirestore function to which
it sends the username, and sends the retrieved data to the application state

### -> How to make a corners

use corners mixin sass, add shape, color, size, thickness, and optionally height which is equal to width

### -> How to add color for specific products

use colorForKitchenProducts mixin in _productsIndividualColors file, however, the colors are given 5 forward

## Components

### -> homePage

1.HomePage - application home page which contains a menu of section choices

### -> loading

1.Loading - a simple component that is displayed when downloading data from firestore

### -> privateRoute

1.PrivateRoute - the component that gets props is a single component that displays only when the user is logged in and
retrieves data from the firestore, if the user is not logged in it sends him back to the login

### -> userForm

1.UserForm - used to display a login or registration form

2.UserFormLogin - used to login

3.UserFormRegister - user to register and create user database in firestore

### -> myKitchen

1.MyKitchen - component that renders MyKitchenCategory components based on the "productsRendering" collection from
firestore

2.MyKitchenAddProductForm - a component which is used to add a product to a specific type of product

3.MyKitchenBar - a simple component containing a title bar

4.MyKitchenCategory - component for a single product type, it displays a MyKitchenAddProductForm component or renders
MyKitchenProduct components by map

5.MyKitchenProduct - Displays a single product, and a form to manage that product

### -> myRecipes

1.MyRecipes - component that renders categories (by MyRecipeRedirect component) of recipes from firestore(collection
recipesRendering)

2.MyRecipeRedirect - component which, when pressed, redirects to recipes with a specific category(MyRecipesList
component)

3.MyRecipesList - component which retrieves a product category from the page address and retrieves the state of the
application with this type, when clicked on, it redirects to the specific recipe

4.MyRecipeSingleRecipe - component that retrieves the recipe id from the address and then retrieves that particular
recipe from the application state, and displays it

4.1 RecipeIngredients - displays a single ingredient 4.2 RecipeInstruction - displays a single instruction

5.MyRecipeAddForm - displays a form where you can add a recipe to a specific category (the category name is taken from
the address)

5.1 addFormIngredients - displays a single ingredient

5.2 addFormInstruction - displays a single instruction, which you can edit

6.MyRecipeEditForm - displays the form for editing a recipe, it is the same as the form for a new recipe only it sends
the edited recipe 

7.MyRecipesBar - a simple component containing a title bar

### -> toDo

1.ToDo - component which displays a form for adding a new task (NewTaskForm component) or a list with tasks

2.NewTaskForm - is used to add new tasks

3.SingleTask - a single task with operations

4.TasksList - component that retrieves all user tasks and displays them using the SingleTask component

5.ToDoBar - a simple component containing a title bar