import styles from './TodoForm.module.css';
import { useForm } from "react-hook-form";
import React, {useState} from 'react';
import {TodoContext} from "./../../../context/TodoContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { vestResolver } from '@hookform/resolvers/vest';
// import { create, test, enforce } from 'vest';
import { create, test, enforce, only, warn, include, skipWhen } from "vest";
import classnames from "vest/classnames";

const MySwal = withReactContent(Swal);



const validationSuite = create((data = {}) => {
    test('todo', 'TODO is required', () => {
      enforce(data.todo).isNotEmpty();
    });

    test('todo', 'TODO cannot be empty', () => {
        enforce(data.todo).isNotBlank();
      });
  });

const TodoForm = () =>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: vestResolver(validationSuite),
    });
    const {setOpenModal,addTodo} = React.useContext(TodoContext);

    const [formstate, setFormstate] = useState({});
    const [, setUserNameLoading] = useState(false);

    const handleChange = (currentField, value) => {
      const nextState = { ...formstate, [currentField]: value };
      const result = validationSuite(nextState, currentField);
      setFormstate(nextState);
  
      if (currentField === "username") {
        setUserNameLoading(true);
      }
  
      result.done((res) => {
        setUserNameLoading(false);
      });
    };
  
 

    const onSubmit = data =>{
        
        MySwal.fire({
            title: (
              <p>
                Estas seguro de agregar este nuevo ToDo? <br />{" "}
                <span className="text-danger">{data.todo}</span>
              </p>
            ),
            confirmButtonText: "Agregar",
            showCancelButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              addTodo(data.todo)
              MySwal.fire("El ToDo ha sido agregado!", "", "success");
            } 
        }).then(() =>{
            setOpenModal(false);
        }
        );;
        };


        const cn = classnames(validationSuite.get(), {
            invalid: "error",
            valid: "success",
            warning: "warning"
          });

    return(
        <div className={styles.formContainer} >
            <form onSubmit={handleSubmit(onSubmit)} className="form-floating text-center">
                <div className={styles.formTitle}>
                    <h3>Escribe tu nuevo TODO</h3>
                </div>
            <div className='row m-auto pl-4 pr-4'>
                <input 
                className="form-control"
                onChange={handleChange}
                placeholder='Aqui tu nuevo ToDo'
                {...register("todo",{ required: true, minLength:1 }) }
                />
                
          <span className='text-danger small'> {validationSuite
          .getErrors("todo")
          .concat(validationSuite.getWarnings("todo"))}</span>
                
                </div>
            <div className='row mt-3 msb-3 d-flex flex-row align-items-center justify-content-center'>
                <button onClick={()=>setOpenModal(false)}  className="btn btn-light m-4">Cancelar</button>
                <button type='submit' className="btn btn-primary m-4">Agregar</button>
            </div>
            </form>
        </div>
    );
    
};

export {TodoForm};