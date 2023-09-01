import React,{useState} from 'react';
import './TodoItem.css';

function TodoItem(props){

    const itemstatus = props.completed;
    const [isShown, setIsShown] = useState(false);

    return(
        <li className='TodoItem' 
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
            <span 
            className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
            onClick={(props.completed)?props.unComplete:props.onComplete}
            > 
                    <i className={`${props.completed && 'fa-solid fa-circle-check'} ${!props.completed && 'fa-regular fa-circle'}`}></i>
            </span>
            
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>
            <span 
            className="Icon Icon-delete"
            onClick={props.onDelete}
            >
                <i className={`fa-solid fa-trash ${!isShown && 'd-none'}`} title="Delete"></i>
            </span>
        </li>
);
}

export {TodoItem};