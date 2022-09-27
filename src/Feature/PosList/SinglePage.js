import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from '../Post/postSlice'
import PostAuthor from './PostAuthor';
import ReactionButton from './ReactionButton';
import TimeAgo from './TimeAgo';
import {useParams,Link} from "react-router-dom"

const SinglePage = () => {
    const {postId}=useParams()
    const post = useSelector((state) => selectPostById(state,Number(postId)));
    // console.log(post)
    if (!post) {
        return (
            <div>page not found</div>
        )
    }
    return (
        <article style={{ padding: "0px 0px 0 10px" ,color:"black",width:"100%" ,alignItems:"center", }} className="d-flex justify-content-center">
            <div className=' border border-3 border-dark ps-2' style={{borderRadius:"10px",width:"30%"}}>
            <h3>{post.title.substring(0, 20)}</h3>
            <p className='text-center'>{post.body.substring(0, 200)}</p>
            <p>
                <Link to={`/post/edit/${post.id}`} className="d-block text-decoration-none">Edit post</Link>
                by : <PostAuthor userId={post.userId} />
                <TimeAgo timeStamp={post.date} />
                <ReactionButton post={post} />
            </p>
            </div>

        </article>
    )
}

export default SinglePage