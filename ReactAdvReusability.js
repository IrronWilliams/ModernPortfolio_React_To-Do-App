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
        )                                         -> this will be passed as props to the App component 
    }
}

Go to App.js and import FavoriteNumber function. 
Invoke function on the App by passing App as the parameter. -> export default withFavoriteNumber(App). 
Whats happens is that the App component is receiving props that were giving to it from the return statement in the withFavoriteNumber
component 
        return (
            <C favoriteNumber={42} {...props}/>
        )

Can now look at the new prop via props.favoriteNumber. Need curly braces around the component when imported (import {withFavoriteNumber})
function App(props) {return (<div>{props.favoriteNumber}</div>)}

import React from "react"
import {withFavoriteNumber} from "./withFavoriteNumber"

function App(props) {  -> receives augmented props from withFavoriteNumber function  
    return (
        <div>{props.favoriteNumber}</div>
    )
}
export default withFavoriteNumber(App) -> invokes withFavoriteNumber function on App component by passing App as a parameter. 

_____________________________________________________________________________________________________________________________________
5. HIGHER ORDER COMPONENTS - PT5:TOGGLER EXAMPLE  

The App component is rendering a <Menu /> and <Favorite /> component. 

    import React from "react"
    import Menu from "./Menu"
    import Favorite from "./Favorite"

    function App() {
        return (
            <div>
                <Menu />
                <hr />
                <Favorite />
            </div>
        )
    }
    export default App

Menu is a stateful component. The ability of the Menu is to either show or hide the menu. There is a 'Hide Menu' button that turns into a
'Show Menu' button. There is a toggleShow() method which sets the state and flips the show boolean from either true or false or false to 
true. Render has some display logic that uses that state to either hide menu or show menu. Whether to display it or not display it. In 
essence, this is toggling the boolean and the boolean determines if the menu shows or hides. 

    import React, {Component} from "react"

    class Menu extends Component {
        state = {
            show: true
        }
        
        toggleShow = () => {
            this.setState(prevState => {
                return {
                    show: !prevState.show
                }
            })
        }
        
        render() {
            return (
                <div>
                    <button onClick={this.toggleShow}>{this.state.show ? "Hide" : "Show"} Menu </button>
                    <nav style={{display: this.state.show ? "block" : "none"}}>
                        <h6>Signed in as Coder123</h6>
                        <a>Your Profile</a>
                        <a>Your Repositories</a>
                        <a>Your Stars</a>
                        <a>Your Gists</a>
                    </nav>
                </div>
            ) 
        }
    }
    export default Menu

The Favorite component is doing something similar to Menu. It has a boolean called isFavorited that indicates if something is toggled or 
not. The toggleFavorite method/function toggles on and off. Render has some display logic that uses the isFavorited boolean to determine 
if it should be full heart or an empty heart. When the heart is clicked, it toggles the state and displays the full heart or empty heart. 

    import React, {Component} from "react"

    class Favorite extends Component {
        state = {
            isFavorited: false
        }
        
        toggleFavorite = () => {
            this.setState(prevState => {
                return {
                    isFavorited: !prevState.isFavorited
                }
            })
        }
        
        render() {
            return (
                <div>
                    <h3>Click heart to favorite</h3>
                    <h1>
                        <span 
                            onClick={this.toggleFavorite}
                        >
                            {this.state.isFavorited ? "❤️" : "♡"}
                        </span>
                    </h1>
                </div>
            ) 
        }
    }
    export default Favorite

Although some of the names are different, the implementation of the Menu and Favorite component are the same. This will be a great use case
of using HOC to share the toggle methods and state between the 2 components that need it. HOC can be thought of as a function that can beef
up or improve the abilities of other components. Separating these components into a HOC can be a bit confusing but surely achievable. 

First step is to create a folder entitled HOCs. Inside folder create a file called withToggler.js. Remember the definition of a HOC: 
"HOC is a function that takes a component as a parameter and returns a new component wrapping the given component and "supercharging" it 
by giving it some extra abilities."  This HOC will return a new Toggler component, which needs to be created. Before creating the Toggler
component, implement the withToggler function on the Menu and Favorite components to get a better idea as to why I'm returning a Toggler. 

    export function withToggler(component) {
        return function(props) {
            return (
                <Toggler />
            )
        }
    }
    export withToggler

