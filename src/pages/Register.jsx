import React from 'react'
import Form from '@/components/Form'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Register = () => {
  return (
    <>
    <Navbar />
    <Form route="" isSignUp={true} />
    <Footer />
    </>
  )
}

export default Register