import { useState } from 'react'
import '../style/form.css'
import { auth, rl, db } from './firebase'
import { useHistory } from 'react-router-dom'

function Sign_In() {
    
    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    let history = useHistory()

    const handleSubmit = async e => {
        e.preventDefault()
        if(email && pass) {
            const request = await auth.signInWithEmailAndPassword(email, pass).catch(err => {
                alert(err.message)
                clear()
            })
            if(request !== undefined) {
                console.log(request)
                localStorage.setItem("auth", request.user.uid)
                history.push('/user')
                clear()
            }
        } else {
            alert("Input the fields correctly!")
            clear()
        }
    }

    const clear = () => {
        setEmail('')
        setPass('')
    }

    return (
        <form onSubmit={handleSubmit} className="form center">
            <label><h1>Sign In</h1></label>
            <label>
                <input
                    style={{opacity: "0.2", cursor: "not-allowed"}}
                    type="text" placeholder="Username" readOnly
                />
            </label>
            <label>
                <input value={email} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <input value={pass} type="password" placeholder="Password" onChange={e => setPass(e.target.value)}/>
            </label>
            <label>
                <input type="submit"  value="SIGN IN"/>
            </label>
        </form>
    )
}

export default Sign_In