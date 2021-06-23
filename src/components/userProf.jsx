import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { auth, rl, db } from './firebase'
import AutoSuggest from './autoSuggest'
import Todos from './todos'
import Todo from './todo'
import '../style/userProf.css'

function UserProfile() {

    let history = useHistory()
    const[userId] = useState(localStorage.getItem("auth"))
    const[idx] = useState(new Date().getDay()) //gets the current day, determining the index req 
    const[arr] = useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'])
    const[arr1] = useState(['Yesterday', 'Today', 'Tomorrow'])
    
    const[add, setAdd] = useState(false)//for adding the todo
    const[email, setEmail] = useState('')
    const[yesRem, setYesRem] = useState([])
    const[tod, setTod] = useState([])
    const[tom, setTom] = useState([])
    const[sel, setSel] = useState(1)

    useEffect(() => {//get the email for the purpose of accessing firestore
        async function fet() {
            const request = await rl.ref('Users').get()
            request.forEach(reqUser => {
                if(reqUser.val().ID === userId) {
                    setEmail(reqUser.val().Email)
                } 
            })
        }
        fet()
    }, [])

    useEffect(() => {
        async function fet() {
            const n = 7

            const tIdx = ((idx-2)%n + n)%n
            await cleanUp(tIdx)

            const yesIdx = ((idx-1)%n + n)%n
            const remArr = await getTask(yesIdx, true)//gets the yesterday's remaining task/s
            setYesRem(remArr)

            const todIdx = idx
            const todArr = await getTask(todIdx, false)//gets the todays task/s
            setTod(todArr)

            const tomIdx = (idx+1)%n
            const tomArr = await getTask(tomIdx, false)//gets the tomorrow's scheduled task/s
            setTom(tomArr)

        }
        if(email) fet()
    }, [email])

    const getTask = async (idx, getRem)=> {
        let rArr = []
        const ref = await db.collection(email).doc(arr[idx]).collection('tasks').get()
        ref.forEach(task => {
            if(getRem ? !task.data().status:true) rArr = [...rArr, task.data()]//it checks if getRem is true, yesterday's task will be returned
        })
        return rArr
    }

    const cleanUp = async (idx) => {
        const obj = {
            EventName: "",
            EventDisc: "",
            Day: "",
            CreatedAt: "",
            status: false
        }

        const ref = db.collection(email).doc(arr[idx]).collection('tasks') 
        const req = await ref.get()
        req.forEach(task => {
            ref.doc(task.data().Id).update(obj)
        })
    }

    const handleSignOut = () => {
        auth.signOut()
        localStorage.removeItem("auth")
        alert("You have been successfully sign out!")
        history.push("/")
    }

    return (
        <div className="prof">
            {add ? 
                <div className="abso center">
                    <Todo setAdd={setAdd} setTom={setTom} setTod={setTod} email={email} getTask={getTask}/>
                </div>:<div></div>
            }
            <nav><button onClick={handleSignOut}>Sign Out</button></nav>
            <header>
                <div className="buttons center">
                    <button className="add" onClick={() => setAdd(!add)}>Add+</button>
                    <button className="chat">Chat</button>
                </div>
            </header>
            <hr />
            <h1>Tasks : {arr1[sel]} <span onClick={() => setSel((sel+1)%3)}>{">"}</span></h1>
            <main>
                {/* showcase of todos */}
                <Todos a={[yesRem, tod, tom]} map={[((idx-1)%7 + 7)%7, idx, (idx+1)%7]} index={sel} email={email}/>
            </main>
            <hr />
            <footer className="footerSug">
                {/* random suggestions */}
                <AutoSuggest />
            </footer>
        </div>
    )
}

export default UserProfile