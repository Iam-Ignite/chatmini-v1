import React, { useContext } from 'react'
import { setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../utils/firebase';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';


export default function SearchUser({ user,setUser, setUsername }) {

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleSelect = async (u) => {

        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })

            }
        }
        catch (err) {
            console.log(err);
        }
        setUser(null);
        setUsername("")
         dispatch({
            type:"CHANGE_USER",
            payload:u
        })
    }

    return (
        <div className='relative w-full border' onClick={() =>handleSelect(user)} >
            <div className="flex justify-between items-center px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                    <img src={user.photoURL} className='h-14 rounded-full mr-4' alt="profile pic" />
                    <div className="">
                        <b>{user.displayName}</b>
                    </div>
                </div>

            </div>
        </div>
    )
}
