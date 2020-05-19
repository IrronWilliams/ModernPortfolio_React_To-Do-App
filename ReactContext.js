/*1. Intro.  In version 16.3, React officially released their stable API for using context. In React you can only pass data downward thru props. 
However, if I have 2 components that are on the same level in the subtree and both need the same state, I will need to lift that state up
to a higher component. So will need to put state in its parent component and then pass the data down to the components that need it thru

[] []  these 2 component need the same state. Will need to lift state up to a higher component than pass the data down:

******
[]  -> state resides here and will pass down data to the components on the lower subtree. 

[] []
******
While developing application, I realize the sibling to where the state is now needs the data as well. Once again, I will need to lift state
up and pass the data down as props. 

******
[]  -> state now resides here and is being passed down the subtree. 

[]  [] -> state used to reside in the left component but lifted up a level to pass down to lower levels. This component now receives data via props. 

[] []
******

Passing props a couple of layers isn't so bad, especially if the siblings are next to each other. But will be a challenge if the components
are not close and need the same state. In this case, I will have to lift state to the top of the tree, <App />, and continue to keep passing
state down the subtree until it reaches the appropriate component. This can be a tedious process especially if the subtree has multiple 
layers. This tedious process is called prop drilling. This occurs when you use components who don't need state but are used to pass state
to the acutal component that needs it. This is a problem that Context can solve. 

Context provides a way to pass data through the component tree w/o having to pass props down manually at every level. In summary, you will
choose a common parent for the components that need to share state. The parent will be wrapped in whats called a Provider. Then wrap all
of the components that need the data in whats called a Consumer. The Provider and Consumer pair allows React to create a context tunnel 
that leads directly to whatever is consuming the data. Can pass anything I want thru the tunnel. In addition to data, may pass a method 
that allows the Consumer to modify the data. Although Context should not be reached for in every circumstance, it is robust enough that it
has become for a lot of people their state management tool of choice. Some have ripped Redux, Mubx, RXJS out of their projects and replaced
with Context.   
________________________________________________________________________________________________
2. CONTEXT PROVIDER

To create a new context, use the create context method that comes with the React package, React.createContext(). Context works around a 
provider and a consumer. Will be wrapping the the component that I want to provide context to in the provider and any child component that
I want to consume the context will be wrapped in a consumer. When I use create.Context() what I get back is whats called a compound 
component. Which means ThemeContext is an object which has a couple of properties that are components. Meaning ThemeContext will have
ThemeContext.Provider & ThemeContext.Consumer. There is a prop that I always have to pass to the provider called the value prop. And the 
value prop is the data that I am trying to save, such as a boolean or a number. Here, I am saving the string either light or dark.  

    const ThemeContext = React.createContext()

If I want the entire app to have access to the context, I will wrap the entire App in ThemContext.Provider. 

    ReactDOM.render(
    <ThemeContext.Provider value={'light'}> -> Provider is the component and ThemeContext is holding Provider as a property with value prop
        <App />               -> Wrapping the App component 
    </ThemeContext.Provider>,
    document.getElementById("root")
)
________________________________________________________________________________________________
3. CONTEXT TYPE

the App component is now being wrapped by the ThemeContext Provider. The goal of components is to change the "light' in 
className="light-theme" (Button and Header components) to come from the context, either light or dark. Current state of files:

from index.js -> wrapping component in ThemeContext Provider 
import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import ThemeContext from "./themeContext"

ReactDOM.render(
    <ThemeContext.Provider value={"light"}>
        <App />
    </ThemeContext.Provider>, 
    document.getElementById("root")
)

from App.js -> rendering Header and Button components 
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

from themeContext.js -> putting themeContext in separate file to avoid bugs in program
import React from "react"
const ThemeContext = React.createContext()
export default ThemeContext

from Button.js -> rendering button on page 
import React, {Component} from "react"

class Button extends Component {
    render() {
        return (
            <button className="light-theme">Switch Theme</button>
        )    
    }
}
export default Button

from Header.js -> rendering header element with an h2. 
import React, {Component} from "react"

class Header extends Component {
    render() {
        return (
            <header className="light-theme">
                <h2>Light Theme</h2>
            </header>
        )    
    }
}
export default Header

from css -> for the class names in Header and Button components 
body {
    margin: 0;
    padding: 0;
}

header {
    padding: 20px;
}

button {
    padding: 10px;
    border: none;
    margin: 10px;
}

.dark-theme {
    background-color: #333333;
    color: whitesmoke;
}

.light-theme {
    background-color: whitesmoke;
    color: #333333;
}

There are a few different ways to consumer context. The 1st is the most straight forward and simplest but also the most restrictive. 1st
approach is to add a static property to the class based component Button called contextType and set it equal to ThemeContext. 
        Button.contextType = ThemeContext

By setting up the static property contextType on the Button class based component, I now have a property called this.context. The value
of this.context will be whatever value I passed into the provider (value={'light'}). What will be logged is the string light. And if I 
changed the value={'dark'}, what will be logged is the string dark. The value is aligned to this.context. 

    class Button extends Component {
        render() {
            console.log(this.context)  
            return (
                <button className="light-theme">Switch Theme</button> -> can manually change to "dark-theme" but want to update based on this.context 
            )    
        }
    }
    Button.contextType = ThemeContext  ->setting up static property which will give me access to property this.context
    export default Button

Can make the button apply the CSS class based upon the this.context property received by the value prop value={'light'}. Can update the 
return in render the old fashioned way -> <button className={this.context + "-theme"}>Switch Theme</button> 
Or use string interpolation -> <button className={`${this.context}-theme`}>Switch Theme</button>
Context is a little vague so can save this.context in a theme variable and update the string interpolation. 

    class Button extends Component {
        render() {
            const theme = this.context
            return (
                <button className={`${theme}-theme`}>Switch Theme</button>
            )    
        }
    }
    Button.contextType = ThemeContext
    export default Button

Updated Button and Header component with static property this.context and ternary operator to conditionally change text. 

from Button.js -> with static property and ternary operator
import React, {Component} from "react"
import ThemeContext from "./themeContext"

class Button extends Component {
    render() {
        const theme = this.context
        return (
            <button className={`${theme}-theme`}>Switch Theme</button>
        )    
    }
}
Button.contextType = ThemeContext
export default Button

from Header.js -> with static property and ternary operator
import React, {Component} from "react"
import ThemeContext from "./themeContext"

class Header extends Component {
    static contextType = ThemeContext
    render() {
        const theme = this.context
        return (
            <header className={`${theme}-theme`}>
                <h2>{theme === "light" ? "Light" : "Dark"} Theme</h2>
            </header>
        )    
    }
}
export default Header

Context type is a bit limited because it only works in class components and not really a good way to pass down the method that allows me
to change the context. 
________________________________________________________________________________________________
3A. CONTEXT PRACTICE 1

* Challenge: Set up context to save the user's username and pass it to anywhere that is currently hardcoding "Username".
* Use the static class property `contextType` on any components that need to consume context.

from userContext.js -> created Context file. UserContext is a compounded function that has properties for Provider and Consumer 
import React from "react"
const UserContext = React.createContext()
export default UserContext

from index.js -> wrapped App in Provider and provided value prop
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import UserContext from "./userContext"

ReactDOM.render(
    <UserContext.Provider value={"sally123"}>
        <App />
    </UserContext.Provider>, 
    document.getElementById("root")
)

from App.js -> needed to convert functional component to class based component
import React from "react"
import Header from "./Header"
import UserContext from "./userContext"

class App extends React.Component {
    static contextType = UserContext
    
    render() {
        const username = this.context
        return (
            <div>
                <Header />
                <main>
                    <p className="main">No new notifications, {username}! 🎉</p>
                </main>
            </div>
        )
    }
}
export default App

from Header.js -> imported userContext
import React, {Component} from "react"
import UserContext from "./userContext"

class Header extends Component {
    static contextType = UserContext
    
    render() {
        const username = this.context
        return (
            <header>
                <p>Welcome, {username}!</p>
            </header>
        )    
    }
}
export default Header

from CSS -> cool brown background color (color of UPS)
body {
    margin: 0;
    padding: 0;
}

header {
    padding: 20px;
    background-color: #333333;
    color: whitesmoke;
}

main {
    padding: 20px;
}
________________________________________________________________________________________________
4. CONTEXT CONSUMER

Using the static contextType property on class based components allows the component to access a property called this.context. And the 
value of this.context is the value that is being passed down to the Provider thats wrapping the parent component. The static approach
is limited because it only works on class based components. The more common thing I will see is to use the consumer of the provider/consumer
pair that is received from React.createContext(). 

To create an instance of consumer: <ThemeContext.Consumer></ThemeContext.Consumer>. The way consumer works is using a render prop that will
be injected into the children elements. With render props, can either provide a render prop in 2 ways. 

    function Button(props) {
        return (
            <ThemeContext.Consumer render>                ->optionA - can provide render property here 
                
            </ThemeContext.Consumer>
            <button className={`${theme}-theme`}>Switch Theme</button>
        )    
    }

Can use a child element, {} = this.props.children. But the way ThemeContext.Consumer implements the children is by calling a function. So I
need to provide a function and when function is called it will be called with the context value, in this case the theme that I want to use. 
So I am providing a function and the function will return the elements that I want to have access to the context value, ie theme. So the 
button is moved inside of the thing the function returns. Now because its inside of a function that will be called with the value (theme)
of the context, I have access to it inside of the button.  

    function Button(props) {
        return (
            <ThemeContext.Consumer>  ->provides the instance of consumer a function {() =>} and function will receive the props value 
                {theme => (                                                      -> optionB provide the prop with a child element. 
                    <button className={`${theme}-theme`}>Switch Theme</button>
                )}
            </ThemeContext.Consumer>
        )    
    }

Also updating Header.js

    function Header(props) {
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <header className={`${theme}-theme`}>
                        <h2>{theme === "light" ? "Light" : "Dark"} Theme</h2>
                    </header>
                )}
            </ThemeContext.Consumer>
        )    
    }

To this point, I have wrapped the entire application in the Provider. What this means is that at any point in the subtree (Button/Header), 
I can use the consumer to catch the value that was provided by the provider. Can think of this as a game of catch where the provider is 
tossing the value and the components using the consumer are catching the value. This is different than from index.js take the prop value,
pass it to the App via a prop, then from App.js pass from props parameter, pass value down to the instances of Header and Button. Using this
approach to pass down 2 levels is not so bad. But with something like the UI themes light-theme and dark-theme, I will likely want this 
theme in many locations in the app. Another thing to note is that the consumer theme is currently inside the Header component. This means 
that if I wanted to use the Header elsewhere, it will automatically have the theme applied to it. And I wouldn't have to re-implement the 
idea of accepting a theme and rendering the header. This makes sense for something that I want consistent across the board. But for Button,
I may not want every single button to adhere to the theme. Currently, every time I create an instance of a button, it wil automatically 
use the ThemeContext.Consumer context and use the them in its styling. I can restructure so that themeContext is pulled into App.js and 
wrapping around <Button/> separately. Then in this case, I will pass the them down thru props. 

Because I do not want the theme applied to every button, but want to pass the theme via props, can update Button.js accordingly. 
function Button(props) {    
    return (
        <button className={`${props.theme}-theme`}>Switch Theme</button> ->telling Button function it will receive a prop called theme
    )    
}

From App.js import themeContext and create a couple instances of Button. For the 1st Button, I want it to use the theme context so wrap
it in the consumer. 1st Button will use the render prop pattern so will have a function that receives the theme and the function will 
render the button. And told the Button component that it will receive a prop called theme, so theme={theme}. The 2nd button is outside
the consumer but still need to make sure that I pass a theme to it and can initially hard code as light. Because I am 

    function App() {
        return (
            <div>
                <Header />
                <ThemeContext.Consumer>   ->1st button uses render prop pattern, has function that renders the button 
                    {theme => (
                        <Button theme={theme} />  -> passing prop to Button.js
                    )}
                </ThemeContext.Consumer>
                
                <Button theme="light" />  ->2nd button passing theme to Button component that will receive as a parameter, Button(props)
            </div>
        )
    }

This shows that there are multiple ways to consume context. If I don't want every instance of button to use the context, I can apply the
approach above. Or if I want all buttons to look and have the same theme, I an put the theme in the Button component. 

Because the Button component is expecting a theme prop, need to add some stability in the event the prop is not provided. To make the 
button a bit more stable, dealing with consequence of passing in an incorrect prop or none at all. Can use prop types or default props, to
make sure there will always be a prop for theme. To accomplish this, go to Button.js and import PropTypes. Then add a static property
to Button function called propTypes which will be an object. Within object, to limit the props to either light or dark, use oneOf() 
method. theme: PropTypes.oneOf(["light", "dark"]).  Can also add a defaultProp where the theme is light. This will ensure that if I render 
an instance of Button w/o a theme, it will automatically default to the light theme and if I were to use a theme besides light/dark
I will get a warning. 

Final files below:

from themeContext.js -> creating context. 
import React from "react"
const ThemeContext = React.createContext()
export default ThemeContext

from App.js -> passing button theme thru App. creating consumers to consume context. rendering multiple instances of Button
import React from "react"
import Header from "./Header"
import Button from "./Button"
import ThemeContext from "./themeContext"

function App() {
    return (
        <div>
            <Header />
            <ThemeContext.Consumer>
                {theme => (
                    <Button theme={theme} />   ->uses render prop pattern so will receive a function {() => {}}, which renders the button 
                )}
            </ThemeContext.Consumer>        ->not passing theme to Button component.  propTypes/default Props used to address this
            
            <Button theme="monkey"/>     ->passing theme to Button component that will receive as a parameter, Button(props)
            <Button />
            
        </div>
    )
}
export default App

from Button.js -> theme not on button. Receives props from App.js. Created stability with propTypes and defaultProps
import React from "react"
import PropTypes from "prop-types"
import ThemeContext from "./themeContext"

function Button(props) {
    return (
        <button className={`${props.theme}-theme`}>Switch Theme</button>
    )    
}

Button.propTypes = {
    theme: PropTypes.oneOf(["light", "dark"])
}

Button.defaultProps = {
    theme: "light"
}
export default Button

from Header.js -> theme in the Header. Contains ternary operator for text  
import React, {Component} from "react"
import ThemeContext from "./themeContext"

function Header(props) {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <header className={`${theme}-theme`}>
                    <h2>{theme === "light" ? "Light" : "Dark"} Theme</h2>
                </header>
            )}
        </ThemeContext.Consumer>
    )    
}
export default Header

from index.js -> wrapping App with Provider
import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import ThemeContext from "./themeContext"

ReactDOM.render(
    <ThemeContext.Provider value={"dark"}>
        <App />
    </ThemeContext.Provider>, 
    document.getElementById("root")
)

body {
    margin: 0;
    padding: 0;
}

header {
    padding: 20px;
}

button {
    padding: 10px;
    border: none;
    margin: 10px;
}

.dark-theme {
    background-color: #333333;
    color: whitesmoke;
}

.light-theme {
    background-color: whitesmoke;
    color: #333333;
}
________________________________________________________________________________________________
4A. CONTEXT PRACTICE 2
 * Challenge: Set up context to save the user's username and pass it to anywhere that is currently hardcoding "Username".
 * Use the static class property `contextType` on any components that need to consume context.

import React from "react"
import Header from "./Header"
import UserContext from "./userContext"

function App() {
    return (
        <div>
            <Header />
            <main>
                <UserContext.Consumer>  
                    {username => (
                        <p className="main">No new notifications, {username}! 🎉</p>
                    )}
                </UserContext.Consumer>
            </main>
        </div>
    )
}
export default App

import React from "react"
import UserContext from "./userContext"

function Header() {
    return (
        <header>
            <UserContext.Consumer>
                {username => (
                    <p>Welcome, {username}!</p>
                )}
            </UserContext.Consumer>
        </header>
    )
}
export default Header

body {
    margin: 0;
    padding: 0;
}

header {
    padding: 20px;
    background-color: #333333;
    color: whitesmoke;
}

main {
    padding: 20px;
}
________________________________________________________________________________________________
5. MOVE CONTEXT PROVIDER TO ITS OWN COMPONENT

*/

