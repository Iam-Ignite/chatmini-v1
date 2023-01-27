import React, { useContext, useState } from 'react'
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import Message from '../msg/Message'
import SingleChatNav from './SingleChatNav'
import { db, storage } from '../utils/firebase';
import { v4 as uuid } from 'uuid'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


function SingleChat({ isNewMessage, setIsNewMessage }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);


  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(
        storageRef,
        file,
      );
      uploadTask.on(
        (error) => {
          console.log('first problem', error);
          // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  file: downloadURL
                })
              });
            },
          );
        },
      );
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
      setText("");
      setFile(null);

    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp()
    });



  }


  return (
    <>
      <div className={` flex-col w-full relative ${isNewMessage ? "hidden" : "flex"}`}>
        {
          data.chatId === null ? "" : <SingleChatNav />
        }
        <div className="bg-chat bg-cover  bg-no-repeat h-screen md:h-[90vh] w-full">
          <Message />
          <div className=" flex md:relative overflow-x-auto fixed bottom-0 md:bottom-10 bg-white md:w-[90%] w-[93%] mt-16 mb-5 rounded-2xl items-center  px-5 mx-4 md:mx-10">
            {/* <img src="/images/Vector (26).svg" alt="" /> */}
            <BsFillArrowLeftCircleFill onClick={() => setIsNewMessage(true)} className='text-3xl block md:hidden text-[#0096f5a8]' />
            <BsFillArrowLeftCircleFill  className='text-3xl md:block hidden text-[#0096f5a8]' />
            <input type="text" className='w-full py-6 outline-none mx-5' placeholder='Type message here...' value={text} onChange={(e) => setText(e.target.value)} />
            <input type="file" className='hidden' id="file" onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor='file' className='cursor-pointer'>
              <img src="/images/Vector (27).svg" alt="" />
            </label>
            <button onClick={handleSend} className='mx-3 ml-6'> <img src="/images/Vector (28).svg" alt="" /></button>
          </div>
        </div>
      </div>

    </>
  )
}

export default SingleChat