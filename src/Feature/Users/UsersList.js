import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './UserSlice';
import {Link} from "react-router-dom"

const UsersList = () => {
    const users=useSelector(selectAllUsers);
    console.log(users)
    const renderUsers=users.map((user)=>(
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))
  return (
   <section className='d-flex w-100' style={{alignItems:"center",height:"100vh",justifyContent:"center"}}>
    <div>

        <h2>Users</h2>
        <ul>{renderUsers}</ul>
    </div>
   </section>
  )
}

export default UsersList