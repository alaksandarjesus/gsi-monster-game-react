import React, {useState, useEffect} from 'react';
import '../styles/progress-bar.css';

export function ProgressBar(props) {

    const [bg, setBg] = useState('bg-success');

    useEffect(()=>{
        if(props.width > 80){
            setBg('bg-success')
        }
        else if(props.width < 80 && props.width > 60){
            setBg('bg-info')
        }
        else if(props.width < 60 && props.width > 40){
            setBg('bg-warning')
        }
        else{
            setBg('bg-danger')
        }
    }, [props.width]);

    return (
        <div className="my-5">
            <div className="progress health">
                <div className={`progress-bar ${bg}` } role="progressbar" style={{ 'width': props.width + '%' }} aria-valuenow={props.width}
                    aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="text-center my-2">
                <strong>Health {props.width} %</strong>
            </div>
        </div>
    )
}