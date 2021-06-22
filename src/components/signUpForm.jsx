import '../style/form.css'
import { useState } from 'react'
import { auth, rl, db } from './firebase'

function Sign_Up() {

    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const[username, setUsername] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        if(username && email && pass) {//a valid input is required 
            const request = await auth.createUserWithEmailAndPassword(email, pass).catch(err => {
                alert(err.message)
                clear()
            }) // check if the user is already present
            if(request !== undefined) {//in case an error is being caught, this line will not execute
                const obj1 = {
                    Username: username,
                    Email: email,
                    ID: request.user.uid
                }//creating a new user
                await rl.ref('Users').push(obj1) //it will wait for the database to create a user
                clear()
                const obj2 = {
                    EventName: "",
                    EventDisc: "",
                    Day: "",
                    Id: "",
                    status: false,
                    RemindMe: "",
                    CreatedAt: "",
                }//creating a task for todos
                const arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
                arr.forEach(day => {//for each day at most 4 tasks are allowed
                    let docRef = db.collection(`${email}`).doc(`${day}`).collection('tasks')
                    for(let i = 0; i < 4; i++) {
                        docRef.add(obj2)
                        .then(doc => {
                            docRef.doc(`${doc.id}`).update({//update the task ID for future reference
                                Id: doc.id
                            })
                        })
                    }
                })
            }
        } else {
            alert("Input the fields correctly!")
            clear()
        }
    }

    const clear = () => {
        setUsername('')
        setEmail('')
        setPass('')
    }

    return (
        <form onSubmit={handleSubmit} className="form center">
            <label><h1>Sign Up</h1></label>
            <label>
                <input value={username} type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                <input value={email} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <input value={pass} type="password" placeholder="Password" onChange={e => setPass(e.target.value)}/>
            </label>
            <label>
                <input type="submit"  value="SIGN UP"/>
            </label>
        </form>
    )
}

export default Sign_Up