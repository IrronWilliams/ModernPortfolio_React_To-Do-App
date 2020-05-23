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
a callback function where logic goes. For the colors, imported a package called randomcolor(). The randomcolor() is a function and when 
called, it returns a hex color. Need to add a new piece of state that for saving and updating the color. Can do this by starting with 
useState(). Here, I am destructuring array to pull out state variable color and function setColor and initializing color to a blank string.  
    -> const [color, setColor] = useState("") -> initial value array will change from [null, f()] to ["", setColor()]

Function now has a state variable called color, so can now set style of h1 to have a color of color. 
     <h1 style={{color: color}}>{count}</h1>

In useEffect(), the callback function is where I can set up the effects. This will use setColor() to generate a random color. what happening 
with useEffect() is that every time component renders (info in between the divs in return statement), its calling the useEffect() function. 
And that function is setting the state of the color, which in turn is calling a re-render and is infinitely looping this way. This looks like 
a bug on the page. In componentDidUpdate, had the option to grab the previous props/previous state and compare them to current props/current
state in order to manually decide if something should run. useEffect() has a very easy way to determine whether or not the effect should 
apply. 

 useEffect(() => {
        setColor(randomcolor())  -> no 2nd parameter. this will cause an infinite loop because color is changes every time function called. 
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

CSS ->
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 3em;
}

button {
    border: 1px solid lightgray;
    background-color: transparent;
    padding: 10px;
    border-radius: 4px;   
}

button:hover {
    cursor: pointer;
}

button:focus {
    outline:0;
}
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

  useEffect(() => {  -> will cause a bug in this state. will have multiple versions of interval running at same time. 
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
    
    useEffect(() => {   
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

In the code, user can set the amount of time he/she wants the game to last. The text area is disabled when the game is not being played. 
When the game is started, the text area automatically receives focus and lets the user start typing right away. When time runs out, the
text area greys out and the number of words typed in the given time is displayed. The start button becomes disabled when the game is 
running. Project will use the useState() hook, useEffect() hook, useRef() hook and a custom hook. 
_____________________________________________________________________________________________________________________________________
8. SPEED TYPING GAME PART1

 * Build the basic structure of the game
 * 
 * 1. <h1> title at the top
 * 2. <textarea> for the box to type in 
 *      (tip: React normalizes <textarea /> to be more like <input />, 
 *      so it can be used as a self-closing element and uses the `value` property
 *      to set its contents)
 * 3. <h4> ti display the amount of time remaining
 * 4. <button> to start the game
 * 5. Another <h1> to display the word count
 * 

import React from "react"
function App() {
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea />
            <h4>Time reminaing: ???</h4>
            <button>Start</button>
            <h1>Word count: ???</h1>
        </div>
    )
}
export default App

CSS **********************************************************************
html, body {
    background: black;
    color: #00b800;
    margin:0;
    padding: 0;
    padding-top: 10px;
    font-family: 'Press Start 2P', cursive;
    text-align: center;
}

body {
    font-weight: 400;
}

button {
    font-family: 'Press Start 2P', cursive;
    display: block;
    margin: 0 auto;
    border: none;
    background: #a80020;
    background: #00b800;
    padding: 10px 20px;
    text-transform: uppercase;
}

h1 {
    font-size: 20px;
    text-align:center;
}

textarea {
    font-family: 'Press Start 2P', cursive;
    border: 3px solid black;
    width: 90%;
    margin: 0 auto;
    outline: none;
    height: 200px;
    background: #00b800;
    padding: 10px;
}
_____________________________________________________________________________________________________________________________________
9. SPEED TYPING GAME PART2

*Using hooks, track the state of the text in the textarea on every keystroke. To verify it's working, you could just console.log the 
state on every change. 
 
 Import {useState} from React in order to track state. 
 Set up useState() variable and function:  const [text, setText] = useState("")

 To have state update every keystroke inside of textarea, need an onChange event listener and the event listener will accept a 
 handleChange function. The handleChange() function will accept an event. Need to grab the event in order to get the current value 
 of the input box, which is pulled out of event.target or e.target. Next, I need the handleChange() function to update state. I can 
 use the function setText() to update state. The text I want state to have is the current value of the input box. The way controlled
 forms work is now I need to set the value={text}. And 'text' is aligned to the array thats returned from useState() 
    const [text, setText] = useState("")
 
So now, every time I type a character in the box, it updated state and the state got console logged because function got re-rendered and 
therefore console log ran again.  

function App() {
    const [text, setText] = useState("")
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    console.log(text)
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                onChange={handleChange}
                value={text}
            />
            <h4>Time remaining: ???</h4>
            <button>Start</button>
            <h1>Word count: ???</h1>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
10. SPEED TYPING GAME PART3

*Create a function to calculate the number of separate words in the `text` state For now, just console.log the word count when the 
button gets clicked to test it out.
 
Create a method/function to calculate the word count. To prevent possibility of potentially mutating the text variable in state, will pass 
the text variable as a parameter in the word count calculation function. Passing as a parameter prevents the function from working 
directly with the text variable in state and limits any changes to the text variable within the calculate word count function. To count 
the number of words, can create a words array by splitting the text, and can split on a space. When a space is found in a text string, it 
will add a new item to the array that results from calling split(). Can now return wordsArray.length which will return the number of words
between the spaces.  

   function calculateWordCount(text) {
        const wordsArr = text.split(" ")
        console.log(wordsArr.length)
        return wordsArr.length
    }
    
Can test this by clicking the button, so will need an onClick event. Can't just call the function because the event listener is going to pass
an event to the function. So will need to run an anonymous function and have it call calculateWordCount. The function calculateWordCount()
will pass in text, which will refer the the text in state. 
 
<button onClick={calculateWordCount}>Start</button> -> incorrect 

<button onClick={() => calculateWordCount(text)}>Start</button> correct

This results in a bug. If I add a space somewhere within the text area, that space is counted as an extra word. For example, if I type the
word something followed by a space, whats returned is and array with the word something and an empty string. And if I type an empty space
before and after the word something, will get an array with 2 empty strings. 

console.log(wordsArr) returns ["Something", ""]. 
console.log(wordsArr) returns ["", "Something", ""]. 

Can use the method trim() to fix this. trim() removes whitespace from around the string. 

    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        console.log(wordsArr)
        return wordsArr.length
    }

Almost there, but still have another bug. If I hit the button w/o anything in the text area, what's returned is an array with an empty 
string. This means the array has a length of 1 even though there is nothing typed in the box. A solution is to filter out any items in 
the array that are an empty string. Or because this occurs when box is empty, can check to see if the 1st item in the array is an empty 
string, if so, return 0. To use filter approach, instead of returning wordsArr.length, and return a value for filteredWords, which needs 
to be created. With filter method, pass in callback function with conditional that only interested in words that are not equal to an empty
string and return the length of the filteredWord. 

  function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        const filteredWords = wordsArr.filter(word => word !== "")
        return filteredWords.length
    }
OR return the array that comes back from wordsArr.filter() and tack on .length

 function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }

Revised Code ****************************************************

import React, {useState} from "react"

function App() {
    const [text, setText] = useState("")
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                onChange={handleChange}
                value={text}
            />
            <h4>Time remaining: ???</h4>
            <button onClick={() => console.log(calculateWordCount(text))}>Start</button>
            <h1>Word count: ???</h1>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
11. SPEED TYPING GAME PART4

*1. Create state to hold the current value of the countdown timer. Display this time in the "Time Remaining" header. 
*2. Set up an effect that runs every time the `timeRemaining` changes The effect should wait 1 second, then decrement the 
timeRemaining` by 1. 
*3. Make it so the effect won't run if the time is already at 0

Import useEffect and call useEffect() in the component. useEffect() takes 2 parameters, 1st a function and 2nd is optional, but is an array
of variables that I want to run the effect if these variables change -> useEffect(() => {}, [timeRemaining]). The 2nd variable tells 
useEffect() when to run. 

Within the body of the function, will use setTimeout(), which also takes 2 parameters, 1st is a function and other is how long I want to 
wait to run the function, which in this case is 1 second. setTimeout works by waiting 1 second and then run the function. 

    useEffect(() => {
        setTimeout(() => {}, 1000)
    }, [timeRemaining])

What I want the setTimeout to do is decrement the time remaining. Can use setTimeRemaining function from state. Will need to know what the 
previous time was, so can use the function (in this case called time). Design function...whatever the time was, need to provide a new time
which is the old time minus 1. 

   useEffect(() => {
        setTimeout(() => {
            setTimeRemaining(time => time - 1)
        }, 1000)
    }, [timeRemaining])
    
To summarize what's happening here...useEffect() will run as the component 1st mounts. And it will run anytime the timeRemaining changes.
can use setTimeout() to wait 1 second, run the setTimeRemaining function which will change the state by reducing time by 1 second, 
therefore re-render the component. That will run useEffect() again because timeRemaining has changed (array - 2nd parameter of useEffect),
which will then again wait 1 second and reduced time by 1 second. 

The countdown will work at this point, but currently do not have anything that tells countdown to stop at 0. Can address this with an if
statement. This puts a stop condition so that the program will not re-render forever. 

    useEffect(() => {
        if(timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        }
    }, [timeRemaining])
    
Revised Code ***********************************************************************

import React, {useState, useEffect} from "react"

function App() {
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(5)
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    useEffect(() => {
        if(timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        }
    }, [timeRemaining])
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                onChange={handleChange}
                value={text}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button onClick={() => console.log(calculateWordCount(text))}>Start</button>
            <h1>Word count: ???</h1>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
12. SPEED TYPING GAME PART5

* Make it so clicking the Start button starts the timer instead of it starting on refresh
*(Hint: use a new state variable to indicate if the game should be running or not)

Currently the timer starts as soon as the app is refreshed. I want to update the program to start time when the button is clicked. 
Create a new state variable called isTimeRunning and update useEffect() with new state variable. Want to check if time is running and 
if time remaining is > 0. 
 
const [isTimeRunning, setIsTimeRunning] = useState(false)

   useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        }
    }, [timeRemaining])
    
With the button, should be able to replace console.log with a call to setIsTimeRunning() and set value to true. 
    <button onClick={() => setIsTimeRunning(true)}>Start</button>

However, when Start button is clicked, nothing happens. This is a tricky bug to figure out but it comes back to understanding how useEffect()
works. The second parameter in useEffect(()=>{},[timeRemaining]) is an array of dependencies. And this array of dependencies tells 
useEffect() when it should run. In this case, only going to re-run useEffect() if [timeRemaining] changes. Clicking the start button is not
changing [timeRemaining] instead its changing the other piece of state isTimeRunning. Consequently, can add a new dependency to instructing
useEffect() to also watch for isTimeRunning and if isTimeRunning changes, then run useEffect() again. That should trigger setTimeout() which
should rerun useEffect() over until timeRemaining is no longer > than 0. 

    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        }
    }, [timeRemaining, isTimeRunning])
    
The button now begins timer and the timer stops at 0 as expected. However, the isTimeRunning boolean is still set to true even though time 
is done. Now need to change isTimeRunning back to false. Can use else/if to change isTimeRunning back to false when it = to 0. This will 
not change anything visibly on the screen. But it will be important to have isTimeRunning correctly set as this will be needed with other 
parts of the program. When I run setIsTimeRunning() and change the state, because I am looking at isTimeRunning for changes, useEffect()
does run one last time. However, during the last run, it does not satisfy the if or else if statement. 


      useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            setIsTimeRunning(false)
        }
    }, [timeRemaining, isTimeRunning])
    
If else is used, will not run last time and will get same results. Else if preferred because its a bit more verbose. 

    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else {
            setIsTimeRunning(false)
        }
    }, [timeRemaining, isTimeRunning])
    
Revised Code *****************************************************************************

import React, {useState, useEffect} from "react"

function App() {
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(2)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            setIsTimeRunning(false)
        }
    }, [timeRemaining, isTimeRunning])
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                onChange={handleChange}
                value={text}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button onClick={() => setIsTimeRunning(true)}>Start</button>
            <h1>Word count: ???</h1>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
13. SPEED TYPING GAME PART6

*1. When the timer reaches 0, count the number of words the user typed in and display it in the "Word count" section. 
*2. After the game ends, make it so the user can click the Start button again to play a second time. 


Begin by creating a new variable in state for the wordCount which starts at 0.  Logic in useEffect() hook already determines when the 
game ends, which is when the timer stops at 0. Also, calculateWordCount() method calculates the word count. Can use the setWordCount()
function in state to update word count based on how many words were calculated. Within useEffect(), create a new variable where results
are when calculateWordCount() is called with the text that is saved in state. Then can setWordCount() based upon number of words. Or 
can put in one line say..setWordCount based upon whatever gets returned from calling calculateWordCount().
    const numWords = calculateWordCount(text)
    setWordCount(numWords)
    setWordCount(calculateWordCount(text))  -> alternative more concise option to put all in 1 line. 
    <h1>Word count: {wordCount}</h1>  -> make sure to add wordCount from state. 

So now after the game ends, when timer = 0, the total # of words will display. When game is over, cannot currently use the Start button 
to initiate a new game. Upon reviewing the code when the button is clicked, just setting isTimeRunning = true. But clicking the button does 
change the amount of time remaining. Therefore the if statement is not passing the condition isTimeRunning = true.   
    <button onClick={() => setIsTimeRunning(true)}>Start</button>

Can create another function to manage this called startGame(). Can move the setIsTimeRunning(true) from the button and replace with the 
startGame() method. 
    <button onClick={startGame}>Start</button>

Within startGame(), can reset timer with setTimeRemaining() equal to value of when game starts. 
 
function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(5)
    } 
Now program calculates the number of words after the timer gets to 0. When the Start button is clicked, the timer starts back with value of
5 and begins to count down. But words in the box remains. For this, can set the text back to an empty string when the timer restarts after
the Start button is clicked. 

  function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(5)
        setText("")
    }

Can now create a function called endGame(). Actually ending of the game occurs in useEffect() so can take part of the code in useEffect(),
(setIsTimeRunning(false), setWordCount(calculateWordCount(text))) and paste into the endGame() function. And within useEffect() call endGame(). 
This way, will make it easier to add updates for starting or ending the game. 

    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }

   useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])
        

Made great progress but there are still some quirks in the game. 1st, the user clicks the Start button and then has to click in the textarea
to begin typing. Another thing thats impacting the user experience is when user types in textarea and has to click Start to clear the text. 
Another quirk is when the Start button is clicked repeatedly, the Time Remaining numbers begin to freak out even become negative. Could avoid
the negative numbers by adjusting else if(timeRemaining === 0) in useEffect(). What's happening with multiple consecutive clicks of Start is
the startGame() function is staring multiple times by setting TimeRunning to true, and putting the TimeRemaining above 0 but creating many 
versions of useEffect() and setTimeout(). So its setting state a bunch of times in parallel and causing a bug. A solution to address this 
is to disable the Start button while the game is running. 

Buttons have a disable property. The button can be disabled when a condition is true. Here, I want to make sure the button is disabled when
the time is running, if isTimeRunning true, the button should be disabled. 
<button 
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
</button> 

With page refresh, click Start, the button shows disabled and will not be able to click when Time Remaining is running. When Time Remaining 
shows 0, button becomes active. Then setTimeRunning goes back to false in the endGame() function, setIsTimeRunning(false). And button is 
re-enabled. 

Textarea also has a disabled property. A user can cheat by typing words in textarea before the game actually begins. Can disable the textarea
if the time in not running. This will prevent user from typing before game starts. 

    <textarea
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
    />

Revised program **********************************************************************

import React, {useState, useEffect} from "react"

function App() {
    const STARTING_TIME = 5
    
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        setText("")
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }
   
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button 
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
            </button>
            <h1>Word count: {wordCount}</h1>
        </div>
    )
}
export default App

Revised CSS with changes to text area and button when disabled **********************************************************************
html, body {
    background: black;
    color: #00b800;
    margin:0;
    padding: 0;
    padding-top: 10px;
    font-family: 'Press Start 2P', cursive;
    text-align: center;
}

body {
    font-weight: 400;
}

button {
    font-family: 'Press Start 2P', cursive;
    display: block;
    margin: 0 auto;
    border: none;
    background: #a80020;
    background: #00b800;
    padding: 10px 20px;
    text-transform: uppercase;
}

button:disabled {
    cursor: not-allowed;
}

h1 {
    font-size: 20px;
    text-align:center;
}

textarea {
    font-family: 'Press Start 2P', cursive;
    border: 3px solid black;
    width: 90%;
    margin: 0 auto;
    outline: none;
    height: 200px;
    background: #00b800;
    padding: 10px;
}

textarea:disabled {
    background-color: #a5a2a2;
}
_____________________________________________________________________________________________________________________________________
14. USEREF()

The useRef() hook allows me to keep values around for the entire lifespan of the component. Usually when people talk about useRef(), 
they are referring to the ability to grab one of the DOM nodes and then make imperative changes to it. Below is a todo list held in the
App component with a couple of pieces of state. newTodoValue/setNewTodoValue keeps track of the current value of the input form so that
there is a controlled component. The next state variable is an array of todos. The function handleChange() grabs the value of input and 
sets teh newTodoValue state to the value. The addTodo() function gets called when the button is clicked. Because the button is inside of
the form set 'event.preventDefault()' which prevents the default of submitting the form when page is refreshed. Using spread operator to 
provide all of the previous to do items and then to add a new to value to the list. Then sets the input box back to an empty string so the
box is cleared for reuse. With const allTodos, they todos are mapped and displayed in the return section under the form.

With current program, user can type a todo and hit enter to submit the todo. The todo will appear on the screen. This happens because the
button is inside the form. But when user types another todo and instead of hitting enter, clicks the "Add todo item" button, the todo will
appear on the screen. However, the focus shifts to the button and not the input box. Meaning, user will not be able to key additional todos. 
Hitting enter did keep the focus inside the input box but clicking the button moved the focus outside the box. What I want to do is make it
so that the input box receives focus automatically even if the button is clicked. 

function App() {
    const [newTodoValue, setNewTodoValue] = useState("")
    const [todosList, setTodosList] = useState([])
    
    function handleChange(event) {
        setNewTodoValue(event.target.value)
    }
    
    function addTodo(event) {
        event.preventDefault()
        setTodosList(prevTodosList => [...prevTodosList, newTodoValue])
        setNewTodoValue("")
    }
    
    const allTodos = todosList.map(todo => <p key={todo}>{todo}</p>)
    
    return (
        <div>
            <form>
                <input type="text" name="todo" value={newTodoValue} onChange={handleChange}/>
                <button onClick={addTodo}>Add todo item</button>
            </form>
            {allTodos}
        </div>
    )
}

The process of focusing into the input box is an imperative command that I need to provide to the input DOM node. In React, need a way to
reference the DOM node. In plain vanilla Javascript, you can provide the input an id attribute and use getElementByID(). Assuming this was
inside of an component that could be re-used, the problem with adding an id is that there will be multiple elements on the screen that 
have the same id. So instead will use Ref to grab the input element. 

First thing is to import useRef hook from React. Then create a new variable that stores the value for the useRef() function with initial 
value of null. 
    const inputRef = useRef(null)

DOM nodes in React automatically come with a prop called ref. I can tell ref that its going to be the acting inputRef. 
    <input ref={inputRef} type="text" name="todo" value={newTodoValue} onChange={handleChange}/>

In essence, when the App component renders, it will start as null because null is the initial value. Then when it renders the elements 
in the div, it will see that the input has a ref attribute of inputRef. Now the const inputRef will become an object and that object 
will have a property called .current and .current points to this DOM node: 
     <input ref={inputRef} type="text" name="todo" value={newTodoValue} onChange={handleChange}/>

So can console.log inputRef. inputRef is an object that has a current property and the value is the DOM node. 

  function addTodo(event) {
        event.preventDefault()
        setTodosList(prevTodosList => [...prevTodosList, newTodoValue])
        setNewTodoValue("")
        console.log(inputRef)  -> returns {current: <input type="text" name="todo"value>}
    }

Can now access the inputRef and the current property. Input boxes have a method called focus(). This puts the focus back into the input
box when user clicks the 'Add todo item' button. Similar to other hooks, useRef() allows me to access references to DOM nodes inside of 
a functional component. 

 function addTodo(event) {
        event.preventDefault()
        setTodosList(prevTodosList => [...prevTodosList, newTodoValue])
        setNewTodoValue("")
        inputRef.current.focus()  ->puts focus back into the input box
    }

Revised program ************************************************************************

import React, {useState, useRef} from "react"

function App() {
    const [newTodoValue, setNewTodoValue] = useState("")
    const [todosList, setTodosList] = useState([])
    const inputRef = useRef(null)
    
    function handleChange(event) {
        setNewTodoValue(event.target.value)
    }
    
    function addTodo(event) {
        event.preventDefault()                                              -> button in form, prevents bug when page refreshes 
        setTodosList(prevTodosList => [...prevTodosList, newTodoValue])     ->takes previous items and adds new item to list
        setNewTodoValue("")                                                 -> clears the input box by setting to empty string
        inputRef.current.focus()                                            -> sets focus back on input box when button is clicked 
    }
    
    const allTodos = todosList.map(todo => <p key={todo}>{todo}</p>)        ->maps each todo in an array 
    
    return (
        <div>
            <form>
                <input ref={inputRef} type="text" name="todo" value={newTodoValue} onChange={handleChange}/>
                <button onClick={addTodo}>Add todo item</button>
            </form>
            {allTodos}                                                      ->todos are displayed here 
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
15. SPEED TYPING GAME PART7 - Ending State Complete (does not have custom hooks)

*Make the input box focus (DOM elements have a method called .focus()) immediately when the game starts. 

In this section, want to improve game by when clicking the Start button, would automatically move focus to the inside of the box. 
Need to grab the DOM element for the input box and imperatively call the focus method. Begin by importing useRef and create an 
instance of a ref called textBoxRef, const textBoxRef = useRef(null). And in textarea, can access the ref via ref={textBoxRef}. Now in
the program/code, should be able to use textBoxRef as reference to the DOM element. Want to run the focus method at the beginning of the
game so put focus in the startGame() function. Cant simply say textBoxRef.focus() because the actual DOM elements exists in current 
property of the textBoxRef, so proper syntax is textBoxRef.current.focus(). Upon page refresh, it appears all is working until user hits
the Start button and is unable to type into the box. This bug is occurring because currently the textarea is enabled when the time is 
running. In other words, when the time is not running, the textarea is disabled.  

<textarea
    ref={textBoxRef}
    onChange={handleChange}
    value={text}
    disabled={!isTimeRunning}
/>

And isTimeRunning is changing based upon a set state or a change in the state. However it is important to remember that React will change
state asynchronously. Meaning it won't stop the other lines of code from happening while its in the process of changing state. As such, 
problem is that its trying to focus on a disabled text area. This is so because after the code textBoxRef.current.focus() is run, it fails 
because it can't focus on the box. Then shortly after it fails, (milliseconds later), setIsTimeRunning(true) runs, then enables the text 
area. 

  function startGame() {
        setIsTimeRunning(true)   ->will run based upon change in state and state is changed asynchronously 
        setTimeRemaining(STARTING_TIME) -> program will run during process of changing state. 
        setText("")
        textBoxRef.current.focus()
    }
A solution is to imperatively tell the textBoxRef to manually set its disable property to false. This is an asynchronous that will 
successfully change the textarea to an enabled text area box, which will then allow the focus to happen. So now, when Start button is
clicked, the focus goes to the text area. 

  function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }

Revised Program (ending state for project is complete. Project currently does not have custom hooks) ********************************

import React, {useState, useEffect, useRef} from "react"

function App() {
    const STARTING_TIME = 5
    
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }
    
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button 
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
            </button>
            <h1>Word count: {wordCount}</h1>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
16. USECONTEXT()

A. Here, the App component is rendering a Header and Button. 

function App() {
    return (
        <div>
            <Header />  -> rendering Header and Button 
            <Button />
        </div>
    )
}

B. The Button is receiving a Consumer from Context and then rendering the ThemeContextConsumer which uses the render props pattern by 
providing a child as a function. And will provide the value of the context and use the context to toggle the theme and use theme to 
display either the light or dark theme. When button is clicked, it not only switches theme of button but also theme of the header. 

import {ThemeContextConsumer} from "./themeContext"  -> receiving Consumer from Context

function Button(props) {
    return (
        <ThemeContextConsumer>                      -> rendering ThemeContextConsumer
            {context => (                           -> using render prop patter by providing a child as a function (calling it context)
                <button onClick={context.toggleTheme} className={`${context.theme}-theme`}>Switch Theme</button>
            )}
        </ThemeContextConsumer>
    )    
}

C. With header, similar process as Button. Using ThemeContextConsumer and render props pattern 

import {ThemeContextConsumer} from "./themeContext"

function Header(props) {
    return (
        <ThemeContextConsumer>
            {context => (
                <header className={`${context.theme}-theme`}>
                    <h2>{context.theme === "light" ? "Light" : "Dark"} Theme</h2>
                </header>
            )}
        </ThemeContextConsumer>
    )    
}

Since using these as functional components, the useContext() hook will make life so much nicer. Starting with Header.js, import useContext. 
In the Header function, bring in the context object via a variable called context. With context, passing in a value that is an object 
that has a theme property and a toggleTheme property. This is how passing the value object in themeContext.js:
    <Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>

Need to provide useContext() the full context object. When the full context object was created with createContext(), what's returned is an
object with 2 properties, Provider and Consumer. Usually destructured them to make use of the variable easier. 
    const {Provider, Consumer} = React.createContext()

But will need the full object when passing into useContext(). Consequently in themeContext.js will not be able to destructure and pull in 
the entire object when importing createContext. And adjust the instance of the Provider from 'Provider' to 'ThemeContext.Provider'. And no 
longer need to export the Consumer but need to export the ThemeContext. 

import React, {Component} from "react"
const ThemeContext = React.createContext()

class ThemeContextProvider extends Component {
    state = {
        theme: "dark"
    }
    
    toggleTheme = () => {
        this.setState(prevState => {
            return {
                theme: prevState.theme === "light" ? "dark" : "light"
            }
        })
    }
    
    render() {
        return (
            <ThemeContext.Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
export {ThemeContextProvider, ThemeContext}

So back to Header, import {ThemeContext} and pass ThemeContext to useContext(). This passes the entire ThemeContext object that includes
both the Provider and Consumer to useContext. This now allows me to remove the ThemeContextConsumer and can just have the header. This 
revised code works because I am just grab the object from the variable context by saying useContext() and providing the context object. 

import React, {useContext} from "react"
import {ThemeContext} from "./themeContext"

function Header(props) {
    const context = useContext(ThemeContext)
    return (
        <header className={`${context.theme}-theme`}>
            <h2>{context.theme === "light" ? "Light" : "Dark"} Theme</h2>
        </header>
    )    
}
export default Header

Now need to update code in Button. 

import React, {useContext} from "react"
import {ThemeContext} from "./themeContext"

function Button(props) {
    const context = useContext(ThemeContext)
    return (
        <button 
            onClick={context.toggleTheme} 
            className={`${context.theme}-theme`}
        >
            Switch Theme
        </button>
    )    
}
export default Button

With useContext(), I no longer have to worry about providing the consumer or using the render props pattern with the children function. Can
now simply in one line grab the context value by using the UseContext() hook. 

Final Code ************************************************************

from App.js ->
import React from "react"
import Header from "./Header"
import Button from "./Button"

function App() {
    return (
        <div>
            <Header />
            <Button />
        </div>
    )
}
export default App

from Button.js -> with destructuring 
import React, {useContext} from "react"
import {ThemeContext} from "./themeContext"

function Button(props) {
    const {theme, toggleTheme} = useContext(ThemeContext)  -> destructuring theme and toggleTheme properties 
    return (
        <button 
            onClick={toggleTheme} 
            className={`${theme}-theme`}
        >
            Switch Theme
        </button>
    )    
}
export default Button

from Header.js ->
import React, {useContext} from "react"
import {ThemeContext} from "./themeContext"

function Header(props) {
    const {theme} = useContext(ThemeContext)  -> destructuring theme property
    return (
        <header className={`${theme}-theme`}>
            <h2>{theme === "light" ? "Light" : "Dark"} Theme</h2>
        </header>
    )    
}
export default Header

from themeContext.js  AS A CLASS BASED COMPONENT->
import React, {Component} from "react"
const ThemeContext = React.createContext()

class ThemeContextProvider extends Component {
    state = {
        theme: "dark"
    }
    
    toggleTheme = () => {
        this.setState(prevState => {
            return {
                theme: prevState.theme === "light" ? "dark" : "light"
            }
        })
    }
    
    render() {
        return (
            <ThemeContext.Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
export {ThemeContextProvider, ThemeContext}

from themeContext.js  AS A FUNCTIONAL COMPONENT->
import React, {useState} from "react"
const ThemeContext = React.createContext()

function ThemeContextProvider(props) {
    const [theme, setTheme] = useState("dark")
    
    function toggleTheme() {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }
    
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
export {ThemeContextProvider, ThemeContext}

from index.js ->
import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import {ThemeContextProvider} from "./themeContext"

ReactDOM.render(
    <ThemeContextProvider>
        <App />
    </ThemeContextProvider>, 
    document.getElementById("root")
)
_____________________________________________________________________________________________________________________________________
17. CUSTOM HOOKS 



*/


