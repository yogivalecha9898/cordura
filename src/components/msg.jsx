import { useEffect, useState } from "react"
import { rl, db } from './firebase'

function Msg({ id }) {

    const[text, setText] = useState('')
    const[users, setUsers] = useState([])
    const[toUser, setTUser] = useState('')
    const[show, setShow] = useState(false)

    useEffect(() => {
        rl.ref('user').get()
        .then(user => {
            let arr = []
            user.forEach(obj => {
                if(obj.val().ID !== id) {
                    console.log(obj.val())
                    arr.push(obj.val())
                }
            })
            setUsers(arr)
        })
    }, [])

    const handle = e => {
        e.preventDefault()
        db.collection(`${id}`).doc('msgs').collection('sent')
        .add({
            to: "lifeisgaming2049",
            text: text
        })
        .then(() => {
            db.collection(`${toUser}`).doc('msgs').collection('received')
            .add({
                from: id,
                text: text
            })
            .then(msg => console.log("msg a gaya be"))
            document.getElementById('form').reset()
        })
    }

    return (
        <div>
            {show ? 
                <form onSubmit={handle} id="form">
                <input type="text" onChange={e => setText(e.target.value)}/>
                <input type="submit" value="Submit"/>
            </form>:<div></div>}
            {users.map(element => {
                return <div id={element.ID} onClick={() => {
                    setTUser(element.ID)
                    setShow(true)
                }}>
                    {element.name}
                </div>
            })}
        </div>
    )
}

export default Msg