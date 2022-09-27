import React from 'react'
import { useDispatch } from "react-redux";
import { reactionAdd } from "../Post/postSlice";
const reactionEmoji={
    thumbUp:"👍",
    wow:"😲",
    heart:"💖",
    rocket:"🚀",
    coffee:"☕"
}

const ReactionButton = ({post}) => {
    const dispatch=useDispatch()
    const reactionButtons=Object.entries(reactionEmoji).map(([name,emoji])=>{    
   return (
  
    <button key={name} type="button" className='reactButton btn text-dark  mx-1 bg-light' onClick={()=>dispatch(reactionAdd({postId:post.id, reaction:name}))}>
        {emoji} {post.reactions[name]}
    </button>
    )
}

  )
  return <div>{reactionButtons}</div>
}

export default ReactionButton