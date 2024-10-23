import React, { useEffect, useState } from 'react';
import todo from '../assets/images/to do.png';
import plusmore from '../assets/images/plusmore.png';
import done from '../assets/images/Done.png';
import Cancelled from '../assets/images/canceled.png';
import backlogimg from '../assets/images/backlog.png';
import inprogressimg from '../assets/images/in progress.png';
import CardStatus from './CardStatus';
import '../styles/Status.css';

const Status = (props) => {
    const [pref, setpref] = useState(localStorage.getItem('grouping'));
    const [todono, settodono] = useState([]);
    const [tick, setTick] = useState([]);
    const [todolist, settodolist] = useState([]);
    const [inProgressno, setinProgressno] = useState([]);
    const [doneno, setdoneno] = useState([]);
    const [cancelled, setcancelled] = useState([]);
    const [backlog, setbacklog] = useState([]);
    const [Order, setOrder] = useState(localStorage.getItem('order'));
    const [users, setusers] = useState([]);
    const [todonum, setTodonum] = useState([]);

    useEffect(() => {
        hello();
    }, []);

    useEffect(() => {
        count();
    }, [tick, Order]);

    useEffect(() => {
        setOrder(localStorage.getItem('order'));
    }, [localStorage.getItem('order')]);

    async function hello() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
            setusers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function count() {
        let todopre = [];
        let donepre = [];
        let cancelledpre = [];
        let backlogpre = [];
        let inprogresspre = [];

        tick.forEach(ticket => {
            if (ticket.status === "Todo") todopre.push(ticket);
            if (ticket.status === "Done") donepre.push(ticket);
            if (ticket.status === "cancelled") cancelledpre.push(ticket);
            if (ticket.status === "Backlog") backlogpre.push(ticket);
            if (ticket.status === "In progress") inprogresspre.push(ticket);
        });

        if (Order === "Title") {
            todopre.sort((a, b) => a.title.localeCompare(b.title));
            inprogresspre.sort((a, b) => a.title.localeCompare(b.title));
            backlogpre.sort((a, b) => a.title.localeCompare(b.title));
            donepre.sort((a, b) => a.title.localeCompare(b.title));
            cancelledpre.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            todopre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            inprogresspre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            backlogpre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            donepre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            cancelledpre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
        }

        setTodonum(todopre);
        setbacklog(backlogpre);
        setcancelled(cancelledpre);
        setdoneno(donepre);
        setinProgressno(inprogresspre);
    }

    return (
        <div className='Boards'>
            {[
                { title: "Backlog", img: backlogimg, count: backlog.length, tickets: backlog },
                { title: "Todo", img: todo, count: todonum.length, tickets: todonum },
                { title: "InProgress", img: inprogressimg, count: inProgressno.length, tickets: inProgressno },
                { title: "Done", img: done, count: doneno.length, tickets: doneno },
                { title: "Canceled", img: Cancelled, count: cancelled.length, tickets: cancelled }
            ].map(({ title, img, count, tickets }, index) => (
                <div className='Board' key={index}>
                    <div className='boardHeading'>
                        <img src={img} className='headingImg' alt={title} />
                        <p className='cText'>{title}</p>
                        <p className='cText'>{count}</p>
                        <div className='boardHeading' id='pluske'>
                            <img src={plusmore} className='headingImg' alt='' />
                        </div>
                    </div>
                    <div className='Cards'>
                        {tickets.length > 0 && tickets.map(ticket => (
                            <CardStatus key={ticket.id} ticket={ticket} available={users.find(item => item.id === ticket.userId)?.available} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Status;
