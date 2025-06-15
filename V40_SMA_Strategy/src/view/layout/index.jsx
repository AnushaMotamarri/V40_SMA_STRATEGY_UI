// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/index.jsx';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Outlet /> {/* This renders the matched child route */}
      </main>
    </>
  );
}
