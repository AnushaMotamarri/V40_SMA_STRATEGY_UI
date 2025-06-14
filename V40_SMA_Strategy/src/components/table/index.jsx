import React from "react";
import './index.css'
const columnConfigs = [
  { accessor: "ticker", label: "Ticker" },
  { accessor: "last_closing_price", label: "Last Closing Price" },
  { accessor: "sma_20", label: "SMA 20" },
  { accessor: "sma_50", label: "SMA 50" },
  { accessor: "sma_200", label: "SMA 200" }
];

const Table = ({stocks=[]}) => {

  return (
    <div>
       {!stocks?.length ? <div className="no-data-row">No Data Found.</div>:
       <table border="1" cellPadding="10">
       <thead>
         <tr>
           <th>SL.No</th>
           {columnConfigs?.map((col) => (
             <th key={col.accessor}>{col.label}</th>
           ))}
         </tr>
       </thead>
       <tbody>
         
           {stocks?.map((stock,idx) => (
               <tr key={stock.ticker}>
                   <td>{idx+1}</td>
               {columnConfigs?.map((col) => (
                   <td key={col.accessor}>{stock[col.accessor]}</td>
               ))}
               </tr>
           ))}
       </tbody>
     </table>
       }
      
    </div>
  );
};

export default Table;
