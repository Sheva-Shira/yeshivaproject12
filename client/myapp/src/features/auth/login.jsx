
import { AutoComplete } from 'primereact/autocomplete';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';
import '../../index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Password } from 'primereact/password';
import { useRef } from "react";
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

const Login = () => {

    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [valuePass, setValuePass] = useState('');
    const toast = useRef(null);
    const search = (event) => {
        setItems([...Array(10).keys()].map(item => event.query + '-' + item));
    }
    const footer = (
        <>
            {/* <Button label="login" type="submit" icon="pi pi-check"  /> */}
        </>
    );
   /* const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted' });
    };*/
    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
           /* data && show();*/
            formik.resetForm();
        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
           <div className="card flex justify-content-center">
            <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} className="md:w-25rem" style={{justifycontent:'center'}}>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2" style={{justifycontent:'center'}}>
                <div className="card flex justify-content-center" textAlign="center">
                    <span className="p-float-label">
                        <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label">

                        <Toast ref={toast} />
                        <Password inputId="in_value" name="value"
                            className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                            value={formik.values.value}
                            feedback={false}
                            onChange={(e) => {
                                formik.setFieldValue('value', e.target.value);
                            }}
                            toggleMask />
                        {getFormErrorMessage('value')}
                        <label htmlFor="value">Password</label>
                    </span>
                    <br></br>
                    <Button label="login" type="submit" icon="pi pi-check"  />
                </div>
            </form>
            </Card>
        </div>
            <br></br>
            <br></br>
            {/* <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <div className="card flex justify-content-center" textAlign="center">
                    <span className="p-float-label">
                        <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label">

                        <Toast ref={toast} />
                        <Password inputId="in_value" name="value"
                            className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                            value={formik.values.value}
                            feedback={false}
                            onChange={(e) => {
                                formik.setFieldValue('value', e.target.value);
                            }}
                            toggleMask />
                        {getFormErrorMessage('value')}
                        <label htmlFor="value">Password</label>
                    </span>
                    <br></br>
                    <Button label="login" type="submit" icon="pi pi-check"  />
                </div>
            </form> */}

        </>)
}
export default Login
