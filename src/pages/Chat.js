import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AuthContext } from '../context/authContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../component/utils/firebase'
import SideBar from '../component/bar/SideBar'
import SingleChat from '../component/bar/SingleChat'

export default function Chat() {
  const [username, setUsername] = useState('');
  const [sidebar, setSidebar] = useState(false)
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [isNewMessage, setIsNewMessage] = useState(true);





  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    setLoading(true)

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        console.log("hello", user)
        setLoading(false)
      })

    }
    catch (err) {
      setErr(err.message);
      console.log(err)
    }

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }
  return (
    <div className='md:flex'>
      <div className={`${isNewMessage ? "block":"md:block hidden"}`}>
        <div className={`bg-[#DCF5FE]  py-5 md:w-[40vw] justify-between md:flex-row flex-row-reverse w-full px-4 relative ${isNewMessage ? "flex" : "md:flex hidden"}` }>
          <h1 className="text-xl font-bold md:block hidden logo">Chatmini</h1>
          <img src={currentUser.photoURL} className='h-8 rounded-full  -bottom-1 md:absolute z-50 md:-bottom-4' alt="" />
          <div className="flex  md:w-full justify-between w-[85%] mx-6 items-center">
            <AiOutlineMenuUnfold onClick={() => setSidebar(true)} className='block md:hidden text-2xl' />
            <div className="flex bg-white items-center md:w-[60%] px-3 md:ml-14 md:mr-0 mr-5 right-0 rounded-md">
              <img src="/images/left icon.svg" className='h-7' alt="search" />
              <input type="search" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} className='py-2 outline-none px-4 w-full' placeholder='Search user here' />
            </div>
          </div>
        </div>

     
        <SideBar user={user} setIsNewMessage={setIsNewMessage} sidebar={sidebar} setUser={setUser} setUsername={setUsername} loading={loading} err={err} />

      </div>
      <SingleChat setIsNewMessage={setIsNewMessage} isNewMessage={isNewMessage}/>

    </div>
  )
}