Go to Favorite component and import withToggler. Will use the curly braces because it is a 'named' import because did not export withToggler
using 'export default'. Can now use the withToggler function in the Favorite component. Since an HOC is a function that takes a component
as a parameter, 1st step is to invoke the withToggler function on Favorite component by passing Favorite as a parameter:  

    import {withToggler} from "./HOCs/withToggler"
    export default withToggler(Favorite)

May also be helpful to split on 2 lines. Because a new function is returned, which is the supercharged component. So not exporting the 
component Favorite, but instead the enhanced/supercharged version of the component.   
    const SuperchargedFavoriteComponent = withToggler(Favorite)
    export default SuperchargedFavoriteComponent

Go to Menu component and implement withToggler function by repeating process (import withToggler and export default withToggler(Menu)).
    
    import {withToggler} from "./HOCs/withToggler"
    export default withToggler(Menu) 

Back to withToggler HOC. Again, withToggler function will accept a component and return a new component that will essentially wrap around
the given component. At this point the <Toggler /> component does not exist and currently not using the component that was passed in to
the withToggler(component) function. So next step is to pass the component down to Toggler via props. And ensure any props that get passed 
to component get passed along. 

    export function withToggler(component) { -> runs on top of the Favorite component and will receive Favorite component as a prop
        return function(props) {             -> returns a new component that is a function that takes props
            return (
                <Toggler component={component} {...props}/>  ->passing component down and passing along props that get passed to component
            )
        }
    }
 
The Toggler component is going to hold all of the functionality and state that the Menu and Favorites components are duplicating. So need
to create the Toggler component and because it will hold state will use a class. The state will be a generic toggler 'on' with a default 
value of false. Then create a toggle method that sets the state to flip from on to off and off to on. Will need to know what previous state
was and setState() will return new state where the on value is the opposite of previous state when its on. 

For render(), need to understand what exactly is the component rendering/what will appear on screen. Since I passed a component prop to 
<Toggler/>, ->     <Toggler component={component} {...props}/>

in the Toggler class, I should have 'this.props.component' and the value ('{component}' in component={component}) should be the component
that I am trying to render (what I'm trying to render is the the component passed in as a parameter to withToggler(component) function). 
I could render a new variable called Components that equals this.props.component. So when I run the withToggler() function 
(which runs on top of the Favorite component by way of export default withToggler(Favorite)). So this.props.component should come from 
the component passed in the withToggler(component) function and passed down in the instance of Toggler by way of component={component}. 
All of this under the hood will be captured in the variable Component.  And what is returned is a new instance of <Component />. If I were
to run an instance of <Component /> at this point, what will appear on the page is what the Favorite component renders. Now I can begin
supercharging the new variable Component by passing to the instance of <Component /> a prop called on and give it a value of this.state.on.  
In addition to the state variable, provide new instance of <Component /> a way to change the state variable by passing the toggle method 
down. Also include any props that have passed along via {...this.props}. 

    render() {
            const Component = this.props.component
            return (
                <Component on={this.state.on} toggle={this.toggle} {...this.props} />
            )
        }

Here is the current withToggler HOC. In summary, this is what is happening. In the Favorites component, I am importing {withToggler}. 
withToggler is function that takes a component and returns a new component. That component wraps the <Toggler /> component. The component
passed to withToggler (which is the Favorite component) is passed down to the </Toggler /> component. In the Toggler class component, there
is some stateful logic via state object and toggle method. Render returns the component that was originally passed to withToggler(). 
So started with the Favorites component which was passed to withToggler() as parameter entitled components. Components was passed down to
the <Toggler /> instance and the <Toggler /> finally rendered it. 

import React, {Component} from "react"

class Toggler extends Component {
    state = {
        on: false
    }
    
    toggle = () => {
        this.setState(prevState => {
            return {
                on: !prevState.on
            }
        })
    }
    
    //withToggler() receives parameter (which is the Favorite component). withToggler() returns a new component that accepts props parameter.  
    //this.props.component captures the Favorite component and puts it in a variable called Component. Returns an instance of <Component /.  
    //Supercharges the Favorite component by adding new state variable 'on' and ability to change variable by passing the toggle method.      
    render() { 
        const Component = this.props.component 
        return (
            <Component on={this.state.on} toggle={this.toggle} {...this.props} />  ->returns component originally passed to withToggler()
        )
    }
}

export function withToggler(component) { -> runs on top of the Favorite component and will receive Favorite component as a prop
    return function(props) {             -> returns a new component that is a function that takes props and wraps the <Toggler/> component
        return (
            <Toggler component={component} {...props}/>   ->passing component from withToggler() down and passing along props that get passed to component
        )
    }
}

The Toggler class has added the stateful logic and gives it to the original component via props:  
        return (<Component on={this.state.on} toggle={this.toggle} {...this.props} />)}
