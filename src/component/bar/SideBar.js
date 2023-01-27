import React from 'react'
import ChatBox from './ChatBox'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import SearchUser from './SearchUser';


function SideBar({ user,sidebar,setIsNewMessage, loading, setUsername,setUser, err }) {


    return (
        <div className='relative overflow-hidden h-[90vh] border flex'>
            <div className={`bg-fb w-28 md:flex justify-center bg-cover h bg-no-repeat h-screen ${!sidebar ? "hidden" : 'flex'}`}>
                <div className="absolute bottom-8">
                    <ul>
                        <li className='flex justify-center flex-col items-center text-white text-xs mb-5 cursor-pointer'><img className='h-6' src="/images/nights_stay.svg" alt="darkmode" />Dark Theme</li>
                        <li className='flex justify-center flex-col items-center text-white text-xs mb-5 cursor-pointer'><img className='h-6' src="/images/settings.svg" alt="setting" /> Setting</li>
                        <li onClick={() => signOut(auth)} className='flex justify-center flex-col items-center text-white text-xs mb-5 cursor-pointer'><img className='h-6' src="/images/logout.svg" alt="logout" /> Logout</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col w-full overflow-y-auto scroll-m-0 bg-gray-50">
                {
                    loading ? (
                        <div className=" bg-[#DCF5FE] rounded-md p-4 pl-8 w-full mx-auto">
                            <div className="animate-pulse flex items-center space-x-4">
                                <div className="rounded-full bg-slate-700 h-14 w-14"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-700 w-20 mb-3 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {
                                user && (
                                    <SearchUser user={user} setIsNewMessage={setIsNewMessage} setUsername={setUsername} setUser={setUser} err={err} />
                                )
                            }
                        </>

                    )
                }
                <ChatBox setIsNewMessage={setIsNewMessage} />
            </div>
        </div>
    )
}

export default SideBar