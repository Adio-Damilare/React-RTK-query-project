import React from 'react'
import { useSelector } from "react-redux";
import { selectAllUsers } from "../Users/UserSlice";
 
 const PostAuthor = ({userId}) => {
    const users=useSelector(selectAllUsers);
    const Author=users.find(user=>user.id===userId)
   return( <span>{Author?Author.name:"Unknown Author"}</span>)
 }
 
 export default PostAuthor