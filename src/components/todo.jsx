import { useEffect, useState } from "react"
import { db, rl } from './firebase'
import SignUp from './msg'
// import '../style/form.css'

function Todo({ email, setAdd, setTom, setTod, getTask }) {

    // some constants
    const[userId] = useState(localStorage.getItem("auth"))
    const[idx] = useState(new Date().getDay()) //gets the current day, determining the index req 
    const[arr] = useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'])

    // required variables
    const[eName, setEName] = useState('')
    const[eDisc, setEDisc] = useState('')
    const[day, setDay] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        if(day && eName && eDisc) {
            let flag = undefined
            const ref = db.collection(email).doc(day).collection('tasks')
            const req = await ref.get()
            req.forEach(async task => {
                if(!flag && !task.data().EventName) {
                    flag = !flag
                    const obj = {
                        EventName: eName,
                        EventDisc: eDisc,
                        Day: day,
                        CreatedAt: new Date().getTime()
                    }
                    const after = await ref.doc(task.id).update(obj)//updating the task which was initially empty, using ref to locate to that task
                    const tArr = day === arr[idx] ? await getTask(idx, false): await getTask((idx+1)%7, false) 
                    day === arr[idx] ? setTod(tArr):setTom(tArr)
                    clear()
                    setAdd(false)
                }
            })
            if(!flag) alert("Only 4 at most tasks are allowed")
        } else alert("Input the fields correctly!")
    }

    const clear = () => {
        setEName('')
        setEDisc('')
        setDay('')
        document.getElementById('todoForm').reset()
    }

    return (
        <div className="todoForm">
            <div className="cross" onClick={() => setAdd(false)}>X</div>
            <form id="todoForm" onSubmit={handleSubmit}>
                <label>
                    <h1>Event</h1>
                </label>
                <label>
                    <input value={eName} type="text" placeholder="Event Name" onChange={e => setEName(e.target.value)}/>
                </label>
                <label>
                    <input value={eDisc} type="text" placeholder="Event Discription" onChange={e => setEDisc(e.target.value)}/>
                </label>
                <label>
                    <input value={arr[idx]} type="radio" name="day" onClick={e => setDay(e.target.value)}/>Today {`(${arr[idx]})`}
                    <input value={arr[(idx+1)%7]} type="radio" name="day" onClick={e => setDay(e.target.value)}/>Tomorrow {`(${arr[(idx+1)%7]})`}
                </label>
                <label>
                    <input type="submit" value="Add"/>
                </label>
            </form>
        </div>
    )
}

export default Todo