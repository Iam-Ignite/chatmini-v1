import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { collection, getDoc, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase'
import { async } from '@firebase/util';

function Navbar() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where("displayName", "===", username));

    try {
      const queryshapshot = await getDoc(q);
      queryshapshot.forEach((doc) => {
        setUser(doc.data())
      })

    }
    catch (err) {
      setErr(err.message);
    }

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }


  return (
    <div className='bg-[#DCF5FE] flex py-5 w-[40vw] px-4 relative'>
      <h1 className="text-xl font-bold logo">Chatmini</h1>
      <img src={currentUser.photoURL} className='h-8 rounded-full absolute z-50 -bottom-4' alt="" />
      <div className="flex bg-white items-center w-[60%] px-3 ml-14 right-0 rounded-md">
        <img src="/images/left icon.svg" className='h-7' alt="search" />
        <input type="search" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} className='py-2 outline-none px-4 w-full' placeholder='Search user here' />
      </div>
    </div>
  )
}

export default Navbar