import React from "react";
import CardView from "../Card/CardView";


function CatagoryTable(props) {

  const data = props.catagoryData;         //DATA COMING FROM App.js 

  if(data.length == 0){
    return null
  }
  return (
  <div className="mt-5">
  <ul className="d-lg-flex justify-content-around p-2 pr-lg-5 pl-lg-5">
    {data.map((columnData) => (
      <div key={columnData.title} className="text m-2" style={{flex:`${100/data.length}%`}}>
        <h4>{columnData.title}</h4>
        {columnData?.tickets.map((ticket, index) => (
          <li key={index} className="list-unstyled">
            <CardView cardData={ticket} />               
          </li>
        ))}
      </div>
    ))}
  </ul>
</div>

);}
export default CatagoryTable;