This is beneficial because I can now remove the stateful logic from Favorite.js. Once stateful logic removed, will need to make slight 
changes to the Favorites component because currently component is not creating its own method to toggle its own state. Need to update 
onClick to {this.props.toggle}. This is so because in withToggler component, I am rendering the component and giving it a prop called 
toggle via this.props.toggle. Similarly, passing down the state thru props called 'on'. So in Favorite.js, its no longer this.state.isFavorited 
but instead should be updated to this.props.on. Can click the heart on the screen and it changes. 

import React, {Component} from "react"
import {withToggler} from "./HOCs/withToggler"

class Favorite extends Component {
    render() {
        return (
            <div>
                <h3>Click heart to favorite</h3>
                <h1>
                    <span 
                        onClick={this.props.toggle}
                    >
                        {this.props.on ? "❤️" : "♡"}
                    </span>
                </h1>
            </div>
        ) 
    }
}
const SuperchargedFavoriteComponent = withToggler(Favorite)
export default SuperchargedFavoriteComponent

Because of withToggler, the Favorites and Menu components are no longer dealing with state and lifecycle methods, can make simplify them
to be functional components. The changed classed components turned functional components below. No longer using Component and updating 
removing instances of 'this'.  

    import React from "react"
    import {withToggler} from "./HOCs/withToggler"

    function Menu(props) {
        return (
            <div>
                <button onClick={props.toggle}>{props.on ? "Hide" : "Show"} Menu </button>
                <nav style={{display: props.on ? "block" : "none"}}>
                    <h6>Signed in as Coder123</h6>
                    <a>Your Profile</a>
                    <a>Your Repositories</a>
                    <a>Your Stars</a>
                    <a>Your Gists</a>
                </nav>
            </div>
        ) 
    }
    export default withToggler(Menu)


    import React, {Component} from "react"
    import {withToggler} from "./HOCs/withToggler"

    function Favorite(props) {
        return (
            <div>
                <h3>Click heart to favorite</h3>
                <h1>
                    <span 
                        onClick={props.toggle}
                    >
                        {props.on ? "❤️" : "♡"}
                    </span>
                </h1>
            </div>
        ) 
    }
    const SuperchargedFavoriteComponent = withToggler(Favorite)
    export default SuperchargedFavoriteComponent    

The withToggler component can accept an additional parameter such as an optionsObject. The optionsObject can have a property called 
defaultOnValue. This will be an additional value passed down to <Toggler />. Instead of saying 'on' value will always be false, 
can update the state to obtain the 'on' value from the defaultOnValue via props. So optionsObject is a new 2nd parameter in withToggler() 
that is an object that has a property called defaultOnValue. Now need to implement this in the Favorite and Menu components. Instead of 
just passing the components, also need to pass in the defaultOnValue.  For Favorite, the default value is false and for Menu the default
value is true. Refresh page and the menu is showing by default and the heart is un-favorited by default. Final components and HOC below. 

import React, {Component} from "react"
class Toggler extends Component {
    state = {
        on: this.props.defaultOnValue
    }
    
    toggle = () => {
        this.setState(prevState => {
            return {
                on: !prevState.on
            }
        })
    }
    
    render() {
        const Component = this.props.component
        return (
            <Component on={this.state.on} toggle={this.toggle} {...this.props} />
        )
    }
}

export function withToggler(component, optionsObj) {
    return function(props) {
        return (
            <Toggler component={component} defaultOnValue={optionsObj.defaultOnValue} {...props}/>
        )
    }
}

import React from "react"
import {withToggler} from "./HOCs/withToggler"
function Menu(props) {
    return (
        <div>
            <button onClick={props.toggle}>{props.on ? "Hide" : "Show"} Menu </button>
            <nav style={{display: props.on ? "block" : "none"}}>
                <h6>Signed in as Coder123</h6>
                <a>Your Profile</a>
                <a>Your Repositories</a>
                <a>Your Stars</a>
                <a>Your Gists</a>
            </nav>
        </div>
    ) 
}
export default withToggler(Menu, {defaultOnValue: true})

