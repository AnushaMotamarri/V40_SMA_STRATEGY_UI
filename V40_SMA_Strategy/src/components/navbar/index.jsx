// components/Navbar.jsx
import './index.css'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

  return (
    <nav className='navbar'>
      <div  onClick={()=>navigate('')} className="app-title">Simple</div>
    </nav>
  );
}
