import React,{useEffect,useState,useRef} from 'react'
import Table from '../../components/table'
import Accordion from '../../components/accordion'
import './index.css'
import TableShimmer from '../../components/shimmer/table_shimmer'
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


function SmaTable() {
    const [smaDetails,setSmaDetails] = useState({});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const prevControllerRef = useRef(null);
    const [lastUpdatedTime,setLastUpdatedTime] = useState();
    function getSortedTickers(data,type){
        return data.filter((d)=>d.signal === type).sort((a, b) => a.ticker.localeCompare(b.ticker))
    }
    function getFormattedDate(date){
        const isoTime =date;
        const readableTime = new Date(isoTime).toLocaleString();
        return readableTime
    }
    async function  getData(){
        setLoading(true);
        prevControllerRef.current=true
        try{
            let res = await fetch(`${API_BASE_URL}/sma/all`);
        let data = await res.json() || [];
        setSmaDetails({
            sell: getSortedTickers(data.results,SELL_SIGNAL),
            buy:getSortedTickers(data.results,BUY_SIGNAL),
            noSignal: getSortedTickers(data.results,NO_SIGNAL)
        })
        setLastUpdatedTime(getFormattedDate(data.last_updated_time))
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
        if(!prevControllerRef.current){
            
            getData();
        }
       
    },[])
  return (
    <div>
        <h2 className='text-center'>V40 SMA Strategy {lastUpdatedTime?<span className='fs-10'>({lastUpdatedTime})</span>:''}</h2>
        {error&&<div className='error-message'>{error}</div>}
        <div>
            {config?.map((c)=><Accordion title={<span>{c.title} {smaDetails[c.accessor]?.length?<span className='stock-number'>({smaDetails[c.accessor]?.length})</span>:''}</span>}>
            {loading?<TableShimmer/>:<Table stocks={smaDetails[c.accessor]}/>}
    </Accordion>)}
        </div>
        
        
    </div>
  )
}

export default SmaTable