import React,{useEffect,useState} from 'react'
import Table from '../../components/table'
import Accordion from '../../components/accordion'
import './index.css'
const SELL_SIGNAL = "SELL"
const BUY_SIGNAL = "BUY"
const NO_SIGNAL = "NO_SIGNAL"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const config =[{
    title:'Buy',
    accessor:'buy'
},{
    title:'Sell',
    accessor:'sell'
},{
    title:'No Signal',
    accessor:'noSignal'
}]
function GetComponent({title='',data=[]}){

    return <Accordion title={title}>
        <Table stocks={data}/>
    </Accordion>
  }
function SmaTable() {
    const [smaDetails,setSmaDetails] = useState({});
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState('hey')
    async function  getData(){
        setLoading(true);
        try{
            let res = await fetch(`${API_BASE_URL}/sma/all`);
        let data = await res.json();
        setSmaDetails({
            sell: data.filter((d)=>d.signal === SELL_SIGNAL),
            buy:data.filter((d)=>d.signal===BUY_SIGNAL),
            noSignal: data.filter((d)=>d.signal===NO_SIGNAL)
        })
        }
        catch(e){
            setError('Error occured while fetching the data');
            console.log(e)
        }
        finally{
            setLoading(false)
        }
        
        
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
        <h1 className='text-center'>V40 SMA Strategy</h1>
        {error&&<div className='error-message'>{error}</div>}
        {loading?<div>Loading...</div>:<div>
            {config?.map((c)=><GetComponent title={c.title} data={smaDetails[c.accessor]}/>)}
        </div>
        }
        
    </div>
  )
}

export default SmaTable