/*
1.OVERVIEW

React Hooks are a new feature recently added to React (released v16.8). React is heading in a direction which makes class components 
unnecessary. In the industry there has been a push away from class based components. Hook's have rendered them unnecessary. React Hooks
are a way to hook into the lifecycle of a component using functional components. Now you do not need class components for state or almost 
all of the lifecycle methods. Instead you can use functional components across the board. There are some lifecycle methods currently not 
supported by Hooks, getSnapShotBeforeUpdate and componentDidCatch. But both of these methods are fairly uncommon. Hooks also dramatically
improve readability and organization of components. Can also create custom hooks to reuse code across app. Below is a list of the 10 built
in hooks React provides:

useState            https://reactjs.org/docs/hooks-reference.html#usestate
useEffect           https://reactjs.org/docs/hooks-reference.html#useeffect
useContext          https://reactjs.org/docs/hooks-reference.html#usecontext
useRef              https://reactjs.org/docs/hooks-reference.html#useref
useReducer          https://reactjs.org/docs/hooks-reference.html#usereducer
useMemo             https://reactjs.org/docs/hooks-reference.html#usememo
useCallback         https://reactjs.org/docs/hooks-reference.html#usecallback
useImperativeHandle https://reactjs.org/docs/hooks-reference.html#useimperativehandle
useLayoutEffect     https://reactjs.org/docs/hooks-reference.html#uselayouteffect
useDebugValue       https://reactjs.org/docs/hooks-reference.html#usedebugvalue
_____________________________________________________________________________________________________________________________________
2. useSTATE() PART1 CREATING STATE

The component below creates a state in a class component and displays the value of that state in the DOM. Goal is to change this class 
component thats using state into a functional component using the useState() hook.   

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            answer: "Yes"
        }
    }
    
    render() {
        return (
            <div>
                <h1>Is state important to know? {this.state.answer}</h1>
            </div>
        )
    }
}

To begin, create a functional component. The useState() function comes from the React library. Can pull the function in as a named import. 
The useState() function returns an array where the 1st value is null and 2nd value is a function [null, ƒ()]. Putting a true value as a 
parameter for useState() will return true as the 1st value of the array [true, ƒ()]. Whatever I put inside of the useState() function will
be the initial value of state. To make it comparable to the class function where the state is initialized in the constructor, 
this.state = {answer: "Yes"}, I can put a "Yes" value in useState. So const value = useState("Yes") will return the array ['Yes', ƒ()]. 
Can replace the hard-coded Yes with {value[0]} to get the 1st element of the array. 

import React, { useState } from "react"    

function App() {
    const value = useState(true)
    console.log(value)
    
    return (
        <div>
            <h1>Is state important to know? Yes</h1>
            <h1>Is state important to know? {value[0]}</h1> -> removing hard-coded Yes and replacing with initialized value of state. 
        </div>
    )
}

The reason why useState() returns an array is because you are expected to use array destructuring when you get the value. With object 
destructuring , I can pull out the properties name and age from the person object. Instead of saying person.name or person.age, 
with destructuring, I can just say name or age. 

 const person = {
        name: "Joe",
        age: 42
    }    
const { name, age } = person

Because useState() is returning an array, I can't use object destructuring. But I can use array destructuring if I put [] around the value
returned from useState(). Because its an array, I can call it whatever I want such. Can change the array name to answer, 
const [ answer ] = useState("Yes"). This is a difference between array destructuring and object destructing. I don't have this flexibility 
of changing the name with object destructuring. 

function App() {
    const [ value ] = useState("No")  -> array destructuring. 
    console.log(value)
    
    return (
        <div>
            <h1>Is state important to know? {value}</h1>  -> do not have to keep up with the values index in the array
        </div>
    )
}

Compared to the class component that has state, useState() decreases the amount of code. Using the useState() hook, can specify what the
initial value for state is, const [ answer ] = useState("Yes") and receive it back in a variable. Notice that I am saving a primitive value 
of the string "Yes" in useState(). In the class component, had to save/create state as a full object. With hooks, objects are not needed. 
You can initialize state with an object using useState() but there are caveats. Hooks allows me to just keep the values that I care about
w/o having to use objects. 
_____________________________________________________________________________________________________________________________________
3. useSTATE() PART2 CHANGING STATE

Using useState(), returns a function in the array [null, ƒ()]. Can call the function whatever I want and when function is called, can 
provide the function a value that will change state. Convention says the function should be called what the name of the array is called. 
So setCount is a function that is available to make changes. I want the change to occur when I click the button, so add an event listener 
to the button. Can't use setCount in this way -> <button onClick={setCount}>Change!</button>. Because onClick is receiving an event, need
to have an anonymous function to receive the event and have the anonymous function call setCount(). 
    <button onClick={() => setCount()}>Change!</button> 

Now, what I provide to setCount() will be the new version of state. Because I am not using object, I can use a simple number as my state. 
Providing a 1 in setCount, when I click my button, the number will change from 0 to 1.   
    <button onClick={() => setCount(1)}>Change!</button>

This isn't ideal because clicking the button again, will not change the number, so number will remain at 1. Just like this.setState(), the
setCount() function can either receive a placement version of state (setCount(1)) or I can provide a setCount() a function that will 
receive a previous version of state. Here prevCount is a function and the function is returning prevCount +1. State will +1 when button 
clicked. 

This program works but can be a bit hard to read. onClick is starting with an arrow function that calls setCount() where setCount() is 
provided another function that changes state. 

function App() {
    const [count, setCount] = useState(0)
    
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Change!</button>
        </div>
    )
}

For readability I can add a function inside of initial function. Function increment calls setCount() that receives the prevCount and that
will return prevCount +1. The increment function can be called in the click event. 

function App() {
    const [count, setCount] = useState(0)
    
    function increment() {
        setCount(prevCount => prevCount + 1)
    }
    
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment!</button>
        </div>
    )
}


Adding decrement function.....

function App() {
    const [count, setCount] = useState(0)
    
    function increment() {
        setCount(prevCount => prevCount + 1)
    }
    
    function decrement() {
        setCount(prevCount => prevCount - 1)
    }
    
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            
        </div>
    )
}
_____________________________________________________________________________________________________________________________________
4. useSTATE() PART3 CHANGING MORE COMPLEX STATE

App is a basic contact list where user enters first and last name and when button is clicked, its added to your contact list. The form has
a submit the will run handleSubmit(). The onchange for the inputs will run handleChange() in order to keep local state updated always
on every keystroke. Clicking the button will fire the onSubmit of the form. Want handleChange() to update input dataState(). And want 
handleSubmit() to add the inputData to the contactsData array. 

In this example, it does not make a lot of sense to separate the first and last names because they both belong to the same entity, 
the person. Therefore, state will hold an object instead of string, numbers or other primitive data. Similarly the contact data that 
is collected is best done in an array, which is another complex data type. There is a difference in the way that useState() with React 
hook in a functional component works with complex data types (objects, arrays) vs. this.setState() in a class based component. 

function App() {
    const [inputData, setInputData] = useState({firstName: "", lastName: ""})
    const [contactsData, setContactsData] = useState([])
    
    function handleChange(event) {
         // update our inputData state
        
    }
    
    function handleSubmit(event) {
        // add the inputData to the contactsData array
        
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="First Name"
                    name="firstName" 
                    value={inputData.firstName}
                    onChange={handleChange}
                />
                <input 
                    placeholder="Last Name"
                    name="lastName" 
                    value={inputData.lastName}
                    onChange={handleChange}
                />
                <br />
                <button>Add contact</button>
            </form>
           // {/{contacts}/}//
            </>
            )
        }
        
The handleChange() function is receiving the event and with destructuring, grabbing the name and value from the event.target. From the input
boxes in the form, specifying the first and last names (name="firstName", name="lastName") to specifically match up with the piece of state
firstName and lastName (value={inputData.firstName}, value={inputData.lastName}). The input values in the form has to match what is in 
state ->(useState({firstName: "", lastName: ""})).So on change, want to update input data, can use setInputData() to track changes. 
setInputData() will need access to previous state., will call it prevInputData. Since prevInputData is a function, it will return a new
object that needs to represent all pieces of state or in this case all pieces of the prevInputData. Can use the spread operator on the 
prevInputData, ...prevInputData. This will copy over all of the properties from prevInputData. [name]: value will replace whatever name 
user is working on (name="firstName" or name="lastName") and replace with the updated value. Typing B for firstName and Z for lastName 
keeps both pieces of state. 

function handleChange(event) {
        const {name, value} = event.target
        setInputData(prevInputData => {
            return {
                ...prevInputData,
                [name]: value
            }
        })
    }

With handleSubmit() need to add the input data to the contactData array. With useState() have the function setContactsData(). I can call 
setContactsData() and will need to know the list of previous contacts. What will return is a new array that has all of the previous 
contacts and then add the new object inputData. Key first and last name, click the button and an array with first and last name will return. 
the array is going to replace the previous values of the array. 

   function handleSubmit(event) {
        event.preventDefault()     ->prevents the default auto page refresh? 
        setContactsData(prevContacts => [...prevContacts, inputData]) ->inputData is the 1st element of the array returned from useState(), [null, ƒ()]
    }                                                                 ->this combines old version of state with new version of state. 
    
Final code. Contacts variable logs the contact list to the array. ***********************
import React, {useState} from "react"

function App() {
    const [inputData, setInputData] = useState({firstName: "", lastName: ""})
    const [contactsData, setContactsData] = useState([])
    
    function handleChange(event) {
        const {name, value} = event.target
        setInputData(prevInputData => ({...prevInputData, [name]: value}))
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        setContactsData(prevContacts => [...prevContacts, inputData])
    }
    
    const contacts = contactsData.map(contact => <h2 key={contact.firstName + contact.lastName}>{contact.firstName} {contact.lastName}</h2>)
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="First Name"
                    name="firstName" 
                    value={inputData.firstName}
                    onChange={handleChange}
                />
                <input 
                    placeholder="Last Name"
                    name="lastName" 
                    value={inputData.lastName}
                    onChange={handleChange}
                />
                <br />
                <button>Add contact</button>
            </form>
            {contacts}
        </>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
5. useEffect() PART1

The main reasons to use a class component is for state and lifecycle methods. Can hook into a lifecycle method with a functional component. 
The useEffect() hook is considered a replacement for 3 lifecycle methods, componentDidMount, componentDidUpdate, componentWillUnmount. 
Instead of worrying about in what way useEffect() is a combination of these 3, should think about it in terms of what its name indicates. 
useEffect() is a hook that allows me to use side effects in the component. Can think of side effects as anything that reaches outside of 
the component to do something. For example, a network request to retrieve data from outside the component. Or a manual DOM manipulation
to modify other parts of the DOM. Or setting up event listeners manually. Or timeouts and intervals to run code periodically. All of these
are considered side effects of the component because their main job is to not to specifically manage state or displaying content to screen. 

Can use useEffect() to change the color of a number every time the button to increment it is clicked. useEffect() also comes from the React
package and can import it with {useEffect}. The way to include a useEffect() to the component is to call useEffect(). useEffect() provides
a callback function where logic goes. For the colors, imported a package called randomcolor(). When randomcolor() is a function and when 
called, it returns a hex color. Need to add a new piece of state that for saving and updating the color. Can do this by starting with 
useState(). Here, I am destructuring array to pull out state variable color and function setColor and initializing color to a blank string.  
    -> const [color, setColor] = useState("")

Function now has a state variable called color, so can now set style of h1 to have a color of color. 
     <h1 style={{color: color}}>{count}</h1>

In useEffect(), the callback function is where I can set up the effects. This will use setColo() to generate a random color. what happening 
with useEffect() is that every time component renders (info in between the divs in return statement), its calling the useEffect() function. 
And that function is setting the state of the color, which in turn is calling a re-render and is infinitely looping this way. This looks like 
a bug on the page. In componentDidUpdate, had the option to grab the previous props/previous state and compare them to current props/current
state in order to manually decide if something should run. useEffect() has a very easy way to determine whether or not the effect should 
apply. 

 useEffect(() => {
        setColor(randomcolor())  -> this will cause an infinite loop because color is changes every time function called. 
    })
    
The 1st paramenter in useEffect is the callback function. The 2nd parameter is an array. Inside of array, I can specify what variable I want
it to watch for changes in and if the variable changes, it will run the effect. The variable that I want to run the effect on and change the
color for is when the count variable is changed. The reason this is in an array is because I can add other variables in the array and 
potentially have a long list of variables that I want to monitor for changes. With page refresh, the default state value 0 will change color. 
So it did run the effect the 1st time it was rendered. So in that case it was like a componentDidMount(). When I increment or decrement, it
is looking for changes in the count variable and because the count variable has changed, its running the effect and setting the color. This
is cool and simple. useEffect() runs whenever the component renders, and can specify when it should apply effects for a specific variable. because 

        useEffect(() => {
        setColor(randomcolor())
    }, [count]

Can also use useEffect() to run code only when component mounts for the 1st time. If only wanted to set the color only when the component
first mounted, instead of running and changing color every time the count changes, I can leave an empty array. The empty array tells it to
not run every again. After page refresh, the component will mount from scratch and the number 0 will change color. But the 
increment/decrement buttons will not make change the color of the changing number. 

    useEffect(() => {
        setColor(randomcolor())
    }, [])   

useEffect() is a slightly different way to help me think about the way the component is supposed to act and how effects outside of the 
component can be implemented into the component. 

Final code ***************************************

import React, {useState, useEffect} from "react"
import randomcolor from "randomcolor"

function App() {
    const [count, setCount] = useState(0)
    const [color, setColor] = useState("")
    
    function increment() {
        setCount(prevCount => prevCount + 1)
    }
    
    function decrement() {
        setCount(prevCount => prevCount - 1)
    }
    
    useEffect(() => {
        setColor(randomcolor())
    }, [count])
    
    return (
        <div>
            <h1 style={{color: color}}>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
6. useEffect() PART2

The side effects introduced in the component with useEffect() doesn't require clean up. Meaning when color or setting a new state is 
automatically cleaned up when the component unmounts. However, some side effects I introduce won't be cleaned up automatically. Common
examples of this is when I create an manual event listener on another part of document using document.addEventListener(...) Or if I set
up some kind of socket subscription that watches for changes in real time, like a real time chat client. Both of these are example of 
things that have side effects outside the scope of the component and therefore can cause memory leaks or recurring jobs or some kind of
residual problem from the messiness of leaving the effects behind because they do not automatically get cleaned up. 

An example to see this is setting up a setInterval. A setInterval is running code on a set interval, like every second or so. This is the 
function I may use to build a stopwatch. setInterval creates a recurring job for Javascript to run. If I create this job in a component and
unmount the component, the job will continue to run in the background. In a class component, I have used the lifecycle method 
componentWillUnmount as a place to clean up the mess myself. The 1st thing I need to provide setInterval() is a function and the second 
parameter is the number of milliseconds between every time it calls the function. Here there will be 1 second between each function call,  
setInterval(fn, 1000). 

Instead of manually clicking the button to increase number, I now want the number to automatically increment by 1 every second. This will
cause a bug. Inside of useEffect(), calling setCount, but the effect will run ever time count changes. On top of that, every time useEffect()
is called, a brand new SetInterval is setup. And because looking for changes in the count variable and useEffect() is changing the count
variable, it was setting up a new interval every time. So the 1st time it went from 0 to 1, then from 1 to 3. This is because setCount() was
called 2x because there were 2 intervals running. Then it went from 3 to 7, going up by 4, then by 8, then by 16 then by 32 and so forth.  

  useEffect(() => {
        setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)
        setColor(randomcolor())
    }, [count])

A work around is to call useEffect() more than once. If I want something to specifically run just one time, can use the empty array trick, 
to act as if it were the componentDidMount. Here the setInterval will get setup once and the setCount() function will run just every second
instead of having multiple versions of this interval running at the same time. This isn't exactly cleaning up the side effect. 

useEffect(() => {                            ->will just run 1x, because empty array acting like componentDidMount
        setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)
    }, [])
    
    useEffect(() => {
        setColor(randomcolor())
    }, [count])
    
To clean up the side effects...with setInterval, the way to end an interval is to grab an id that is returned by setInterval. setInterval
will return an identifier I can use to then use another function called clearInterval(). In clearInterval, pass the interval id to it and 
it will end that interval. How to do this?  The way to useEffect() to act like componentWillUnmount is by returning something from its body. 
And what is returned is a function. And the function will be the cleanup function. Under the hood when React calls useEffect() and that 
useEffect() returns a function, it stores that function and right when a component is about to unmount, it runs that function so that it
can do whatever cleanup its designed to do. In this case, the function I am providing React to run in order to do the cleanup is to run 
clearInterval() and pass to it the interval id. 

  useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }

        -> with arrow function. 
      useEffect(() => {
        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

useEffect() is slightly more complicated than useState() but is really a nice way to look at the component lifecycle methods and to think 
of it in terms of introducing side effects into the component. Also see how useEffect() can replace componentDidMount by using the empty
array workaround. Also saw how useEffect() acted in place of componentDidUpdate by adding variable to array that its watching changes on. 
Also seen how to use the return function from useEffect() in order to act like componentWillUnmount to do any type of cleanup of side 
effects that I need to do. 

Final program *********************************
import React, {useState, useEffect} from "react"
import randomcolor from "randomcolor"

function App() {
    const [count, setCount] = useState(0)
    const [color, setColor] = useState("")
    
    useEffect(() => {   -> acting 
        const intervalId = setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)
        return () => clearInterval(intervalId)  ->returned function will clear the interval as soon as the App component unmounts. 
    }, [])
    
    useEffect(() => {
        setColor(randomcolor())
    }, [count])
    
    return (
        <div>
            <h1 style={{color: color}}>{count}</h1>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
7. SPEED TYPING GAME INTRO


*/


