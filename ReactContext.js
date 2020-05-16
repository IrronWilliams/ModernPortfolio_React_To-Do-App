/*1. Intro.  In version 16.3, React officially released their stable API for using context. In React you can only pass data downward thru props. 
However, if I have 2 components that are on the same level in the subtree and both need the same state, I will need to lift that state up
to a higher component. So will need to put state in its parent component and then pass the data down to the components that need it thru

[] []  these 2 component need the same state. Will need to lift state up to a higher component than pass the data down:

******
[]  -> state resides here and will pass down data to the components on the lower subtree. . 

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



*/

