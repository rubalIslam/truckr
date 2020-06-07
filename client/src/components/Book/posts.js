import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  var arr = [];
  //console.log(posts);
  for(var i in posts){
  //    console.log(posts[i]);
    //arr.push(<li>{posts[i].driver}</li>);
    arr.push(posts[i]);
  }
  
  //console.log(arr);

  var list = {};
  for(var i in arr){
     list[i] = arr[i];
  }

/*
  for(var i in arr){
    console.log(arr[i]);
    for(var j in arr[i]){
        console.log(j+" : "+arr[i][j]);
        //console.log(j);
        list.push(<li >{j} : {arr[i][j]} </li>)
        //list.push(j:arr[i][j]);
    }
  }*/
  console.log(list);

  return (
    <ul className='list-group mb-4'>
        {
            Object.keys(list).map((item, i) => (
                <li key={i}>
                    Key: {i}
                    Name: {list[item].name}
                </li>
            ))
        }
      {/*arr.map(a => (
        <li key={a} className='list-group-item'>
          {a[]}
        </li>
      ))*/}
    </ul>
  );
};

export default Posts;