import React, {Component} from "react"
import {withToggler} from "./HOCs/withToggler"
function Favorite(props) {
    return (
        <div>
            <h3>Click heart to favorite</h3>
            <h1>
                <span 
                    onClick={props.toggle}
                >
                    {props.on ? "❤️" : "♡"}
                </span>
            </h1>
        </div>
    ) 
}
const SuperchargedFavoriteComponent = withToggler(Favorite, {defaultOnValue: false})
export default SuperchargedFavoriteComponent

Recap of HOC:

The initial problem was that the Favorite and Menu components were implementing their own logic which essentially did the same thing. Both
had a single boolean and had a toggle method for the boolean. So you had a this duplicated logic. The problem is duplicated logic and the
goal is reusability. 

withToggler() takes a component and instead of rendering the component immediately, it renders a custom component <Toggler />. In order for 
<Toggler /> to eventually render the component I want to render, I pass that component down to <Toggler />. Then the Toggler component 
(class Toggler extends Component) maintains the state and the ability to update the state by way of state object and toggle function. 
Then it finally renders the component I passed down to it. Instead of rendering the component as a plain component, the component is 
enhanced with an on prop and a toggle prop. Also passes down any other props so that they don't get lost in the connections. 

One last adjustment regarding withToggler...  Splitting hairs but nice to know...  With {...this.props} I am passing the rest of props down. 

 render() {
        const Component = this.props.component
        return (
            <Component on={this.state.on} toggle={this.toggle} {...this.props} />
        )
    }

With {...this.props}, I've actually tacked on a few extra props such as component and defaultOnValue. These are not going to be relevant for
the Menu or Favorite component. I can use the spread operator to pull component and defaultOnValue out. 
    <Toggler component={component} defaultOnValue={optionsObj.defaultOnValue} {...props}/>

Can do this by instead of using const Component = this.props.component. Can use object destructuring by saying. 
Can instead use const {component, defaultOnValue, ...props} = this.props.  This directly pulls out component, defaultOnValue while ...props
pulls out the rest of props as a variable called props using spread operator and set this destructuring object equal to this.props. 
There is a little trick when destructuring. Since I am rendering capital 'C' <Component /> to stay consistent with the capitalization of 
components, I can provide a name to the component property. What I am saying here is pull out the component property from this.props and 
but call it Component (capital C) instead of component (lower c). This also makes the rest of props (...props) not include the component 
and defaultOnValue properties. 
    const {component: Component, defaultOnValue, ...props} = this.props

And instead of returning {...this.props} will return {...props}

 render() {
        const {component: Component, defaultOnValue, ...props} = this.props
        return (
            <Component on={this.state.on} toggle={this.toggle} {...props} />   -> was {...this.props}
        )
    }

UPDATE...Because withToggler is importing {Component}, to avoid potential bugs, best to render <C/> instead of <Component />
 render() {
        const {component: C, defaultOnValue, ...props} = this.props
        return (
            <C on={this.state.on} toggle={this.toggle} {...props} />   -> was {...this.props}
        )
    }

This approach prevents Menu and Favorites component from being polluted with props they wont need/use like component and defaultOnValue. 

In current React environment, to build re-usability in program will likely use React Hooks instead of Higher Order Components(HOC). But 
HOC's are good to know if working with legacy code or 3rd party libraries that use HOC's. It may not be totally necessary to know how to 
write my own HOC. But it is important to clearly/deeply understand the topic. Instead of using HOC's w/o understanding them. Especially 
if I am looking to get a job using React, it will be most helpful to get as many tools under my belt as possible. 

_____________________________________________________________________________________________________________________________________
6. RENDER PROPS (OVERVIEW)

Callback functions can help explain the concept of render props. The callback function is the 2nd parameter in the addEventListener().
Can use callback functions because the method that is being called allows for it and even expects the callback function. addEventListener()
specifically needs a callback function as the 2nd parameter. As the programmer, I can use the callback function to describe/perform some
additional behavior that I want to happen. But I hand that function off to a method someone else wrote, ie the addEventListener(). And that 
method, ie the addEventListener() then gets to call my callback function whenever its code allows it to. And since its the other method, 
ie the addEventListener(), it gets to decide what parameters to pass to my initial callback function. 

In the event listeners below, the 1st parameter is the event type to be listened for. The 2nd parameter is the function that I want to have 
called whenever the 'click' event on the 'button' element happens. The purpose of the callback is it allows me a ton of flexibility to run 
whatever code I want to run when the event occurs. However, I can delegate the responsibility of listening for the specified event to this 
method that the creators of JavaScript wrote. I don't have to worry about how to listen for events and do something in response. Instead, I
just have to specify what to do in response.  

    document.getElementById("button").addEventListener("click", function() {
        console.log("Clicked!")
    })

    document.getElementById("input").addEventListener("input", function() {
        console.log("Input changed!")
    })

    document.getElementById("box").addEventListener("mouseover", function() {
        console.log("Hovered in box!")
    })


    CSS ->
    .box {
    height: 200px;
    width: 200px;
    background-color: firebrick;
    border: 1px solid darkred;
}


