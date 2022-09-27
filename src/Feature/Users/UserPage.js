import React from 'react';
import {useParams,Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUserById } from './UserSlice';
import { selectPostByUserId } from '../Post/postSlice';

const UserPage = () => { 
    const {userId} =useParams();
    console.log(userId)
    const user=useSelector((state)=>selectUserById(state,Number(userId)));
    const postForuser=useSelector((state)=>selectPostByUserId(state,Number(userId)));
    const PostTitle=postForuser.length>0?postForuser.map(post=>(
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>
                {post.title.substring(0,100)}
            </Link>
        </li>
    )):(<>User does not have post</>)

  return (
  <section style={{height:"100vh",justifyContent:"center",alignItems:"center"}} className="w-100 d-flex " >
    <div>
    <h2>{user?.name} posts</h2>
    <ol>{PostTitle}</ol>
    </div>
  </section>
  )
}

export default UserPage