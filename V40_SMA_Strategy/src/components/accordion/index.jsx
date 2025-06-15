import React,{useState} from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './index.css'
function Accordion({title,children}) {
    const [open,setOpen] = useState(true);
  return (
    <div>
        <h3 className='title' onClick={()=>setOpen(!open)}>{open?<ArrowDropDownIcon sx={{ fontSize: 30 }}/>:<ArrowRightIcon sx={{ fontSize: 30 }}/>} {title}</h3>
        {open?children:''}
    </div>
  )
}

export default Accordion