It is tempting to try to add parameters to these functions just like I would with a function I was creating on my own. For example, when a
button gets clicked I would like to console log the name. The approach below seems logical because with functions I can specify parameters
and use those parameters in the body of the function. This will not work as expected. An '[object MouseEvent] clicked the button!' will 
be returned. When I define the callback function, I can provide the function with any parameter. But whoever calls the function actually
decides what the actual parameter will be. The addEventListener() is calling the function, so it gets to decide what the parameter will
be for the callback function. 

    document.getElementById("button").addEventListener("click", function(name) {
        console.log(`${name} clicked the button!`)
    })

What actually gets put in the parameter is the event because it will be an object that represents the click event that just happened. And
the click event will have a ton of useful info. Whenever I use the addEventListener() method, I cannot decide what the callback function
will be called with for its argument. Instead I will likely have to research documentation to understand what arguments its going to be 
called with. Understanding the concepts of callback functions and the parameters that gets passed to them helps with understanding 
the foundation of render props. 

    document.getElementById("button").addEventListener("click", function(event) {    
    })
_____________________________________________________________________________________________________________________________________
7. RENDER PROPS (DETAIL)

Here App component is rendering an instance of <Example /> and the Example component is rendering an <h1> 'This is an example'. 

    import React from "react"
    import Example from "./Example"
    function App() {
        return (
            <div>
                <Example />
            </div>
        )
    }
    export default App


    import React from "react"
    function Example(props) {
        return <h1>This is an example</h1>
    }
    export default Example

In App.js, I can pass down props to a custom component. I can pass down a custom prop of name set to the string of Bob. In the
Example component, I am receiving props from App and can access the prop via props.name, because the name of the prop is name. 

    function App() {
        return (
            <div>
                <Example name={"Bob"} />
            </div>
        )
    }

    function Example(props) {
        return <h1>Hi {props.name}</h1>
    }

A function can also be passed down as a prop. What shows in console.log is 'Hey there'. In Example.js,
I am receiving a prop, but the prop is actually a function that I am calling and is returning the string 'Hey there'.  Whats rendered 
on the page is 'Hi Hey There'.This works because functions are just as valid an argument to another function in Javascript and they work
the same when I am passing them down as props in React. 

    function App() {
        return (
            <div>
               <Example name={function() {return "Hey there"}} />
            </div>
        )
    }

    function Example(props) {
        console.log(props.name)
        return <h1>Hi {props.name()}</h1>  -> receiving props from App and calling the function that was passed down as a prop. 
    }

How is the functional component in Example different than a regular JavaScript function in App?  The difference is the job of a functional
component is that it needs to return JSX specifically. If functional components return JSX, instead of having App return a string, can have
it return JSX.   

function App() {
        return (
            <div>
                <Example name={function() {return <h1>Hey there</h1>}} />
            </div>
        )
    }

    function Example(props) {
        return (
            <div>
                {props.name()}
            </div>
        )
    }

In App.js the function now has a spot for arguments.  In Example.js, I can invoke props.name
with an argument like "Sarah". This parameter will be accessible in App. The App component did not get to choose what data would be given
to the render function of <Example />. App renders an instance of the <Example /> component but does not get to choose what data will be
passed to the 'name' parameter in the render function. However, I do get to use parameter how I want. Since I have access the parameter, I 
can render an <h1> or put the parameter in an unordered list. The render component is providing me with data to be used in any way that I
choose.  

From the perspective of the Example component. It has no idea how I am going to render the data. But it does allow me to pass the data to
the App component. It basically saying, I am going to take whatever function I received (in this case from App), I'm going to call the 
function and pass some data to you, assuming you will use the data somehow by returning some JSX. 

Designing the program this way allows for separation of the user interface. App component decides what it should render and the data is
contained in the Example component. 

    function App() {
        return (
            <div>
                <Example render={          -> changed prop name to render, name of prop passed to Example will be called render
                    function(name) {       -> function passed accepts a parameter 
                        return <h1>Hey there, {name}</h1>  -> renders on page Hey there + the value provided as argument via Example
                    }
                }/>
            </div>
        )
    }

    function Example(props) {
        return (
            <div>
                {props.render("Sarah")}   -> takes <h1> from App + Sarah to render Hey there Sarah. In {} because Javascript inside JSX
            </div>
        )
    }

