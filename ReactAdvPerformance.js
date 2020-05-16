
/*1. SHALLOW COMPARISON

Many of the optimizations I can do in React will require a solid understanding of how React renders its components. The 2 ways React provides
to increase performance both require a good understanding of a concept called Shallow Comparison. A way to think about Shallow Comparison
is to think about JavaScripts strict === operator. With === we know that any primitive types that have the same value AND type will be 
considered true. console.log("Hi" === "Hi") will equal true because both values are string and have the same thing inside of the string "". 
For primitive types (strings, numbers, booleans) a shallow comparison is using the === against the 2 values. 

The triple equals is a good measure for understanding shallow comparison because the === also produces the same results with objects. 
Complex types such as an array or object, when using the === to ask if an object is equal to an object, console.log({} === {}) will 
evaluate as false. Even though the objects look like the same and even if provided the same data, will still evaluate as false. 
console.log({name: "Joe"} === {name: "Joe"}). This is evaluated as false because objects are passed by reference instead of passed by 
value. Anytime I create an instance of an object, it takes up a new place in memory. And when I have a === it notices they are 2 distinct
objects because of the 2 different places in memory. 

Considering the 2 objects below, a shallow comparison of these 2 objects, is actually a comparison of every key to the other objects key. 
A shallow comparison of these 2 objects produces a true value to say they are shallowly equal. Meaning comparing the values individually 
will evaluate as true in both cases. console.log(state.favNumber === state2.favNumber) and console.log(state.name === state2.name) = true. 
In that sense, the 2 objects are shallowly equal because their most shallow properties (on the 1st level) are all equal to each other. 

const state = {
    favNumber: 42,
    name: "Bob"
}

const state2 = {
    favNumber: 42,
    name: "Bob"
}

In contrast, If I added an address property to each object and made them =. A shallow comparison will check if the address object in the 
state object is = to the address object in the state2 object. These objects will be saved in memory in 2 different places and will not be
considered shallowly equal. console.log(state.address === state2.address) will evaluate as false.  

const state = {
    favNumber: 42,
    name: "Bob",
    address: {
        street: "123 Main Street",
        city: "Nowhere, PA",
        zip: 12345
    }
}

const state2 = {
    favNumber: 42,
    name: "Bob",
    address: {
        street: "123 Main Street",
        city: "Nowhere, PA",
        zip: 12345
    }
}

In another example, const anotherPerson = person are the same object in memory. console.log(anotherPerson === person) will evaluate true. 
This is because the const anotherPerson just points to the same place as person. 

const person = {
    name: "Sarah"
}
const anotherPerson = person

But if I were to make anotherPerson an object even with same data as the person object console.log(anotherPerson === person) 
will evaluate false. (because of the different spaces in memory of the 2 objects)

const person = {
    name: "Sarah"
}

const anotherPerson = {
    name: "Sarah"
}

Triple equal and shallow comparison are not the same. In summary, for primitives if 2 strings tripe equal each other, they are considered
shallow equal. If React is doing a shallow comparison, it will find "Hi" === "Hi" are compared equally to each other and will pass the 
shallow comparison. For complex types (array, object), cannot use === to determine if something is shallow equal. Instead the === can be 
used to compare the top level properties of one object to the top level properties of another object. In the instance of an array, it will
compare the items of one array to the items of another array. If those top level properties or array items are tripled equal to the top 
level properties or array item in another array or object, then they are considered shallow equal. 

console.log({name: "Joe"} === {name: "Joe"}) will produce false because the 2 objects are not strict equal to each other. But a shallow
comparison between the 2 objects will would produce true because the property name Joe in one object is equal to the property name of Joe
in the other object.  located in different memory spaces. 

In the objects below, state and state2 are shallow equal to each other. Can say this because, can look at ever property in state and check 
it they are triple equal to the properties in state2.  

const state = {
    favNumber: 42,
    name: "Bob"
}

const state2 = {
    favNumber: 42,
    name: "Bob"
}

Adding the address properties, is state shallow equal to state2?  Check property by property. Yes for favNumber because 42===42. Yes for
name because string 'Bob'==='Bob'. No for Address because they are not triple equal because they are 2 separate objects in memory therefore
state and state2 are not shallow equal to each other.  

const state = {
    favNumber: 42,
    name: "Bob",
    address: {
        street: "123 Main Street",
        city: "Nowhere, PA",
        zip: 12345
    }
}

const state2 = {
    favNumber: 42,
    name: "Bob",
    address: {
        street: "123 Main Street",
        city: "Nowhere, PA",
        zip: 12345
    }
}

Same holds true for arrays. arr1 and arr2 are shallow equal to each other because the index numbers of each array are shallow equal to 
each other. However they are not triple equal to each other because an array is a complex type. arr1 === arr2 will evaluate false. 

const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3]

Same will hold true if I add complexity to the array. Now because the nested array [4] in arr1 and nested array in arr2 are not triple 
equal, arr1 and arr2 are no longer shallow equal to each other.  

const arr1 = [1, 2, 3, [4]]
const arr2 = [1, 2, 3, [4]]

React will use this concept of shallow comparison to determine how it may or may not optimize certain parts of the React code. 
________________________________________________________________________________________________
2. SHOULDCOMPONENTUPDATE()

shouldComponentUpdate() is a lifecycle method that is also an optimization method. Will likely not use this approach. React will 
automatically re-render all of the children in the subtree whether or not they are receiving as props the state that have changed. This 
approach is inefficient especially when program has dozens, hundreds, thousands of components. 

shouldComponentUpdate() is a lifecycle method on class components. Its purpose is to allow you to determine if a component should update
or not. With update, mean re-render. Should the component go thru the entire process of re-rendering or not. It is a function so it 
receives as parameters to the function the upcoming props and upcoming state so that you can compare them against current props and state. 
Returning true when doing the comparison means yes, the component should update and component should not update if false
(return true for no false for yes). Important that you don't do deep equality checks with this method. 

App.js = App is passing a count prop to <GrandParent/>. 
App is going to change its state and add 1. the count prop is going to receive the new state, which would be prevState + 
increment of 1. React will need to determine if its going to update the instance of <Grandparent/>. React will go to GrandParent.js 
and run shouldComponentUpdate() and compare the nextProps.count to the current count this.props.count. 

class App extends Component {
    state = { count: 0 }
    
    increment = () => this.setState(prevState => ({count: prevState.count + 1}))
    
    render() {
        console.log("[GP] [P] [C] [GC] APP just rendered")
        return (
            <div>
                <button onClick={this.increment}>+1</button>
                <h2>{this.state.count}</h2>
                <p>I'm the App component</p>
                <GrandParent count={this.state.count} />     -> will run shouldComponentUpdate() on GranParent component. 
                <GrandParent count={this.state.count}/>
            </div>
        )    
    }
}

class GrandParent extends Component {  
    shouldComponentUpdate(nextProps, nextState) {           ->function will receive upcoming props and upcoming state
        if (nextProps.count === this.props.count) {         ->if previous and current state are equal, do nothing, else re-render
            return false
        }
        return true
    }
      
    render() {
        console.log("[👴🏼]   [ ]   [ ]   [ ] rendered")
        return (
            <div>
                <p>I'm a GrandParent Component</p>
                <Parent />
                <Parent />
            </div>
        )
    }
}
________________________________________________________________________________________________
3. REACT.PURECOMPONENT()

The problem I'm trying to fix is when state changes in one component that is high up in a subtree and by default React renders everything
underneath it. PureComponent is an alternative to React.Component. Any place I would say 'import React, {Component} from "react"', or 
'class App extends Component', replace Component with PureComponent. PureComponent automatically implements a shouldComponentUpdate method 
and that method automatically does a shallow comparison of the props and state. Because it automatically a shouldComponentUpdate, it 
prevents me from manually creating my own shouldComponentUpdate method (will receive a warning). It also skips rendering of all children
in the tree below automatically, so need to make sure these are pure also. This method is generally preferred over shouldComponentUpdate. 

On GrandParent.js, need to import and extend PureComponent. I do not have to know what props will be passed to the <GrandParent/> because
under the hood, PureComponent will perform the equality checks for me. To avoid additional unnecessary rendering, simply add and 
extend PureComponent to each Component accordingly. Try to avoid premature optimization which is going out of my way to make sure my app 
is completely optimized w/o experiencing a problem in the 1st place. This will be a waste of time and money. PureComponent is a great way
to add some quick optimization if I am experiencing problems. If my app isn't experiencing problems, don't worry about it.  

import React, {Component} from "react"
import GrandParent from "./GrandParent"
class App extends Component {
    state = { count: 0 }
    
    increment = () => this.setState(prevState => ({count: prevState.count + 1}))
    
    render() {
        console.log("[GP] [P] [C] [GC] APP just rendered")
        return (
            <div>
                <button onClick={this.increment}>+1</button>
                <h2>{this.state.count}</h2>
                <p>I'm the App component</p>
                <GrandParent />
                <GrandParent />
            </div>
        )    
    }
}
export default App

import React, {Component} from "react"
import GrandParent from "./GrandParent"
class App extends Component {
    state = { count: 0 }
    
    increment = () => this.setState(prevState => ({count: prevState.count + 1}))
    
    render() {
        console.log("[GP] [P] [C] [GC] APP just rendered")
        return (
            <div>
                <button onClick={this.increment}>+1</button>
                <h2>{this.state.count}</h2>
                <p>I'm the App component</p>
                <GrandParent count={this.state.count} />  -> passing state to GrandParent
                <GrandParent />
            </div>
        )    
    }
}
export default App

import React, {PureComponent} from "react"
import Parent from "./Parent"
class GrandParent extends PureComponent {    
    render() {
        console.log("[👴🏼]   [ ]   [ ]   [ ] rendered")
        return (
            <div>
                <p>I'm a GrandParent Component</p>
                <Parent />
                <Parent />
            </div>
        )
    }
} 
export default GrandParent

import React, {PureComponent} from "react"
import Child from "./Child"
class Parent extends PureComponent {
    render() {
        console.log("[ ]   [👩🏼‍⚕️]   [ ]   [ ] rendered")
        return (
            <div>
                <p>I'm a Parent Component</p>
                <Child />
                <Child />
            </div>
        )
    }
}
export default Parent

import React, {PureComponent} from "react"
import GrandChild from "./GrandChild"
class Child extends PureComponent {
    render() {
        console.log("[ ]   [ ]   [🧒🏻]   [ ] rendered")
        return (
            <div>
                <p>I'm a Child Component</p>
                <GrandChild />
                <GrandChild />
            </div>
        )
    }
}
export default Child


import React, {Component} from "react"
class GrandChild extends Component {
    render() {
        console.log("[ ]   [ ]   [ ]   [👶🏻] rendered")
        return (
            <div>
                <p>I'm a GrandChild Component</p>
            </div>
        )
    }
}
export default GrandChild
________________________________________________________________________________________________
4. REACT.MEMO()

With the heavy shift towards functional components, React created React.memo() as basically a version of PureComponent that can be used
with functional components. React.memo() is a higher order component that was released in V16.6. Under the hood its pretty much the same
thing as PureComponent but used for functional components. It will only compare prevProps and nextProps and will not do any state checking. 
But does allow me to optionally implement my own checking function to determine if it should use the memoized result or should re-render
the component. The function should return true if the props are equal and false if they are not (opposite of shouldComponentUpdate). If 
returns true, React.Memo() should not re-render and render if returns false. By React the function is called 'are equal', which indicates
what I should be returning from it. True if prevProps and nextProps are equal or false if not equal. This function is optional and don't 
need to provide it to get the benefits of React.memo(). 

In un-optimized program, will begin with 31 lines of re-rendered code. Changing state will re-render everything, again 31 lines of 
re-rendered code. So changing state in the App is making every single descendant component re-render even though nothing about the 
descendant components have changed. Can use React.memo() to address this. React.memo() is a higher order component, so its a function
that takes a component and returns a component. 

On GrandParent.js, I can export default React.memo(GrandParent). Here, I am calling React.memo() which will take GrandParent as a component
and will return a new component and the new component will get default exported. The new component that React.memo() creates is automatically
going to be checking for changes to the props and will go thru a whole process called memoization. Which essentially means the element that
it creates from the component will get cached for a quick reference and use if the props don't change. If React needs to determine if 
GrandParent needs to be re-rendered, it will look at the cached version and look at the new props and compare them. If they haven't changed,
instead of the process of re-rendering, it will use the one that is set aside. And will not re-render any of the descendants. This version 
of App will render [GP] [P] [C] [GC] APP just rendered. This is going to render just the App component.  

import React, {Component} from "react"
import GrandParent from "./GrandParent"

class App extends Component {
    state = { count: 0 }
    
    increment = () => this.setState(prevState => ({count: prevState.count + 1}))
    
    render() {
        console.log("[GP] [P] [C] [GC] APP just rendered")
        return (
            <div>
                <button onClick={this.increment}>+1</button>
                <h2>{this.state.count}</h2>
                <p>I'm the App component</p>
                <GrandParent />
                <GrandParent />
            </div>
        )    
    }
}
export default App

If App passed state down via a prop called count to the GrandParent, changing state is going to re-render more than just the App component.  
Since I passed state to just one of the <GrandParent/>, only one of the <GrandParent/> rendered. The parents, children and grandchildren
are unnecessary re-renders because I am not passing props to them so there props are the same. 

class App extends Component {
    state = { count: 0 }
    
    increment = () => this.setState(prevState => ({count: prevState.count + 1}))
    
    render() {
        console.log("[GP] [P] [C] [GC] APP just rendered")
        return (
            <div>
                <button onClick={this.increment}>+1</button>
                <h2>{this.state.count}</h2>
                <p>I'm the App component</p>
                <GrandParent count={this.state.count} />  -> passing state to GrandParent
                <GrandParent />
            </div>
        )    
    }
}

>[GP] [P] [C] [GC] APP just rendered    -> passing state to GrandParent returns the App and just 1 render of Grandparent
>[👴🏼] [ ] [ ] [ ] rendered
>[ ] [👩🏼‍⚕️] [ ] [ ] rendered
>[ ] [ ] [🧒🏻] [ ] rendered
>[ ] [ ] [ ] [👶🏻] rendered
>[ ] [ ] [ ] [👶🏻] rendered
>[ ] [ ] [🧒🏻] [ ] rendered
>[ ] [ ] [ ] [👶🏻] rendered
>[ ] [ ] [ ] [👶🏻] rendered
>[ ] [👩🏼‍⚕️] [ ] [ ] rendered
>[ ] [ ] [🧒🏻] [ ] rendered
>[ ] [ ] [ ] [👶🏻] rendered
>[ ] [ ] [ ] [👶🏻] rendered
>[ ] [ ] [🧒🏻] [ ] rendered
>[ ] [ ] [ ] [👶🏻] rendered
>[ ] [ ] [ ] [👶🏻] rendered

On Parent.js, can also export default the function inline and call React.memo() and wrap statement within it. React.memo() takes the 
component and returns a new component which is the component that will get default exported. Once I refresh the page and change the state, 
fewer re-renders will result. 

import React from "react"
import Child from "./Child"
export default React.memo(function Parent() {
    console.log("[ ]   [👩🏼‍⚕️]   [ ]   [ ] rendered")
    return (
        <div>
            <p>I'm a Parent Component</p>
            <Child />
            <Child />
        </div>
    )
})

Now that Parent has been optimized, just the App and Grandparent has rendered. This is the 1 <GrandParent/> that is receiving the state 
thru props.   
>[GP] [P] [C] [GC] APP just rendered
>[👴🏼] [ ] [ ] [ ] rendered

There a multiple combinations to use React.memo(). With Child.js, can import as a named import and reference memo in the default export. 

import React, {memo} from "react"
import GrandChild from "./GrandChild"
function Child() {
    console.log("[ ]   [ ]   [🧒🏻]   [ ] rendered")
    return (
        <div>
            <p>I'm a Child Component</p>
            <GrandChild />
            <GrandChild />
        </div>
    )
}
export default memo(Child)

With GrandChild, can use a mix of named import and inline export default.

import React, {memo} from "react"
export default memo(function GrandChild() {
    console.log("[ ]   [ ]   [ ]   [👶🏻] rendered")
    return (
        <div>
            <p>I'm a GrandChild Component</p>
        </div>
    )
})

The function areEqual() returns true if prevProps and nextProps are considered equal and false if they are not. The way to use the 
function is passing it as a second paramter to the higher order component React.memo(). So give React.memo() a component and a function. 
It will use my areEqual function to determine if GrandParent should use the memoize version or the new version. Again, do not focus so much
on optimization that I divert energy away from building the features I actually want to build in the app. Premature optimization can end 
up costing me and/or company more money than its worth. If I am experiencing, better yet measuring, a performance issues with code, I can 
use these optimization tools as a 1st line of defense to perhaps quickly improve the performance of my app. If I am not able to actually
measure a performance issue, its probably not worth worrying about every possible unnecessary re-render from happening. 

function areEqual(prevProps, nextProps) {
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
}
export default React.memo(GrandParent, areEqual)


*/


