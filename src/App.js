import React from 'react';
import Example from './Example';
import PostList from './Feature/PosList/PostList';
import Counter from './Feature/counter/Counter';
import AddPostForm from './Feature/PosList/AddPostForm';
import SinglePage from "./Feature/PosList/SinglePage";
import UserPage from './Feature/Users/UserPage';
import UsersList from './Feature/Users/UsersList';
import EditPost from './Feature/PosList/EditPost';
import LayOut from './component/LayOut';
import { Route, Routes,Navigate } from "react-router-dom"


function App() {
  return (
    <>
      {/* <Counter/>
    <Example/> */}
      {/* <AddPostForm />
      <PostList /> */}
      <Routes>
        <Route path="/" element={<LayOut/>}>
          <Route index element={<PostList />} />
          <Route path='post'>
            <Route index element={<AddPostForm />} />
            <Route path=':postId' element={<SinglePage />} />
            <Route path='edit/:postId' element={<EditPost />} />
          </Route>
          <Route path="user">
            <Route index element={<UsersList/>}/>
            <Route path=':userId' element={<UserPage/>}/>
          </Route>

          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Route>
      </Routes>

    </>
  )
}

export default App