Can make example a bit more interesting. The Example component provided the App component with some data, a boolean value. App received
the data in form of the argument isDaytime. What's rendered depends upon the data passed by the Example component. 

    function App() {
        return (
            <div>
                <Example render={
                    function(isDaytime) {
                        return (
                            <h1>{isDaytime ? "Good day" : "Good evening"}, Bob!</h1>
                        )
                    }
                }/>
            </div>
        )
    }

    function Example(props) {
        return (
            <div>
                {props.render(true)}
            </div>
        )
    }
_____________________________________________________________________________________________________________________________________
8. RENDER PROPS (TOGGLER EXAMPLE)

Render props are a 2nd iteration on the idea of reusability. If have to choose between HOC and render props, will likely choose render 
props. This example refactors the HOC example by using render props. The idea is that I created a function that a component and renders 
the Toggler that I created and passes the component down so that the Toggler can then render that component. The approach with HOC is that
there is a bunch of boilerplate code that I have to write and also causes a lot of misdirection. It can be difficult to look at the Favorite
component, have it look like a regular functional component and notice that it is being augmented by withToggler(). Then go to withToggler()
and follow the logic of withToggler() that its rendering a Toggler and passing that component down and Toggler is finally rendering that 
component and passing some stuff to it. 

With render props, I can simply render the function that will be passed to the component. Let tha parent of the component decide what should
be rendered and pass the state and logic to that function. That way, can just export the Toggler function and use it where I actually want 
the Toggler to interact with the Favorite and Menu components. 

Start with Favorites.js. I want to return a <Toggler />. The <Toggler /> will take a prop called render and pass to it a function. And want
the function to return some JSX. 

    function Favorite(props) {
        return (
            <Toggler render={function() {
                return (
                    <div>
                        <h3>Click heart to favorite</h3>
                        <h1>
                            <span 
                                onClick={props.toggle}
                            >
                                {props.on ? "❤️" : "♡"}
                            </span>
                        </h1>
                    </div>
                )
            }}/>
        ) 
    }

Now need to set up Toggler so that it can accept a render prop, call it and pass some data to it. The class Toggler is a stateful component
and is calling render().  Toggler gets to choose what it wants to pass in the render() call. So what data do I want to pass to the render()
method so that its useful to place that is using the Toggler component?  Favorite.js is using the Toggler component and is expecting some
info to display the 'on' variable and to do something on a click. This info is housed in Toggler which has state and the toggle method. So 
in the render call, can pass the current state of the 'on' property and also the toggle method. 

    class Toggler extends Component {
        state = {
            on: this.props.defaultOnValue
        }
        
        toggle = () => {
            this.setState(prevState => {
                return {
                    on: !prevState.on
                }
            })
        }
        
        render() {
            return (
                <div>
                    {this.props.render(this.state.on, this.toggle)}
                </div>
            )
        }
    }

On Favorite.js, the function is receiving 2 parameters from the Toggler, on and the toggle method. So the parameters in the function 
can be called on and toggle. The Favorite component is not receiving the data thru props thus any reference of props should be removed 
from onclick={} and the ternary operator. Unlike the HOC, the data is passed thru the 2 parameters. 

    function Favorite(props) {
        return (
            <Toggler render={
                function(on, toggle) {
                    return (
                        <div>
                            <h3>Click heart to favorite</h3>
                            <h1>
                                <span 
                                    onClick={toggle}
                                >
                                    {on ? "❤️" : "♡"}
                                </span>
                            </h1>
                        </div>
                    )
                }
            }/>
        ) 
    }

Refactored as an arrow function.  The <Toggler /> is passing a function and receiving some state and the ability to toggle the state 
by way of the parameters on and toggle. JSX then uses the on and toggle to change the heart. Using render props is considerably simpler
than using HOC's to solve the same problem.    

    function Favorite(props) {
        return (
            <Toggler render={
                (on, toggle) => (
                    <div>
                        <h3>Click heart to favorite</h3>
                        <h1>
                            <span 
                                onClick={toggle}
                            >
                                {on ? "❤️" : "♡"}
                            </span>
                        </h1>
                    </div>
                )
            }/>
        ) 
    }

