import './App.css'
//import { gql, useQuery } from '@apollo/client';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./components/Login/Login";
import SideNav from './components/Nav/SideNav';
import Home from "./components/Home/Home";
import BookList from './components/Book/BookList';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {

  return (
    <>
       <SideNav/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoute/>}>
           <Route path="/booklist" element ={<BookList/>} />
          </Route>
        </Routes>
    </>
  )
}

export default App
