/*An important aspect of becoming a skilled React developer is understanding the design patterns and methods that emerged as React has 
matured. Some of these patterns are specific aspects of the React library itself. Others are patterns that React developers have adapted 
and spread over time. These patterns have a similar goal which is to avoid repetition and to keep my React code DRY. The acronym DRY 
means Don't Repeat Yourself. 

Keeping code DRY is not about being a lazy developer. Its actually a very helpful principle especially when writing larger applications. 
The more I have to write the same code over and over in one program, the more places I have to maintain the code. If I changed the code,
I will have to go to every one of those places I wrote the same code and make the same changes over and over. This means there is more 
room for human error and more room for bugs to creep into program. 

Can use 2 popular ways to help code remain DRY, Inheritance and Composition. These are not specific to React but refer to code in general. 
Inheritance drives object oriented programming. It includes ideas like classes and subclasses, instantiating objects from those classes, 
inheriting traits from superclasses. Composition is a way to compose code structure by pulling together the bits and pieces I need. In 
REACT, should always prefer composition over inheritance. Some would even argue that inheritance is an 'inherently' flawed concept. 
Generally speaking, there is a shift away from inheritance as a pattern for creating reusable code. 

Some code reused patterns that have emerged in React are:

1. Components with props. Components are the base units for code reuse in React. Even if everything in the component is hard-coded, I can 
still use the component all over the app anytime I need the same html to show up on the page. This is comparable to having a function that
I can call over and over whenever I want. To make the components even more reusable, instead of hard-coding things into them, I can pass 
props to them and make them render things differently depending upon which props I pass to them. This is like writing a function but this
function accepts parameters that can return different results based upon the parameters passed to them. 

Other code reused patterns are Children, Higher Order Components (HOC) and Render Props. When React introduced Hooks, both Higher Order
Components and Render Props became a bit dated. I can do almost anything more simply using Hooks than with either HOC or Render Props. Its
still helpful to learn these patterns as I may still continue to see them being used. 

_____________________________________________________________________________________________________________________________________
1. REACT CHILDREN

So for in React, I have rendered my elements with self-closing elements. For example, rendering the <App /> component as a self-closing 
element. Any time I wanted this element to have some form of reusability or pass data to it, I would do so via props. Such a prop to 
change the background color -> <Navbar backgroundColor="firebrick" />. Or a button that allows me to select the background color and 
the text that goes inside -> <Button backgroundColor="blue" text="Click me!"/>. This is a great first step of adding re-usability to the
components because then I do not have to just use the generic button element and style it the same way across the application. I can tell
the Button component to manage the general padding/margin, update border, what happens on hover. If there is anything I want to change with
the button on the site, I can provide the Button component a prop that is customizable. 

Sometimes I may want to create a component whose job is to wrap some other element as a generic box. For example, if site has a modal or 
dialog box, I would probably want all of them to look the same but will want flexibility with the content that goes inside the box. For 
example, if I have a Call-To-Action component that will highlight a certain part on the page with a border. Currently the CTA component 
is not very reusable. I like this design to be consistent across the website, but also like to put different kinds of elements inside the 
CTA. Perhaps for some of the boxes, I want large text. For other boxes, I want an input field with an email collection form. For other 
boxes, I want an image with a caption. 

function CTA() {
    return (
        <div className="border">
            <h1>This is an important CTA</h1>
            <button>Click me now or you'll miss out!</button>
        </div>
    )
}

.border {
    border: 1px solid blue;
    border-radius: 5px;
}

To keep the style of the CTA consistent across the boxes is where children come into play. The 
concept is straight forward. Any component that I create can either be used as a self-closing element like <CTA /> or in a non self-closing
fashion like <CTA></CTA>. Anything I put between the opening and closing tags will automatically be accessible inside the component via a 
prop called props.children. Here I moved the element from the CTA component to the element between the opening/closing tags in the App
component. The CTA component can access the element in APP via props.children. This makes the CTA far more flexible. 

function App() {
    return (
        <div>
            <CTA>
                <h1>This is an important CTA</h1>
                <button>Click me now or you'll miss out!</button>
            </CTA>
        </div>
    )
}

function CTA(props) {
    return (
        <div className="border">
            {props.children}
        </div>
    )
}

The CTA component determines how the child element will be displayed. I need to specify within CTA where exactly I want the children to 
be put. This opens up a ton of possibilities. On the App component, I can create another instance for my <CTA /> but this time I want it
to have a form element with an input box for collecting emails with a submit button. Here, I did not have to re-style the border for the
separate CTA. Instead, I allowed the <CTA> to take care of this. If I wanted to add some padding to the border, I can just update the 
padding in the css file and the update will be applied everywhere there is a <CTA>. The <CTA> has a className=border and is being used 2x
in the APP and in both instances were updated. Its important to know when to use the children property. If I am just trying to pass a 
simple piece of data down, props is the best approach. For example, if I always wanted this CTA to include a picture and a caption and the
structure was always going to be the same, a component with props is the best way to go. The reason is I do not want to someone to use my
component in an incorrect way. If CTA was always a photo and a caption, then the CTA instances on the App component should not be editable
by the person using the component. Instead component should specify that its an image and caption then pass in an image prop and caption
prop. The question to ask is do I want the person using my component to have full control over the stuff that gets displayed. If so, go 
with children. If I want to ensure a certain structure always, go with props. 

function App() {
    return (
        <div>
            <CTA>
                <h1>This is an important CTA</h1>
                <button>Click me now or you'll miss out!</button>
            </CTA>
            
            <CTA>
                <form>
                    <input type="email" placeholder="Enter email address here"/>
                    <br />
                    <button>Submit</button>
                </form>
            </CTA>
        </div>
    )
}

function CTA(props) {
    return (
        <div className="border">
            {props.children}
        </div>
    )
}

.border {
    border: 1px solid blue;
    border-radius: 5px;
}

_____________________________________________________________________________________________________________________________________
1A. REACT CHILDREN PRACTICE

import React from "react"
function Callout(props) {
    return (
        <div className="callout">
            {props.children}
        </div>
    )
}
export default Callout

import React from "react"
import Callout from "./Callout"

function App() {
    return (
        <main>
            <h1>Welcome!</h1>
            
            <Callout>
                <h2>Don't miss out!</h2>
                <p>Unless you don't suffer from FOMO, you better make sure you fill out the email form below!</p>
            </Callout>
            
            <p>This is probably the best site you've ever come across. I'm glad you're here to witness the magnificence of this website right now.</p>
            
            <Callout>
                <img src="https://picsum.photos/id/102/4320/3240" width="100%" />
                <figcaption>Just look at those sparkling raspberries!</figcaption>
            </Callout>
            
            <p>Here's some more unforgettable content. Lorem ipsum something or other.</p>
            
            <Callout>
                <h2>Give us your email. We definitely won't sell it to anyone.</h2>
                <input type="email" placeholder="Enter Email"/>
                <button>Sign me up!</button>
            </Callout>
            
        </main>
    )
}
export default App

main > h1 {
    text-align: center;
}

.callout{
    border: 1px solid black;
    border-radius: 3px;
    padding: 20px;
    background-color: #C0FFFE;
}
_____________________________________________________________________________________________________________________________________
2. HIGHER ORDER COMPONENTS (HOC'S) PT1:OVERVIEW

The idea of HOC's stem from the concept of higher-order functions. A higher-order function is a function that takes another function as 
a parameter. Often that parameter is called a callback and gets invoked after doing some other things. Array methods like map() and 
filter(), reduce() are examples of higher-order functions. The difference between these and other array methods like pop(), push(), 
shift() is that map(), filter(), reduce() all take functions as arguments. 

HOC's is a function that takes a component as its first argument and returns a new component that wraps the component it received as an 
argument, and provides some extra capabilities to it. Can think of this as a function that takes a component and gives the component 
superpowers. HOC's look a little different. Usually export default the name of the component. With HOC's we call the HOC and pass in the 
component from the file. The HOC will return a new component, and the new component is what is actually exported. 
    const upgradedComponent = withSuperPowers(Component)
    export default upgradedComponent

In this example, take the generic Component augment the generic Component with a toggle HOC which will return a new component with toggle
capability. Export the returned component from the original component file. 
    const componentWithToggle = withToggle(Component)
    export default componentWithToggle

Usually will see this programmed in one line. What gets export defaulted is the component that gets returned by calling withToggle on the 
component from the file. 
    export default withToggle(Component)

_____________________________________________________________________________________________________________________________________
3. HIGHER ORDER COMPONENTS (HOC'S) PT2:EXAMPLE

HOC = a function that takes a component as its first argument and returns a new component that wraps the given component, 
providing extra capabilities to it.

HOC withPointlessHOC takes a component and returns a new component, a function that takes props. So the HOC returns a component:

    function withPointlessHOC(component) {
        return function(props) {
            
        }
    }

Now the function that takes props will return JSX. This function will render the component that was passed to it. Need the props from the 
component that I'm returning to be passed along to the component thats being rendered. This can be accomplished with spread operator. What 
this HOC is doing is taking the component that was passed as a parameter and just rendering it. 

    export function withPointlessHOC(component) {
        const Component = component
        return function(props) {
            return (
                <Component {...props} />
            )
        }
    }

The idea of HOC is that they take a component as a property and render a new component. The way this would be implemented is changing what
will be exported from the App component. Instead of exporting App by default (export default App), export the component that gets returned 
when we call withPointlessHOC(). It can be helpful to set this as a separate variable to get a better understanding of concept. For example,
PointlessHOC equals the component that gets returned withPointlessHOC on App. What is actually exporting from the App file is the 
component that was returned called PointlessHOC. 

    const PointlessHOC = withPointlessHOC(App)
    export default PointlessHOC

    this is comparable to export default withPointlessHOC(App)
    
Create a new component called withExtraPropAdded. Because I am returning my own component and rendering the given component, I have some 
flexibility with what I return. I could add an additional prop.  I can wrap the new withExtraPropAdded component around the App component. 

    export function withExtraPropAdded(component) {
        const Component = component
        return function(props) {
            return (
                <Component anotherProp="Blah blah blah" {...props} />
            )
        }
    }

Go to App.js and import withExtraPropAdded. Instead of wrapping the App component with PointlessHOC, withPointlessHOC(App), wrap using  
withExtraPropAdded(App). The App component has now been decorated or augmented with the extra prop {anotherProp: "Blah blah blah"}. The 
extra component was not written directly into the App component or manually passed in when rendering it. Because from App.js, the HOC was 
actually returned from the file, now have an extra prop that can be used now. 

The overall idea of this is that my HOC function has the ability to pass any component that I invoke it with by saying withExtraPropAdded
and passing in the component -> withExtraPropAdded(App). The HOC now has the ability to augment the component that was passed to it w/o me
having to manually enter or pass down.  

import React from "react"
import {withPointlessHOC} from "./withPointlessHOC"
import {withExtraPropAdded} from "./withExtraPropAdded"

function App(props) {
    return (
        <div>Hello world!</div>
    )
}
const PointlessHOC = withExtraPropAdded(App)
export default PointlessHOC

_____________________________________________________________________________________________________________________________________
4. HIGHER ORDER COMPONENTS PT3:PRACTICE

* A function that takes a component as its first argument and returns a new component that wraps
 * the given component, providing extra capabilities to it.
 * 
 * Challenge: Write a higher-order component that passes a new prop to the given component
 * called "favoriteNumber" and includes your own, personal, favorite number
 * 
 * Then, in App.js, render that favorite number to the screen
 * 
 
 import React from "react"
 export function withFavoriteNumber(component) {  -> HOC receives a component as a prop
    const C = component                           -> common convention because Component that I render begins with capital letter
    return function(props) {                      -> returns a new component that is a function that takes props
        return (                                  -> that component then renders the <C/> component
            <C favoriteNumber={42} {...props}/>   -> pass along any props that have been passed to component. Add augmentations 
        )
    }
}

Go to App.js and import with FavoriteNumber function. 
Invoke function on the App by passing App as the parameter. -> export default withFavoriteNumber(App). 
Whats happened is that the App component is receiving props that were giving to it from the return statement in the withFavoriteNumber
component 
        return (
            <C favoriteNumber={42} {...props}/>
        )

Can now look at the new prop via props.favoriteNumber. Need curly braces around the component when imported (import {withFavoriteNumber})
function App(props) {return (<div>{props.favoriteNumber}</div>)}

import React from "react"
import {withFavoriteNumber} from "./withFavoriteNumber"

function App(props) {
    return (
        <div>{props.favoriteNumber}</div>
    )
}
export default withFavoriteNumber(App)

_____________________________________________________________________________________________________________________________________
5. HIGHER ORDER COMPONENTS - PT5: USED IN REAL SCENARIO 
  

*/