import React, { useEffect, useRef } from 'react';
import * as jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';

export function ResultModal(props) {

    const modal = useRef(null);

    useEffect(()=>{
        
        if(props.show){
            jQuery(modal.current).modal('show');
        }else{
            jQuery(modal.current).modal('hide');
        }

    }, [props.show])

    const onClose = (save)=>{
        props.onModalClose(save);
    }

    return (
        <div className="modal fade" ref={modal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static"
        data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="close" onClick={()=>onClose(0)} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Do you wish to save the result?
      </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>onClose(0)}>Don't save</button>
                        <button type="button" className="btn btn-primary" onClick={()=>onClose(1)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}