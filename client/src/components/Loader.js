import React, { useState, useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  return (
    <div style ={{marginTop:"150px",marginLeft:"50%"}}>
        <div className="sweet-loading text-center">
            <RingLoader
                loading={loading}
                color ="#000"
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    </div>
    );
}
export default Loader;
