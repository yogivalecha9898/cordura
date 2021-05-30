// import Todo from './components/todo'
import { useState, useEffect } from 'react';
import { auth, fu } from './components/firebase'
import Suggest from './components/autoSuggest'
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './components/userProf'
import { db, rl } from './components/firebase'
import Msg from './components/msg'

function App() {

  const { user, loginWithRedirect, isAuthenticated } = useAuth0()

  useEffect(() => {
    if(isAuthenticated) {
      console.log(user)
      rl.ref('user').get().then(users => {
        let flag = 0
        users.forEach(u => {
          if(u.val().ID === user.nickname) {
            flag = 1
          }
        })
        if(flag === 0) {
          rl.ref('user').push({
            ID: user.nickname,
            name: user.name
          })
          const obj = {
            EventName: "",
            EventDisc: "",
            Day: "",
            Id: "",
            status: false,
            RemindMe: "",
            CreatedAt: "",
          }
          const arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
          arr.forEach(day => {
              let docRef = db.collection(`${user.nickname}`).doc(`${day}`).collection('tasks')
              for(let i = 0; i < 4; i++) {
                  docRef.add(obj)
                  .then(doc => {
                      docRef.doc(`${doc.id}`).update({
                          Id: doc.id
                      })
                  })
              }
          })
        }
      })
    }
  }, [isAuthenticated])

  return (
    <div>
      <form onSubmit={() => {
        loginWithRedirect()
      }}>
        <input type="submit" value="Submit"></input>
      </form>
      {isAuthenticated ? <Msg id={user.nickname}/>:<div></div>}
      <Profile />
    </div>
  )
}

export default App;
