import React from 'react';
import {useForm}  from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';

const Rigister = (props) => {

    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async (data) => {
        data['type'] = 0;
        await axios.post('https://commercial-store.herokuapp.com/auth/register', data).then(r => {
            global.auth.setToken(r.data);
            toast.success('Register Success', {
                autoClose: 2000,
                });
            props.history.push('/');
        }).catch(e => {
            toast.error(e.response.data, {
                autoClose: 2000,
                });
        })
    }

    return(
        <div className="login-wrapper">
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                        <label className="label">Nickname</label>
                        <div className="control">
                            {errors.nickname && <p className="helper has-text-danger">{errors.nickname.message}</p>}
                            <input className="input" {...register('nickname',{required:'nickname is required'})}></input>
                        </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        {errors.email && <p className="helper has-text-danger">{errors.email.message}</p>}
                        <input className="input" {...register('email',{required:'email is required',
                                                                                pattern:{
                                                                                    value: /^([A-Za-z0-9])+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                                                                                    message: 'invalid email'
                                                                                }})}></input>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control"> 
                        {errors.password && <p className="helper has-text-danger">{errors.password.message}</p>}
                        <input className="input" type="password" {...register('password',{required:'password is required', minLength:{value:6, message:'cannot be less than 6 digits'}})}></input>
                    </div>
                </div>
                <div className="control">
                    <button className="button is-fullwidth is-primary" >Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Rigister;