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















_____________________________________________________________________________________________________________________________________
1A. REACT CHILDREN PRACTICE




*/