import React from "react";
import { createPortal } from 'react-dom'
import styles from './Modal.module.css';
import { TodoContext } from "../../../context/TodoContext";

function Modal({ children }) {
    const {setOpenModal} = React.useContext(TodoContext);

    React.useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            setOpenModal(false);
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[]);

    return createPortal(
      <div className={styles.modalBackground}>
        <div className={styles.closeModal}>
            <a title="Press ESC for close" className={styles.closeButton} onClick={()=>setOpenModal(false)}>
                <i className="fa-solid fa-circle-xmark"></i>
            </a>
        </div>
        <div>
        {children}
        </div>
      </div>,
      document.getElementById('modal')
    );
  }

export {Modal};