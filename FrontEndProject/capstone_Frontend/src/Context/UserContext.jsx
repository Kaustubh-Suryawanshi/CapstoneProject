import React, { createContext, useState } from 'react'
export const UserContext=createContext({
    userID:0,
    updateUserId:(id)=>{},

    userName:'',
    updateUserName:(name)=>{},

    role:'',
    updateUserRole:(role)=>{}
})
const UserContextProvider = ({children}) => {
    const [userID, setUserId]=useState(0);
    const [userName, setUserName]=useState('');
    const [role,setUserRole]=useState('');
    const updateUserId=(id)=>{
        setUserId(id);
    }
    const updateUserName=(name)=>{
        setUserName(name);
    }
    const updateUserRole=(name)=>{
      setUserRole(name);
  }
  return (
    <UserContext.Provider value={{userID,updateUserId,userName,updateUserName,role,updateUserRole}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
