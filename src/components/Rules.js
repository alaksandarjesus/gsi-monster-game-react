import React from 'react';
import '../styles/rules.css';

export function Rules() {


    return (
        <div>
            <h4>Rules</h4>
            <ol className="list-unstyled rules-list">
                <li> Game duration is 60 seconds, Whoever has the lesser health left
losses</li>
                <li> Attack - The Player attacks the Covid Monster for a random value and
                simultaneously the player will get infected by Covid. The health reduces by the
random value not more than 10 for both opponents</li>
                <li>Blast - The Player launches a power attack on the Covid Monster and
simultaneously is prone to a power infections on his/her health by half.</li>
                <li>
                    Heal - The Player’s health is increased by a random value. However
                    during healing, the player will infected at random number by Covid Monster too.
            </li>
                <li>
                    Give up - You give up as the Covid Monster is too strong for you and the
                    player is taken to the Start Game Screen.
            </li>
            </ol>
        </div>

    )
}