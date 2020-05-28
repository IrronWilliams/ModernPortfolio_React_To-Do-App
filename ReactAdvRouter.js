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

There are a host of props coming in when calling the Home function, even when passing the function: <Route exact path="/" component={Home} />

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
7. REACT ROUTER-NESTED ROUTES

A common thing to do with websites is to create nested routes. Nested routes is a route inside of a route. Creating nested routes is easy
with React router. Below is the current nested routes for page. 

function App() {    
    return (
        <div>
            <Header />
            
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
            </Switch>
            
            <Footer />
        </div>
    )
}

Here, goal is to get the Profile Info and Profile Setting components to appear on the page when the respective links are clicked. Can use
Switch and Route. Switch allows me to puts some routes inside of it. And the route will determine if the component will display on the page. 

function Profile() {
    return (
        <div>
            <h1>Profile Page</h1>
            <ul>
                <li><Link to="/profile/info">Profile Info</Link></li>
                <li><Link to="/profile/settings">Profile Settings</Link></li>
            </ul>                        
        </div>
    )
}

When clicking on the Profile Info link, the Info component will appear on the page because the Route path "/profile/info" matches the Link
to "/profile/info". Same holds true for the Settings component. Here, the Profile Info and Profile Settings links will appear on the same 
page as the Info and Settings components. The Info and Settings components will appear when the respective links are clicked.  

function Profile() {
    return (
        <div>
            <h1>Profile Page</h1>
            <ul>
                <li><Link to="/profile/info">Profile Info</Link></li>
                <li><Link to="/profile/settings">Profile Settings</Link></li>
            </ul>
            
            <Switch>
                <Route path="/profile/info">
                    <Info/>
                </Route>
                <Route path="/profile/settings">
                    <Settings/>
                </Route>
            </Switch>
        </div>
    )
}

To get the Info and Settings components to replace the whole component instead of showing underneath the Profile Info and Profile Settings 
links, no longer need Switch in the Profile component. Instead need to create instances of these components on App.js. Currently in App.js,
there is a path that begins with '/profile'. Remember '/profile/info/ begins with /profile. And with <Route path="/profile"><Profile/>, was
expecting the Profile to render so that inside of Profile, it could handle the Switch separately. To have the Info and Settings components
replace and only appear on the page, I can move the routes from the Profile component to App.js. 

Routes removed from Profile component ->
function Profile() {
    return (
        <div>
            <h1>Profile Page</h1>
            <ul>
                <li><Link to="/profile/info">Profile Info</Link></li>
                <li><Link to="/profile/settings">Profile Settings</Link></li>
            </ul>
        </div>
    )
}

Routes moved to App.js. The exact keyword was added to path="/". W/o exact, the profile/info and profile/settings routes will not work 
because the 1st match of path="/profile" was found with the Profile component. Here, creating instances of Profile, Info and Settings and 
these components will replace whats on the page and what will only display is the UI in their respective components. ->
function App() {    
    return (
        <div>
            <Header />
            
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route path="/profile/info">
                    <Info/>
                </Route>
                <Route path="/profile/settings">
                    <Settings/>
                </Route>
            </Switch>
            
            <Footer />
        </div>
    )
}

These are 2 examples of how to manage nested routes. App.js, there is a Switch statement with nested routes. Alternatively, the Profile 
component managed the nested routes where it managed the switch inside the component itself. The difference is having both components show
on the screen at the same time or showing them separately. 
_____________________________________________________________________________________________________________________________________
8. REACT ROUTER-USE PARAMS

Here building a site for lawn services. Begin by having the some of the services from the servicesData array to show up on the page using
the ServicesList function. Can use map() method for this.  

function ServicesList() {
    
    return (
        <div>
            <h1>Services List Page</h1>
        </div>
    )
}
export default ServicesList

from servicesData.js
export default [
    {
        "name": "Lawn Mowing",
        "price": 30,
        "_id": "1",
        "description": "Have a carpet-like lawn without any work."
    },
    {
        "name": "Leaf Raking",
        "price": 50,
        "_id": "2",
        "description": "Remove those pesky dead tree parts from your property."
    },
    {
        "name": "Weeding",
        "price": 50,
        "_id": "3",
        "description": "Don't let the invaders ruin your yard."
    },
    {
        "name": "Sprinkler repair",
        "price": 100,
        "_id": "4",
        "description": "Keep your irrigation system top-notch."
    }
]

