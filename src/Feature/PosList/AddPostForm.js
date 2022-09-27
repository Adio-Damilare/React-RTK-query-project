import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { AddNewPost ,AddNewPostToserve} from '../Post/postSlice';
import { selectAllUsers } from '../Users/UserSlice';
import {useNavigate} from "react-router-dom"
const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [addRequestStatus,setAddRequestStatus]=useState("idle")
    const [values, setValues] = useState({
        id: nanoid(),
        title: "",
        content: "",
        userId:""
    });
    // const canSave=Boolean(values.title)&&Boolean(values.content)&&Boolean(values.userId);
    const canSave=[values.userId,values.content,values.title].every(Boolean) && addRequestStatus==="idle"

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };
    const users=useSelector(selectAllUsers)
    const submitme = (e) => {
        e.preventDefault();

        if(canSave){
            try{
                setAddRequestStatus("pending");
                dispatch(AddNewPostToserve({title:values.title,body:values.content,userId:values.userId})).unwrap();
                setValues({...values,title:"",content:"",userId:""})
                navigate("/")

            }catch(error){
                console.error("failed to save the post",error)

            }
            finally{
                setAddRequestStatus("idle")
            }
        }
        // if (values.content && values.title) {
        //     dispatch(AddNewPost(values))
        //     setValues({ ...values, title: "", content: "" })

        // };

    };


    const userOptions=users.map(user=>(
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    return (
        <section className='d-flex mb-5' style={{ width: "100%", justifyContent: "center", }}>
            <div className='w-25 text-center'>
                <h2>Add new Post</h2>
                <form onSubmit={submitme}>
                    <label htmlFor='postTitle'>Post title</label>
                    <input type="text" className='form-control' value={values.title} id="postTitle" name='title' onChange={(e) => handleChange(e)} />

                    <label htmlFor='userId' className='d-block '>Author</label>
                    <select className='form-select' id="userId"  name='userId' onChange={(e)=>handleChange(e)}>
                        <option value="" ></option>
                        {userOptions}
                    </select>

                    <label htmlFor='postContent'>Post content</label>
                    <textarea type="text" className='form-control' value={values.content} id="postContent" name='content' onChange={(e) => handleChange(e)} />
                    <button type='submit' className='btn btn-primary my-2'  disabled={!canSave} >Add new post</button>
                </form>
            </div>
        </section>
    )
}

export default AddPostForm