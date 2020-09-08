import React, { useEffect } from 'react';
import { isLoggedIn, userInfo } from '../features/user/userSlice';
import { plays, save } from '../features/game/gameSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import API from '../app/api';
import { Table } from '../components/Table';
import { Link } from "react-router-dom";


export function Dashboard() {
    const loggedIn = useSelector(isLoggedIn);
    const played = useSelector(plays);
    const dispatch = useDispatch();
    const history = useHistory();
    if (!loggedIn) {
        setTimeout(() => {
            history.push('/');
        })
    }
    const user = useSelector(userInfo);
    useEffect(() => {
        API.get('plays').then(function (res) {
            if (res.data.success) {
                dispatch(save({ plays: res.data.plays }));
            }
            return;
        }).catch(() => {
            return;
        })
    }, [dispatch])
    
    const NoRows = () => {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="alert alert-warning">
                            There are no history recorded on your account. <Link to="/play">Click here to start</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="float-right text-strong">Hello {user && user.name ? user.name : ''}</div>
                </div>
            </div>
            {
              ((played && played.length) ? (<Table played={played} />) : <NoRows />)
            }
        </div>

    )
}