Begin by creating a variable that will represent the array of components that is a result of taking the servicesData and mapping over it. 
Map() accepts a function and for each service will return the name and price of service. Can put this in an h3. Now have an array of 
services variable which can be put below the h1. 

import React from "react"
import servicesData from "./servicesData"

function ServicesList() {
    const services = servicesData.map(service => (
        <h3>{service.name} - ${service.price}</h3>
    ))
    return (
        <div>
            <h1>Services List Page</h1>
            {services}
        </div>
    )
}

Now for each service that appears on the page, want to provide each service a link that sends user to the id associate for each service. 
For example, /services/id1, will appear in the browser where user clicks Lawn Mowing. Can use Link for the required to property with Link, 
can use a Javascript template string to got to services and interpolation to ge the id for each service. Then add a key because using the
map() method. With page refresh, when user clicks on Lawn Mowing, the link routes to /services/1, and /services/2 when Leaf Raking clicked. 

function ServicesList() {
    const services = servicesData.map(service => (
        <h3 key={service._id}>
            <Link to={`/services/${service._id}`}>{service.name}</Link> - ${service.price}
        </h3>
    ))
    return (
        <div>
            <h1>Services List Page</h1>
            {services}
        </div>
    )
}

React router provides a way to add a variable into the path. Can add this variable on App.js. In App.js, copy/paste on of the paths to
create the variable in order to render the ServicesDetail page. To specify the variable can use a colon (:) and the variable name will be 
serviceID. The variable serviceID inside the route is called a route param.

<Route path="/services/:serviceId" >
    <ServiceDetail />

In the ServiceDetail component, can use a hook provided by React router called useParams. Can import useParams from react-router-dom. 
Within the ServiceDetail() function, can grab the params by calling useParams(). -> const params = useParams(). If I click the Leak Raking
link and console log the results, whats returned is an object that has the string 2 as its property. -> {serviceId: "2"}. The string 2 comes
from the url. In App.js, defined the path to say ...anything that has /services/'something', save that 'something' under a param called 
serviceId and the value should be what is in the url at that part. So the url for Leak Raking is /services/2. So the '2' was saved under a 
param called serviceId. So I have just 1 route that handles any route beginning with /services/. 

function ServiceDetail(props) {
    const params = useParams()
    console.log(params)
    return (
        <h1>Service Detail Page</h1>
    )
}

To handle this incoming param, go to ServiceDetail.js. Since there is just 1 param and I know the name of it, can destructure the variable
so that I don't have to access it thru the params object. Now that I have access to the serviceID, a common thing to do at this point is to
make an AJAX call to get the info about the specified service. Meaning, do a getRequest to a server, provide it with the serviceID that is
in the url, get that data and display it in the return section. Currently do not have this info, so will use the servicesData array. Can use
the find() method which works similar to filter() where it takes a function as a parameter. If that function returns true, instead of 
putting results in a new array like filter() does, find() will consider the object in scope and return just that object and not create
another. For example, can set a new variable equal to the array of servicesData, chain on the find() method, which will look at every service. 
If the service._id property is equal to the serviceID from the route, then this is the one I want and will return it to the variable 
thisService. Now have access to thisService, which is an object that has properties for name, price, id and desc, I can display them. 
With page refresh, can click on the services and will be routed to the page (/services/4) and page will have the service name, price and 
description. 

function ServiceDetail(props) {
    const {serviceId} = useParams()
    const thisService = servicesData.find(service => service._id === serviceId) // find() returns value of the first element in the provided array that satisfies the provided testing function.
    
    return (
        <div>
            <h1>Service Detail Page</h1>
            <h3>{thisService.name} - ${thisService.price}</h3>
            <p>{thisService.description}</p>
        </div>
    )
}

Because of useParams, I was able to create 1 route that handled any number of nested dynamic routes. Consequently, was able to use a single
ServiceDetail component which was able to dynamically get the data to display what is unique about the date/elements in servicesData. 

<Route path="/services/:serviceId" >
    <ServiceDetail />

Revised Code ********************************************
from App ->
import React from "react"
import Header from "./components/Header"
import Home from "./pages/Home"
import ServicesList from "./pages/services/ServicesList"
import ServiceDetail from "./pages/services/ServiceDetail"

import {Switch, Route} from "react-router-dom"

