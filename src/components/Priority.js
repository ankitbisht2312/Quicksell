import React, { useEffect, useState } from 'react';
import CardPriority from './CardPriority';
import '../styles/Status.css';

import plusmore from '../assets/images/plusmore.png';
import nopriorityimg from '../assets/images/nopriority.png';
import urgentimg from '../assets/images/urgent.png';
import highimg from '../assets/images/high.png';
import mediumimg from '../assets/images/medium.png';
import lowimg from '../assets/images/low.png';

const Priority = (props) => {
    const [tick, setTick] = useState([{ id: "CAM" }]);
    const [nopriority, setnopriority] = useState([]);
    const [lowpriority, setlowpriority] = useState([]);
    const [hightpriority, sethightpriority] = useState([]);
    const [mediumpriority, setmediumpriority] = useState([]);
    const [urgent, seturgent] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    useEffect(() => {
        countPriorities();
    }, [tick]);

    async function fetchTickets() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function countPriorities() {
        const noprioritypre = [];
        const lowprioritypre = [];
        const mediumprioritypre = [];
        const hightprioritypre = [];
        const urgetnpre = [];

        tick.forEach((ticket) => {
            if (ticket.priority === 0) noprioritypre.push(ticket);
            if (ticket.priority === 1) lowprioritypre.push(ticket);
            if (ticket.priority === 2) mediumprioritypre.push(ticket);
            if (ticket.priority === 3) hightprioritypre.push(ticket);
            if (ticket.priority === 4) urgetnpre.push(ticket);
        });

        // Sort priorities
        setnopriority(noprioritypre.sort((a, b) => a.title.localeCompare(b.title)));
        setlowpriority(lowprioritypre.sort((a, b) => a.title.localeCompare(b.title)));
        setmediumpriority(mediumprioritypre.sort((a, b) => a.title.localeCompare(b.title)));
        sethightpriority(hightprioritypre.sort((a, b) => a.title.localeCompare(b.title)));
        seturgent(urgetnpre.sort((a, b) => a.title.localeCompare(b.title)));
    }

    return (
        <div className='Boards'>
            {/* No-Priority Board */}
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={nopriorityimg} className='headingImg' alt='No-Priority' />
                    <p className='cText' style={{ width: "190px" }}>No-Priority</p>
                    <p className='cText'>{nopriority.length}</p>
                    <div className='boardHeading' id='pluske'>
                        <img src={plusmore} className='headingImg' alt='Add' />
                    </div>
                </div>
                <div className='Cards'>
                    {nopriority.map((ticket) => ticket.priority === 0 && <CardPriority key={ticket.id} ticket={ticket} />)}
                </div>
            </div>

            {/* Urgent Board */}
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={urgentimg} className='headingImg' alt='Urgent' />
                    <p className='cText'>Urgent</p>
                    <p className='cText'>{urgent.length}</p>
                    <div className='boardHeading' id='pluske'>
                        <img src={plusmore} className='headingImg' alt='Add' />
                    </div>
                </div>
                <div className='Cards'>
                    {urgent.map((ticket) => ticket.priority === 4 && <CardPriority key={ticket.id} ticket={ticket} />)}
                </div>
            </div>

            {/* High Board */}
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={highimg} className='headingImg' alt='High' />
                    <p className='cText'>High</p>
                    <p className='cText'>{hightpriority.length}</p>
                    <div className='boardHeading' id='pluske'>
                        <img src={plusmore} className='headingImg' alt='Add' />
                    </div>
                </div>
                <div className='Cards'>
                    {hightpriority.map((ticket) => ticket.priority === 3 && <CardPriority key={ticket.id} ticket={ticket} />)}
                </div>
            </div>

            {/* Medium Board */}
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={mediumimg} className='headingImg' alt='Medium' />
                    <p className='cText'>Medium</p>
                    <p className='cText'>{mediumpriority.length}</p>
                    <div className='boardHeading' id='pluske'>
                        <img src={plusmore} className='headingImg' alt='Add' />
                    </div>
                </div>
                <div className='Cards'>
                    {mediumpriority.map((ticket) => ticket.priority === 2 && <CardPriority key={ticket.id} ticket={ticket} />)}
                </div>
            </div>

            {/* Low Board */}
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={lowimg} className='headingImg' alt='Low' />
                    <p className='cText'>Low</p>
                    <p className='cText'>{lowpriority.length}</p>
                    <div className='boardHeading' id='pluske'>
                        <img src={plusmore} className='headingImg' alt='Add' />
                    </div>
                </div>
                <div className='Cards'>
                    {lowpriority.map((ticket) => ticket.priority === 1 && <CardPriority key={ticket.id} ticket={ticket} />)}
                </div>
            </div>
        </div>
    );
};

export default Priority;
