import { Route,Routes,Navigate } from "react-router-dom";
import Main from "./components/main/main";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import 'bootstrap/dist/css/bootstrap.min.css';
function RootApp() {
  const user =localStorage.getItem("token")
  return (
    <Routes>
      
   
      {user&&<Route path="/" exact element={<Main/>}/>}
     
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/login" exact element={<Login/>}/>
      {!user && <Route path="/" element={<Navigate to="/login" replace />} />}

    </Routes>
  );
}

export default RootApp;

