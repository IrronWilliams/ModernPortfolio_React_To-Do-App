/*
Phase 1 
From scratch, initialize the React app
Render an <App /> component
Create the <App /> component from scratch
Have the <App /> component render 3 or 4 checkboxes with paragraphs or spans next to it
like you're making a todo list with some hard-coded items on it

A. From index.html
<html>
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="root"></div>
        <script src="index.pack.js"></script>
    </body>
</html>

B. From index.js
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))

C: From App.js (Option A. No components. App.js manages whats communicated on page)
import React from "react"

function App() {
    return (
        <div>
            <input type="checkbox" />
            <p>Placeholder text here</p>
            
            <input type="checkbox" />
            <p>Placeholder text here</p>
            
            <input type="checkbox" />
            <p>Placeholder text here</p>
            
            <input type="checkbox" />
            <p>Placeholder text here</p>
        </div>
    )
}
export default App

C: From App.js (Option B. App.j rendering components)

import React from "react"
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"

function App() {
    return (
        <div>
            <Header />
            <MainContent />
            <Footer />
        </div>
    )
}
export default App

D. Components for Footer, Header, MainContent

import React from "react"
function Footer() {
    return (
        <footer>This is the footer</footer>
    )
}
export default Footer

import React from "react"
function Header() {
    return (
        <header>This is the header</header>
    )
}
export default Header

import React from "react"
function MainContent() {
    return (
        <main>This is the main section</main>
    )
}
export default MainContent
__________________________________________________________________________________________________
Phase 2 (Updating input/p to a new component. Styling)

1. Change the input/p combo to be a new component called <TodoItem />. <TodoItem /> (for now) will just have the same displayed 
data below (every todo item is the same) hardcoded inside of it.    
2. Style up the page however you want! You're welcome to use regular CSS (in the CSS file) or inline styles, or both!

A. From index.html
<html>
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="root"></div>
        <script src="index.pack.js"></script>
    </body>
</html>

B. From index.js
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))

C: From App.js component
import React from "react"
import TodoItem from "./TodoItem"

function App() {
    return (
        <div className="todo-list">        -> adding className to refer to css file
            <TodoItem />    -> creating instances of of TodoItem
            <TodoItem />
            <TodoItem />
            <TodoItem />
        </div>
    )
}
export default App

D. From TodoItem component
import React from "react"

function TodoItem() {
    return (
        <div className=className="todo-item">       -> adding className to refer to css file
            <input type="checkbox" />
            <p>Placeholder text here</p>
        </div>
    )
}
export default TodoItem

E. From style.css 
__________________________________________________________________________________________________________________________
Phase 2 (Mapping Components)

App.js file -> Within App(), create a variable todoItems which will be the result of applying map() on the array of objects todosData. 
Will pass the info from the individual item object down into <TodoItem />a. What is passed is an object called item, whose value is the
item from the arrow function. 
    const todoItems = todosData.map(item => <TodoItem key={item.id} item={item}/>)

Can now return the instances of todoItems 

import React from "react"
import TodoItem from "./TodoItem"
import todosData from "./todosData"

function App() {
    const todoItems = todosData.map(item => <TodoItem key={item.id} item={item}/>)
    
    return (
        <div className="todo-list">
            {todoItems}
        </div>
    )
}
export default App

TodoItem.js -> accepting props parameter and gaining access to props from the App.js file. The input type is evaluating if the completed
property is true. if so, it will place a checkmark in the app. This will throw a warning that says I didn't add an onchange handler and 
will not be able to uncheck the check mark. This is a cool addition. Will address how to fix with forms. 

import React from "react"
function TodoItem(props) {
    return (
        <div className="todo-item">
            <input type="checkbox" checked={props.item.completed}/>
            <p>{props.item.text}</p>
        </div>
    )
}
export default TodoItem


todosData.js
const todosData = [
    {
        id: 1,
        text: "Take out the trash",
        completed: true
    },
    {
        id: 2,
        text: "Grocery shopping",
        completed: false
    },
    {
        id: 3,
        text: "Clean gecko tank",
        completed: false
    },
    {
        id: 4,
        text: "Mow lawn",
        completed: true
    },
    {
        id: 5,
        text: "Catch up on Arrested Development",
        completed: false
    }
]
export default todosData



*/




 