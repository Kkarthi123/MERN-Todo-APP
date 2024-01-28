import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/signup';
import Notes from './components/notes';
import AuthUi from './components/authUi';
import {RequireAuth} from "./components/protectRoute";
import Profile from "./components/profile";
import Error from './components/error';



function App() {
  // let auth = JSON.parse(localStorage.getItem("authToken"));
  return (
     <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> }>
            <Route index element={ <AuthUi/> } />
            <Route path="login" element={ <Login /> } />
            <Route path="register" element={ <SignUp/> } />
            <Route path='*' element={<Error/>} />
          </Route>
          <Route path='/user'>
            <Route index  element={<Error/>}/>
            <Route path="my-notes" element={ <RequireAuth  component={<Notes />}></RequireAuth> } />
            <Route path="profile" element={ <RequireAuth component={<Profile />}></RequireAuth>} />
            <Route path='*' element={<Error/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
     </>
  )
}

export default App;
