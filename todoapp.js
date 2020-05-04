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
Phase 3 (Mapping Components)

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
_________________________________________________________________________________________________________________________________________
Phase 4 (Adding State)

In the previous iteration of todo list app, pulled in todos data from a JSON file and mapped over it to display the todo items.
Eventually we'll want to be able to modify the data, which will only happen if we've "loaded" the data in to the component's state

Update the <App /> component into a stateful class component and load the imported `todosData` into state.

From App.js file ->
import React from "react"
import TodoItem from "./TodoItem"
import todosData from "./todosData"

class App extends React.Component {
    constructor() {
        super()
        this.state = {  -> this.state is an object
            todos: todosData  -> no longer mapping over todosData, now a value of the property todos. 
        }
    }
    
    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item}/>) -> mapping over todos parameter
        
        return (
            <div className="todo-list">
                {todoItems}
            </div>
        )    
    }
}
export default App
_________________________________________________________________________________________________________________________________________
Phase 5 (Got rid of warning about not having an onChange on input by console logging Changed)

TodoItem.js file ->
import React from "react"

function TodoItem(props) {
    return (
        <div className="todo-item">
            <input 
                type="checkbox" 
                checked={props.item.completed} 
                onChange={() => console.log("Changed!")}
            />
            <p>{props.item.text}</p>
        </div>
    )
}
export default TodoItem
_________________________________________________________________________________________________________________________________________
Phase 6 (Checkbox updating todo as complete/incomplete)

 1. Create an event handler in the App component for when the checkbox is clicked (which is an `onChange` event)
 2. Pass the method down to the TodoItem component
 3. In the TodoItem component, make it so when the `onChange` event happens, it calls the `handleChange` method and passes the id of 
    the todo into the function

Start with steps 2 and 3 first. In App.js, begin with handleChange(id) and console.log('changed. id). This will check if changes are 
working as expected. 

Next in render() pass the handleChange() method down to the TodoItem component. The method is passed with the other objects that are 
passed down to the TodoItem component. 
    const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)

Go to TodoItem component. In addition to the other props, the function is now receiving a prop called handleChange. The handleChange()
method will be taking 'id' as a parameter. However when events fire, they actually receive an event property. Because of this, won't be 
good enough to say onChange={props.handleChange} because props.handleChange will not receive an id property, but will receive the event 
object instead. Can update onChange={props.handleChange} with an arrow function onChange={() => props.handleChange} where the arrow 
function receives the event object. 
    onChange={(event) => props.handleChange()} -> arrow function receives the event object and calls props.handleChange()
    onChange={(event) => props.handleChange(props.item.id)}  -> can now pass property id. 
    onChange={() => props.handleChange(props.item.id)}  -> not using event. still calls props.handleChange() and passes the id to it.

Refresh page. When user clicks checkbox, console log will show 'Changed, 2' for example. This means user clicked the checkbox for/on the 
2nd item (the numbers align with the item id). If user clicks the 3rd item, console log will show 'Changed, 3'. 

Next step is updating state. Because I am saving an array with initial state -> this.state = {todos: todosData} and I do not want to modify
state directly, it will not be as simple as looping thru the array and finding the item with the id that is passed to 
handleChange(id) and updating it. This will modify the existing state. I can essentially do this but need to make sure that I return a 
brand new array where almost all of the items are the exactly as they used to be except one item has changed its completed property from 
true to false or false to true. Can use the map() method because it returns a new array. 

Back to App.js, in the handleChange() method, begin the setState() and use arrow function to receive previous state. 
    this.setState(prevState => {})

Next, use map to loop over prevState.todos array and look for a todo with an id that is passed as an argument to the handleChange() method. 
Put results in a variable called updatedTodos. prevState.todos is the prior state of the todos array. use map() to look at each todo in 
the prior state array.  Within function, create if/else that says if current todo that I am looking at has an id that is equal to the id
received from parameter (handleChange(id)), then this is the todo item that I want to change the completed property of. The code for this
means for todo.completed should equal the opposite of whatever it is -> todo.completed = !todo.completed. Then return the todo. Returning
makes it so that it puts the todo item in the new array updatedTodos in the same index of the original array. Between const updatedTodos 
and return is part of map().  The next return is for setState(). setState() needs to return a new version of state, which is an object. 
And my state is an object with a todos property. The prior todos property should now be the updatedTodos, which is the array just created. 
    todos: updatedTodos
 
To recap, I am looking at previous state and creating a new array that almost mirrors what it used to be except one of the items which has
the same id as the function received from the onChange handler (that happens when the checkboxes are clicked on the page), that one item
is changing from true to false or false to true. The brand new array is essentially replacing the old initial array created in the 
constructor and gets rendered to the page. Then taking the handleChange() method and passing it down to every one of the todo items I 
create with map method (map in render section). From TodoItem component, the todo items are receiving the handle change and every time its 
checkbox is checked, it calls 'onChange', which has an anonymous function which then calls handleChange and passes this items id in order 
to identify which in the array needs to be changed. 
    onChange={() => props.handleChange(props.item.id)}

The checks are showing up on the page because of the checked property. 'checked' determines whether the checkbox should be checked or not.
If item is completed, it should be checked. If item is not completed, should not be checked. 
    checked={props.item.completed}

There is an error with the following code. Within the handleChange() method, the code todo.completed = !todo.completed actually modifies
state. Because of the way objects are passed by reference instead of passed by value, the todo object within map() is the same object 
inside of prevState.todos. The statement todo.completed = !todo.completed is changing the 'todo' object referenced in map and by reference
also changing the object in prevState. Instead of directly modifying the todo, return a brand new object that will replace that todo in the
new array. With brand new object, can use object spread notation, which says give me all of the properties from this todo and manually 
override the completed property, which will be the opposite of todo.completed -> !todo.completed.  This change returns a new object and 
flips the completed property of the new object, instead of modifying the old object directly. 

Can leave the 2nd return because the 1st return will end the iteration of the function associated with map() method and will never get to 
2nd return. However, in case of if statement evaluating as false, will bypass 1st return and hit 2nd return.  

const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed  -> directly modifies state due to object reference 

                 REVISED   
const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    return {            -> return new object that replaces the todo in new array from map
                        ...todo,        -> object spread notation to copy all properties from this.todo 
                        completed: !todo.completed -> reverses the property from true to false or false to true 
                    }
                }
                return todo

Revised App.js file -> ERROR: DIRECTLY MODIFIES STATE *******
import React from "react"
import TodoItem from "./TodoItem"
import todosData from "./todosData"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: todosData
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed  -> directly modifies state
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }
    
    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)
        
        return (
            <div className="todo-list">
                {todoItems}
            </div>
        )    
    }
}
export default App


Revised App V2 STATE NOT CHANGED ->
import React from "react"
import TodoItem from "./TodoItem"
import todosData from "./todosData"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: todosData
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
            console.log(prevState.todos)
            console.log(updatedTodos)
            return {
                todos: updatedTodos
            }
        })
    }
    
    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>)
        
        return (
            <div className="todo-list">
                {todoItems}
            </div>
        )    
    }
}
export default App

Revised TodoItems.js ->
import React from "react"

function TodoItem(props) {
    return (
        <div className="todo-item">
            <input 
                type="checkbox" 
                checked={props.item.completed} 
                onChange={() => props.handleChange(props.item.id)}
            />
            <p>{props.item.text}</p>
        </div>
    )
}
export default TodoItem







    */


 