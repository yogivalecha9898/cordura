import React from "react";
import Msg from './msg'
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(user)

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <h3>{user.nickname}</h3>
        <p>{user.email}</p>
        <Msg id={user.nickname}/>
      </div>
    )
  )
}

export default Profile;