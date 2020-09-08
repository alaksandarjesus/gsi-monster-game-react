import React, {useState} from 'react';
import {LogsModal} from './LogsModal';


export function Table(props) {
    const [logs, setLogs] = useState([]);
    const [showLogs, setShowLogs] = useState(false);

    const onViewDetails = (play)=>{
        if(play.logs && play.logs.length){

            setShowLogs(true);
            setLogs(play.logs)
        }
    }
    const renderTbody = (played) => {
        return played.map((play, key) => {
            return (
                <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{play.created_at}</td>
                    <td>{play.result}</td>
                    <td>
                        <button className="btn btn-sm btn-link" onClick={() => onViewDetails(play)}>View Details</button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-sm-12">
                <h2>Dashboard</h2>
            </div>
                                <div className="col-sm-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTbody(props.played)}
                        </tbody>

                    </table>
                </div>
            </div>
            <LogsModal show={showLogs} logs={logs} onModalClose={() => setShowLogs(false)} />
        </div>
    )
}