import React,{useEffect} from 'react'
import { useSelector } from "react-redux";
import { selectPostIds ,getPostsError,getPostsStatus,fetchPost} from '../Post/postSlice';
import PostExcerpt from './PostExcerpt';
import "./postlist.css"

const PostList = () => {
  const  OrderPosts= useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error= useSelector(getPostsError);
// const=posts.slice().sort((a,b)=>b.date.localeCompare(a.date))n
// console.log(OrderPosts);
 let content;
 if(postsStatus==="loading"){
  content=<p>"loading"</p>
 }else if(postsStatus==="failed"){
  content=<p>{error}</p>
 }else if(postsStatus==="succeeded"){
  if(OrderPosts.length>0){

    content = OrderPosts.map(postId =><PostExcerpt key={postId} postId={postId}/>)
  }
 }
  return (
    <section className='section'>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostList