import React, { useState } from 'react'
import './login.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { userLogin } from '../../store/action'


const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        setLoading(true)

        const token = localStorage.getItem('token')
        if (token) {
            navigate('/dashboard');
        } else {
            console.log('Wrong password or username');
        }
        const { username, password } = data;
        const body = { username, password };

        dispatch(userLogin(body))

    }
    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/dashboard');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div className='center'>
            <div className='container'>
                <div className='text'>
                    Login Form
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='data'>
                        <label>Username</label>
                        <input type='text' {...register("username", { required: true })} />
                        {errors.username && <span>Please enter Username. </span>}
                    </div>
                    <div className='data'>
                        <label >Password</label>
                        <input type='text'{...register("password", { required: true })} />
                        {/* {errors.password && <span>This field is required 8 Charecter password </span>} */}
                    </div>
                    <div className='btn'>
                        <div className='inner'>
                        </div>
                        <button type='submit'>{loading ? "Loading....." : "Login"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
