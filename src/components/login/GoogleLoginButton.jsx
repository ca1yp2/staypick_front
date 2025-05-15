import React from 'react'
import {GoogleLogin,GoogleOAuthProvider} from '@react-oauth/google'

const GoogleLoginButton = () => {
    const clientId = 'clientID'
  return (
    <>
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin 
                onSuccess={(res)=>{
                    console.log(res);
                }}
                onFailure={(err)=>{
                    console.log(err);
                }}
            />
        </GoogleOAuthProvider>
    </>
  )
}

export default GoogleLoginButton