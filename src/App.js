// import Todo from './components/todo'
import './style/custom.css'
import './style/main.css'
import { useState } from 'react'
import UserProfile from './components/userProf'
import Sign_In from './components/signInForm'
import Sign_Up from './components/signUpForm'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

function App() {

  console.log(localStorage.getItem("auth"))

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/user" render={() => {
          return localStorage.getItem("auth") ? <UserProfile />:<Redirect to="/"/>
        }}/>
        <Route path="*" render={() => { return <h1>Wrong address</h1>}} /> {/*any invalid address will respond*/}
      </Switch>
    </Router>
  )
}

function Main() {

  const[toggle, setToggle] = useState(false)

  return (
    <section className="main">
        <div className="left center">
          <h1>Sanity</h1>
        </div>
        <div className="right center">
          {!toggle ? <Sign_In/>:<Sign_Up/>}
          <p>{toggle ? "Already a User?":"Create an account?"}<span onClick={() => setToggle(!toggle)}>{toggle ? " Sign In":" Sign Up"}</span></p>
        </div>
      </section>
  )
}

export default App;
