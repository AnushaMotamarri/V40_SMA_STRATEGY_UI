// components/Navbar.jsx
import React,{useState} from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function Navbar({theme,setTheme}) {
    const navigate = useNavigate();
  return (
    <nav className='navbar'>
      <div  onClick={()=>navigate('')} className="app-title">Simple</div>
      <div className='theme' onClick={()=>setTheme(prev=>prev==='light'?'dark':'light')}>
      {theme==='light'?<DarkModeIcon/>:<LightModeIcon/>}
      </div>
    </nav>
  );
}
