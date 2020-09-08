import React from 'react';
import '../styles/logs.css';

const renderList = (logs)=>{
    return logs.map((item, index)=>{
        return <li key={index} className="list-group-item">{item}</li>
        });
}

export function Logs(props) {

    return(
        <ul className="list-group logs-list">
            {renderList(props.logs)}
        </ul>
    );
}