For the Menu component, the function needs to render the <Toggler />, which will take a prop called render which will be equal to a 
function. And the function will return some JSX. The function will be called with the current state of on and with the ability to toggle. 
Remove references of props from onclick and style. 

function Menu(props) {
    return (
        <Toggler defaultOnValue={true} render={(on, toggle) => (
            <div>
                <button onClick={toggle}>{on ? "Hide" : "Show"} Menu </button>
                <nav style={{display: on ? "block" : "none"}}>
                    <h6>Signed in as Coder123</h6>
                    <p><a>Your Profile</a></p>
                    <p><a>Your Repositories</a></p>
                    <p><a>Your Stars</a></p>
                    <p><a>Your Gists</a></p>
                </nav>
            </div>
        )}/>
    ) 
}

If user forgets to include the defaultOnValue prop, can make use of default props in React. Default props is a static property, Meaning 
can use the static keyword and actually bring inside of the class. The static defaultProps value will be set to false. This is good 
practice if the component is expecting a prop in order to function but theres a chance someone may not provide it. The menu should be 
showing by default and the heart should be unfavorited by default. 

Revised Components: 

App.js file ->
import React from "react"
import Menu from "./Menu"
import Favorite from "./Favorite"

function App() {
    return (
        <div>
            <Menu />
            <hr />
            <Favorite />
        </div>
    )
}
export default App

Favorite.js file ->
import React, {Component} from "react"
import Toggler from "./Toggler"

function Favorite(props) {
    return (
        <Toggler render={
            (on, toggle) => (
                <div>
                    <h3>Click heart to favorite</h3>
                    <h1>
                        <span 
                            onClick={toggle}
                        >
                            {on ? "❤️" : "♡"}
                        </span>
                    </h1>
                </div>
            )
        }/>
    ) 
}
export default Favorite

Menu.js file ->
import React from "react"
import Toggler from "./Toggler"

function Menu(props) {
    return (
        <Toggler defaultOnValue={true} render={(on, toggle) => (
            <div>
                <button onClick={toggle}>{on ? "Hide" : "Show"} Menu </button>
                <nav style={{display: on ? "block" : "none"}}>
                    <h6>Signed in as Coder123</h6>
                    <p><a>Your Profile</a></p>
                    <p><a>Your Repositories</a></p>
                    <p><a>Your Stars</a></p>
                    <p><a>Your Gists</a></p>
                </nav>
            </div>
        )}/>
    ) 
}
export default Menu

Toggler.js file ->
import React, {Component} from "react"

class Toggler extends Component {
    state = {
        on: this.props.defaultOnValue
    }
    
    static defaultProps = {
        defaultOnValue: false
    }
    
    toggle = () => {
        this.setState(prevState => {
            return {
                on: !prevState.on
            }
        })
    }
    
    render() {
        return (
            <div>
                {this.props.render(this.state.on, this.toggle)}
            </div>
        )
    }
}
export default Toggler

PROGRAM WITH ES6 SIMPLIFICATIONS/DESTRUCTURING************************************************************************  

