import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';

export default function ChatBox() {
    const [chats, setChats] = useState([]);
    
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

       useEffect(() => {
  const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());
        });

        return () => {
            unsub();
        }
  }
  currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({
            type:"CHANGE_USER",
            payload:u
        })

    }


    return (
        <div className='relative w-full'  >
        {
            Object.entries(chats)?.map(chat => (

            <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className="flex justify-between items-center px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                    <img src={chat[1].userInfo.photoURL} className='h-14 rounded-full mr-4' alt="profile pic" />
                    <div className="">
                        <b>{chat[1].userInfo.displayName}</b>
                        <p className='text-gray-600 text-sm'>{chat[1].userInfo.lastMessage?.text}</p>
                    </div>
                </div>
                <div className="">
                    <span className='text-gray-700 text-base'></span>
                    {/* <div className="bg-[#A80710] text-white text-center h-5 text-sm w-5 rounded-full m-auto">4</div> */}
                </div>
            </div>
            ))
        }
        </div>
    )
}
