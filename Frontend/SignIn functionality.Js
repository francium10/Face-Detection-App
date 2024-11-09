
// To start with, We create a folder SignIn With the file signIn and then as usual we do the basics like
// importing react and also having our functional component

import { Component } from "react"
import Navigation from "./Components/Navigation/Navigation"
import SignIn from "./Components/SignIn/SignIn"

// import SignIn from "./Components/SignIn/SignIn" ===from make  app

// We grab a SignIn form tachyons-signIn forms just make sure to add <input/> closing tag after grabbing the entire code
// To put our form in a box/card we wrap our form into article which we also get from tachyons-cards
// import react from "react";  
// const SignIn=()=>{
    // return(
    <articles>
        <form>
       </form>
    </articles>
    // )
// }

// Now it is just a matter of customizing the css to make sure it looks beautiful.

// =========================Next is how we can get into our app after signing in=============================== 
// for that we need state.
//  We will call it route, this route will keep track of where we are at on the page 
//  and will initially start from SignIn

// const[route,setRoute]=useState('SignIn')

// Next we apply a conditional statement

// just below navigation 
// We make a conditional that interprets into if sign route===signIn to the state we have made 
// then sign into the SignIn component. Else show the rest of the components in the div 

{route === 'SignIn' ? (
    <SignIn />
  ) : (
    <div>
      <Logo />
      <Rank />
      <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
    </div>
  )}
// Remember to apply some parenthesis to both condition? (true): (false ) to avoid jsx errors 
// And also please use "singIn" with strings based on how u put it in useState

// Next we want to have a function that will direct us to the home page upon any changes 
// so we create a function 
HandleRoute=()=>{
    setRoute(home)
}

// and pass it as prob in our signed in component 
{/* <SignIn HandleRoute={HandleRoute}/> */}
// and also pass it as prop in the actual SignIn component  like const SignIn =({HandleRoute})=>{}
// and finally call the same function above as using the onClick in the input element

// The above must work perfectly. if there are not errors 

// Next we also want to that when we click on signOut it takes our back to the registration process. 
// For that we go to the navigation component and put our handleRoute function as a prop
// and also we say onClick={HandleRoute} in our anchor element

// We also pass the same {handleRoute} to navigation in our app and we now pass route as a parameter
// in our app 
// instead of this which works only for as static login page, we want to a dynamic route which works 
// in both signing in and signing out 
// HandleRoute=()=>{
//     setRoute(home)
// }
// We now do this below so that both SignIn and SignOut work upon Clicking 
// We set the route to be dynamic 
  
HandleRoute=()=>{
    setRoute({route:route})
}
// Essentially we want to call the HandleRoute function in both SignIn and Navigation component as 
// arrow function

// Put the following in SignIn Component 
{handleRoute}
// onClick={()=>handleRoute('home')}

// Put the Following in Navigation Component
{handleRoute}
// onClick={()=>handleRoute('signIn')}

// Next we build a register form 
// For most of the part we will just get the same data for the signIn form and make few edits.
// add the name input delete the register div, in sign it just change the anchor tag to p tag 
// and give it  onClick={()=>handleRoute("register")}

// Next we head to App and import our registered file and add it to our app being rendered
// Lets get the tricky part by moving our condition around 
// we will say if route is equal to home then render our display screen otherwise return sign in 
// else  return register form 
<div className='App'>
<ParticlesBg type="cobweb" bg={true} /> 
<Navigation handleRoute={handleRoute} />
{route === 'home' ? (
  <div>
    <Logo />
    <Rank />
    <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
  </div>
):(
  route==='SignIn'
  ?<SignIn handleRoute={handleRoute} /> : <Register handleRoute={handleRoute}/>
) 
}
</div>
// This should work perfectly
// Next we want to only display the signOut only when we are in the home page and then we also want to 
// to have register and singIn buttons when we outside 
// for that we go to our Navigation component add a new parameter in thr parenthesis as IsSignedIn and use it 
// in our condition. But since it does not exist we have to add it manually from 
// This parameter is something we add as new state in our hooks 
const [IsSIgnedIn,SetIsSIgnedIn]=useState(false)

// and pass it in the handleRoute function as a conditional statement

handleRoute=(route)=>{
if(route==='SigOut'){
SetIsSIgnedIn(false)
}
else if(route===home){
  SetIsSIgnedIn(true)
}
  setRoute(route)
}
 

const Navigation=({handleRoute,IsSIgnedIN})=>{
  if (IsSIgnedIN===true)
  return (
<nav className='tc absolute right-0 top-0'>
  <a className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2'
   href='#0'onClick={()=>handleRoute('SignIn')}
  >Sign out</a>
</nav>
  )
  else{
    return(
<nav className='tc absolute right-0 top-0'>
  <a className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2' 
  href='#0'onClick={()=>handleRoute('SignIn')}
  >Sign In</a>

  <a className='f6 fl grow hover-bg-purple hover-white b--purple link ba dib purple pa4 ma2 pv2'
   href='#0'onClick={()=>handleRoute('register')}
  >Register</a>
</nav>

    )
  }
}
