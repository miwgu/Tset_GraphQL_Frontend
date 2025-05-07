import React, { useEffect, useState } from 'react'
import * as FaIcons from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { BiSolidPencil } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {Link, useLocation} from 'react-router-dom';
import './SideNav.css';
import {IconContext} from 'react-icons';
import { useNavigate } from 'react-router-dom';
//import authService from '../../utils/authService';
//import eventService from '../../utils/eventService';
//import { useContext } from 'react';
import { useLocalHostLogin } from '../Login/LocalHostLoginProvider';


const SideNav = () => {
    const [sidebar, setSidebar]=useState(false);
    const [isAuth, setIsAuth]= useState(false);
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const { isLoggedIn, logout } = useLocalHostLogin();
    
    const navigate = useNavigate();
    const location = useLocation();

    const showSidebar =() => setSidebar(!sidebar)


    const handleLogout =() =>{
        logout();

    };


  return(
  <>
  <IconContext.Provider value={{color: '#c1c1c1'}}>
   <div className="navbar" >
       <Link to ="#" className = 'menu-bars'>
           <FaIcons.FaBars onClick={showSidebar}/>
       </Link> 

       {/*---------- Display friend selection when on Chat page ------------ */}
       {isAuth && location.pathname === '/chat' && (

        <SwitchFriendModal
           selectedFriend={selectedFriend}
           setSelectedFriend={setSelectedFriend}
           // To update the conversationId
           setSelectedConversationId={setSelectedConversationId}    
        />

       )}

       {/*---------- Display Invitation icon------------ */}
       {isAuth && location.pathname === '/chat' && (

           <InvitationModal />

        )}

       {/*---------- Display loggedin username and avatar------------ */}
       {/* {isAuth && (
        <div className="user-info">
            <span className="username">{username}</span>
            {avatar && <img src={avatar} alt="Avatar" className="avatar" />}
        </div>
       )}
 */}
   </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu' }>
        <ul className='nav-menu-items' onClick={showSidebar}>
            <li className ='navbar-toggle'>
                <Link to ="#" >
                    <RiCloseLargeFill  onClick={showSidebar} />
                </Link> 
            </li>
          {/*   {SidebarData.map((item,index) => {
              return(
                  <li key={index} className={item.cName}>
                      <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                      </Link>
                  </li>
              )
            })} */}

            {!isLoggedIn ? (
               <li className='nav-text'>
                    <Link to='/login'>
                        <IoMdLogIn />
                        <span className='uLine-text'>Login</span>
                    </Link>
                </li>):
                (<li className='nav-text'>
                <Link to='/' onClick={handleLogout}>
                    <IoMdLogOut />
                    <span className='uLine-text'>Logout</span>
                </Link>
                </li>)};
                
                
               {!isLoggedIn ? (
                <li className='nav-text'>
                <Link to='/register' >
                    <BiSolidPencil />
                    <span className='uLine-text'>Register</span>
                </Link>

              </li>
               ):(
                null
               )
               }


               {/*  {!isAuth ? 
                null:
                <li className='nav-text'>
                    <Link to='/chat' >
                        <FaRegFaceSmileWink />
                        <span className='uLine-text'>Chat</span>
                    </Link>
                </li>
                                } */}

            
        </ul>
    </nav>
    </IconContext.Provider>

  </>
  ) 
}

export default SideNav