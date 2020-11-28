import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import React from "react";


function Loading() {
    return (
        <div style={{height: '100%', width: '100%', display: 'table'}}>
            <div style={{display: 'table-cell', verticalAlign: 'middle', textAlign: 'center', height: '11'}}>
                <CircularProgress/>
            </div>
        </div>
    );
}


export default (Loading);
