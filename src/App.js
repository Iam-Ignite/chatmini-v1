import Register from "./pages/Register";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";


function App() {

 
 const { currentUser } = useContext(AuthContext); 

 const ProtectedRoute = ({children}) => {
     if(!currentUser){
       return <Navigate to='/login'/>
     }

     return children
 }


  return (
    <>
       <BrowserRouter>
      <Routes path='/' >
        <Route index element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>

       
    </>

  );
}

export default App;
