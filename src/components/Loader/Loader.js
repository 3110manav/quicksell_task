import React from "react";

function Loader() {
  return (
    <div class="d-flex align-items-center">
      <strong>Loading...</strong>
      <div
        class="spinner-border ms-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
}

export default Loader;
