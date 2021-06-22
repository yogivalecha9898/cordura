import { useHistory } from 'react-router-dom'
import { auth } from './firebase'

function UserProfile() {

    let history = useHistory()

    const handleSignOut = () => {
        auth.signOut()
        localStorage.removeItem("auth")
        alert("You have been successfully sign out!")
        history.push("/")
    }

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default UserProfile