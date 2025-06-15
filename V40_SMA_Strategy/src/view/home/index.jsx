import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const config = [{
    key:'v40sma',
    label:'V40 SMA Strategy 🚀',
    url:'/v40sma'
  }]
  return (
    <div className='strategies-container'>
      <h2 className='strategies-title'>Strategies</h2>
      {config.map((c)=><div key={c.key} className='item-btn' onClick={()=>navigate(c.url)}>{c.label}</div>)}
      <div className='more-soon'>More coming soon...!</div>
    </div>
  )
}

export default Home