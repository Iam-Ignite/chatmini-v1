import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import { db } from '../utils/firebase';

function Message() {
  const [messages, setMessages] = useState("");
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const ref = useRef()

  useEffect(() => {

    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unsub()
    }
  }, [data.chatId])

  useEffect(() => {
    ref.current?.scrollIntoView({ hehavior: "smooth" });
  }, [messages]);





  const date = new Date().toLocaleTimeString()



  return (
    <div className='flex flex-col overflow-x-auto gap-2 md:h-[70vh] h-screen pt-24 md:px-6 px-3 mb-28 md:mb-24 md:m-5'>
      {messages &&
        messages?.map(msg => (
          <>
            <div className={`flex  flex-col ${msg.senderId === currentUser.uid ? "justify-end items-end " : " justify-start items-start"}`} ref={ref}>
              <div key={msg.id} className={` h-auto   ${msg.senderId === currentUser.uid ? "bg-[#0096f5a8] text-white rounded-b-3xl  rounded-l-3xl" : "bg-white rounded-b-3xl rounded-r-3xl"} ${msg.file ? "p-0" : "p-4"}`}>{msg.text}
                {
                  msg.file && (

                    <img src={msg.file} alt="" className='h-44 w-54 rounded-md' />
                  )
                }
              </div>
              {
                !msg.date?.toDate() ? "" : msg.date.toDate().toLocaleTimeString() === date ? <span className='text-xs mt-1 float-right pr-2'>Just now</span> : <span className='text-xs mt-1 float-right pr-2'>{msg.date.toDate().toLocaleTimeString().substring(0, msg.date.toDate().toLocaleTimeString().length - 6)}</span>
              }

            </div>
          </>
        ))
      }
    </div>
  )
}

export default Message

