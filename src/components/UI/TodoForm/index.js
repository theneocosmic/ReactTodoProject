import styles from './TodoForm.module.css';
import { useForm } from "react-hook-form";
import React from 'react';
import {TodoContext} from "./../../../context/TodoContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const TodoForm = () =>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {setOpenModal,addTodo} = React.useContext(TodoContext);


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


    return(
        <div className={styles.formContainer} >
            <form onSubmit={handleSubmit(onSubmit)} className="form-floating text-center">
                <div className={styles.formTitle}>
                    <h3>Escribe tu nuevo TODO</h3>
                </div>
            <div className='row m-auto pl-4 pr-4'>
                <textarea className="form-control"
                placeholder='Aqui tu nuevo ToDo'
                {...register("todo",{ required: true }) }
                ></textarea>
                {!errors.todo && <span>Agrega la descripción de tu ToDo</span>}
                {errors.todo && <span className='text-danger'>Este campo es requerido</span>}
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