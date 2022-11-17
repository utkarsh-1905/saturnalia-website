import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios';

import './ContactUs.css'

const NonThapar = () => {
    //States :
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phnNumber,setPhnNumber]=useState(0);
    const [query,setQuery]=useState('');
    const [buttonMsg,setButtonMsg]=useState();


    const defaultValues={
        name:'',
        email:'',
        phnNumber:'',
    }

    const sendQuery=async()=>{
        // console.log(name,email,phnNumber,query);
        const response=await axios.post('https://api.saturnaliatiet.com/info/query/',{name:name,email:email,phone_no:phnNumber,description:query});
        const data=await response.data;
        // console.log(data.status);
        setButtonMsg(data.status);
       

    }


    //Access the Form Submitted Values from here below :
    const handleSubmit=()=>{
        
        // console.log('Values : ',values);
        // setPhnNumber(values.phnNumber);
        // setName(values.name);
        // setEmail(values.email);
        // // console.log('Values :',branch,collegeName,rollNo,yearOfStudy)
        sendQuery();

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
        <input onChange={(e)=>{setName(e.target.value)}} className='register-form-input' style={{paddingLeft:'12px'}} name="name" placeholder="Name"/>
        {/*Error Message */}
        {/* <p style={{color:'red'}}>
            <ErrorMessage name='name'/>
        </p> */}
        <input onChange={(e)=>{setEmail(e.target.value)}} className='register-form-input' style={{paddingLeft:'12px'}} name="email" placeholder="Email Address"/>
        {/*Error Message */}
        {/* <p style={{color:'red'}}>
            <ErrorMessage name='email'/>
        </p> */}
        <input onChange={(e)=>{setPhnNumber(e.target.value)}} className='register-form-input' style={{paddingLeft:'12px'}} type='number' name="phnNumber" placeholder="Phone Number"/>
        {/*Error Message */}
        {/* <p style={{color:'red'}}>
            <ErrorMessage name='phnNumber'/>
        </p> */}

        <textarea onChange={(e)=>{setQuery(e.target.value)}} className='query-box' onChange={(e)=>{setQuery(e.target.value)}}  type="text" placeholder='Enter your query' cols="30" rows="8"></textarea>
        <br/>
        <button className='register-button-submit' type="submit">{buttonMsg ? <>Query Sent</>:<>Submit</>}</button>
        <br/>
        </Form>
       </Formik>
    </div>
    </>
  )
}

export default NonThapar