import style from './Registration.module.css';
import {Button, FormGroup, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../../../app/store';
import {Navigate, NavLink} from 'react-router-dom';
import {register} from './registration-reducer';
import {PATH} from '../../../common/main/Main';
import React from 'react';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {

    const dispatch: AppDispatch = useDispatch();
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Password must be 8 characters or more';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }

            return errors;
        },
        onSubmit: values => {
            formik.resetForm();
            dispatch(register(values));
        },
    });

    if (isRegistered) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.mainBlock}>
            <div className={style.container}>
                <div className={style.title}>Sign Up</div>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            variant="standard"
                            label="email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        <div className={style.error}>
                            {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                        </div>
                        <TextField
                            type="password"
                            variant="standard"
                            label="password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        <div className={style.error}>
                            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                        </div>
                        <TextField
                            type="password"
                            variant="standard"
                            label="confirm password"
                            margin="normal"
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        <div className={style.error}>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
                        </div>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            style={{
                                marginTop: '50px',
                                borderRadius: '30px',
                                textTransform: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                            }}
                        >
                            Sign Up
                        </Button>
                        <span className={style.subtitle}>Already have an account?</span>
                        <NavLink to={PATH.LOGIN} className={style.link}>Sign in</NavLink>
                    </FormGroup>
                </form>
            </div>
        </div>
    );
};