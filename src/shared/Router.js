import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "../page/Counter";
import { Main } from "../page/Main";
import Post from "../page/Post";
import PostRTK from "../page/PostRTK";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Main/>} />
        <Route path="/counter" element={ <Counter/>} />
        <Route path="/post" element={ <Post/>} />
        <Route path="/post-rtk" element={ <PostRTK/>} />
      </Routes>
    </BrowserRouter>
  )
}
