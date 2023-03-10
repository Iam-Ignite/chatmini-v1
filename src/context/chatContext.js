import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./authContext";


export const ChatContext = createContext();


export const ChatContextProvider = ({ children }) => {
const { currentUser } = useContext(AuthContext);

    const INITIALSTATE = {
        chatId: "null",
        user:{}
    }

    const chatReducer =(state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
            return {
                user: action.payload,
                chatId:currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,

            }
           
        
            default:
                break;
        }

    }

    const [state, dispatch] = useReducer(chatReducer, INITIALSTATE)
    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )


}