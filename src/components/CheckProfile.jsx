import React from 'react'
import api from '@/api'
import { Link } from 'react-router-dom'
import Loading from '@/components/Loading'
import { useState,useEffect } from 'react'

const CheckProfile = ({ children, message }) => {
    const [hasProfile, setHasProfile] = useState(null);

    useEffect(() => {
        const checkProfile = async () => {
          try {
            const res = await api.get('check-profile/');
            setHasProfile(true); 
          } catch (error) {
            if (error.response) {
              setHasProfile(false); 
            }
          }
        };
    
        checkProfile();
      }, []);

      if (hasProfile === null) {
        return <Loading />
      }

  
    return hasProfile ? (
      <>
        {children} 
      </>
    ) : (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-lg font-semibold">Complete Your Profile</h2>
          <p className='text-sm md:text-[16px]'>{message}</p>
          <Link to='/profile' className="text-blue-600 underline text-sm">
            Click here to complete your profile
          </Link>.
        </div>
      </div>
    );
  };
  

export default CheckProfile