function App() {    
    return (
        <div>
            <Header />
            
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/services" >
                    <ServicesList />
                </Route>
                <Route path="/services/:serviceId" >   -> path with variable, will be used in ServiceDetail
                    <ServiceDetail />
                </Route>
            </Switch>
        </div>
    )
}
export default App

from ServiceDetail ->
import React from "react"
import {useParams} from "react-router-dom"
import servicesData from "./servicesData"

function ServiceDetail(props) {
    const {serviceId} = useParams()                      -> uses the serviceID variable from the path here. 
    const thisService = servicesData.find(service => service._id === serviceId)
    
    return (
        <div>
            <h1>Service Detail Page</h1>
            <h3>{thisService.name} - ${thisService.price}</h3>
            <p>{thisService.description}</p>
        </div>
    )
}
export default ServiceDetail

from ServicesList ->
import React from "react"
import servicesData from "./servicesData"
import {Link} from "react-router-dom"

function ServicesList() {
    const services = servicesData.map(service => (
        <h3 key={service._id}>
            <Link to={`/services/${service._id}`}>{service.name}</Link> - ${service.price}
        </h3>
    ))
    return (
        <div>
            <h1>Services List Page</h1>  ->Services List component has links for each service that routes to the Service Detail page 
            {services}
        </div>
    )
}
export default ServicesList
_____________________________________________________________________________________________________________________________________
9. REACT ROUTER-useRoutMatch

The useRouteMatch hook can be used in a couple of different ways. When nesting links and routes, they are tightly coupled. Changing the
link but not changing the corresponding will cause problems. Can use the useRouteMatch hook to address this. Can use this hook to grab info
about the way React router matched the route. The object that is returned from useMatchRoute contains 4 properties. Of these, can use the 
properties path and url to dynamically serve as parts of the link and path. The path here is showing the path leading to the Profile page. 
Can use this string and concatenate it into the links and routes. React suggest to use url for matching links in nested links. Can use 
template strings for this. Instead of hard-coding /profile, replace with url. React also suggest using the path property to update the 
nested routes. Apply same approach with template strings and replace path with hard-coded /profile. 

{path: "/user", url: "/user", isExact: true, params: {} }  -> object returned from useRouteMatch

function Profile() {                         ->hardcoded
    return (
        <div>
            <h1>Profile Page</h1>
            <ul>
                <li><Link to="/user/info">Profile Info</Link></li>
                <li><Link to="/user/settings">Profile Settings</Link></li>
            </ul>
            
            <Switch>
                <Route path="/user/info">
                    <Info/>
                </Route>
                <Route path="/user/settings">
                    <Settings/>
                </Route>
            </Switch>
        </div>
    )
}

function Profile() {                                 ->useRouteMatch hook to make dynamic. 
    const {path, url} = useRouteMatch()

    return (
        <div>
            <h1>Profile Page</h1>
            <ul>
                <li><Link to={`${url}/info`}>Profile Info</Link></li>
                <li><Link to={`${url}/settings`}>Profile Settings</Link></li>
            </ul>
            
            <Switch>
                <Route path={`${path}/info`}>
                    <Info/>
                </Route>
                <Route path={`${path}/settings`}>
                    <Settings/>
                </Route>
            </Switch>
        </div>
    )
}

Can now go to App.js and the path from user to profile. When clicking on the Profile Settings link, the path will now dynamically change 
from /user/settings to profile/settings. useRouteMatch leads to less tight coupling between the links and routes. 

function App() {    
    return (
        <div>
            <Header />
            
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/user">  -> can update to /profile 
                    <Profile/>
                </Route>
            </Switch>
            
            <Footer />
        </div>
    )
}

Here is another use case for useRouteMatch. -> https://reacttraining.com/blog/react-router-v5-1/#useroutematch

_____________________________________________________________________________________________________________________________________
9. REACT ROUTER-useHistory

The useHistory hook allows me to programmatically go back/foward, jump to different spots in the history of application. Sometimes I may 
need to perform some type of operation, like run Javascript code to before I can redirect to another page. An example of this might be a 
log in page where user types his/her name/password hits submit and before moving to next page will have to wait for AJAX call to check the 
user credentials and come back with a response. If successful, user can be redirected to a Home or Profiles page. In this case, the clicking 
of the button will do more than just direct someone somewhere. It has to first make the AJAX request, then depending upon the response, 
redirect to another place in the app. 

