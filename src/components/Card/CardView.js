import { React } from "react";
import { priorityMapper } from "../../common/ticketMapper";

const CardView = (props) => {         //DATA COMING FROM CATAGOTY TABLE
  return (
    <div className="card shadow-sm mt-2 mb-3">
      <div className="card-body">
        <div className="d-flex justify-between">
          <p className="fw-light">{props.cardData.id}</p>
          <p className="ms-auto">{priorityMapper[props.cardData.priority]}</p>
        </div>
        <h6 className="card-title mb-2 fw-bold">{props.cardData.title}</h6>
        <span className="d-inline-block p-2 rounded shadow-sm bg-light">
        {props.cardData.tag}
        </span>
      </div>
    </div>
  );
};

export default CardView;
