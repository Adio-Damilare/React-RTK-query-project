import { createSlice, nanoid,createAsyncThunk ,createSelector,createEntityAdapter} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POST_URL="http://jsonplaceholder.typicode.com/posts";
const postAdapter=createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})
const initialValue =postAdapter.getInitialState( {
    status:"idle",
    error:null,
    count:0,
})

 export const fetchPost=createAsyncThunk("posts/fetchposts",async()=>{
    try{
        const response=await axios.get(POST_URL);
        let data = await response.data.slice(0, 10);
        return data;
    } catch(error){
        return  error
    }
});

export const AddNewPostToserve=createAsyncThunk("posts/AddNewPostToserve",async (initialPost)=>{
    try{
        const response= await axios.post(POST_URL,initialPost);
        // console.log(response.data)
        return response.data;

    } catch(error){
        return error
    }

})


export const updatePost=createAsyncThunk("posts/updatePost",async (initialPost)=>{
    const {id}=initialPost;
    console.log(initialPost)
    try{
        const response=await axios.put(`${POST_URL}/${id}`,initialPost);
        return response.data;
    }catch(error){
        console.log("message :",error.message)
        return initialPost
    }

})


export const deletePost=createAsyncThunk("posts/deletPost",async(initialPost)=>{
    const {id}=initialPost;
    try{
        const response= await axios.delete(`${POST_URL}/${id}`);
        if(response.status==200){
            return initialPost;
        }
        console.log(`${response.status}:${response.statusText}`)
        return `${response.status}:${response.statusText}`

    }catch(error){
        return error.message
    }
})
const postSlice = createSlice({
    name: "posts",
    initialState: initialValue,
    reducers: {
        AddNewPost: {
            reducer: (state, action) => {
                state.posts.push(action.payload)
            },
            prepare: (post) => {
                return {
                    payload: {
                        id: nanoid(),
                        title: post.title,
                        content: post.content,
                        date: new Date().toISOString(),
                        userId: post.userId,
                        reactions: {
                            thumbUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                };
            }
        },
        reactionAdd:(state,action)=>{
            const {postId,reaction}=action.payload;
            const existingPost=state.entities[postId];
            // const existingPost=state.posts.find(post=>post.id===postId);

            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        IncreaseCount:(state,action)=>{
            state.count+=1
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPost.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(fetchPost.fulfilled,(state,action)=>{
            state.status="succeeded";
            let min=1;
            console.log(action.payload)
            const loadedPosts= action.payload.map(post=>{
                post.date=sub(new Date(),{minutes :min++}).toISOString();
                post.reactions={
                    thumbUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                }
                return post
            });
            // state.posts=state.posts.concat(loadedPosts);
            postAdapter.upsertMany(state,loadedPosts);

        })
        .addCase(fetchPost.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message
        })
        .addCase(AddNewPostToserve.fulfilled,(state,action)=>{
            action.payload.userId=Number(action.payload.userId);
            action.payload.date=new Date().toISOString();
            action.payload.reactions={
                thumbUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
            };
            console.log(action.payload);
            // state.posts.push(action.payload);
            postAdapter.addOne(state,action.payload)
        })
        .addCase(updatePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log("Update could not complete");
                console.log(action.payload);
                return
            }
            // const {id} =action.payload;
            action.payload.date=new Date().toISOString();
            // const posts= state.posts.filter(post=>post.id!==id);
            // state.posts=[...posts,action.payload];
            postAdapter.upsertOne(state,action.payload)
            

        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log("Delete could not complete");
                console.log(action.payload);
                return
            }
            const {id} =action.payload;
            // const posts =state.posts.filter(post=>post.id !== id);
            // state.posts=posts;
            postAdapter.removeOne(state,id)

        })
    }

});

export const { AddNewPost,reactionAdd,IncreaseCount } = postSlice.actions;
export const {selectAll:selectAllPosts,selectById:selectPostById,selectIds:selectPostIds}=postAdapter.getSelectors(state=>state.posts )
// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getPostsCount= (state) => state.posts.count;
// export const selectPostById = (state, postId) => state.posts.posts.find(post=>post.id===postId);
export const selectPostByUserId=createSelector([selectAllPosts,(state,userId)=>userId],(posts,userId)=>posts.filter(post=>post.userId===userId))
// export const selectPostByUserId=(state,userId)=>state.posts.posts.filter(post=>post.userId===userId)

export default postSlice.reducer

