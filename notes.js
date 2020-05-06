/*
1. ReactDOM & JSX

ReactDOM.render() accepts 2 parameters:
     ReactDOM.render(WHAT DO I WANT TO RENDER, WHERE DO I WANT TO RENDER IT)

The second parameter is easy because everything will have to tie back to an html page of some sort. The Javascript that I will write
will be compiled down to or turned into elements on a page. Can think of the 2nd parameter as being inserted into an html page. 

On index.html, there is a div with an id=root. Can think of the root as the container for the entire application. React will place 
everything that I create between the opening and closing div tags.  
    <div id="root">REACT WILL PLACE ALL CREATED THINGS HERE</div>

Back to index.js, the 2nd parameter in ReactDOM.render() will need to point to the div with id=root. Can use document.getElementById("root").
React will look at the 1st parameter and stick it inside the div with id=root. JSX is a pseudo-language and is like a Javascript rendition or 
version of html. Most of JSX is almost identical to html, with a few slight differences. There is a lot happening under the hood with React
where everything is getting compiled down to a plain Javascript version of itself. The React library will enable/interpret JSX, which is why
importing React is necessary. JSX is why the 1st parameter works and recognizes <h1> as a header code and not a less than sign followed an h. 
    ReactDOM.render(<h1>Hello world!</h1>, document.getElementById("root"))

Important to note that cannot render 2 JSX elements next to each other. For example, cannot have an h1 and a paragraph next to each other:
    ReactDOM.render(<h1>Hello world!</h1><p>This is a paragraph</p>, document.getElementById("root"))
    
But they can be wrapped in something so that it counts as just 1 element with 2 elements inside. This can be wrapped in a div. 
    ReactDOM.render(<div><h1>Hello world!</h1><p>This is a paragraph</p></div>, document.getElementById("root"))

Using JSX will take sometime getting used to but is much better than doing it the old way where I would have to say things like:
    var myNewP = document.createElement("p")
    myNewP.innerHTML = "This is a paragraph."  -> then take this paragraph and append it to a parent. 
    
This was an imperative programming style. React takes a declarative approach. 
_________________________________________________________________________________________________________________    
2. REACT FUNCTIONAL COMPONENTS

One of the reasons why React is so popular is because of its reusable web components. To create a functional component, begin by writing
a function. Use the constructor convention of capital camel case for the component name. Should adhere to this convention. 1st letter 
should be capital followed by camel case: 
    function MyApp() {}

The simple thing about functional components is that I just need to return the JSX that I want the component to represent. To rewrite 
the unordered list, I can return the unordered list from the functional component. Its always a good idea to wrap what I am returning 
in () and put everything on its own line. This approach makes code more readable. How unordered list 1st written:
    ReactDOM.render(<ul><li>Run</li><li>Swim</li><li>Walk</li></ul>, document.getElementById('root'))

The same rules apply to the functional component as they did with ReactDOM.render(), meaning cannot have cannot return 2 different elements
next to each other. Like having an ordered list next to the un-ordered list. This will not work because the component needs to return just 
a single JSX element. Can usually get around this by wrapping everything in a div or other element I choose to wrap with. 

    function MyApp() {
      return (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  )
}

Within ReactDom.render(), can create an instance of the functional component by placing the name of the component wrapping it in 
ASX tags. This is a self composing tag/component. There are some instances where I would like to make components that accept children
elements. But will more-likely use self composing components. 
     <MyApp />

The power with working with components is that I can create my own components which contain pieces of JSX which represent html in the final
product. And I can start composing them together. In this example, I have created the component MyApp which renders React elements/
JSX elements/html elements. With more complex applications, there will be components that render other components. Eventually it needs to 
boil down to regular html which may happen over the course of dozen React components that I created. 
______________________________________________________________________________________________________________________________
3. MOVE COMPONENTS INTO SEPARATE FILES 

Currently have component MyInfo inside index.js. As app become more complex, will not be able to put all components within the file. Need 
to move the component and put it in its own file. Its good convention to have each file contain 1 React component. Create a new file with 
the same name as component (MyInfo.js). Remove MyInfo component from index.js and paste into new file MyInfo.js.  Import React into 
MyInfo.js so that JSX can compile the html. export default MyInfo function to make it available to other places within the application.

The component is now exposed thru export default. Go to index.js and import MyInfo so that ReactDOM.render() can create an instance of MyInfo.
When importing MyInfo, make sure to provide a path by adding './'. This means from current directory, look for a file called MyInfo.js. 
    import MyInfo from "./MyInfo.js" 

Imports assume working with a js file (.js is the default extension). Can remove the .js extension
    import MyInfo from "./MyInfo"

Its best to have a solid organizational structure, especially with complex programs. A good org structure to employ is to create a new folder
called components where all component files will be housed. Drag MyInfo.js into the components folder. On index.js, this will change the 
path to MyInfo.js because the file is no longer part of the root directory. Update path to 
    import MyInfo from './components/MyInfo.js'
_______________________________________________________________________________________________________________________________________
4. REACT PARENT/CHILD COMPONENTS

In order for anything to show up on the page, need to use ReactDOM.render(). With, ReactDOM.render(<App />, document.getElementById("root")), 
the App component is an entry point into the application. 

There is a distinction between components and elements. Elements eventually boil down to html code. Components typically house the elements
that are reduced to html. 

The Document Object Model(DOM) is often referred to a tree where the html element is the most base root of the tree. Can think of the App
component to being the root of the tree. The App component can render other components such as MyFooter, and MyFooter can render an actual
element called footer, where footer will have all of the html related to the footer.  Just like App is rendering more than 1 component, 
MyHeader can also render more than one component such as Logo and MyNavbar, which will need to end up as regular elements of some sort,
such as an img or nav element. 

<App/>             <App/>                      <App/>
 |                   |                           |
MyInfo             MyFooter                      MyHeader                   
 |                   |                           |      |
<div></div>     <footer></footer>               <Logo> <MyNav>  
                                                  |      |
                                                 <img>   <nav></nav>

Create a new component called App.js. Within App.js return a JSX element with that contains html 'hello for a 3rd time', a navbar, 
an unordered list and a main section where most of the content will go. This app component is getting large and is defeating the purpose
of React. Can ideally create separate components for each piece of html that is needed on the page: 

function App() {
    return (
        <div>
            <nav>
                <h1>Hello a third time!</h1>
                <ul>
                    <li>Thing 1</li>
                    <li>Thing 2</li>
                    <li>Thing 3</li>
                </ul>
            </nav>
            <main>
                <p>This is where most of my content will go...</p>
            </main>
        </div>
    )
}

To begin to address this issue, create a footer component, Footer.js. Within Footer.js, create a function that returns a footer. In order 
for the element from Footer.js to show up on the page, App.js needs to render Footer. Need Footer.js inside the file of App.js in order 
to create an instance of Footer. From App.js, import Footer.js and after the <main> element add the Footer component:
     <main>
        <p>This is where most of my content will go...</p>
    </main>
    <Footer />
________________________________________________________________________________________________________________________________________
5. STYLING REACT WITH CSS CLASSES

There are a host of ways to style things in React.  CSS classes and CSS rules on those classes are the most familiar to me at this time. 
Based upon Phase1 state of todaapp, if you drill down into the tree, can decide where to put classes. On index.js I am rendering an App
component. The App component is rendering a div with 3 other components; a Header, MainContent and Footer component. Each one of the 
components is a basic component that has a single element with syntax inside element. 

Start by focusing efforts on styling the header. In html when you add a class to something, you have a property called class. Since not 
working with html but instead working with a variation of Javascript which is JSX. Using class as a property name in JSX will not work.
Instead, use the property className. On Header.js update the header tag with className='navbar':
    <header className="navbar">This is the header</header>

Within style.css, select the navbar (this references/connects to the property className='navbar') and style the navbar accordingly. 

.navbar {
    height: 100px;
    background-color: #333;
    color: whitesmoke;
    margin-bottom: 15px;
    text-align: center;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

You can only apply the className attribute to React elements like header, paragraph or h1 and not React components. If I try to apply a 
className to a component that I created, such as Header, MainContent, Footer, will not work as expected. Can only apply className to what
looks like basic html. 

If I am using something that requires a different level of the tree hierarchy like FlexBox or CSS Grid, where I need to know which items
are the Flex container or Flex items, it can be tricky looking at the component to understand how this works. For example if I wanted to 
make the following div a Flex container and wanted to specifically style one of the items therein, I will need to go to one of the 
components and look at the elements their in in order to give them the classNames that are necessary. For example, the header element in
Header.js will be the direct child of this div. Can think of it as React taking the contents of the Header.js component is returning and 
replacing in the place of the Header. This is how it will end up in the DOM tree. 

        <div>                                                                                  
            <Header />                
            <MainContent />
            <Footer />
        </div>
           
        contents of direct child will replace Header 
        <div>
            <header className="navbar">This is the header</header>                 
            <MainContent />
            <Footer />
        </div>
__________________________________________________________________________________________________________________________________
6. JSX TO JAVASCRIPT AND BACK 

Before moving on to inline styles and dynamic styles, need to understand how JSX and Javascript play together. How do I jump into 
Javascript while in the middle of JSX? Solution is to surround any Javascript that I want interpreted with {}. Everything inside the {}
will refer to vanilla Javascript variables for firstName and lastName. Without the {}, everything inside the h1 tags will literally be 
interpreted. The <h1> begins with JSX. The {} switches to Javascript and the closing bracket ends Javascript and switches back to JSX.
    <h1>Hello {firstName + " " + lastName}!</h1>
    <h1>Hello {`${firstName} ${lastName}`}!</h1>  -> using `` 

    function App() {
    const firstName = "Bob"
    const lastName = "Ziroll"
    
    return (
        <h1>Hello {`${firstName} ${lastName}`}!</h1>
    )
    }
    ReactDOM.render(<App />, document.getElementById("root"))

Another example is creating a new date instance. Within <h1> used Javascript to get the hours and used a modula of 12 to get in a 12
hour clock system.  

    function App() {
    const date = new Date()
    
    return (
        <h1>It is currently about {date.getHours() % 12} o'clock!</h1>
    )
    }
    ReactDOM.render(<App />, document.getElementById("root"))

Alternatively, I can check the current hours for what time of day it is and set a string to equal morning, afternoon or night. Using 
variable timeOfDay within an if/else to determine the time of day. In return statement, started with JSX, then switched to Javascript
to reference the timeOfDay variable. 

    function App() {
    const date = new Date()
    const hours = date.getHours()
    let timeOfDay
    
    if (hours < 12) {
        timeOfDay = "morning"
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "afternoon"
    } else {
        timeOfDay = "night"
    }
    
    return (
        <h1>Good {timeOfDay}!</h1>
    )
    }
    ReactDOM.render(<App />, document.getElementById("root"))
_____________________________________________________________________________________________________________________________________
7. REACT INLINE STYLES WITH THE STYLES PROPERTY

Normally to do inline styling with html, simply use a style property and set it equal to whatever CSS style I want such as the color 
yellow which = FF8C00. This will create a problem because JSX expects the style to not be a string but instead a Javascript object. 
    <h1 style="color: #FF8C00">Good {timeOfDay}!</h1>  -> result in an error because style is a string. 

To replace string with an object is a start but will result in syntax error. Remember, anytime I want to change from JSX to Javascript, 
I need to wrap Javascript with a set of {}. This can be confusing initially because objects are also wrapped with a set of {}. In order
for this to work, need to wrap the object with another pair of {}.
    <h1 style={color: "#FF8C00"}>Good {timeOfDay}!</h1>  -> result in syntax error because object is not wrapped with {}

The 1st set of {} meets JSX expectation for style which is to set style = to an object. The 2nd set of {} tells React to switch from JSX
to Javascript:
    <h1 style={{color: "#FF8C00"}}>Good {timeOfDay}!</h1>  -> puts style in an object and switch from JSX to Javascript. 

Because this is an object I can additional styles by adding another key/value pair. For example a background color of red. 
     <h1 style={{color: "#FF8C00", backgroundColor: "#FF2D00"}}>Good {timeOfDay}!</h1>

Can technically add as many additional styles but code can become unpleasant to look at. An option it to assign the object to a variable 
called styles and within <h1> switch from JSX to Javascript by referencing the styles variable with a set of {}. As I continue
to add styles to the styles variable, it will not clutter the <h1>. There are some tiny quirks to remember when working with style objects.
For example, measurements in pixels can just put the number value in place and default will be pixels, such as fontSize: 20. Since this
is a Javascript variable, can also put in a string. There are some limitations with pseudo selectors like hover which become impossible 
to do with inline styles. Can hover by using CSS and reference class name. Or can learn about styling libraries such as Styled components. 

    const styles = {
    color: "#FF8C00", 
    backgroundColor: "#FF2D00", 
    fontSize: "200px" 
  }
  return (
    <h1 style={styles}>Good {timeOfDay}!</h1>
  )

Why use inline styles? May want something to be more dynamic and allow Javascript to determine what the styles are. Updated program to 
include the styles variable with a default fontsize of 30px. The if/else will determine the fontsize. If/else will not only determine the
time of day string but also change the color property of the styles object. Because its an object, can access and create properties by
using the dot context. This is an example showing possibility of having dynamic data (if/else) that changes the way hard coded components
<h1></h1> are displayed. 

    function App() {
    const date = new Date(2018, 6, 31, 15)  -> providing arguments for year, month, day, hour (24 hours schedule)
    const hours = date.getHours()
    let timeOfDay
    const styles = {
        fontSize: 30
    }
    
    if (hours < 12) {
        timeOfDay = "morning"
        styles.color = "#04756F"
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "afternoon"
        styles.color = "#8914A3"
    } else {
        timeOfDay = "night"
        styles.color = "#D90000"
    }
    
    return (
        <h1 style={styles}>Good {timeOfDay}!</h1>
    )
    }
    ReactDOM.render(<App />, document.getElementById("root"))
____________________________________________________________________________________________________________________________________
8. REACT PROPS PART1: UNDERSTANDING/OVERVIEW

A discussion about basic html maybe helpful explaining the concept of props. The 3 elements inside the body, (anchor, input and image) need
additional context/info in order for them to work. Anchor tags need an href for them to make sense. In this way, the html spec can find
find the anchor tag once and allow me(programmer) the ability to change the place where the links sends user. An image element needs a 
source in order to function correctly, whether its a path to a local file or a url to an image hosted online. With anchors and images, the
href and source properties respectively are required. Inputs do not require anything. Input (<input />) will technically show an input 
on the page. But can beef up input by adding additional properties, such as the placeholder property, name property, type property. The 
type property is interesting because it allows for multiple different things such as a radial button, checkbox, or regular input. Regular 
input can be text, email, phone number and even a submit button. These are often called attributes but another legitimate word for them 
is property. 

    <html>
        <head></head>
        <body>
            <a href="https://google.com">This is a link</a>
            <input placeholder="First Name" name="" type=""/>
            <img src=""/>
        </body>
    </html>

Understanding props in React is not too difficult. Instead of using the built in html tags, since I'm creating my own components, I can
make it so that I can allow properties to modify the way the component acts. 

If I critically review the Youtube homepage, the page can be divided into separate components. For example, looking at the Whats Trending 
section, I notice each topic/image have similarities. Each one has an image on the top that takes up the same amount of space, each have 
a bolded title positioned directly under the image, each have the number of views, # of days published and timestamp inside image that tells
how long video is. Youtube was likely programmed in VUE because Google is the primary backer of VUE. 

If page designed in React, there would likely be a VideoTile component that has a number of components inside of it such as an image, <h3>,
timestamp box. VideoTile will be a single component that is developed once. But need to make it so that the component can change depending
upon the different properties such as the image url or the title. 

The parent/child component can go as deeply nested as I want. On the Youtube Home page, there are different lists (Brightside, Lifestyle). 
There could be a List component which renders a number of VideoTile components which in themselves render an image ,<h3>, or timestamp box. 
On the Best Of Youtube section (Music, Sports, Gaming), these sections may have been developed just once as a single component and given a 
property of an image and text describing the link/image.  Web components and reusable html are really powerful.   
__________________________________________________________________________________________________________________________________
9. REACT PROPS 

Below is a basic contact card list that shows the contacts image, name, phone and email. Can take the repeated html code and put them into
their own components. What I know so far, I would have to create 4 separate components, 1 for each individual contact. This approach will 
not be the most efficient. Can make a single dynamic component. 

import React from "react"
function App() {
    return (
        <div className="contacts">
            <div className="contact-card">
                <img src="http://placekitten.com/300/200"/>
                <h3>Mr. Whiskerson</h3>
                <p>Phone: (212) 555-1234</p>
                <p>Email: mr.whiskaz@catnap.meow</p>
            </div>
            
            <div className="contact-card">
                <img src="http://placekitten.com/400/200"/>
                <h3>Fluffykins</h3>
                <p>Phone: (212) 555-2345</p>
                <p>Email: fluff@me.com</p>
            </div>
            
            <div className="contact-card">
                <img src="http://placekitten.com/400/300"/>
                <h3>Destroyer</h3>
                <p>Phone: (212) 555-3456</p>
                <p>Email: ofworlds@yahoo.com</p>
            </div>
            
            <div className="contact-card">
                <img src="http://placekitten.com/200/100"/>
                <h3>Felix</h3>
                <p>Phone: (212) 555-4567</p>
                <p>Email: thecat@hotmail.com</p>
            </div>
        </div>
    )
}
export default App

To begin, create a new file called ContactCard.js. Take one of the repeated divs and copy into ContactCard and start a new component. 
The problem is the div has a hard-coded image, h3, phone and email. Need to figure out a way that when I create separate instances of 
the functional component ContactCard it will be able to take as properties the different info that I will put in the place of the 
hard-coded image, h3, phone and email.  

Because ContactCard is a functional component, it aligns with the overall concept of functions. If I create a function to add numbers, 
and the function initially returns the result of 1+1. If I then want to add the numbers 2+3, I will not create a separate function to 
manage the result of 2+3 or 7+9. Instead, I will use function parameters (a, b) and adjust function so that any 2 parameters passed into
the function will return a different result depending on those inputs. The same concept of adding parameters to a function to allow the 
function to be more reusable is the same thing I will be doing with React components. 

function addNumbers() {                           
    return 1 + 1
}

function addNumbers(a, b) {
    return a + b
}

Go back to App.js. The goal is to replace all 4 individual contact cards with the individual information from each component. Begin process
by putting the 4 ContactCard components into App.js. This creates 4 instances of ContactCard from the functional component ContactCard()

import ContactCard from "./ContactCard"
function App() {
    return (
        <div className="contacts">
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />

Now need to pass down individual information for each ContactCard. Each contact card has 4 pieces of dynamic info (image url/name/phone/email). 
Begin by passing a property down for each piece of info. In other words, put each individual contact card info into properties of the 
ContactCard component. Now have separate pieces of info in each contact card within App.js. Each of the 4 individual <ContactCard /> 
components has been updated: 

function App() {
    return (
        <div className="contacts">
            <ContactCard 
                name="Mr. Whiskerson" 
                imgUrl="http://placekitten.com/300/200" 
                phone="(212) 555-1234" 
                email="mr.whiskaz@catnap.meow"
            />
            
            <ContactCard 
                name="Fluffykins" 
                imgUrl="http://placekitten.com/400/200" 
                phone="(212) 555-2345" 
                email="fluff@me.com"
            />
            
            <ContactCard 
                name="Destroyer" 
                imgUrl="http://placekitten.com/400/300" 
                phone="(212) 555-3456" 
                email="ofworlds@yahoo.com"
            />
            
            <ContactCard 
                name="Felix" 
                imgUrl="http://placekitten.com/200/100" 
                phone="(212) 555-4567" 
                email="thecat@hotmail.com"
            />
            
        </div>
    )
}

When refreshing page, still getting the contact info for Mr.Whiskerson 4x because the ContactCard.js component still has hard-coded values 
inside of itself:

function ContactCard() {
    return (
        <div className="contact-card">
            <img src="http://placekitten.com/300/200"/>
            <h3>Mr. Whiskerson</h3>
            <p>Phone: (212) 555-1234</p>
            <p>Email: mr.whiskaz@catnap.meow</p>
        </div>
    )
}

But in App.js, I am passing in separate 'props' (name, image url, phone, email). Next step, inside of ContactCard.js, need to access the 
data I am passing down into ContactCard within App.js.  Within ContactCard.js, the ContactCard function needs to accept a parameter, which
will be called props. The parameter props is an object that has properties of that object, each one being a prop that I passed in or the 
name of the prop passed in from App.js. Meaning, inside of ContactCards.js, will have props.name, props.imgUrl, props.phone, props.email. 
(props parameter now has access to the properties passed down to ContactCard in App.js). 

If I were to console.log props from ContactCard.js, I will get 4 console log entries. 

function ContactCard(props) {
    console.log(props)
    return (
        <div className="contact-card">
            <img src="http://placekitten.com/300/200"/>
            <h3>Mr. Whiskerson</h3>
            <p>Phone: (212) 555-1234</p>
            <p>Email: mr.whiskaz@catnap.meow</p>
        </div>
    )
}

Console log will return 4 console log entries, equating to 4 instances of the <ContactCard /> component from App.js. And the props are an 
object with name, imgUrl, phone and email properties.  

{name: "Mr. Whiskerson", imgUrl: "http://placekitten.com/300/200", phone: "(212) 555-1234", email: "mr.whiskaz@catnap.meow"}
{name: "Fluffykins", imgUrl: "http://placekitten.com/400/200", phone: "(212) 555-2345", email: "fluff@me.com"}>
{name: "Destroyer", imgUrl: "http://placekitten.com/400/300", phone: "(212) 555-3456", email: "ofworlds@yahoo.com"}
{name: "Felix", imgUrl: "http://placekitten.com/200/100", phone: "(212) 555-4567", email: "thecat@hotmail.com"}

This now means instead of hard-coding the values inside the div, I can use the property of the props object that is coming in by switching 
from JSX to Javascript (use {} around Javascript). When refreshing page, will now get the 4 separate contact cards with respective unique
info. In addition, now have a component that is reusable in different ways. 

function ContactCard(props) {
    return (
        <div className="contact-card">
            <img src={props.imgUrl}/>
            <h3>{props.name}</h3>
            <p>Phone: {props.phone}</p>
            <p>Email: {props.email}</p>
        </div>
    )
}

What would my component look like if the contacts had 50 properties to them. In App.js, each of the contact cards will get pretty long. 
The contact cards will have a 'prop' for each individual thing I am saving about the contact, totalling 50 different props/properties. 
Instead of passing down each part of the contact as an individual property, an alternative approach is to pass down an object that is the
entire contact. For example, pass down a prop called contact whose value is an object. Since going between JSX and Javascript, need to put
{{}} curly braces, with 1st {} gets me into Javascript and the inner {} is the object itself. And that object will have properties for name,
imgURL, phone, email. This will allow me to get rid of the 4 individual properties and pass down the single property called contact. 

<div className="contacts">
            <ContactCard 
                contact={{name: "Mr. Whiskerson", imgUrl: "http://placekitten.com/300/200", phone: "(212) 555-1234", email: "mr.whiskaz@catnap.meow"}}
            />

This will break the component. When refreshing page the only thing that shows on page for the 1st contact is the hard-coded text for phone and 
email. This is because on ContactCard.js, ContactCard(props) function is receiving an object and told function that object will have a 
property for imgUrl, name, phone and email. However, for the 1st contact card, no longer passing props for imgUrl, name, phone and email. 
Instead, 1st instance is passing a prop called contact which is an object.  Console logging props will still return 4 instances of 
the <ContactCard /> where instances 2-4 are receiving name, imgUrl, phone and email. But the 1st instance of ContactCard receives a single
property called contact and that contact property is an object.

{contact: {name: "Mr. Whiskerson", imgUrl: "http://placekitten.com/300/200", phone: "(212) 555-1234", email: "mr.whiskaz@catnap.meow"}}
{name: "Fluffykins", imgUrl: "http://placekitten.com/400/200", phone: "(212) 555-2345", email: "fluff@me.com"}>
{name: "Destroyer", imgUrl: "http://placekitten.com/400/300", phone: "(212) 555-3456", email: "ofworlds@yahoo.com"}
{name: "Felix", imgUrl: "http://placekitten.com/200/100", phone: "(212) 555-4567", email: "thecat@hotmail.com"}


This means I will need to update the syntax in the return statement to access the contact object via ContactCard.js

function ContactCard(props) {
    console.log(props)
    return (
        <div className="contact-card">
            <img src={props.contact.imgUrl}/>
            <h3>{props.contact.name}</h3>
            <p>Phone: {props.contact.phone}</p>
            <p>Email: {props.contact.email}</p>
        </div>
    )
}

This update will cause a problem because other components are not receiving a prop called contact, therefore its undefined and I am trying
to access the imgURL of undefined. This means, go back to App.js and fix the remaining contact cards. Now each contact card is passing down
a single 'prop' called contact which is an object that has all of the properties that I want. Usually, this info will not be hard-coded but 
instead will obtain from a data file such as a JSON file.  The updated Apps.js file:

import React from "react"
import ContactCard from "./ContactCard"

function App() {
    return (
        <div className="contacts">
            <ContactCard 
                contact={{name: "Mr. Whiskerson", imgUrl: "http://placekitten.com/300/200", phone: "(212) 555-1234", email: "mr.whiskaz@catnap.meow"}}
            />
            
            <ContactCard 
                contact={{name: "Fluffykins", imgUrl: "http://placekitten.com/400/200", phone: "(212) 555-2345", email: "fluff@me.com"}}
            />
            
            <ContactCard
                contact={{name: "Destroyer", imgUrl: "http://placekitten.com/400/300", phone: "(212) 555-3456", email: "ofworlds@yahoo.com"}}
            />
            
            <ContactCard 
                contact={{name: "Felix", imgUrl: "http://placekitten.com/200/100", phone: "(212) 555-4567", email: "thecat@hotmail.com"}}
            />
            
        </div>
    )
}
export default App

In ContactCard.js, function is receiving all props as an object called props. Since only passed a single prop down in App.js, I have
props.contact. Props.contact is an object which has properties itself like imgURL, name, phone and email. 

import React from "react"

function ContactCard(props) {
    console.log(props)
    return (
        <div className="contact-card">
            <img src={props.contact.imgUrl}/>
            <h3>{props.contact.name}</h3>
            <p>Phone: {props.contact.phone}</p>
            <p>Email: {props.contact.email}</p>
        </div>
    )
}
export default ContactCard

Practice 
// Set up a React app from scratch
// Render an <App /> component
  // App should be in its own file
// App should render 5 <Joke /> components
  // Each Joke should receive a "question" prop and a "punchLine" prop and render those however you'd like

Index.html file 
<html>
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="root"></div>
        <script src="index.pack.js"></script>
    </body>
</html>

Index.js file
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))

App.js file
import React from "react"
import Joke from "./Joke"

function App() {
    return (
        <div>
            <Joke 
                question="What's the best thing about Switzerland?" 
                punchLine="I don't know, but the flag is a big plus!"/>
            
            <Joke 
                question="Did you hear about the mathematician who's afraid of negative numbers?" 
                punchLine="He'll stop at nothing to avoid them!"/>
            
            <Joke 
                question="Hear about the new restaurant called Karma?" 
                punchLine="There’s no menu: You get what you deserve."/>
            
            <Joke 
                question="Did you hear about the actor who fell through the floorboards?" 
                punchLine="He was just going through a stage."/>
            
            <Joke 
                question="Did you hear about the claustrophobic astronaut?" 
                punchLine="He just needed a little space."/>    
        </div>
    )
}
export default App

Joke.js file
import React from "react"

function Joke(props) {
    return (
        <div>
            <h3>Question: {props.question}</h3>
            <h3>Answer: {props.punchLine}</h3>
            <hr/>
            <br/>
        </div>
    )
}
export default Joke

Part2: The App.js file has been updated with another instance of Joke, where instance does not have the question property. When page is 
refreshed, the hard coded text Question will appear w/o a question. Can updated the Joke component by adding a style display of none 
under certain circumstances. Update the <h3> question element with a ternary operator to decide what that should be. Inside of style object
can say 'is props.question truthy?  if so display question in regular block format otherwise display question as none. 
    <h3 style={{display: props.question ? "block" : "none"}}>Question: {props.question}</h3>

A slightly more concise but more confusing way to write this would be to not use a ternary use ! and &&. This says if there is not a
props.question then display none, otherwise ignore this in total. 
    <h3 style={{display: !props.question && "none"}}>Question: {props.question}</h3>

Can use inline styling for punchline jokes only (jokes w/o a question. On <h3> answers add an inline style with an object that say color = 
if there is no props.question then color should be grey)

Can now start using the differing props that come into the component to display things differently. As such the joke component is reusable. 
Can add jokes that just have punchlines and jokes that have both questions and punchlines. Automatically, the joke component knows how to
style itself based on the incoming props. 

Revised files for the App and Jokes components. 
App.js file
import React from "react"
import Joke from "./Joke"

function App() {
    return (
        <div>
            <Joke punchLine="It’s hard to explain puns to kleptomaniacs because they always take things literally." />

            <Joke 
                question="What's the best thing about Switzerland?" 
                punchLine="I don't know, but the flag is a big plus!"/>
            
            <Joke 
                question="Did you hear about the mathematician who's afraid of negative numbers?" 
                punchLine="He'll stop at nothing to avoid them!"/>
            
            <Joke 
                question="Hear about the new restaurant called Karma?" 
                punchLine="There’s no menu: You get what you deserve."/>
            
            <Joke 
                question="Did you hear about the actor who fell through the floorboards?" 
                punchLine="He was just going through a stage."/>
            
            <Joke 
                question="Did you hear about the claustrophobic astronaut?" 
                punchLine="He just needed a little space."/>    
        </div>
    )
}
export default App

Joke.js file
import React from "react"

function Joke(props) {
    return (
        <div>
            <h3 style={{display: !props.question && "none"}}>Question: {props.question}</h3>
            <h3 style={{color: !props.question && "#888888"}}>Answer: {props.punchLine}</h3>
            <hr/>
        </div>
    )
}
export default Joke
____________________________________________________________________________________________________________________________
10. MAPPING COMPONENTS IN REACT

Most of the data that will be displayed on a page will likely come from an http call to an API where there is a server that hosts a 
database and that database and server are returning JSON data to me. Will make API requests at a later time. In meantime, jokesData.js
is a file that contains an array variable called jokesData (variable is an array of objects). Can export the file, import it in a 
component and pretend its data from an API. How do I take an array of raw data and turn that into a number of components? There is a common 
saying for those that are learning React, where they say that React helps them become better Javascript Developers. The reason is because
things like this are often handled by methods or 'magic' by other frameworks under the hood like Angular and Vue. But in React, a lot of 
these simple operations are handled with vanilla Javascript. 

This point can be made clear with higher order arrays methods. Higher order array methods are methods that I can run on an array that take
a function as a parameter and allow me (developer) to decide exactly what should happen to the elements in the array. For example, I can 
run a higher order method on nums called map(). Map() is a method of the nums array that takes a function as a parameter. This function 
will receive each individual number in the array. This function will then run on every single item in the array. With map(), whatever I 
return from my inner function will be placed with the same index into a brand new array with some kind of modification. Within my inner
function, I return num*2, the variable doubled will result in a new array where the numbers in the array nums is doubled. 

function App() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const doubled = nums.map(function(num) {
        return num * 2
    })
    console.log(doubled)

In App.js, I can use map(). Begin by importing jokesData.js and apply the same approach the the App() method. Using map and arrow function,
the function will receive each individual joke object. Within inner function, return a <Joke /> component and pass in the data from the 
individual joke object received my map(). 

function App() {
    jokesData.map(joke => {
        return (
            <Joke question={joke.question} punchLine={joke.punchLine} />
        )
    })

Because returning a single component, can put on one line and there is an implicit return, so can remove. Map() returns a new array, can 
save the returned array in a variable. More concise code:

function App() {
    const jokeComponents = jokesData.map(joke => <Joke question={joke.question} punchLine={joke.punchLine} />)
    
Now have an array of components. What to do with an array of components? React allows me to put the array of components directly in 
JSX (within div). Revised code with array of components in JSX:

import React from "react"
import Joke from "./Joke"
import jokesData from "./jokesData"

function App() {
    const jokeComponents = jokesData.map(joke => <Joke question={joke.question} punchLine={joke.punchLine} />)    
    
    return (
        <div>
            {jokeComponents}            
        </div>
    )
}
export default App

Refresh page and jokes will appear as expected. However, will receive the following error in console:
    Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `App`. 
    See https://fb.me/react-warning-keys for more information. in Joke (created by App) in App

React expects a key prop on repeated components. When using a map as in this example, I should give the component that I am creating 
over and over, ie <Joke/>, a new prop called key. With the new key prop, put something unique inside the key prop. Usually data from an 
API will include some sort of id number or unique identifier. In this example, can use the questions because the questions are all unique. 
But will use the id numbers as the key. Refresh page and warning goes away. Also, the App.js is much cleaner and the data comes from an 
external file like it will in the real world. 

Revised files for App.js and 

App.js file
import React from "react"
import Joke from "./Joke"
import jokesData from "./jokesData"

function App() {
    const jokeComponents = jokesData.map(joke => <Joke key={joke.id} question={joke.question} punchLine={joke.punchLine} />)
        
    return (
        <div>
            {jokeComponents}            
        </div>
    )
}
export default App

jokesData.js file
const jokesData = [
    {
        id: 1,
        punchLine: "It’s hard to explain puns to kleptomaniacs because they always take things literally."
    },
    {
        id: 2,
        question: "What's the best thing about Switzerland?",
        punchLine: "I don't know, but the flag is a big plus!"
    },
    {
        id: 3,
        question: "Did you hear about the mathematician who's afraid of negative numbers?",
        punchLine: "He'll stop at nothing to avoid them!"
    },
    {
        id: 4,
        question: "Hear about the new restaurant called Karma?",
        punchLine: "There’s no menu: You get what you deserve."
    },
    {
        id: 5,
        question: "Did you hear about the actor who fell through the floorboards?",
        punchLine: "He was just going through a stage."
    },
    {
        id: 6,
        question: "Did you hear about the claustrophobic astronaut?",
        punchLine: "He just needed a little space."
    }
]
export default jokesData

PRACTICE: 
 
//Given a list of products (as an array of objects, as seen in productsData.js) render a <Product /> component for each product in the 
list.Make sure to use the array's `.map()` method to create these components, and  don't forget to pass a `key` prop to it to 
avoid the warning.

productList.js file
const products = [
    {
        id: "1",
        name: "Pencil",
        price: 1,
        description: "Perfect for those who can't remember things! 5/5 Highly recommend."
    },
    {
        id: "2",
        name: "Housing",
        price: 0,
        description: "Housing provided for out-of-state students or those who can't commute"
    },
    {
        id: "3",
        name: "Computer Rental",
        price: 300,
        description: "Don't have a computer? No problem!"
    },
    {
        id: "4",
        name: "Coffee",
        price: 2,
        description: "Wake up!"
    },
    {
        id: "5",
        name: "Snacks",
        price: 0,
        description: "Free snacks!"
    },
    {
        id: "6",
        name: "Rubber Duckies",
        price: 3.50,
        description: "To help you solve your hardest coding problems."
    },
    {
        id: "7",
        name: "Fidget Spinner",
        price: 21.99,
        description: "Because we like to pretend we're in high school."
    },
    {
        id: "8",
        name: "Sticker Set",
        price: 14.99,
        description: "To prove to other devs you know a lot."
    }
]
export default products

Product.js file -> function will receive a nested object called product. On App.js, 'product' will be passed down as one object vs passing 
down each individual property of the product individually as a prop. Can access the properties from the App function via 
prop.product.propertyName. The string method toLocalString() will display as currency. 

import React from "react"
function Product(props) {
    return (
        <div>
            <h2>{props.product.name}</h2>
            <p>{props.product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })} - {props.product.description}</p>
        </div>
    )
}
export default Product

App.js file -> will render a number of Product components. productComponents will create an new array filled with Product components and 
returns a product that is an item(product={item}). (this is where I am passing down the single object )

import React from "react"
import Product from "./Product"
import productsData from "./vschoolProducts"

function App() {
    const productComponents = productsData.map(item => <Product key={item.id} product={item}/>)
    
    return (
        <div>
            {productComponents}
        </div>
    )
}
export default App
_________________________________________________________________________________________________________________________________
11. CLASS BASED COMPONENTS

Functions are easy to understand and makes clear what I am doing. This following creates a component with a function that returns 
the UI I want displayed on a page.  As I go deeper into React and learn new parts about it, will find that a functional component will 
not able to do all that I need it to do.  

A class based component can pick up the limitations of a functional component, such as implementing state and life-cycle methods.  
A class based component will start with the class keyword followed by the name of the component. Instead of () and {} will 'extends' 
React.Component. This is using a prototype system in JavaScript and is setting up a prototype with React.Component. What this means is 
I am receiving a bunch of 'goodies' from React.Component that is pre-written. Open with a set of {}. Every class based component at least 
needs 1 method, and that is the render() method. Then render() will return exactly what is in the functional component. The class component
is identical to the functional component.  
at least 

function App() {
    return (
        <div>
            <h1>Code goes here</h1>
        </div>
    )
}

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Code goes here</h1>
            </div>
        )
    }
}

If I have code that determines the display logic, meaning what will show up on the page or what the style of that element will be, this 
type of should go inside the render() method before I do the return. This will be a good place to set up any style objects if I am 
doing any inline styling, running the logic which determines how something will get displayed on the screen, conditional rendering, etc,
can all go inside the render() method.  For example, the date object will determine how date is displayed in the <h1>:

class App extends React.Component {
    render() {
        const date = new Date();
        return (
            <div>
                <h1>Code goes here</h1>
            </div>
        )
    }
}

In regards to classes, I can technically take it and put it inside of a method of my own, a class method. To do that, enter my method
above render().  Inside of my method, can do any display logic that I wish. From inside the render() method, I can call my method by 
using 'this.nameOfMyMethod': 

class App extends React.Component {
    
    yourMethodHere() {
        
    }
    
    render() {
        const style = this.yourMethodHere()
        return (
            <div>
                <h1>Code goes here</h1>
            </div>
        )
    }
}

With functional components can pass props to the function itself, and inside code can access props with props.propertyName. The only
difference with a class is 'this.props.propertyName'. 
_____________________________________________________________________________________________________________________________________
12. REACT STATE

One of the most important parts of React is understanding state. State is simply data that a component maintains, and with maintains, it
can actually change its value. The reason why this is distinct is because props, (a means of passing data from component to component), 
cannot be changed by the component receiving the props. Props are immutable/unchangeable. State is different in that its a way a 
component can maintain its data AND change its data if need to.  Anytime I introduce state to a component, the 1st thing is the component
needs to be a class based component. If I want a component to maintain its own data using state, it will need to be a class based component. 

Next need to add a constructor method. A constructor is a specific method that is built into JavaScript that initializes parts of a class. 
A constructor is a place where I am going to initialize some values. 1st thing to do inside of constructor is to make a call to a global
function called super(). Super() goes to the parent class/also called the superclass (React.Component), and grabs some of the 'goodies'
from the superclass and brings them into my class (App component) which can use these 'goodies'. 

One of the main parts of React.Component that I will be using is a method called setState() which allows me to change state. To add 
state to the component, add a property to 'this' called state (this.state). State will always be an object, so set this.state={}. 
Now have state in the component. Can access state anywhere else in components code by referencing this.state. Can add a property to 
'this.state' where property = answer and value = yes. To get the value to show up inside the <h1>, add {} braces because I will be 
interpreting JavaScript inside JSX. Within {}, key this.state.answer. The page will show Is state important to know? Yes. 

In this example, I am providing an initial value to state. This is the data the component will have when its 1st initialized. The 
special thing about state is that the initial value can be changed later. 

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

I can pass this.state from this component down to a child component. The only way to pass information from one component to another is via
props. For example, may have a child component and pass down a prop called answer and its value is this.state.answer. 
    render() {
        return (
            <div>
                <h1>Is state important to know? {this.state.answer}</h1>
                <ChildComponent answer={this.state.answer}/>
            </div>
        )
    }

PRACTICE
// Given a stateless functional component, add state to it state should have a property called `isLoggedIn` which is a boolean, 
(true if logged in, false if not). Then render the word "in" if the user is logged in or "out" if the user is logged out.

import React from "react"

function App() {
    return (
        <div>
            <h1>You are currently logged (in/out)</h1>
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false
        }
    }
    
    render() {
        let wordDisplay
        if (this.state.isLoggedIn) {
            wordDisplay = "in"
        } else {
            wordDisplay = "out"
        }
        return (
            <div>
                <h1>You are currently logged {wordDisplay}</h1>
            </div>
        )
    }
}
export default App
_____________________________________________________________________________________________________________________________________
13. HANDLING EVENTS IN REACT 

Before talking about changing state using setState() method, need to understand how to handle events in React. Event handling allows the 
user to interact with web page and do something specific when a certain event like a click or hover happens. Handling events in React is
simple. All of the event handlers will be the Javascript version which has the camelCase convention (onClick, onMouseOver). 

When a click of a button occurs using onClick, pass an arrow function into a set of curly braces, while console logging 'I was clicked'. 

import React from "react"
function App() {
    return (
        <div>
            <img src="https://www.fillmurray.com/200/100"/>
            <br />
            <br />
            <button onClick={() => console.log("I was clicked!")}>Click me</button>
        </div>
    )
}
export default App

Or can write a separate function and put the name of the reference to the function on the click event. Also add an add an event that
console logs 'Hovered" when user hovers over image. 

function handleClick() {
    console.log("I was clicked")
}

function App() {
    return (
        <div>
            <img onMouseOver={() => console.log("Hovered!")} src="https://www.fillmurray.com/200/100"/>
            <br />
            <br />
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}
export default App
_____________________________________________________________________________________________________________________________________
14. REACT SETSTATE: CHANGING THE STATE

Having state in the component is nice but if I can only initialize it to a certain value and cannot change it doesn't add much value and 
isn't much better than hard-coding into my code. Program below is a class based component with a constructor that calls super() and 
initializes state with a property called count and sets it equal to 0. With render(), have an h1 that displays current count and a button
with the word 'change' in it. Want to update code to click the button (using event handlers) which will change the state to be something 
different and the different state will be reflected on screen by way of the h1.  

import React from "react"
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button>Change!</button>
            </div>
        )
    }
}
export default App

Can add an onClick event handler on the button. Inside {} put an arrow function. Can put an inline function within arrow function. But 
instead, will create my own method called handleClick(). Instead of an inline anonymous function, can have onClick run handleClick(). 
When the method is part of the class, need to reference on the 'this' object. 
    <button onClick={() => {}}>Change!</button>
    <button onClick={this.handleClick}>Change!</button>

The constructor() is a method thats built in to classes in Javascript. Render() is a reserved method name for React. In between the 
constructor() and render(), I can put as many methods as I want. A strong convention is to have a method called handleClick() when I am 
handling a click event. Within handleClick() create code so that when button is clicked, the state is changed and increases count. Never
want to modify state directly such as this.state.count++ or this.state.count+1. Never want to directly modify the original version of 
state. Can think of state like the clothing I wear. When I want to change my clothing, I don't 'modify' my clothing. I don't paint my 
clothing a different color. Or don't cut a t-shirt to sew on buttons so that I can have a button up shirt instead. What I do is completely
replace my old clothes with my new clothes. Or replace my old clothes with the new clothes I want to wear. This is essentially want I want
to do with state. 
  
handleClick() { 
    this.state.count++ OR   --> directly modifies the original version of state. Do not want to do this. 
    this.state.count +1     --> directly modifies the original version of state. Do not want to do this. 
    }

One of the 'goodies' I get from React.Component is a method called setState(). Anytime I want to change state, I will use this method. 
There are 2 things I can pass to getState().  One of them is a new version of state. State is just an object, so can pass an object {}
and within object {count: 1}.  Currently the program has a button with an onClick that will run this.handleClick(). when button is 
clicked, it will run this.handleClick(). The method this.handleClick() uses the set.State() method that comes from React.Component and 
provides a new version of state, like a new t-shirt I want to wear. Now the count should be 1. Running the program at this point will 
result in a common error -> TypeError: Cannot read property 'setState' of undefined.  The solution to this error is binding. 

Anytime I create a class method (like handleClick) that I want to use setState() on, I need to bind the method to the class. The way to 
bind the method is inside the constructor.  -> this.handleClick = this.handleClick.bind(this) -> ensures the the handleClick() method is
is bound to the context of 'this' as it exists within the class. 

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }
    
    handleClick() {
        this.setState({ count: 1 })
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.handleClick}>Change!</button>
            </div>
        )
    }
}

When binding is added to code, the number on page will increase to 1 upon initial click. However, when user clicks the button again, the 
number remains at 1. This is because of the hard code count:1 in handleClick(). The state changes from 0 to 1, then to 1 again. So really
doing whats its supposed to do by changing the state to 1 only. Therefore cannot see the number change on the display after changed to 1. 

This brings me to the 2nd way I can use set.State(). If I don't care what the previous version of state was, passing an object is a nice
and simple way to provide a new state. -> this.setState({ count: 1 }). Many times, I will care what the previous state use to be. In this 
case, I want to know what the previous state was and add 1 to it. Anytime I want to know what the previous state was, I can pass a 
function to setState() -> this.setState(() => {})

Function will receive in its parameter the previous version of state -> this.setState((prevState) => {}). Passing prevState to function.  
Because this is an arrow function with 1 parameter, can get rid of () around the parameter -> this.setState(prevState => {})

What the function should return is the new version of state. Before provided a new version of state directly as an object literal, 
this.setState({ count: 1 }). Now providing a function that returns the object literal. The benefit of doing it this way is that I have
access to the previous version of state. Within the function, return an object. The object should have a count property so that 
<h1>{this.state.count}</h1> will not break. Since prevState represents the old version of state, and state is an object, I can access the
previous version of state by saying prevState, which is the whole object. I can access the count property of the previous state by 
prevState.count and add 1. -> count: prevState.count + 1  (count: prevState.count++ will directly modify state). 

With count: prevState.count + 1, computer will figure out what the count used to be and add 1 to that and will set that as the new count 
property of the new state object that is getting returned from the arrow function within the handleClick() method. Now when user clicks 
the change button the number on the screen will increase by 1 with each click of the button. The App component now maintains its own 
data in state and changes its data using setState(). 

Summarizing the program below:
    -the program has an h1 displaying the state, which just has a count property    -> <h1>{this.state.count}</h1>
    -initialized count property to 0     -> this.state = {count: 0}
    -added an event handler to button that runs a method called handleClick()  ->  <button onClick={this.handleClick}>Change!</button>
    -created and defined handleClick() as a method on the App class (put handleClick() method between constructor and render)
    -because handleClick() is using the setState() method that comes from the parent class React.Component, need to make sure to bind
     method inside the constructor.  -> this.handleClick = this.handleClick.bind(this)
    -once handleClick() is bound, can run setState() which can either take an object literal, this.setState({}), which is a new version 
     of state that I want to pass to it. OR, if interested in what previous state used to be, can pass setState() a function that takes 
     previousState as a parameter. And that function should return the object literal that represents the new version of state.  


Revised code below. 

import React from "react"
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
        this.setState(prevState => {
            return {
                count: prevState.count + 1
            }
        })
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.handleClick}>Change!</button>
            </div>
        )
    }
}
export default App

CSS code  to style the page for counter:

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
15. REACT LIFECYCLE METHODS OVERVIEW

Can write a lot of vanilla Javascript With React and React takes care of a lot of stuff behind the scenes. With the stuff going on behind 
the scenes, every single component that I create goes thru a series of phases or milestones during its life within the React application. 
Every React component will undergo a series of events when its being rendered and updated. Lifecycle method's can be divided into 2 parts. 
The React team has recently depricated (got rid of) 3 of the original lifecycle methods. The most important lifestyle methods when learning
React, most commonly used are render().  The job of render() is to determine what gets rendered to the screen, which in turn is how the 
component is displayed to the world. The render() method can be called many times. Any time React determines that something changes, such
as state or props, which might affect how the component is supposed to displayed, React may run the render() method once again. 

Another common lifecycle method is componentDidMount(). These lifecycle methods are defined like other methods inside the class between the
class and render(). componentDidMount is a lifecycle method essentially saying 'you have been born'. This component did just mount to the 
screen. The very 1st time the component shows up, React will run the componentDidMount method. The method will only run once while the 
component is showing on the screen. Things like a re-render which changes the way the component is displayed does not re-run 
componentDidMount. This is because the component does not actually mount and re-mount. Most common use cases for componentDidMount is to
do things like an an API call when I need to get data from an outside source. For example, the component maybe a TodoList and I need to 
get the list of todo's from a server or database before I'm able to accurately display the todo list. As soon as the component finishes 
mounting, I can get the data that I need to correctly display. 

Another lifecycle method is componentWillReceiveProps(). componentWillReceiveProps is kinda like when someone give me a gift. This component
can receive props from a parent component and every time this component is receiving props, it will run componentWillReceiveProps method. 
componentWillReceiveProps will not only run the very 1st time the component is mounted but will also run every single time a parent 
component decides to hand props to a child component. For example, if a parent component decides to change the props that its passing 
down to this component, inside componentWillReceiveProps can check to see if the new incoming props are different from the existing props. 
Often times will say if they are not different do not do anything but if they are different may want a calculation to run or set a state. To receive
To receive those new incoming props componentWillReceiveProps will receive a parameter called nextProps. Within function, there maybe an
if statement which compares the incoming props to the existing props. If the 2 are different, do something. componentWillReceiveProps is
one of the lifecycle methods has been depricated starting with version 16.3. Until React 17 is released componentWillReceiveProp has been
renamed to UNSAFE_componentWillReceiveProp. If really need to use componentWillReceiveProp, can use until version 17. Its a good lifecycle 
to understand if I am reviewing legacy code. Moving forward, this will not be part of a lifecycle. 

shouldComponentUpdate() is another lifecycle method. Behind the scenes, if React has any question about whether a component needs to
re-render, it will always choose to re-render it just in case w/o any logic specific to application needs behind the decision. React may 
re-render a component event if nothing about the component has changed. This can become an expensive or slow operation if I allow this to
happen to every component in a large application. shouldComponentUpdate() allows developer opportunity to optimize the app. Can implement
logic to allow component to determine whether or not its important to update. To help make the decision, shouldComponentUpdate() will
receive the incoming props (nextProps) and the incoming state (nextState). In the body of the function, need to either return true if want
to update or false if do not want component to update. Returning false will make the application more performant. But need to be sure that
I do not want the component to update. Otherwise will introduce weird and hard to debug bugs into the code. 

componentWillUnmount() is another lifecycle method. The main use case for componentWillUnmount() is to do some clean up or tear down of 
anything I've set up that could potentially lead to clutter in the DOM or application. A common use of componentWillUnmount() is if I
set up an event listener in componentDidMount(). For example, I wanted to run some code every time someone scrolled on the screen. 
Can use componentWillUnmount() to remove the event listener. This is an example. In general, componentWillUnmount() is a place to 
teardown or cleanup your code before your component disappears. 

The 3 lifecycle methods that have been depricated/removed are componentWillReceiveProps(), componentWillMount() and componentWillUpdate(). 
In their place, receiving 2 new lifecycle methods one being getDerivedStateFromProps(). getDerivedStateFromProps() is a static method so 
have to include the word static beforehand. getDerivedStateFromProps() receives props and state and should return the return the new, 
updated state based upon the props. The React team has published a blog explaining why you do not need getDerivedState. Many times 
this has been misused or caused weird bugs and/or performance issues with applications. In reality there is a better way to go about what
they intended to do with this method. The idea behind getDerivedStateFromProps() is for the rare cases when component needs to take 
incoming its receiving from its parent and set its own state based upon those props. The React team discourages the use of this method. 

getSnapshotBeforeUpdate() is the 2nd new lifecycle method. Can think of getSnapshotBeforeUpdate() as a way to create a backup of the 
current way things are. And with backup, meaning saving some type of data, likely an object with multiple points of data inside it. The
object will be like a snapshot because its like a snapshot of the way application is right now. Per the React team, its not a cycle method
that I will likely use.  

As I become more advanced with the applications that I am building with React, I will become more acquainted with these lifecycle methods. 
For now, will be using componentDidMount() and render(). 


import React, {Component} from "react"
class TodoList extends Component {
    constructor() {
        super()
        this.state = {}
    }
    
    static getDerivedStateFromProps(props, state) {
        // return the new, updated state based upon the props
        // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
        // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
    }
    
    getSnapshotBeforeUpdate() {
        // create a backup of the current way things are
        // https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
    }
    
    // componentWillMount() {
        
    // }
    
    componentDidMount() {
        // GET the data I need to correctly display
    }
    
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.whatever !== this.props.whatever) {
    //         // do something important here
    //     }
    // }
    
    shouldComponentUpdate(nextProps, nextState) {
        // return true if want it to update
        // return false if not
    }
    
    // componentWillUpdate() {
        
    // }
    
    componentWillUnmount() {
        // teardown or cleanup your code before your component disappears
        // (E.g. remove event listeners)
    }
    
    render() {
        return (
            <div>
                Code goes here
            </div>
        )
    }
}
export default App
_____________________________________________________________________________________________________________________________________
16. REACT CONDITIONAL RENDER

The class based component has state with a property called isLoading with a value of either true or false. This is sometimes used when I 
am making a call to an API and in meantime want something to show up. If the call to API takes 3-4 seconds, do not want user to think the
website crashed. Can maintain something in state that says, hold on page is loading and conditional rendering will display something on 
screen to communicate to user that something is loading in the background. 

In render(), rendering a component called Conditional, which has been imported at start of app, and passing a prop to it called isLoading
which is a the current version of state -> <Conditional isLoading={this.state.isLoading}/>.  

componentDidMount() is an opportunity to run code right after the component (in this case App) mounts on the screen the very 1st time. In
the method, kinds faking an API call, which sets a timeOut that will wait 1.5 seconds before running the code within the function. What is
occurring in function is that I am changing state so that loading is false. Think of this function as a fake way to pretend making a call
to an API that takes 1.5 seconds to come back with the data. At which point saying no longer loading because finished loading data from
API. Once setState() changes isLoading to false, the conditional component <Conditional isLoading={this.state.isLoading}/> will now 
receive a different prop. Component initially received a prop of 'true' when it first loads. When state changes and isLoading is false,
the conditional component receives a new prop or rather the same isLoading prop with a different value. What will happen is when the state
changes the render() method will run again because something has changed. Which means the conditional component will also re-render. 
Conditional is just a functional component which means the function will just run again and whatever is within the function can 
potentially change because the parameter value props may have also changed. 

Go to Conditional component. The Conditional component/function is receiving a prop (by way of parameter props) called isLoading. With
conditional rendering, I am going to load something on the screen if a condition is true. In this example, if props.isLoading is true, 
then display and h1 that says 'Loading'. Else if not true, display a different text. 
    -The App component will start with isLoading is true. 
    -The App component therefore renders a conditional component where isLoading prop is true: <Conditional isLoading={this.state.isLoading}/>
    -The Conditional component checks if props.isLoading is true, because true, renders <h1>Loading...</h1>
    -Then when props.isLoading changes to false because state of the parent component changed to false (because of componentDidMount()), 
     the Conditional component runs again and notices props.isLoading is no longer true and therefore returns h1 in else statement. 

function Conditional(props) {
    if(props.isLoading === true) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        return (
            <h1>Some cool stuff about conditional rendering</h1>
        )
    }
    
}

//can clean up code by creating an implied else
function Conditional(props) {
    if(props.isLoading === true) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <h1>Some cool stuff about conditional rendering</h1>
    )    
}

Can also use a ternary which is commonly used in React apps when it comes to conditional rendering. Basic format of a ternary is 
  condition ? statement if true : statement if false -> ask a question, provide a statement if true otherwise provide a statement if false

function Conditional(props) {  
    return (
        <div>
            {props.isLoading === true ? <h1>Loading...</h1> : <h1>Some cool stuff about conditional rendering</h1>}
            {props.isLoading ? <h1>Loading...</h1> : <h1>Some cool stuff about conditional rendering</h1>} -> same result 
        </div>
    )
    
}

With page refresh, page will initially render "Loading". Due to change in state will then render 'Some cool stuff about conditional 
rendering' Files with Component.js using ternary below. In files following will remove ternary and have App component be in charge of
managing conditional rendering.  

App.js file -> 
class App extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true
        }
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1500)
    }
    
    render() {
        return (
            <div>
                <Conditional isLoading={this.state.isLoading}/>
            </div>
        )
    }
}

Conditional.js file -> (using ternary)
function Conditional(props) {
    return (
        <div>
            <h1>Navbar</h1>
            
            {props.isLoading ? <h1>Loading...</h1> : <h1>Some cool stuff about conditional rendering</h1>}
            
            <h1>Footer</h1>
        </div>
    )
    
}

The App component should be in charge of managing conditional rendering. Reason is whatever is put in the Conditional component should 
probably just be able to display when its told to display. Since App is in charge of determining if something is loading, it should also
determine what should be rendered. As a result, the App component can manage the ternary operation. And the Conditional component should
only know what to do when its supposed to display.  it 

App.js file -> 
import React, {Component} from "react"
import Conditional from "./Conditional"

class App extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true
        }
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1500)
    }
    
    render() {
        return (
            <div>
                {this.state.isLoading ?
                <h1>Loading...</h1> :
                <Conditional />}
            </div>
        )
    }
}
export default App

Conditional.js file ->
import React from "react"

function Conditional(props) {
    return <h1>Some cool stuff about conditional rendering</h1>
    
}
export default Conditional
_____________________________________________________________________________________________________________________________________
17. REACT CONDITIONAL RENDER PT2 (LOGICAL && OPERATOR)
 
Use to using the logical && operator to refer to something on the left and something on the right as booleans in determining whether 
the entire condition should be considered true or false. For example, true && false would be false because with the && operator both
sides need to evaluate to something 'truthy' in order for the whole thing to be true. What Javascript is doing under the hood with the
&& operator is determining the truthiness of the thing on the left, it immediately returns the thing on the right. Meaning when its 
true && false it returns false because thats the thing on the right. If the thing on the left is falsey, false && false, it returns false
from the beginning. The && operator can be a way to conditionally render something if a condition is true or just render nothing if false. 

In this example, there are unReadMessages in state as an array of strings. In render() displays on page 'You have 2 unread messages' 
because the render() method determines the length of the array. 

 return (
            <div>
                <h2>You have {this.state.unreadMessages.length} unread messages!</h2>
            </div>
        )        

If there were no messages in array, you would not want a message saying 'You have 0 unread messages'. Can use a ternary to display text 
if messages are greater than 0 or display nothing if there are no messages. If number of messages is >0, then render h2, other wise render
null or nothing on page. 

 return (
            <div>
                {
                    this.state.unreadMessages.length > 0 ? 
                    <h2>You have {this.state.unreadMessages.length} unread messages!</h2> :
                    null
                }
            </div>

Can further simplify by getting rid of ternary and null. Check the truthiness of this.state.unreadMessages.length > 0 if true, render
h2.  When using the && operator, if the thing on left is true, whats on the right is immediately returned. If thing on left is false, 
render nothing. 

return (
            <div>
                {
                    this.state.unreadMessages.length > 0 && 
                    <h2>You have {this.state.unreadMessages.length} unread messages!</h2> :
                    null
                }
            </div>


Full code ->

import React, {Component} from "react"
import Conditional from "./Conditional"

class App extends Component {
    constructor() {
        super()
        this.state = {
            unreadMessages: []
        }
    }
   
    render() {
        return (
            <div>
                {
                    this.state.unreadMessages.length > 0 && 
                    <h2>You have {this.state.unreadMessages.length} unread messages!</h2> :
                    
                }
            </div>
        )
    }
}

export default App

REACT CONDITIONAL RENDERING PRACTICE
-------------------------------------------------------------------------------------------------------
import React from "react"

Challenge:

Given a stateless functional component:
1. Follow the steps necessary to add state to it,
    // class-based component
    // constructor method
2. Have state keep track of whether the user is logged in or not
    // isLoggedIn: Boolean (true or false)
3. Add a button that logs the user in/out
    // event listener (onClick)
    a. extra challenge - make the button display "log in" if they're not logged in and "log out" if they are
        // Conditional Rendering
4. Display text that says "Logged in" if the user is logged in, or "Logged out" if they're not.
    // Conditional Rendering

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
        this.setState(prevState => {
            return {
                isLoggedIn: !prevState.isLoggedIn
            }
        })
    }
    
    render() {   
        let buttonText = this.state.isLoggedIn ? "LOG OUT" : "LOG IN"
        let displayText = this.state.isLoggedIn ? "Logged in" : "Logged out"
        return (
            <div>
                <button onClick={this.handleClick}>{buttonText}</button>
                <h1>{displayText}</h1>
            </div>
        )
    }
}
export default App
_____________________________________________________________________________________________________________________________________
18. FETCHING DATA FROM AN API

The lifecycle method componentDidMount() is like a hook in the React component that allows me to run some kind of code immediately after 
the component first mounts to the DOM. One of the most common uses of componentDidMount is to get data from somewhere so that my component
can do what its supposed to do. Can add the lifecycle method as a class method (within the App class). Can use fetch() with this lifestyle
method. Fetch() is a nice/easy promise based way to perform http requests to get data that I need. Also using the Star Wars API because
it is cors enabled which means there is no issue for my front end app getting data from their database. 

Inside componentDidMount(), use global function fetch() and put in the url where I will be getting data from (star wars api) and search
for people with an id of 1 (/people/1). Resolve the promise by using .then(), which will receive a response that is not yet in the format
I need it to be. To get the response format ready, use the JSON method, which will turn the response into a Javascript object. Then chain
on another .then() which will actually receive the data that I want (the data should be an object with some properties). Now that the 
component has received the data, if I do not save the data, it will disappear. The way to save data within a component is by its state. 
Anytime I want to change the state, call this.setState(). In this case, I don't care what the previous state was because i just want to 
change this.state.character to be the data I just received. Within this.setState(), provide an object and within object say character 
is the data that I received. (character: data)  

    componentDidMount() {
        fetch("https://swapi.co/api/people/1")  -> providing fetch with url i want data from and searching for people with an id of 1
            .then(response => response.json())  -> resolving promise with then(). receives response. json turns response into an object
            .then(data => {                     -> 2nd then() receives object, calling object 'data'. using =>{} to set new state
                this.setState({                 -> saving/changing data by using setState() and passing an object to save the data
                    character: data             -> updating state with the new data object. 
                })
            })
    }

To confirm this is working, render one of the properties to see if it will show up on the screen. 

render() {
        return (
            <div>
                {this.state.character.name}
            </div>
        )
    }
This process made an API call, waited for a response, got the response, formatted the response, set the state and displayed the name 
of the character on the screen. 

If the person using the app has a slow internet connection, the API is bogged down, or other reasons the API request maybe delayed, 
nothing will show on the page until the request is done. This can be off-putting, frustrating for a user. To address this potential issue,
can display a message stating the data is processing/on its way. Will display the word 'loading' until the data comes back from request. 
This will illustrate a bit of the power of saving state in the component and updating state as I go. To do this, add to state a boolean
to determine if loading. The boolean will have a property called loading and value false. Within componentDidMount(), right before fetch(), 
want to change the state of loading. To change the state, use setState(). Don't care what the previous state was in this case, so just
provide and object where loading is true -> this.setState({loading: true}). Now need to display the word 'loading' if state says data is 
loading. Can use a ternary and assign value to a variable called text and render 'text'. Revised code below. 

class App extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {}
        }
    }
    
    componentDidMount() {
        this.setState({loading: true})
        fetch("https://swapi.co/api/people/1")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    character: data
                })
            })
    }
    
    render() {
        const text = this.state.loading ? "loading..." : this.state.character.name
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }
}
export default App

Refreshing page at this point, will just show 'loading' on page. This is because in componentGetMount(), I set loading to true but never
again set loading to false
    this.setState({loading: true}).  
So within render the ternary operation is always evaluating to the  string 'loading'.  
    -const text = this.state.loading ? "loading..." : this.state.character.name. 
To fix this bug, set the state of loading back to false. 
    this.setState({
        loading: false,
        character: data
With page refresh, will see 'loading' for a moment then resolve to the property name. 

Have successfully used componentDidMount() as a place to fetch data from an external API so that component can do what its supposed to do. 
This component was designed to display one of the characters from the Star Wars API and it needed data from the Star Wars API to do it. 
Also implemented a loading feature that lets the user know whether data is currently loading or not. Revised code below: 

import React, {Component} from "react"
class App extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {}
        }
    }
    
    componentDidMount() {
        this.setState({loading: true})
        fetch("https://swapi.co/api/people/1")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    character: data
                })
            })
    }
    
    render() {
        const text = this.state.loading ? "loading..." : this.state.character.name
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }
}
export default App
_____________________________________________________________________________________________________________________________________
19. REACT FORMS PART1

Forms in React are a bit different than vanilla Javascript. In vanilla Javascript, you create form in html, once user decides to submit
form, you go thru all of the form inputs and gather all of the data together pretty much at the last second. And this is when you do 
form validations, etc. With React, instead of waiting until the very end right before submitting the form to gather all of the info, React
will constantly keep track of all of the info in state. Which means on every keystroke, will update state in order to have the most updated
version of what the user is typing into the form. The code below renders a form with a single input. Within input, provide a type of text,
and a placeholder of First Name. 

render() {
        return (
            <form>
                <input type="text" placeholder="First Name" />
            </form>
        )
    }

 I want to watch for every change to the input box. I can do this with onChange. Input boxes have an event that get fired called 
 onChange. Every single time the input changes in the input box, onChange will run a function called this.handleChange. 

 render() {
        return (
            <form>
                <input type="text" placeholder="First Name" onChange={this.handleChange} />
            </form>
        )
    }


Within handleChange() method, the goal is to update state every single time user types something in the input box. I want to grab the 
current value of the input box -> "<input type="text" placeholder="First Name" onChange={this.handleChange} />" every time it changes. 
And then update state to reflect what the current value of the input box is. Within state, add a property called firstName. Now have 
something to update whenever the handleChange function runs. Within the handleChange() method, use this.setState() to update the state. 
Not interested in previous state at this point. So within setState() provide an object that says firstName property should become 
something -> this.setState({firstName: "???"}).

When events fire, the event passes a predetermined parameter into the function. Do not get to choose in this instance what will be passed. 
When fired, event will always pass info about the event. The event has some really important info. For example, can obtain value of the 
input box from the passed event parameter by using event.target.value. Target represents the element in which the event was fired and 
value is the value of the input box. Thus far the code is saying every single time a character is typed in the input box, run the 
handleChange function. The handleChange() function changes the state so that the firstName property of state is updated to reflect 
whatever the current value of the input box. When a class method calls setState(), make sure to bind it within the constructor. 

import React, {Component} from "react"
class App extends Component {
    constructor() {
        super()
        this.state = {
            firstName: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {    -> function receives the event parameter every time a character is typed in input box
        this.setState({      -> changes state so that the firstName property of state is updated to reflect current value of input box
            firstName: event.target.value
        })
    }
    
    render() {
        return (
            <form>
                <input type="text" placeholder="First Name" onChange={this.handleChange} />  ->runs handleChange and passes event parameter
                 <h1>{this.state.firstName}</h1> -> will display each character of state by displaying what is typed in input box. 
            </form>
        )
    }
}
export default App

To update last name of state in render() below will cause a problem. Typing First Name will display on screen as expected. However, 
when typing Last Name, on the page, the last name will overwrite the first name. This is because in the handleChange() method, I have 
hard-coded to update the first name property of state -> "this.setState({firstName: event.target.value})". One way around this will be 
to create a new function that handles the state for last name and update render to point to the new function for last name. This 
approach will not work with a larger form that may have 50+ inputs. 

render() {
        return (
            <form>
                <input type="text" placeholder="First Name" onChange={this.handleChange} />
                <br />
                <input type="text" placeholder="Last Name" onChange={this.handleChange} />
                <h1>{this.state.firstName} {this.state.lastName}</h1>
            </form>
        )
    }

The approach to take is to not hard-code firstName. Will update render() by providing a name property to the inputs that perfectly matches
what state is. Can do this because of the event parameter that is passed to the handleChange function. The event parameter has a bunch of
info about the input firing the event. Have already grabbed the value of the input box -> "event.target.value". Can also grab any parts 
of the inputs object that I want, such as the name property. So can update the property firstName to [event.target.name] where 
event.target is the input box and name is the property. Wrap in [] because the name property is a string and also describing a string 
property name inside an object. This is a principal of Javascript. Refresh page. Now when typing in the First Name box will get a change 
to state in First Name. Will also get a change to state with Last Name when typing in the last name input box. 
Revised code for function and render:

handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
            <form>
                <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} />
                <br />
                <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
                <h1>{this.state.firstName} {this.state.lastName}</h1>
            </form>
        )
    }

This approach will work with all 'text' based types such as email or phone number. Can use the same handleChange() function. Within
render(), make sure I provide a name property that perfectly matches the property in state (in constructor) and then pass the onChange
function to it. Complete revised code:

import React, {Component} from "react"
class App extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
            <form>
                <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} />
                <br />
                <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
                <h1>{this.state.firstName} {this.state.lastName}</h1>
            </form>
        )
    }
}
export default App

The idea behind controlled forms is that I want what is displayed inside of form to perfectly match up with what is in state. Currently
state is being reactive. Meaning every time the input in the input box changes, state updates according to whats in the input box. With 
a controlled form, state actually directs what is showing up inside the input box. This aligns with idea that state should be the single
source of truth. To make state less reactive is to add a value property in the text inputs. The value should always be
'this.state.value property is holding', such as value={this.state.firstName}. Due to slight modification, what is showing up in the input
box is because of what the current version of state is. In other words, I am forcing the value (what shows up in the input box) to exactly
match what state is. 

render() {
        return (
            <form>
                <input type="text" value={this.state.firstName} name="firstName" placeholder="First Name" onChange={this.handleChange} />
                <br />
                <input type="text" value={this.state.lastName} name="lastName" placeholder="Last Name" onChange={this.handleChange} />
                <h1>{this.state.firstName} {this.state.lastName}</h1>
            </form>
        )
    }


A good best practice that can help avoid a really difficult to debug bug: In this program, have not seen this particular bug but with 
more complex programs may increase likelihood of occurring. A good best practice is to use object destructuring. Instead of accessing 
the name and value properties by drilling into the actual event.target object, can actually pull those value out of the target before 
I set any state.  
    this.setState({[event.target.name]: event.target.value})  -> drilling into event.target object

Using object destructuring, I can say -> const {name, value} = event.target. And within setState provide name and value. Can research
React synthetic event to understand the importance of object destructuring.  

 handleChange(event) {  
        const {name, value} = event.target  -> destructuring by creating a copy of name and value before running setState()
        this.setState({
            [name]: value
        })
    }
_____________________________________________________________________________________________________________________________________
20. REACT FORMS PART2 



*/