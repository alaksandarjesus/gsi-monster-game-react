import React, { useState, useEffect } from 'react';
import { isLoggedIn, userInfo } from '../features/user/userSlice';
import { store } from '../features/game/gameSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toInteger, random } from 'lodash';
import { Rules } from '../components/Rules';
import { Logs } from '../components/Logs';
import { ProgressBar } from '../components/ProgressBar';
import { ResultModal} from '../components/ResultModal';


export function Play() {
    const loggedIn = useSelector(isLoggedIn);
    const history = useHistory();
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [game, setGame] = useState(false)
    const [playerHealth, setPlayerHealth] = useState(100);
    const [monsterHealth, setMonsterHealth] = useState(100);
    const [playerOneTurn, setPlayerOneTurn] = useState(true);
    const [logs, setLogs] = useState([])
    const [result, setResult]= useState(false);
    const[title, setTitle]=useState('');
    const dispatch = useDispatch();
    if (!loggedIn) {
        setTimeout(() => {
            history.push('/');
        })
    }
    const user = useSelector(userInfo);

    const toggleTurn = (index) => {

        const value = toInteger(random(1, 10));
        if (index === 1) {
            setMonsterHealth(monsterHealth - value);
            setLogs((prev) => ([
                [`${user.name} attacked Monster with value ${value}`], ...prev
            ]))
        }
        if (index === 2) {
            const infectionValue = toInteger(value / 2);
            setMonsterHealth(monsterHealth - (value));
            setPlayerHealth(monsterHealth - infectionValue);
            setLogs((prev) => ([
                [`${user.name} power attacked Monster with value ${value}`], ...prev
            ]));
            setLogs((prev) => ([
                [`${user.name} got infected with value ${infectionValue}`], ...prev
            ]));
        }
        if (index === 3) {
            setPlayerHealth(playerHealth + value);
            setLogs((prev) => ([
                [`${user.name} healed with value ${value}`], ...prev
            ]))
        }

        setPlayerOneTurn(false);

    }

    useEffect(() => {
        let interval;
        if (game && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(timeRemaining - 1);
                if (timeRemaining <= 1) {
                    clearInterval(interval);
                    endGame();
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        };
    })

    useEffect(() => {
        if (!playerOneTurn) {
            setTimeout(() => {
                const value = toInteger(random(1, 10));
                setPlayerHealth((prev) => prev - value);
                setPlayerOneTurn(true);
                setLogs((prev) => ([
                    [`Monster attacked ${user.name} with value ${value}`], ...prev
                ]))
            }, 1000)
        }


    }, [playerOneTurn, user])

    const startGame = () => {
        setTimeRemaining(60);
        setGame(true);
        setPlayerHealth(100);
        setMonsterHealth(100);
        setLogs([]);

    }

    const endGame = () => {
        if(!result){
            let title = 'Game Tied';
            if(playerHealth < monsterHealth){
                title = 'Monster Wins';
            }else if(playerHealth > monsterHealth){
                title = 'You win';
            }
            setTitle(title);
            setResult(true);
        }
    }

    const onModalClose = (save)=>{
       if(save){
        const data = {
            logs: logs,
            result:title
        }
        dispatch(store(data));
       }
        setGame(false);
        setResult(false);
    }
    const StartBtn = () => {
        return (<div className="row">
            <div className="col-sm-12">
                <Rules />
            </div>
            <div className="col-sm-12">
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary btn-lg btn-block" onClick={startGame}>Start</button>
                </div>
            </div>

        </div>)
    };

    const ControlBtns = () => {
        return (<div className="row">
            <div className="col-sm-12">
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary btn-lg" disabled={!playerOneTurn} onClick={() => toggleTurn(1)}>Attack</button>
                    <button className="btn btn-primary  btn-lg" disabled={!playerOneTurn} onClick={() => toggleTurn(2)}>Blast</button>
                    <button className="btn btn-primary  btn-lg" disabled={!playerOneTurn} onClick={() => toggleTurn(3)}>Heal</button>
                    <button className="btn btn-primary  btn-lg" disabled={!playerOneTurn} onClick={() => endGame()}>Giveup</button>
                </div>
            </div>
        </div>)
    };



    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-8">
                    <h2>Play Game</h2>
                </div>
                <div className="col-sm-4">
                    {timeRemaining ?
                        <span className="float-right">Time remaining: {timeRemaining}</span> : ''}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <h4 className={`text-center ${playerOneTurn ? 'text-danger' : ''}`}>{user.name}</h4>
                    <div><ProgressBar width={playerHealth} /></div>
                </div>
                <div className="col-sm-12 col-md-6">
                    <h4 className={`text-center ${!playerOneTurn ? 'text-danger' : ''}`}>Monster</h4>
                    <div><ProgressBar width={monsterHealth} /></div>
                </div>
                <div className="col-sm-12 my-3">
                    {game ? <Logs logs={logs} /> : ''}
                </div>
            </div>
            {game ? (<ControlBtns />) : (<StartBtn />)}
            <ResultModal show={result} title={title} onModalClose={onModalClose}/>
        </div>
    )
}