import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Alert, TextField } from '@mui/material';
import { Box } from '@mui/system';
import MyButton from '@/components/MyButton';
import { getAuth } from '@/selectors/auth.selector';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/slices/auth.slice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, profile }: any = useSelector(getAuth);

    const initialForm = {
        username: "",
        password: ""
    }
    const [loginForm, setLoginForm] = useState(initialForm)
    const [alert, setAlert] = useState<JSX.Element | null>(null)

    const { username, password } = loginForm

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        event.stopPropagation();
        dispatch(login(loginForm))

    }
    useEffect(() => {

        if (error) {
            setAlert(<Alert severity="error">{error}!</Alert>)
        }

    }, [error]);

    useEffect(() => {
        if (profile) navigate('/', { replace: true });
    }, [navigate, profile]);

    useEffect(() => {
        let timer1 = setTimeout(() => {
            setAlert(null)
        }, 2500)
        return () => {
            clearTimeout(timer1)
        }
    }, [alert])


    return (
        <div className='login'>
            <div className='login-form'>
                <div className="login-form-header">
                    <div className="login-form-header-logo">
                        <img src="/logo.png" alt="PLP Logo" />
                    </div>
                    <div className="login-form-header-title">
                        Programming Languages Platform
                    </div>
                </div>
                <div className='login-form-body'>
                    <Box component="form" onSubmit={handleSubmit} sx={{ height: '100%' }} >
                        <TextField
                            inputProps={{ className: "textField" }}
                            InputLabelProps={{ className: "textField" }}
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            type="text"
                            autoFocus
                            value={username}
                            onChange={onChange}

                        // error
                        />
                        <TextField

                            inputProps={{ className: "textField" }}
                            InputLabelProps={{ className: "textField" }}
                            margin="normal"
                            required
                            fullWidth
                            label="Password:"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onChange}
                        // error
                        />
                        {alert}
                        <div className='Line'></div>
                        <div>
                            <MyButton type="submit" fullWidth >Login</MyButton>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default LoginPage