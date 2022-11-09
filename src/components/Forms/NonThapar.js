import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import React, { useState,useEffect } from 'react'
import './ThaparForm.css'
import Axios from 'axios'

const NonThapar = () => {
    //States :
    const [collegeName,setCollegeName]=useState('');
    const [rollNo,setRollNo]=useState('');
    const [branch,setBranch]=useState('');
    const [yearOfStudy,setYearOfStudy]=useState();
    const [imageSelected,setImageSelected]=useState("");
    const [uploadedImgURL,setUploadedImgURL]=useState('');


    const defaultValues={
        collegeName:'',
        rollNo:'',
        branch:'',
        yearOfStudy:''
    }


    const validationSchema=yup.object().shape({
        collegeName:yup.string().min(7,"*Name is too short").required('*Enter your College Name '),
        rollNo:yup.string().required('*Enter your College Roll Number'),
        branch:yup.string().required('*Enter your Branch '),
        yearOfStudy:yup.string().min(1,'*Enter a valid Year of Study').max(1,'*Enter a valid Year of Study').required('*Enter your Year of Study')
    })

    //Access the Form Submitted Values from here below :
    const handleSubmit=(values)=>{
        // console.log('Values : ',values);
        setBranch(values.branch);
        setCollegeName(values.collegeName);
        setRollNo(values.rollNo);
        setYearOfStudy(values.yearOfStudy);
        uploadImage();
        // console.log('Values :',branch,collegeName,rollNo,yearOfStudy)
    }

    //Cloudinary Code :
    const uploadImage=()=>{
        // console.log(files[0]);
        const formData=new FormData();
        formData.append("file",imageSelected);
        formData.append("upload_preset","sa3qpzmd");
    
        const cloudinary_Cloud_Name="dv7jje0bw";
    
        Axios.post(`https://api.cloudinary.com/v1_1/${cloudinary_Cloud_Name}/image/upload`,formData).then((response)=>{
          console.log(response.data);
          console.log(response.data.secure_url);
          setUploadedImgURL(response.data.secure_url);
        });
      }

      useEffect(()=>{
        console.log('Link is :',uploadedImgURL);
      },[uploadedImgURL])

      


  return (
    <>
       <h1>Non Thapar Form</h1>
    <div style={{display:'flex',flexDirection:'column'}}>

       <Formik 
       initialValues={defaultValues}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}
       >
        <Form className='register-form' style={{borderStyle:'solid',padding:'2.5vw'}}>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="collegeName" placeholder="College Name"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='collegeName'/>
        </p>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="rollNo" placeholder="Roll Number"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='rollNo'/>
        </p>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} name="branch" placeholder="Branch"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='branch'/>
        </p>
        <Field className='register-form-input' style={{paddingLeft:'12px'}} type="number" name="yearOfStudy" placeholder="Year of Study"/>
        {/*Error Message */}
        <p style={{color:'red'}}>
            <ErrorMessage name='yearOfStudy'/>
        </p>
        <div className='label-choose-file' style={{color:'white'}} htmlFor='file-label'>Upload ID Proof</div>
        <input className='choose-file' name="file-label" type="file" onChange={(e)=>{setImageSelected(e.target.files[0])}}/><br/>

        <button className='register-button-submit' type="submit">Register Now</button>
        </Form>
       </Formik>
    </div>
    </>
  )
}

export default NonThapar