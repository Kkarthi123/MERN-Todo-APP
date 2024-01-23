import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/signup';
import Notes from './components/notes';
import AuthUi from './components/authUi';
import {RequireAuth} from "./components/protectRoute";



function App() {
  return (
     <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> }>
            <Route index element={ <AuthUi/> } />
            <Route path="login" element={ <Login /> } />
            <Route path="register" element={ <SignUp/> } />
          </Route>
          <Route path="notes" element={ <RequireAuth component={<Notes/>}></RequireAuth> } />
        </Routes>
      </BrowserRouter>
     </>
  )
}

export default App;
