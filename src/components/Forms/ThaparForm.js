import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import './ThaparForm.css'

const ThaparForm = () => {
    const [thaparTick,setThaparTick]=useState(false);
    //States :
    const [name,setName]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    //If Student is from Thaapr or Not :
    useEffect(()=>{
        // console.log(thaparTick);
    },[thaparTick])

    const defaultValues={
        name:'',
        email:'',
        password:'',
        phone:''
    }


    //Already registered Users Email Example : //Put here backend DB emails which are already registered
    const emailAddresses=[
        'test@gmail.com',
        'test2@gmail.com'
    ]

    //Regex for Password :
    const lowerCaseRegex=/(?=.*[a-z])/;
    const upperCaseRegex=/(?=.*[A-Z])/;
    const numericRegex=/(?=.*[0-9])/;
    //Regex for Mobile Number :
    const phnRegex=/(^[0-9]*$)/;

    const validationSchema=yup.object().shape({
        name:yup.string().min(5,"*Name is too short").required('*Enter your name '),
        email:yup.string().required('*Enter your e-mail').notOneOf(emailAddresses,'*E-mail already taken').email('*Please enter a valid e-mail'),
        password:yup.string()
        .matches(lowerCaseRegex,'*One lowercase letter is required')
        .matches(upperCaseRegex,'*One uppercase letter is required')
        .matches(numericRegex,'*At least one number is required')
        .min(8,'*Minimum 8 characters Required').required('*Enter Password '),
        phone:yup.string().matches(phnRegex,'*Enter only digits').min(10,'*Enter a valid Mobile Number').max(10,'*Enter a valid Mobile Number').required('*Enter your Number')
    })

    //Access the Form Submitted Values from here below :
    const handleSubmit=(values)=>{
        console.log('Values : ',values);
        setName(values.name);
        setEmail(values.email);
        setPassword(values.password);
        setPhoneNumber(values.phone);
        // console.log('State Values are : ',name,email,password,phoneNumber);
    }

  return (
    <div>
       <h1>Thapar Form</h1>
       <Formik 
       initialValues={defaultValues}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}
       >
        <Form className='register-form' style={{borderStyle:'solid',padding:'2.5vw'}}>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="name" placeholder="Name"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='name'/>
        </p>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="phone" placeholder="Phone Number"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='phone'/>
        </p>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="email" placeholder="Email Address"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='email'/>
        </p>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} type="password" name="password" placeholder="Password"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='password'/>
        </p>
        <button className='register-button-submit' type="submit">Register Now</button>
        <br/>
        <br/>
        <input onClick={()=>setThaparTick(!thaparTick)} id="checkbox" type='checkbox' />
        <label style={{color:'white',marginLeft:'5px'}} htmlFor='checkbox'>I am from Thapar University</label>
        </Form>
       </Formik>
    </div>
  )
}

export default ThaparForm;