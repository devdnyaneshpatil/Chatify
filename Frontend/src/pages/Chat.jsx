import React, { useEffect, useState } from "react";
import axios from "axios";
function Chat() {
    const [data,setData]=useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
    //   console.log(response.data);
    setData(response.data)
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  },[]);
  return <div>
    {
        data.map((post)=>(<h1 key={post.id}>{post.title}</h1>))
    }
  </div>;
}

export default Chat;
