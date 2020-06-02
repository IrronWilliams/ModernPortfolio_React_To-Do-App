/*
# Image attributions:
https://picsum.photos/

https://unsplash.com/

# GitHub repo of images and JSON file
https://github.com/bobziroll/scrimba-react-bootcamp-images

# Icon library
https://remixicon.com/

# Libraries
* React Router - https://reacttraining.com/react-router/web/guides/quick-start
* PropTypes - https://reactjs.org/docs/typechecking-with-proptypes.html

_____________________________________________________________________________________________________________________________________
1. REACT ROUTER SETUP

The mapping of the files are:

index.js is rendering an App component
App.js is rendering a Head component and an h1 that say Home Page
Header component is rendering an h2 that says Pic Some and an icon of a shopping cart from remixicon. This is in a folder called Component. 
Pages is another folder. Pages are teh components that will render when React Router is rendering a certain route. 
    Photos is the homepage and will render on the / route. 
    Cart is the cart page and will render on the /cart. route. 

index.html includes a couple of cdn links.
    Google fonts API that allows me to use the Oswald font
    Remixicon css sheet. 


# Objective

1. Set up React Router for app. 

2. Click on the words "Pic Some" in the header to go to the "/" route, which should display the Photos component 
(found in the pages folder)

3. Click on the shopping cart icon in the header to go to the "/cart" route, which should display the Cart component 
(found in the pages folder)
_____________________________________________________________________________________________________________________________________
2. CONTEXT SETUP

Set up the Context for our app.

1. In a new file, create a new context with React
2. In that same file, create a custom component that renders the Provider of the context you created
3. For now, just pass in an empty string "" as the context provider's value prop
4. Export the custom Provider component and the full context object (so we can pass it to the useContext hook eventually)
5. Set up your index.js to use the custom context Provider you created. (You can wrap it as a parent of the Router component)

_____________________________________________________________________________________________________________________________________
3. CONTEXT STATE

Add state to our context and pass it through the Provider

1. Add state to hold the array of all photos our app gets from the API
2. Pass the array of all photos through the value of the provider so it's available anywhere the app accesses the context

_____________________________________________________________________________________________________________________________________
4. FETCH PHOTOS

Get the JSON data with the photos information from the API and save it to context state

1. As soon as the ContextProvider component renders, get the JSON data from this url: 
https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json

5. Save the array of data that comes back to state.



*/