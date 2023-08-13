/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useEffect } from "react";

function NavBar(props) {
  const groups = ["status", "user", "priority"];
  const priority = ["priority", "title"];
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="material-symbols-outlined">tune</span>
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle col-xs-12"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Display
              </a>
              <ul className="dropdown-menu pr-3 pl-3" style={{width:'250px'}}>
                <li>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="">Group By</span>
                    <select
                      className="form-select w-auto"
                      aria-label="Default select example"
                      onChange={(elem)=>{
                        setGroupBy(elem.target.value)
                        localStorage.setItem('groupBy',elem.target.value)
                        props.onChange(elem.target.value,localStorage.getItem('sortBy') || sortBy)
                      }}
                      defaultValue={localStorage.getItem('groupBy') || 'status'}
                    >
                      {groups.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </li>

                <li className='mt-2'>
                  <div className="d-flex align-items-center justify-content-between">
                  <span className="">Sort By</span>
                    <select
                      className="form-select w-auto"
                      aria-label="Default select example"
                      onChange={(elem)=>{
                        setSortBy(elem.target.value)
                        localStorage.setItem('sortBy',elem.target.value)
                        props.onChange(localStorage.getItem('groupBy') || groupBy,elem.target.value)
                      }}
                      defaultValue={localStorage.getItem('sortBy') || 'status'}
                    >
                      {priority.map((value) => {
                        return <option key={value} value={value}>{value}</option>;
                      })}
                    </select>
                  </div>
                </li>

              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
