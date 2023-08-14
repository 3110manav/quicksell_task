/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

function NavBar(props) {
  const groups = ["status", "user", "priority"];
  const priority = ["priority", "title"];
  console.log(props);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <div className="btn-group bg-white">
                <button
                  className="btn dropdown-toggle position-relative col-xs-12 d-flex align-items-center h-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"  
                >
                  <span className="material-symbols-outlined me-2">tune</span>
                  Display
                </button>

                <ul className="dropdown-menu position-absolute pr-3 pl-3 rounded-2" style={{width: '250px', marginTop: '6px' }}>
                  <li>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted">Group By</span>
                      <select
                        className="form-select w-auto"
                        aria-label="Default select example"
                        onChange={(elem) => {
                          localStorage.setItem("groupBy", elem.target.value);  
                          props.onHandelChange(
                            elem.target.value,
                            localStorage.getItem("sortBy") || "status"
                          );
                        }}
                        defaultValue={
                          localStorage.getItem("groupBy") || "status"
                        }
                      >
                        {groups.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>

                  <li className="mt-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted">Sort By</span>
                      <select
                        className="form-select w-auto"
                        aria-label="Default select example"
                        onChange={(elem) => {
                          localStorage.setItem("sortBy", elem.target.value);
                          props.onHandelChange(
                            localStorage.getItem("groupBy") || groups[0],
                            elem.target.value
                          );
                        }}
                        defaultValue={
                          localStorage.getItem("sortBy") || "status"
                        }
                      >
                        {priority.map((value) => {
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
