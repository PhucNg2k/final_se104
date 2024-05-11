import React from "react";
import { useState, CSSProperties } from "react"; 
import HashLoader from "react-spinners/HashLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
 
  return (
    <div style={{marginTop:'20%',marginLeft:'50%'}}>
      <div className="sweet-loading text-center">
        <HashLoader
          color={'#000'}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
