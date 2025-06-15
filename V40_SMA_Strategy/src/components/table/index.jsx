import React from "react";
import './index.css'


const Table = ({stocks=[],columnConfigs}) => {

  return (
    <div className="table-container">
       {!stocks?.length ? <div className="no-data-row">No Data Found.</div>:
       <table border="1" cellPadding="10">
       <thead>
         <tr>
           
           {columnConfigs?.map((col) => (
             <th key={col.accessor}>{col.label}</th>
           ))}
         </tr>
       </thead>
       <tbody>
         
           {stocks?.map((stock) => (
               <tr key={stock.ticker}>
                   
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
