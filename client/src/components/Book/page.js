import React, { useState, useEffect } from 'react';
import Posts from './posts';
import Pagination from './pagination';
//import axios from 'axios';

const Page = (res) => {
  //const [posts, setPosts] = useState([]);
  //var posts = [];
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const d = res;
  
const posts = d.datas;
  
var arrayPost = [];

for(var key in posts){
    arrayPost.push(posts[key]);
}

console.log(arrayPost.length);

//arrayPost.length = 5;
/*
var slic = Array.prototype.slice.call(arrayPost,2);
console.log(typeof slic); 
var sliced = [];
for(var i=0; i<3; i++){
    sliced[i] = arrayPost[i];
}
console.log(sliced);
*/  
const indexOfLastPost = currentPage * postsPerPage;
  
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = Array.prototype.slice(indexOfFirstPost,indexOfLastPost);
  const currentPosts = [];
  for(var i = indexOfFirstPost;i<indexOfLastPost;i++){
    currentPosts.push(arrayPost[i]);
  }
//console.log(currentPosts);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={arrayPost.length}
        paginate={paginate}
     />
    </div>
  );
};

export default Page;
