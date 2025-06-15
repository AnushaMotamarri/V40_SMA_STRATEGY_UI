// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/index.jsx';
import './index.css'

export default function Layout({ theme, setTheme }) {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <section className='p-20'>
      <Outlet />
      </section>
      
    </>
  );
}
