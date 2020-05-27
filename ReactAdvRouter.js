/*
1.INTRO

React Router is not officially a part of React. Instead, it is created by a group called React Training. However, React Router is considered 
the defacto way to make single page applications in React. A single page application, aka SPA, is a website that swaps out pieces of the site
to display new pieces of the site based on where the user goes.  With SPA's, a user on their computer (client) asks for mysite.com, the 
client will make a request to the server (server = computer that has files and ability to send files to client). When mysite.com is built 
by a SPA framework or library like React, the server returns an entire React application. Then the React application with its html, CSS and
Javascript gets loaded by the browser. And when the user requests a different route like mysite.com/about, instead of making a new request 
to the server, the React application handles the switching that appears on the screen. For example, you have the Home Page Content along
with the Header and Footer. When user clicks on the navigation bar that leads to the about page, the Header and Footer will remain the same
but the Home Page Content will be replaced with the About Page Content:

Header                                      Header
Home Page Content  ->replaced with          About Page Content
Footer                                      Footer

So instead of a flash of the webpage where it has to load in a new html page, you instantly see a switch in the content where the old page
disappears and the new page shows up. Under the hood, what is happening is conditional rendering of components. 

In this simple app, using state to set the string to either 'Home' or 'About'. In ternary operator, saying if home (which is the state) is 
equal to Home, then display the h1 Home Page, else display h1 About Page. With the 2 buttons, the 1st will change the state to home, the 
other will change the state to about. When user clicks the buttons, program conditionally renders the 2 h1's. But the buttons remain the 
same, meaning the buttons are not being reloaded with every change in h1 because there is not a whole new html page coming in.  

import React, {useState} from "react"

function App() {  
    const [page, setPage] = useState("home")
    
    function swapPages(newPage) {
        setPage(prevPage => newPage)
    }
    
    return (
        <div>
            <nav>
                <button onClick={() => swapPages("home")}>Home</button>
                <button onClick={() => swapPages("about")}>About</button>
            </nav>
            {
                page === "home" ?
                <h1>Home Page</h1> :
                <h1>About page</h1>
            }
        </div>
    )
}
export default App

Some of the nice features with React Router are:
    Conditionally renders larger parts of your page
    Has a declarative API. Meaning will be given some components and hooks to handle switching of things that appear on the page
    Comes with hooks that make life easier 

Primary components of React Router can be combined into 3 categories:
    Routers (<BrowserRouter>, <HashRouter>)
    Route Matchers (<Routes>, <Switch>)
    Navigation ('route changes') (<Link>, <NavLink>, <Redirect> )

Will also review Hooks:
    UseHistory, useLocation, useParams

Link to React Router documentation:
https://reacttraining.com/react-router/web/guides/quick-start  -Homepage
https://reacttraining.com/react-router/web/api/BrowserRouter   
https://reacttraining.com/react-router/web/api/HashRouter  
https://reacttraining.com/react-router/web/api/Route
https://reacttraining.com/react-router/web/api/Switch
https://reacttraining.com/react-router/web/api/Link
https://reacttraining.com/react-router/web/api/NavLink
https://reacttraining.com/react-router/web/api/Redirect

_____________________________________________________________________________________________________________________________________
2. REACT ROUTER - BROWSER ROUTER

React Router is a collection of different packages. React Router Dom is what I will use to build a web application, so will need to import
this into app. BrowserRouter is a part of React Router Dom and will also need to be imported. Can also rename to something more user friendly. 
    import ReactDOM from "react-dom"
    import {BrowserRouter as Router} from "react-router-dom"

Router is a component and also a context provider. With context, you can wrap certain parts of the application in the context provider. For
example, can wrap <Router></Router> around <App/>. Because Router is a provider, will not see anything different with code. This process 
sets up the React Router. 

    ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById("root")
)

Revised Code*******************
import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"

import App from "./App"

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById("root")
)
_____________________________________________________________________________________________________________________________________
3. REACT ROUTER - BROWSER ROUTER

In a normal application bar, you may have an unordered list with some list items inside, the list items may have anchor tags and those
anchor tags may point to different parts of the site. 

    <div>
        ul li a
    </div>

Anytime I want to move to another route inside of an SPA, will need to use/import a component that comes from react-router-dom called Link. 
Link is a component, so I can use <Link><Link> to present what will show on page. Anything that goes between Link appears on the page, just 
like an anchor tag. The most important thing that the Link component takes is a prop called 'to'. This can be read like English, Link to 
'where'. Where is the specific page. <Link to="/"> will link to the Home page and <Link to="/about"> will link to the About page. Under the
hood, Link is rendering an anchor.  

function App() {    
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </div>
    )
}

With page refresh, Home and About will appear. When click on Home, in the browser will see '/' and when click About will see '/about' in
browser. The links route to different parts of the application. 
_____________________________________________________________________________________________________________________________________
4. REACT ROUTER - SWITCH & ROUTE

The next thing I need to do in App.js is make it so that when I click About and the browser goes to the /about route, the About component
shows up on the page. The components I need to do this are components Switch and Route, both come from react-router-dom.
Begin by using the <Switch></Switch> component. Will fill Switch with Route components and based upon a certain part of the Route, the 
Switch component will determine which of all the following routes it will render. 

There are multiple ways to use the Route component, due to additional functionality with React v5.1.2. The 1st approach is to use a self
closing route component. Route will require a couple of things. 1st Route needs to know what path it should render the route on. With the
Link component, sending users to either the '/' or '/about' path. With Route, can kinda think of syntax as an if statement. If current path
= '/', then I get access to a render prop, where I can say what to render. To begin , give render a function because the Route component
will render the function-> render={() => {}}. I want the function to return some type of user interface. Here I want function to return 
the h1 Home Page -> <Route path="/" render={() => <h1>Home Page!</h1>} />.  (Removed curly braces/function body and used the implicit return). 

The matcher will not work for the '/about' path. Meaning the following code will not switch to the About page. This is because the matcher
path="/" is not saying, if the path is exactly '/' then render.... Its actually saying if the path begins with a '/' then render.....
The Switch component will start at the top and 1 by 1 look thru the routes until it finds a matching path that begins with a '/'. Because
'/about' begins with a '/', program is tricked into believing the first match of '/', which is the route for the Home page is the route of 
the About page. 

            <Switch>
                <Route path="/" render={() => <h1>Home Page!</h1>} />
                <Route path="/about" render={() => <h1>About Page!</h1>} />
            </Switch>

One way to fix this is to list the about route 1st. 
            <Switch>
                <Route path="/about" render={() => <h1>About Page!</h1>} />
                <Route path="/" render={() => <h1>Home Page!</h1>} />
            </Switch>

Another approach is to add a prop called exact. So the exact path for '/' will not include '/about'. 

            <Switch>
                <Route exact path="/" render={() => <h1>Home Page!</h1>} />
                <Route path="/about" render={() => <h1>About Page!</h1>} />
            </Switch>

A 2nd way to use the Route component is to first create separate components for Home.js and About.js. With these created components, within
App, can choose to render an instance of the Home and About components. 

            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/about" render={() => <About />} />
            </Switch>

An even simpler approach is, instead of using render, I can pass the component to a prop called component. This does not create an instance
of the component but rather is passing the function itself. This works as a replacement for using the render prop. 

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>

There maybe times when I want to use the render prop. Say for example, I needed to pass a custom prop to either the Home component or Prop
component. ->  Will need to use the render method. <Route exact path="/" component={<Home prop />} />

The 3rd and newest way to use the Route component (released in v5.12) is the ability to use children. The approach will be to close the 
Route with a closing tag, then create an instance of the Home component. 
    <Route exact path="/"></Route>.                  -> close the route with a closing tag
    <Route exact path="/"><Home /></Route>           -> create an instance of the Home Component and provides Home component as child to the route 

Because I am creating an instance of Home with the angle brackets <Home/>, I can pass any props that I want within the angle brackets, 
<Home props />. This approach is less nested compared to using a render prop and easier to think about. All 3 methods will work but the
latest method via v5.1.2 has become the most accepted one. 

Revised code**************************************
import React from "react"
import {Link, Switch, Route} from "react-router-dom"

import Home from "./Home"
import About from "./About"

function App() {    
    return (
        <div>
            <Link to="/">Home</Link>                     -> Can be read like English. Link to 'where'?.
            <Link to="/about">About</Link>
            
            <Switch>
                <Route exact path="/"><Home /></Route>  -> create instance of Home Component. Provides Home component as child to the route 
                <Route path="/about"><About /></Route>
            </Switch>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
5. REACT ROUTER - SWITCH & ROUTE PRACTICE

 * 1. Set up React Router
 * 2. Add Home, About, and Contact pages to this app
 * 3. Add a nav bar to easily navigate to those pages
 * 
 * 

from index.js ->
import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"

import App from "./App"

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
)

from Home.js ->
import React from "react"

function Home() {
    return (
        <h1>Home Page</h1>
    )
}
export default Home

from About.js ->
import React from "react"

function About() {
    return (
        <h1>About Page</h1>
    )
}
export default About

from Contact.js ->
import React from "react"

function Contact() {
    return (
        <h1>Contact Page</h1>
    )
}
export default Contact

from App.js ->
import React from "react"
import {Switch, Route, Link} from "react-router-dom"

import Home from "./Home"
import About from "./About"
import Contact from "./Contact"

function App() {    
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/contact">
                    <Contact/>
                </Route>
            </Switch>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
6. REACT ROUTER -PROPS PASSED TO ROUTED COMPONENTS

Below, when passing the function Home to the React Router to use, it needs the function to be a full uninstantiated component so that it 
can pass props to it. What is being passed is the actual function Home (which calls the Home function from Home.js). Not passing an instance
of Home so unable to pass props this way. 

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </Switch>

Before was able to use Route as a parent component and create an instance of the Home component as a child. With this approach, can pass
custom props, but not have automatic access to the props that were there by Route. So do not have access to the props that are passed to
Home. So do not have access to the following properties. -> match, location, history, staticContext  
    <Route exact path="/"><Home /></Route>
    <Route exact path="/"><Home customProps={} /></Route> -> passing a customProp

React Router will automatically pass the props to the component via this approach:
    <Route exact path="/" component={Home} />

There are a host of props coming in when calling with the Home function. 

function Home(props) {
    console.log(props)
    return (
        <h1>Home Page</h1>
    )
}

These are the props from Home function. 

// {
//     history: {
//         length: 32, 
//         action: "POP", 
//         location: {
//             pathname: "/", 
//             search: "", 
//             hash: "", 
//             state: null
//         }, 
//         createHref: createHref(location), 
//         push: push(path, state), 
//         replace: replace(path, state), 
//         go: go(n), 
//         goBack: goBack(), 
//         goForward: goForward(), 
//         block: block(prompt), 
//         listen: listen(listener)
//     }, 
//     location: {
//         pathname: "/", 
//         search: "", 
//         hash: "", 
//         state: null
//     }, 
//     match: {
//         path: "/", 
//         url: "/", 
//         isExact: true, 
//         params: {}
//     }, 
//     staticContext: null
// }
_____________________________________________________________________________________________________________________________________
7. REACT ROUTER -NESTED ROUTES





*/