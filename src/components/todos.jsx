import { useEffect, useRef, useState } from "react"
import '../style/todos.css'
import { db } from "./firebase"

function Todos({ a, index, map, email }) {

    const[reqArr, setArr] = useState([])
    const[isEmpty, setEmpty] = useState(false)
    const[arr] = useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'])

    // console.log(map)

    useEffect(() => {
        setArr(a[index])
        let empty = 0
        a[index].map(data => {
            if(data.EventName === "") empty++
        })
        setEmpty(empty === 4 ? true:false)//will check if there are no tasks remaining
        console.log(a[index], index)
    }, [a[index]])

    return (
        <div className="todoSec">
            { !isEmpty ? 
                <div className="inner">
                    {reqArr.map(data => {
                        return <Compo key={data.Id} data={data} len={isEmpty} email={email} day={arr[map[index]]}/>
                    })}
                </div>
                :
                <div className="emptyTask center">
                    <h1>Oops! No Tasks</h1>
                </div>
            }
        </div>
    )
}

function Compo({ data, email, day }) {

    console.log(data.status)

    const todoReq = useRef(null)
    const[toggle, setToggle] = useState(false)
    const[extraClass] = useState({
        "opacity": "0.3",
        "cursor": "not-allowed"
    })

    const handleStatusChange = async ()=> {
        todoReq.current.focus()
        todoReq.current.style.opacity = "0.3"
        todoReq.current.style.cursor = "not-allowed"
        db.collection(email).doc(day).collection('tasks').doc(data.Id).update({status: true})
        console.log(day, data.Id)
    }

    return (
        <div className="mainTodo">
            {data.EventName ? 
                <section ref={todoReq} className="todos" style={data.status ? {opacity: "0.3", cursor: "pointer"}:{}}>
                    <header>
                        <h3>{data.EventName}</h3>
                        <p>{data.EventDisc}</p>
                    </header>
                    <footer className="center">
                        <button onClick={handleStatusChange}>Done?</button>
                    </footer>
                </section>:<div></div>
            }
        </div>
    )
}

export default Todos