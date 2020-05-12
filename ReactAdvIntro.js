
/*
1. SETTING STAGE WITH MODERN JAVASCRIPT FEATURES

//Using functional keyword when creating components  
function App() {
    return (
        <div>
            <NewJSFeatures />
        </div>
    )
}

//Updated with arrow function.  more concise 
const App = () => (
    <div>
        <NewJSFeatures />
    </div>
)


//Class methods: no arrow function 
    increment() {
        this.setState(prevState => {
            return {
                count: prevState.count + 1
            }
        })
    }

//Class methods: with arrow function.  arrow functions use a lexical this. Meaning it wont create its own 'this' context and 
//will automatically adopt the 'this' from the class that its found in. Which means binding a method is not necessary. 
    increment = () => {
        this.setState(prevState => {
            return {
                count: prevState.count + 1
            }
        })
    }

//Arrow functions also have an implicit return meaning do not necessarily have to use the return keyword if I start the return value on
//the same line arrow function begins. For example, if I was returning a string value, I can write arrow function as follows. This is an
//arrow function that takes prevState and returns the string 'hello'. 

    increment = () => {
        this.setState(prevState => "Hello")
    }

    
//To apply this approach when returning an object, need to wrap the object in a set of () in order to recognize the object. 
//because an object starts with a curly brace and the curly brace tells the arrow function that its beginning the function's body. 

  increment = () => {
        this.setState(prevState => ({count: prevState.count + 1}))
    }


//Can now have class fields in classes. This means when I have a variable that I want to save on the instance of the class, such as 
//this.state, I can do this outside of the constructor and just use the variable state such as, state = {count: 0}. Especially if I am 
//using arrow functions as my methods and no longer need the constructor to bind my methods. 

class NewJSFeatures extends Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }

//further simplifying class by using class fields 

class NewJSFeatures extends Component {
    state = {
        count: 0
    }

//Specifically importing the Component import from the react library is a form of object destructuring -> import React, {Component} from "react"
//Sometimes people pull a property out of an object by setting the name of the property to this.state ->  const {count} = this.state
//What this says is that I want the count property from this.state. 

render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>    
        )
    }

//when pulling out the count property, can now use count instead of this.state.count. If component were receiving props, can do the same
//thing. If I had a state with multiple properties, can pull out those properties separately -> const {count, greeting, age} = this.state 
//and reference each of those instead of saying this.state.greeting, this.state.age. 

   render() {
        const {count} = this.state
        return (
            <div>
                <h1>{count}</h1>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>    
        )
    }

//when destructuring an object, can also rename the property. The variables that I am pulling out has to exactly match the names in
//state. I can choose a new name for the variable count by using a colon and providing the new name, number for example. I can then
//reference number in the return statement.  

render() {
        const {count: number, greeting, age} = this.state
        return (
            <div>
                <h1>{number} {greeting} {age}</h1>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>    
        )
    }
_____________________________________________________________________________________________________________________________________
2. REACT.FRAGMENT

In React, the components I create can only return a single parent element. Meaning I cant return 2 sibling elements but instead need
to wrap them in a parent element. This App component renders a single div that has a single Child. If I am only rendering a single element
I can git of the div. 

function App() {
    return (
        <div>
            <Child />
        </div>
    )
}

The Child component returns a single div but also has its own children, an h1 and another Grandchild component. The div is required here
because can only return a single element from any given React component.  

function Child() {
    return (
        <div>
            <h1>I'm the Child component</h1>
            <Grandchild />
        </div>
    )
}

The Grandchild component has its own div with horizontal role, an h3 and paragraph. 

function Grandchild() {
    return (
        <div>
            <hr />
            <h3>I'm the Grandchild component</h3>
            <p>I'm also a part of the Grandchild component</p>
        </div>
    )
}

Collectively these 3 components renders the following on the page: 
I'm the child component. 
_______________________
I'm the grandchild component. 
I'm also the grandchild component. 

This approach pollutes the DOM tree with a bunch of extra elements that are only there to satisfy requirement that React has to return 
a single element. Looking at the html, the DOM looks like structure below. Begins with the div id=root. As a child of that, have the Apps
component div. As a child of the App component, have the Child's component div which has a div and it renders Grandchild which itself has
a div. End up having a pyramid looking hard to read structure that is full of divs which are only there as placeholders. 

<div id="root">
    <div>
        <div>
            <h1>I'm the Child component</h1>
            <div>
                <hr>
                <h3>I'm the Grandchild component</h3>
                <p>I'm also a part of the Grandchild component</p>
            </div>
        </div>
    </div>
</div>

This is where React fragments come in. One of the purposes of fragments is to help wrap the elements I am returning into something that 
does not end up creating a new element/node in the DOM tree. To accomplish this, I can take all of the outer wrapping divs and replace
them with React.Fragment

function App() {
    return (
        <React.Fragment>
            <Child />
        </React.Fragment>
    )
}

function Child() {
    return (
        <React.Fragment>
            <h1>I'm the Child component</h1>
            <Grandchild />
        </React.Fragment>
    )
}

function Grandchild() {
    return (
        <React.Fragment>
            <hr />
            <h3>I'm the Grandchild component</h3>
            <p>I'm also a part of the Grandchild component</p>
        </React.Fragment>
    )
}

With React.Fragment, the results look the same on the page. However, the html is far more concise and the DOM tree has been simplified. 
Now have just the single div with id=root with just the sibling components. It not only simplifies the tree but also changes the 
parent/child relationship. The h1 is called the Child component but with React.Fragment it is now a sibling to App. The horizontal rule, 
h3 and paragraph used to be grandchildren but have become siblings. Do not recommend using Fragments just for the benefit of simplifying
the DOM tree. Because when thinking about Flexbox, Grid or relative positioning in CSS where the parent/child relationship is important to
maintain, Fragments can actually backfire by messing with the CSS that I have created. 

<div id="root">
    <h1>I'm the Child component</h1>
    <hr>
    <h3>I'm the Grandchild component</h3>
    <p>I'm also a part of the Grandchild component</p>
</div>


Another way to write this is to import Fragment and remove reference in the return statement. 

import React, {Fragment} from "react"

function App() {
    return (
        <Fragment>
            <Child />
        </Fragment>
    )
}

Another way is to use the shorthand empty set of braces <> </>. Do not need to import Fragment with the shorthand. The empty set of
braces can replace the React.Fragment or Fragment references. 

import React from "react"

function App() {
    return (
        <>
            <Child />
        </>
    )
}

function Child() {
    return (
        <>
            <h1>I'm the Child component</h1>
            <Grandchild />
        </>
    )
}

function Grandchild() {
    return (
        <>
            <hr />
            <h3>I'm the Grandchild component</h3>
            <p>I'm also a part of the Grandchild component</p>
        </>
    )
}

The equivalent DOM tree results with this approach. 

<div id="root">
    <h1>I'm the Child component</h1>
    <hr>
    <h3>I'm the Grandchild component</h3>
    <p>I'm also a part of the Grandchild component</p>
</div>

React Fragments can help simplify the DOM tree w/o nesting a bunch of divs inside of divs. But also fundamentally changes the relationship
between the components. Before Fragments, components had Child rendering Grandchild which would actually make it a grandchild in the DOM. 
With React Fragments, they become siblings and essentially get flattened out to the level of their parent. Because of some of the drawbacks
with Fragments, approach is to wrap elements in a div and use Fragments if I need to change the parent/child relationship or if I am trying
to simplify the DOM tree. 

_____________________________________________________________________________________________________________________________________
3. DEFAULT PROPS

Sometimes I will have a component that receives 'props'. This component takes a prop called cardColor and applies the cardColor as 
the background color.  Return statement renders as div with the styles applied. 

function Card(props) {
    const styles = {
        backgroundColor: props.cardColor,
        height: 100,
        width: 100
    }
    
    return (
        <div style={styles}></div>
    )
}

In App.js, I am supplying a cardColor prop for each instance of the Card that I am creating. 

function App() {
    return (
        <div>
            <Card cardColor="red" />
            <Card cardColor="blue" />
            <Card cardColor="green" />
        </div>
    )
}

But I may want a backup in case of when the person using the component or me as the programmer does not provide the prop that I am 
expecting. If I do nor provide a cardColor prop to a Card, this will return what appears to be a missing card between the red and green
card. 

function App() {
    return (
        <div>
            <Card cardColor="red" />
            <Card />
            <Card cardColor="green" />
        </div>
    )
}

Back to the Card component, if I console.log cardColor, the instance of card w/o a prop will return a null. The ideal with default props 
is to provide a fallback for any props that might be missing. To add a default prop is easy. After finished declaring functional component,
use the function and specify a static property called defaultProps. Since props are an object, can specify it being equal to an object. 
Within object, can specify any default values that I want each prop to have. So for cardColor the backup/default value is blue. Now the 
instance where the prop is missing will now be blue. 

function Card(props) {
    console.log(props.cardColor)  -> returns red, null, green
    const styles = {
        backgroundColor: props.cardColor,
        height: 100,
        width: 100
    }
    
    return (
        <div style={styles}></div>
    )
}
Card.defaultProps = {
    cardColor: "blue"
}

Can provide flexibility to the component by passing props for height and width. And also provide default values for height and width in the
event props are not provided although expected in the Card component. 

function App() {
    return (
        <div>
            <Card cardColor="red" height={200} width={400} />
            <Card />
            <Card cardColor="green" />
        </div>
    )
}

function Card(props) {
    const styles = {
        backgroundColor: props.cardColor,
        height: props.height,
        width: props.width
    }
    
    return (
        <div style={styles}></div>
    )
}
Card.defaultProps = {
    cardColor: "blue",
    height: 100,
    width: 100
}

Can also convert to a class component. Can also specify defaultProps as a class property. Can make it a static property by using the static
keyword and defaultProps = an object, and move the properties from the initial Card.defaultProp into the class. 

class Card extends React.Component {
    render() {
        const styles = {
            backgroundColor: this.props.cardColor,
            height: this.props.height,
            width: this.props.width
        }
        
        return (
            <div style={styles}></div>
        )
    }
}
Card.defaultProps = {
    cardColor: "blue",
    height: 100,
    width: 100
}

Revised class component with defaultProps directly in the class. Returns the same results but program looks cleaner. 

class Card extends React.Component {
    static defaultProps = {
        cardColor: "blue",
        height: 100,
        width: 100
    }
    
    render() {
        const styles = {
            backgroundColor: this.props.cardColor,
            height: this.props.height,
            width: this.props.width
        }
        
        return (
            <div style={styles}></div>
        )
    }
}
_____________________________________________________________________________________________________________________________________
4. PROP TYPES

Another way to add some validation to React components is to add some prop types. Prop types allows me to specify that incoming props 
should be of a specific datatype. Another way to add some validation to the component is to add some type checking for the incoming 
props. I can ensure the props that are incoming are of a specific data type and also tell them to be required. React took the ability to
specify prop types and moved them into a separate library called PropTypes. May need to add a new dependency for PropTypes. Can do this 
typing 'npm install prop-types'. Next, inside of component where I want to specify the data types for incoming props, import PropTypes. 
And do something very similar when specifying default props. The propTypes will = an object. Within object, specify the props by object 
properties. PropTypes library comes with a bunch of validators I can use. I want the props for cardColor to always be a string. Can say 
'PropTypes.string' accordingly. Specifying a prop type that is not a string will result in a warning in the console ONLY when node 
environment is set to development. PropTypes are a development tool. When app is deployed after doing an npm build, the warning will not
show up. But PropTypes will be helpful for me during the programming/development process. 

import React from "react"
import PropTypes from "prop-types"

function Card(props) {
    const styles = {
        backgroundColor: props.cardColor,
        height: props.height,
        width: props.width
    }
    
    return (
        <div style={styles}></div>
    )
}

Card.propTypes = {
    cardColor: PropTypes.string
}

Another thing I can do is specify that a prop is actually required for a component. To ensure that cardColor is required, simply tack on 
the isRequired property. If cardColor is not provided, will result in a warning in the development environment. 

Card.propTypes = {
    cardColor: PropTypes.string.isRequired
}

Revised program adds prop types for the height and width and makes at least one of them required. 

Card.propTypes = {
    cardColor: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number
}

Can use an enum so that the incoming cardColor is only valid if it is "blue" or "red". An enum makes it so that I can only choose one of a 
couple of options. The enum ensures that prop is limited to specific values. To specify the valid/specific options, can use the oneOf 
property. oneOf is actually a function that takes an array -> cardColor: PropTypes.oneOf([]). The array will be an array of strings that 
are considered valid values for the prop. If prop is another color besides red and blue, I will receive a warning but the color will change
to color in the prop such as purple -> <Card cardColor="purple" />. Can still chain on isRequired to the function closing. 

Card.propTypes = {
    cardColor: PropTypes.oneOf(["red", "blue"]).isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number
}
_____________________________________________________________________________________________________________________________________
5. DEFAULT PROPS AND PROP TYPES PRACTICE

 * Challenge: Here's a component meant to take an image (`src` prop) and round the edges.
 * It has some styling applied with CSS to ensure it isn't too large on the page, but
 * we want this component to allow for any image source and any kind of border radius to be applied
 * 
 * 1. The component should always receive a `src` prop, and it should always be a string
 * 2. The component should be able to accept only a string or a number for the `borderRadius` prop
 *      (https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)
 * 3. If it doesn't receive a `borderRadius` prop at all, it should default it to "50%"
 * 
 * PropTypes was moved out of the React library into its own library. As a result, PropTypes will need to be added as a dependency and 
 * imported into the RoundedImage component. Default PropTypes are still built into the React library. As a result, there is a property
 * that I can supply to component called defaultProps. 
 * 
 * The string and isRequired requirements will come from the PropTypes library I imported.  
 * 
 * borderRadius is not required, oneOfTypes([]) is a function that takes an array. In this example, takes an array of types not an array
 * of values. Can use PropTypes to access the types. The types can be a string or a number. The reason a number is ok is because the style
 * will automatically assume I am referring to a pixel amount. So 40 is a valid borderRadius because the inline style assumes 40 pixels. 
 * If I were to put a value of true, this will return a message stating "Failed Prop Type"
 * -> style={{borderRadius: props.borderRadius}} 
 * ->  <RoundedImg src="https://picsum.photos/id/237/300/300" borderRadius={true} />
 * 

import React from "react"
import RoundedImg from "./RoundedImg"

function App() {    
    return (
        <div>
            <RoundedImg src="https://picsum.photos/id/237/300/300" borderRadius="10px" />
        </div>
    )
}
export default App

import React from "react"
import PropTypes from "prop-types"

function RoundedImg(props) {
    return (
        <img 
            src={props.src} 
            style={{borderRadius: props.borderRadius}} 
            className="round-img"
        />
    )
}

RoundedImg.propTypes = {
    src: PropTypes.string.isRequired,
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

RoundedImg.defaultProps = {
    borderRadius: "50%"
}

export default RoundedImg


From CSS
.round-img {
    max-width: 50%;
    width: 150px;
}





*/