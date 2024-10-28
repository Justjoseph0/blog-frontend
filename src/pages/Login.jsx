import React from 'react'
import Form from '@/components/Form'
import Navbar from '@/components/Navbar'

const Login = () => {
  return (

   <>
    <Navbar />
      <Form route="/login/" isSignUp={false} />
   </>
  )
}

export default Login