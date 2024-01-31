import { useNavigate } from "react-router-dom";

import { createContext, useContext, useState, useEffect } from 'react';

const chatContext=createContext()

const ChatProvider=({children})=>{
    const navigate=useNavigate()
    const [user,setUser]=useState()
    useEffect(()=>{
     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
     setUser(userInfo)
     if(!userInfo){
        navigate('/')
     }
    },[navigate])
  return (
    <chatContext.Provider value={{ user, setUser}}>
      {children}
    </chatContext.Provider>
  );
}


export const chatState=()=>{
    return useContext(chatContext);
}

export default ChatProvider