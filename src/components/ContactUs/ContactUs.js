import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import './ContactUs.css'

const NonThapar = () => {
    //States :
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phnNumber,setPhnNumber]=useState();
    const [query,setQuery]=useState('');


    const defaultValues={
        name:'',
        email:'',
        phnNumber:'',
    }



    //Access the Form Submitted Values from here below :
    const handleSubmit=(values)=>{
        // console.log('Values : ',values);
        setPhnNumber(values.phnNumber);
        setName(values.name);
        setEmail(values.email);
        // console.log('Values :',branch,collegeName,rollNo,yearOfStudy)
    }

  return (
    <>
       
    <div className='contact-us-form'>

       <Formik 
       initialValues={defaultValues}
       onSubmit={handleSubmit}
       >
        <Form className='register-form' style={{borderStyle:'solid',padding:'2.5vw'}}>
            <br/>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="name" placeholder="Name"/>
        {/*Error Message */}
        {/* <p style={{color:'red'}}>
            <ErrorMessage name='name'/>
        </p> */}
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="email" placeholder="Email Address"/>
        {/*Error Message */}
        {/* <p style={{color:'red'}}>
            <ErrorMessage name='email'/>
        </p> */}
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="phnNumber" placeholder="Phone Number"/>
        {/*Error Message */}
        {/* <p style={{color:'red'}}>
            <ErrorMessage name='phnNumber'/>
        </p> */}

        <textarea className='query-box' onChange={(e)=>{setQuery(e.target.value)}}  type="text" placeholder='Enter your query' cols="30" rows="8"></textarea>
        <br/>
        <button className='register-button-submit' type="submit">Submit</button>
        <br/>
        </Form>
       </Formik>
    </div>
    </>
  )
}

export default NonThapar