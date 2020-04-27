/*
1. ReactDOM & JSX

ReactDOM.render() accepts 2 parameters:
     ReactDOM.render(WHAT DO I WANT TO RENDER, WHERE DO I WANT TO RENDER IT)

The second parameter is easy because everything will have to tie back to an html page of some sort. The Javascript that I will write
will be compiled down to or turned into elements on a page. Can think of the 2nd parameter as being inserted into an html page. 

On index.html, there is a div with an id=root. Can think of the root as the container for the entire application. React will place 
everything that I create between the opening and closing div tags.  
    <div id="root">REACT WILL PLACE ALL CREATED THINGS HERE</div>

Back to index.js, the 2nd parameter in ReactDOM.render() will need to point to the div with id=root. Can use document.getElementById("root").
React will look at the 1st parameter and stick it inside the div with id=root. JSX is a pseudo-language and is like a Javascript rendition or 
version of html. Most of JSX is almost identical to html, with a few slight differences. There is a lot happening under the hood with React
where everything is getting compiled down to a plain Javascript version of itself. The React library will enable/interpret JSX, which is why
importing React is necessary. JSX is why the 1st parameter works and recognizes <h1> as a header code and not a less than sign followed an h. 
    ReactDOM.render(<h1>Hello world!</h1>, document.getElementById("root"))

Important to note that cannot render 2 JSX elements next to each other. For example, cannot have an h1 and a paragraph next to each other:
    ReactDOM.render(<h1>Hello world!</h1><p>This is a paragraph</p>, document.getElementById("root"))
    
But they can be wrapped in something so that it counts as just 1 element with 2 elements inside. This can be wrapped in a div. 
    ReactDOM.render(<div><h1>Hello world!</h1><p>This is a paragraph</p></div>, document.getElementById("root"))

Using JSX will take sometime getting used to but is much better than doing it the old way where I would have to say things like:
    var myNewP = document.createElement("p")
    myNewP.innerHTML = "This is a paragraph."  -> then take this paragraph and append it to a parent. 
    
This was an imperative programming style. React takes a declarative approach. 
_________________________________________________________________________________________________________________    
2. REACT FUNCTIONAL COMPONENTS

One of the reasons why React is so popular is because of its reusable web components. To create a functional component, begin by writing
a function. Use the constructor convention of capital camel case for the component name. Should adhere to this convention. 1st letter 
should be capital followed by camel case: 
    function MyApp() {}

The simple thing about functional components is that I just need to return the JSX that I want the component to represent. To rewrite 
the unordered list, I can return the unordered list from the functional component. Its always a good idea to wrap what I am returning 
in () and put everything on its own line. This approach makes code more readable. How unordered list 1st written:
    ReactDOM.render(<ul><li>Run</li><li>Swim</li><li>Walk</li></ul>, document.getElementById('root'))

The same rules apply to the functional component as they did with ReactDOM.render(), meaning cannot have cannot return 2 different elements
next to each other. Like having an ordered list next to the un-ordered list. This will not work because the component needs to return just 
a single JSX element. Can usually get around this by wrapping everything in a div or other element I choose to wrap with. 

    function MyApp() {
      return (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  )
}

Within ReactDom.render(), can create an instance of the functional component by placing the name of the component wrapping it in 
ASX tags. This is a self composing tag/component. There are some instances where I would like to make components that accept children
elements. But will more-likely use self composing components. 
     <MyApp />

The power with working with components is that I can create my own components which contain pieces of JSX which represent html in the final
product. And I can start composing them together. In this example, I have created the component MyApp which renders React elements/
JSX elements/html elements. With more complex applications, there will be components that render other components. Eventually it needs to 
boil down to regular html which may happen over the course of dozen React components that I created. 
______________________________________________________________________________________________________________________________
3. MOVE COMPONENTS INTO SEPARATE FILES 

Currently have component MyInfo inside index.js. As app become more complex, will not be able to put all components within the file. Need 
to move the component and put it in its own file. Its good convention to have each file contain 1 React component. Create a new file with 
the same name as component (MyInfo.js). Remove MyInfo component from index.js and paste into new file MyInfo.js.  Import React into 
MyInfo.js so that JSX can compile the html. export default MyInfo function to make it available to other places within the application.

The component is now exposed thru export default. Go to index.js and import MyInfo so that ReactDOM.render() can create an instance of MyInfo.
When importing MyInfo, make sure to provide a path by adding './'. This means from current directory, look for a file called MyInfo.js. 
    import MyInfo from "./MyInfo.js" 

Imports assume working with a js file (.js is the default extension). Can remove the .js extension
    import MyInfo from "./MyInfo"

Its best to have a solid organizational structure, especially with complex programs. A good org structure to employ is to create a new folder
called components where all component files will be housed. Drag MyInfo.js into the components folder. On index.js, this will change the 
path to MyInfo.js because the file is no longer part of the root directory. Update path to 
    import MyInfo from './components/MyInfo.js'
_______________________________________________________________________________________________________________________________________
4. REACT PARENT/CHILD COMPONENTS

In order for anything to show up on the page, need to use ReactDOM.render(). With, ReactDOM.render(<App />, document.getElementById("root")), 
the App component is an entry point into the application. 

There is a distinction between components and elements. Elements eventually boil down to html code. Components typically house the elements
that are reduced to html. 

The Document Object Model(DOM) is often referred to a tree where the html element is the most base root of the tree. Can think of the App
component to being the root of the tree. The App component can render other components such as MyFooter, and MyFooter can render an actual
element called footer, where footer will have all of the html related to the footer.  Just like App is rendering more than 1 component, 
MyHeader can also render more than one component such as Logo and MyNavbar, which will need to end up as regular elements of some sort,
such as an img or nav element. 

App                 App                         App
 |                   |                           |
MyInfo             MyFooter                      MyHeader                   
 |                   |                           |      |
<div></div>     <footer></footer>               <Logo> <MyNav)  
                                                  |      |
                                                 <img>   <nav></nav>

Create a new component called App.js. Within App.js return a JSX element with that contains html 'hello for a 3rd time', a navbar, 
an unordered list and a main section where most of the content will go. This app component is getting large and is defeating the purpose
of React. Can ideally create separate components for each piece of html that is needed on the page: 

function App() {
    return (
        <div>
            <nav>
                <h1>Hello a third time!</h1>
                <ul>
                    <li>Thing 1</li>
                    <li>Thing 2</li>
                    <li>Thing 3</li>
                </ul>
            </nav>
            <main>
                <p>This is where most of my content will go...</p>
            </main>
        </div>
    )
}

To begin to address this issue, create a footer component, Footer.js. Within Footer.js, create a function that returns a footer. In order 
for the element from Footer.js to show up on the page, App.js needs to render Footer. Need Footer.js inside the file of App.js in order 
to create an instance of Footer. From App.js, import Footer.js and after the <main> element add the Footer component:
     <main>
        <p>This is where most of my content will go...</p>
    </main>
    <Footer />












*/

