import React ,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {selectPostById,updatePost,deletePost} from "../Post/postSlice";
import {useNavigate,useParams} from "react-router-dom"
import { selectAllUsers } from '../Users/UserSlice';
import { useEffect } from 'react';
import { useDeletePostMutation,useUpdatePostMutation } from '../Post/postSliceForQuery';

const EditPost = () => {
    // const dispatch =useDispatch();
    const {postId} =useParams();

    const [updatePost,{isLoading}]=useUpdatePostMutation();
    const [deletePost]=useDeletePostMutation();


    let post =useSelector((state)=>selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers)
    // console.log(post)
    const navigate=useNavigate();
    const user=useSelector(selectAllUsers);
    const [values, setValues] = useState({
        title:post?.title,
        content: post?.body,
        userId:post?.userId,
    });

    const helpMeNav=()=>{
        navigate("/")

    }
    if(!post){
        helpMeNav()
        return(
            <section>
                <h2>Page not found</h2>
            </section>
        )
    }
    // const canSave=Boolean(values.title)&&Boolean(values.content)&&Boolean(values.userId); 
    const canSave=[values.userId,values.content,values.title].every(Boolean) && !isLoading

    const handleChange = (e) => {
        if(e.target.name=="userId"){
            setValues({ ...values, [e.target.name]:Number( e.target.value )})
            return
        }
        setValues({ ...values, [e.target.name]: e.target.value })
    };

    const submitme = async (e) => {
        e.preventDefault();

        if(canSave){
            try{
                
                 await updatePost({title:values.title,body:values.content,userId:values.userId, id :postId,reactions:post.reactions}).unwrap();
                setValues({...values,title:"",content:"",userId:""})
                navigate(`/post/${postId}`)

            }catch(error){
                console.error("failed to save the post",error)

            }
        }
    };


    const userOptions=users.map(user=>(
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    const deleteThisPost= async (e)=>{
        e.preventDefault();
        try{
        await deletePost({id:post?.id}).unwrap();
            setValues({...values,title:"",
                content:"",
                userId:"",})
            navigate("/")
        }catch(error){
            console.error("failed to delete this post",error)
        }
    }
    return (
        <section className='d-flex mb-5' style={{ width: "100%", justifyContent: "center", }}>
            <div className='w-25 text-center'>
                <h2>Add new Post</h2>
                <form onSubmit={submitme}>
                    <label htmlFor='postTitle'>Post title</label>
                    <input type="text" className='form-control' value={values.title} id="postTitle" name='title' onChange={(e) => handleChange(e)} />

                    <label htmlFor='userId' className='d-block '>Author</label>
                    <select className='form-select' id="userId"  name='userId' defaultValue={values.userId} onChange={(e)=>handleChange(e)}>
                        <option value="" ></option>
                        {userOptions}
                    </select>

                    <label htmlFor='postContent'>Post content</label>
                    <textarea type="text" className='form-control' style={{minHeight:"200px"}} value={values.content} id="postContent" name='content' onChange={(e) => handleChange(e)} />
                    <button type='submit' className='btn btn-primary my-2'  disabled={!canSave} >Edit post</button>
                    <button type='submit' onClick={deleteThisPost} className='btn btn-danger my-2' >Delete post</button>
                </form>
            </div>
        </section>
    )
}

export default EditPost