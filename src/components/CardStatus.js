import React, { useEffect, useState } from 'react';
import '../styles/Card.css';
import logo from '../assets/images/logo.svg'; // Logo can remain as is

import priority from '../assets/images/priority.svg';
import tag from '../assets/images/tag.png';
import img0 from '../assets/images/nopriority.png';
import img4 from '../assets/images/urgent.png';
import img3 from '../assets/images/high.png';
import img2 from '../assets/images/medium.png';
import img1 from '../assets/images/low.png';
import done from '../assets/images/Done.png';
import Cancelled from '../assets/images/canceled.png';
import backlogimg from '../assets/images/backlog.png';
import inprogressimg from '../assets/images/in progress.png';
import todo from '../assets/images/to do.png';
import usr1 from '../assets/images/usr-1.png';
import usr2 from '../assets/images/usr-2.png';
import usr3 from '../assets/images/usr-3.png';
import usr4 from '../assets/images/usr-4.png';
import usr5 from '../assets/images/usr-5.png';
import usr6 from '../assets/images/usr-6.png';
import usr7 from '../assets/images/usr-7.png';

const CardStatus = (props) => {
    const [available, setAvailable] = useState(false);
    const [users, setUsers] = useState([]);
    const [tick, setTick] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
            setUsers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
    };
    const statusImageMap = {
        "Todo": todo,
        "In progress": inprogressimg,
        "Backlog": backlogimg,
        "Done": done,
        "Cancelled": Cancelled,
    };
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
    };

    useEffect(() => {
        users.forEach((user) => {
            if (props.ticket && user.id === props.ticket.userId) {
                setAvailable(user.available);
            }
        });
    }, [users]);

    const usrImage = usrImageMap[props.ticket.userId] || usr1;
    const imgSrc = priorityImageMap[props.ticket.priority] || img0;
    const statusImgSrc = statusImageMap[props.ticket.status] || todo;

    const dotUser = available ? (
        <div className='availableUser' />
    ) : (
        <div className='notavailableUser' />
    );

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <text className='cardId'>{props.ticket.id}</text>
                    <text className='cardTitle'>{props.ticket.title}</text>
                </div>
                <div style={{ height: "38px" }}>
                    <img className='userImg' src={usrImage} alt='' />
                    {dotUser}
                </div>
            </div>

            <div className='lowerBox'>
                <div className='priorityBox'>
                    <img className='priorityImg' src={imgSrc} alt='priority' />
                </div>

                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='tag' />
                    <tag className='tagText'>{props.ticket.tag}</tag>
                </div>
            </div>
        </div>
    );
};

export default CardStatus;
