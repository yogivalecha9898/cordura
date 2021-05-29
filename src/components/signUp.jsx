import { useEffect, useState } from "react"
import { db } from './firebase'

function SignUp() {

    // const[arr] = useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',])

    // useEffect(() => {
    //     const obj = {
    //         EventName: "",
    //         EventDisc: "",
    //         Day: "",
    //         Id: "",
    //         status: false,
    //         RemindMe: ""
    //     }

    //     arr.forEach(day => {
    //         let docRef = db.collection('user').doc(`${day}`).collection('tasks')
    //         for(let i = 0; i < 4; i++) {
    //             docRef.add(obj)
    //             .then(doc => {
    //                 docRef.doc(`${doc.id}`).update({
    //                     Id: doc.id
    //                 })
    //             })
    //         }
    //     })
    // })

    return (
        <div>hello</div>
    )
}

export default SignUp