To mimic this behavior in the ServiceDetail component, will begin by adding a button that says "Go Back To All Services Page". Then create
a function to handle the click of the button. Then import the useHistory hook from import-router-react. Then create a variable called history
that accepts the object from useHistory(). What's returned form useHistory is an object with a host of properties and methods that can 
be used. Among the mostly used method from useHistory is push(). Other useful methods from this hook are replace() and goBack(). 

The idea with push() is that I can call history.push() as a function and put in a new path, which is essentially a way to programmatically
redirect to another path. Can think of it as history being saved in an array and push as a method for adding a path to the array of history.
Within the handleClick function, use setTimeout which will mimic some type of AJAX request. -> setTimeout () accepts accepts 2 parameters), 
a function and number representing the time in seconds between when setTimeout will run the function that it has within its function 
body. -> setTimeout(() => {}, 2000). Within the setTimeout function body, can use history.push and provide it the new path I want to go to. 
The button says "Go back to all services". The services are listed on the /services path. So this is what I will provide history.push. Now, 
with page refresh, will be on the Services List Page. Click a service, aka Weeding. This will direct user to the 'Service Detail Page' for 
weeding. Then click the button, will see 'Submitting' in the console, 2 seconds will pass then page redirects back to the /services route, 
aka the 'Services List Page'. 

useHistory provides a way to manipulate where user is on the page programmatically. Can also use the goBack() and replace() methods. 
With replace(), instead of adding anything to the array of history, method replaces the last place. 

Revised Code ************************************************************
import React from "react"
import {useParams, useHistory} from "react-router-dom"

import servicesData from "./servicesData"

function ServiceDetail() {
    const {serviceId} = useParams()
    const history = useHistory()
    const thisService = servicesData.find(service => service._id === serviceId)

    
    function handleClick() {
        console.log("Submitting...")
        setTimeout(() => {
            history.push("/services")
        }, 2000)
        //history.goBack()                ->goes back 1 point in the history. 
        //history.go(-3)                  ->acts like goBack() but with more control. -3 means go back 3 pages. 
        //history.replace("")             ->doesn't add anything to array of history. it replaces array with last place in history.     
    }   
    
    return (
        <div>
            <h1>Service Detail Page</h1>
            <h3>{thisService.name} - ${thisService.price}</h3>
            <p>{thisService.description}</p>
            <button onClick={handleClick}>Go back to all services</button>
        </div>
    )
}
export default ServiceDetail
_____________________________________________________________________________________________________________________________________
10. REACT ROUTER-useLocation

The useLocation hook provides an easy access to information about the location in the app. Rather the path user is currently at. useLocation
hook returns an object with the following parameters. Pathname, search and state are the properties of interest. The pathname provides the
full path of where user is in application. For example, the pathname when clicking the Lawn Mowing link from the Services List Page would 
equal -> pathname: "/services/1".  Search refers to anything that is part of a query string in the path. So if I added in the browser and 
query string such as ?something=hello&blah=goodbye, the search property will return -> search: "?something=hello&blah=goodbye". Will need
to use a package called query-string to make use of/parse the value in the search property. A query string can be used to search for items
less than $50. State is used is a specific circumstance and will not persist across the app. State used here is just a way to send a message 
through React router. State can be used by letting ServicesList component know where it/the user came from. For example, state can tell me
'The user got to the ServicesList page by coming from the LogIn page' When I redirect from the login page, can pass state through the history
and receive it inside of the location object. A bit complex, worth mentioning. But my uses of this will be pretty limited.   

{pathname: "/services", search: "", hash: "", state: null, key: "qyfp8w"}

{pathname: "/services", search: "?something=hello&blah=goodbye", hash: "", state: null, key: "qyfp8w"}

Revised Code ************************************************************
import React from "react"
import {Link, useLocation} from "react-router-dom"

import servicesData from "./servicesData"

function ServicesList() {
    const location = useLocation()
    console.log(location)

    const services = servicesData.map(service => (
        <div key={service._id}>
            <h3><Link to={`/services/${service._id}`}>{service.name}</Link> - ${service.price}</h3>
        </div>
    ))
    return (
        <div>
            <h1>Services List Page</h1>
            {services}
        </div>
    )
}
export default ServicesList
_____________________________________________________________________________________________________________________________________
11. REACT ROUTER-REDIRECT


*/