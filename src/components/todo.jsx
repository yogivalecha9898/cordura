import { useEffect, useState } from "react"
import { db } from './firebase'
import SignUp from './signUp'

function Todo() {

    let[idx] = useState(new Date().getDay())
    const[arr] = useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'])
    const[name, setName] = useState('')
    const[dis, setDis] = useState('')
    const[day, setDay] = useState('')
    const[time, setTime] = useState('')
    const[tod, setTod] = useState([]) //tod = today's list
    const[yesRem, setYRem] = useState([]) //yesRem = yesterday's remaining
    const[tom, setTom] = useState([]) //tomorrow's list
    const[cur, setCur] = useState({})

    useEffect(() => {
        let yesIdx = ((idx-1)%arr.length + arr.length)%arr.length
        db.collection('user').doc(`${arr[yesIdx]}`).collection('tasks').get()
        .then(doc => {
            let yArr = []
            doc.forEach(document => {
                if(!document.data().status) yArr.push(document.data())
            })
            setYRem(yArr)
        })
        .catch(err => alert(err))

        let todIdx = idx
        db.collection('user').doc(`${arr[todIdx]}`).collection('tasks').get()
        .then(doc => {
            let todArr = []
            doc.forEach(document => {
                todArr.push(document.data())
            })
            setTod(todArr)
        })
        .catch(err => alert(err))

        let tomIdx = (idx+1)%arr.length
        db.collection('user').doc(`${arr[tomIdx]}`).collection('tasks').get()
        .then(doc => {
            let tomArr = []
            doc.forEach(document => {
                tomArr.push(document.data())
            })
            setTom(tomArr)
        })
    }, [cur])

    const handleChange = (e)=> {
        e.preventDefault()

        const obj1 = {
            EventName: "",
            EventDisc: "",
            Day: "",
            status: false,
            RemindMe: "",
            CreatedAt: ""
        }

        const obj2 = {
            EventName: name,
            EventDisc: dis,
            Day: day,
            status: false,
            RemindMe: time,
            CreatedAt: new Date().getTime()
        }

        let yesIdx = ((idx-2)%arr.length + arr.length)%arr.length
        let yes = db.collection('user').doc(`${arr[yesIdx]}`).collection('tasks')
        yes.get()
        .then(doc => {
            doc.forEach(el => {
                yes.doc(`${el.id}`).update(obj1)
            })
            yesIdx = ((idx-1)%arr.length + arr.length)%arr.length
            yes = db.collection('user').doc(`${arr[yesIdx]}`).collection('tasks')
            yes.get()
            .then(doc => {
                doc.forEach(el => {
                    if(el.data().status) yes.doc(`${el.id}`).update(obj1)
                })
                let docRef = db.collection('user').doc(`${day}`).collection('tasks')
                docRef.get()
                .then(doc => {
                    let flag = 0
                    doc.forEach(el => {
                        if(el.data().EventName === "" && flag !== 1) {
                            flag = 1
                            docRef.doc(`${el.id}`).update(obj2)
                        }
                    })
                    setCur(obj2)
                    if(flag === 0) alert("Only 4 todos are to be done in a day")
                    else docRef.orderBy("CreatedAt", "asc")
                })
            })
        })


        const form = document.getElementById('form')
        form.reset()
    }

    return (
        <div>
            <form onSubmit={handleChange} id="form">
                <div>
                    <label>Event Name</label>
                    <input type="text" placeholder="Add event name" onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Event Description</label>
                    <textarea placeholder="Add event description" onChange={e => setDis(e.target.value)}/>
                </div>
                <div>
                    <label>Select Day</label>
                    <input 
                        type="radio" 
                        name="day" 
                        value={arr[idx%arr.length]} 
                        onClick={e => setDay(arr[idx%arr.length])}
                    />Today ({arr[idx]})

                    <input 
                        type="radio" 
                        name="day" 
                        value={arr[(idx+1)%arr.length]} 
                        onClick={e => setDay(arr[(idx+1)%arr.length])}
                    />Tomorrow ({arr[(idx+1)%arr.length]})
                </div>
                <div>
                    <label>Remind me at</label>
                    <input type="time" onChange={e => setTime(e.target.value)}/>
                </div>
                <div>
                    <label>Invite</label>
                    <input type="email" placeholder="Enter mail address"/>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>

            <div>
                {yesRem.map(val => (<div>{JSON.stringify(val)}</div>))}
            </div>
            <br />
            <br />
            <div>
                {tod.map(val => (<div>{JSON.stringify(val)}</div>))}
            </div>
            <br />
            <br />
            <div>
                {tom.map(val => (<div>{JSON.stringify(val)}</div>))}
            </div>
            {/* <SignUp /> */}
        </div>
    )
}

export default Todo