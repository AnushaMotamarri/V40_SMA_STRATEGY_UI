import React,{ useState} from 'react'
import TradeTable from '../../components/keyValuePair'
import TableShimmer from '../../components/shimmer/table_shimmer';
import Table from '../../components/table';
import { convertToCSV, downloadJSONAsCSV, getCSVFilename } from '../../utils/utils';
import DownloadIcon from '@mui/icons-material/Download';
function ResearchReports() {
  const [error,setError] = useState();
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const columns = [
    { field: 'reportDate', label: 'Report Date', type: 'text' },
    { field: 'ticker', label: 'Stock', type: 'text' },
    { field: 'buyPrice', label: 'Buy Price', type: 'number' },
    { field: 'targetPrice', label: 'Target Price', type: 'number' },
   
  ];

  const columnConfigs = [
    { accessor: "report_date", label: "Report Date" },
    { accessor: "ticker", label: "Stock" },
    { accessor: "buy_price", label: "Buy Price" },
    { accessor: "target_price", label: "Target Price" },
    { accessor: "actual_opportunity", label: "Actual Opp %" },
    { accessor: "current_price", label: "Current Price" },
    { accessor: "current_opportunity", label: "Current Opp %" },
    { accessor: "opportunity_variation", label: "Opp Variation %",cellRenderer:(col)=><div className={col.opportunity_variation<=5?'text-green text-bold':'text-normal'}>{col.opportunity_variation}</div> },
    { accessor: "target_price_hit_date", label: "Hit On" },
  ]
  const initialRows = [{ ticker: '', buyPrice: '', sellPrice: '' }];

  function handleGenerateReports(data){
    setLoading(true);
    setResult([])
    fetch(`${API_BASE_URL}/research-stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Research results:", data);
        setResult(data)
      })
      .catch((err) => {
        console.error("Error fetching research data:", err);
        setError("Error fetching research data:")
      })
      .finally(()=>{
        setLoading(false)
      });

  }
  return (
    <div>
        <h2>Research Reports</h2>
        <p className='note'>This section analyzes each stock based on your buy and target prices, showing current market data and potential gain. It also tracks if and when the target price was reached since the report date.</p>
        {error&&<div>{error}</div>}
        
        <TradeTable
          columns={columns}
          initialRows={initialRows}
          allowAdd={true}
          allowDelete={true}
          allowSave={true}
          saveCallback={handleGenerateReports}
          filePath={'/sample_template.csv'}
          showDownloads = {true}
          disableActions={loading}
        />
        
       
        {loading?<TableShimmer/>:!result?.length?'':<div>
        <div className='display-flex'>
        <h2>Results <span>({result?.length || 0})</span></h2>
        <span className='ml-auto display-flex fs-md '><a className='flex-center' onClick={()=>downloadJSONAsCSV(convertToCSV(result,columnConfigs),getCSVFilename('research'))}><DownloadIcon style={{fontSize:'13px'}}/> Download </a></span>
        </div>
        <Table columnConfigs={columnConfigs} rows={result}/>
        </div>
        }
    </div>
  )
}

export default ResearchReports