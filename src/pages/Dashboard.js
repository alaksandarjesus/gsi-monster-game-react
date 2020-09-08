import React, {useEffect} from 'react';
import {isLoggedIn, userInfo} from '../features/user/userSlice';
import { plays, save } from '../features/game/gameSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import  API  from '../app/api';
import { isEmpty } from 'lodash';

export  function Dashboard(){
    const loggedIn = useSelector(isLoggedIn);
    const played = useSelector(plays);
    const history = useHistory();
    const dispatch = useDispatch();
    if(!loggedIn){
        setTimeout(()=>{
            history.push('/');
          })
    }
    const user = useSelector(userInfo);

    useEffect(() =>{
        if(isEmpty(played)){
            API.get('plays').then((res) => {
                if(res.data.success){
                    dispatch(save({'plays': res.data.plays}))
                }
            }).catch((err) =>{
    
            })
        }
        
    }, [dispatch, played]);

    console.log("played",played)


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="float-right">Hello {user && user.name? user.name:''}</div>
                </div>
            </div>
        </div>
    )
}