Toggler.js file (with ES6 Simplifications->
import React, {Component} from "react"

class Toggler extends Component {
    state = {
        on: this.props.defaultOnValue
    }
    
    static defaultProps = {
        defaultOnValue: false
    }
    
    toggle = () => {
        this.setState(prevState => ({on: !prevState.on}))
    }
    
    render() {
        return (
            <div>
                {this.props.render({  -> instead of calling 2 parameters, now wrapped in an object. Also updated Favorite & Menu. 
                    on: this.state.on, 
                    toggle: this.toggle
                })}
            </div>
        )
    }
}
export default Toggler

Favorite.js file (Destructuring) -> 
import React, {Component} from "react"
import Toggler from "./Toggler"

function Favorite(props) {
    return (
        <Toggler render={
            ({on, toggle}) => ( ->  wrapping in {} means destructuring the object that is being passed to this function from Toggler
                <div>
                    <h3>Click heart to favorite</h3>
                    <h1>
                        <span 
                            onClick={toggle}
                        >
                            {on ? "❤️" : "♡"}
                        </span>
                    </h1>
                </div>
            )
        }/>
    ) 
}
export default Favorite

Menu.js file (Destructuring) -> 
import React from "react"
import Toggler from "./Toggler"

function Menu(props) {
    return (
        <Toggler defaultOnValue={true} render={({on, toggle}) => (  -> destructuring object that is being pass to function from Toggler
            <div>
                <button onClick={toggle}>{on ? "Hide" : "Show"} Menu </button>
                <nav style={{display: on ? "block" : "none"}}>
                    <h6>Signed in as Coder123</h6>
                    <p><a>Your Profile</a></p>
                    <p><a>Your Repositories</a></p>
                    <p><a>Your Stars</a></p>
                    <p><a>Your Gists</a></p>
                </nav>
            </div>
        )}/>
    ) 
}
export default Menu

The idea of render props were not built into React. React did not anticipate people using render props from the beginning. Instead its a
pattern that has emerged by making use of things that are already available in Javascript and React like passing functions down as props. 
And as such, there will be a bunch of different ways I can make use of render props. This is just a single way, but not the only way. 
There are multiple ways to use this concept/pattern. Again, render props are significantly much simpler than HOC's to think/reason about 
and also to write. 
_____________________________________________________________________________________________________________________________________
8a. RENDER PROPS (PRACTICE)

Part 1: Pass the loading state and the data state through to the component needing it.

Part 2: Call the function the DataFetcher is expecting. Should receive the data and the loading state, and return the JSX
that makes use of that info. If the data is still loading, display "Loading..." in an h1 element, and once the data has loaded, 
just display the data with `<p>{JSON.stringify(data)}</p>`  With the render props pattern, you can use a custom prop 
(typically called `render`), OR you can use `props.children`. This approach uses props.children. 

The DataFetcher is a class component that is holding a loading state and the data I am fetching. As soon as the data mounts, it will set
the loading state to true. And then it will do a request to try to get the url and the url is being passed thru props 
(because url passed in instance of <DataFetcher /> via App.js. Once data received, loading is set to false because it has completed 
loading and sets the data that came from API to the data property.  

Start with DataFetcher. In the render props pattern, need to call a function that's being passed to this component. This component doesn't
care about how the data is being used. Instead its going to leave that task to the component that is using the DataFetcher. What this 
component does care about is the maintenance of state, and in the componentDidMount, updating state, making the fetch() call and returning
the data. DataFetcher will render/call this.props.children and pass the data the outside component needs. DataFetcher does not care about
what is getting rendered, it will only render what the children prop tells it to render. In this case, the children prop needs to be a 
function because I am calling that function.  Final component for DataFetcher....................................

import React, {Component} from "react"
class DataFetcher extends Component {
    state = {
        loading: false,
        data: null
    }
    
    componentDidMount() {
        this.setState({loading: true})
        fetch(this.props.url)
            .then(res => res.json())
            .then(data => this.setState({data: data, loading: false}))
    }
    
    render() {
        return (
            this.props.children(this.state.data, this.state.loading)
        )
    }
}
export default DataFetcher

In App.js, Begin by creating a function for the child prop: 
 <DataFetcher url="https://swapi.co/api/people/1">
                {() => {}}
            </DataFetcher>

DataFetcher will be passing the data and loading status to this function. So now have use to these things. By using the DataFetcher, I get
to be in charge of what is rendered here. 
<DataFetcher url="https://swapi.co/api/people/1">
                {(data, loading) => {}}
            </DataFetcher>

Final App component.............................................
import React from "react"
import DataFetcher from "./DataFetcher"

function App() {    
    return (
        <div>
            <DataFetcher url="https://swapi.co/api/people/1">
                {(data, loading) => {
                    return (
                        loading ? 
                        <h1>Loading...</h1> :
                        <p>{JSON.stringify(data)}</p>
                    )
                }}
            </DataFetcher>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
9. REACT TREE RENDERING 

In order to understand how to increase the performance of a React app, need to understand how React actually renders the components that 
it renders. React will recursively render components down one branch until there are no more components to render. What this means is that
the component at the end of the branch is just rendering a regular html element or not rendering a custom component that I created. 
Stated visually:

                                        <App/>
                                          |
                                        <Grandparent/>
                                            |
                                         <Parent/>
                                             |   
                                          <Child/>
                                              |
                                           <Grandchild/>

Changes to state or props in any component will recursively re-render down the remaining tree whether those components have changed or not. 
For example, if there is a state change on the Child level, React will re-render the subtree, the instance of the Grandchild component. This 
will occur even if the state change is with App. React will re-render the entire subtree, even if App was holding its own state and not 
passing down props. It will cause a significant decrease in performance if components were re-rendered that did not need to be re-rendered.

React has provided a few ways to optimize this process. The shouldComponentUpdate() method, React.PureComponent and React.memo() are tools
used to help fix this problem. 

recursive: relating to or involving the repeated application of a rule, definition, or procedure to successive results.

*/