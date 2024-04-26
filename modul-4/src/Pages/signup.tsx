import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


const MultiStepForm = () => {
  // Individual state hooks for each form field
  const [name, setName] = useState<string>("");                
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const navigate = useNavigate()
  

const SignupSchema = Yup.object().shape({
    name: Yup.string()
    .min(4, 'Too Short!')
    .max(20, 'Too Long!')
    .required("Name is required ot fill"),
    email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
    dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .min("1960-01-01", "Is that true ?")
    .max("2020-01-01", "Date is too early"),
    address: Yup.string()
    .required("Address is required"),
    city: Yup.string()
    .required("City is required"),
    state: Yup.string()
    .required("State is required"),
    zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^[0-9]{5}/),
    userName: Yup.string()
    .required("Username is required"),
    pass: Yup.string()
    .required("Password is reuired")
    .min(4, 'Password Weak')
    .matches(/^\S*$/, 'No whitespaces allowed')
    .max(10, 'Password Strong'),
  });


  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((nextStep) => nextStep + 1);
    console.log(step);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    console.log(step);
  };

  const handleSubmit = async (values: { name: string, email: string, pass: string }) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.pass 
    })
  };

  const response = await fetch('https://library-crud-sample.vercel.app/api/user/register', options);

  const result = await response.json();

  try {
    if (!response.ok) {
      alert('Register failed');
    } else {
      console.log('response success', result);
      alert('Register success');
      navigate('/');
    }
  } catch (error) {
    alert(error);
  }
}
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-mono text-4xl mb-8 text-center my-5">My Florist</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          dateOfBirth: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          userName: '',
          pass: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          console.log('register', {
            name: values.name, email: values.email, pass: values.pass
          })
          const data = {
            name: values.name,
            email: values.email,
            pass: values.pass
          }
          if (values.name && values.email && values.pass) handleSubmit(data)
        }}
        >

        <Form>
          {step === 1 && (
            <div className="flex flex-col bg-white p-8 w-96 border-solid border-2 border-grey-200">
              <h2 className="text-center text-xl my-3 font-semibold mb-8">
                Multi-Step Form - Step {step}
              </h2>
              <Field
                // onChange={changeName}
                name="name"
                type="text"
                placeholder="Enter Your Full Name"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <>
              <ErrorMessage name='name' component="div"/>
              <hr />
              </>
              <Field
                // onChange={changeEmail}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <ErrorMessage name='email' component="div"/>

              <Field
                type="date"
                name="dateOfBirth"
                placeholder="Enter Your Date of Birth"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <ErrorMessage name='dateOfBirth' component="div"/>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col bg-white p-8 w-96 border-solid border-2 border-grey-200">
              <h2 className="text-center text-xl my-3 font-semibold mb-8">
                Multi-Step Form - Step {step}
              </h2>
              <Field
                type="text"
                name="address"
                placeholder="Enter Your Address"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <ErrorMessage name='address' component="div"/>
              <Field
                type="text"
                name="city"
                placeholder="Enter Your City"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <>
              <ErrorMessage name='city' component="div"/>
              </>
              <Field
                type="text"
                name="state"
                placeholder="Enter Your State"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <ErrorMessage name='state' component="div"/>
              <Field
                type="number"
                name="zipCode"
                placeholder="Enter Your Zip Code"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <ErrorMessage name='zipCode' component="div"/>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col bg-white p-8 w-96 border-solid border-2 border-grey-200">
              <h2 className="text-center text-xl my-3 font-semibold mb-8">
                Multi-Step Form - Step {step}
              </h2>
              <Field
                type="text"
                name="userName"
                placeholder="Enter Your Username"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <ErrorMessage name='userName' component="div"/>
              <Field
                type="password"
                name="pass"
                placeholder="Enter Your password"
                className="border border-gray-300 p-2 mb-4 rounded-md"
              />
              <ErrorMessage name='pass' component="div"/>
            </div>
          )}

          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-1/2 mt-3 ">
              Previous
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-1/2 mt-3 ">
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-1/2 mt-3 ">
              Submit
            </button>
          )}
        </Form>
      </Formik>
      
    </div>
  );
};

export default MultiStepForm;