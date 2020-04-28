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

This will break the component. When refreshing page the only thing that shows up for the 1st contact is the hard-coded text for phone and 
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









*/

