import React from 'react'
import Alert from './Alert'
const Success = () => {
  return (
    <div>
      <Alert alert={{type:'success', message:"Login Successful!!!"}}/>
    </div>
  )
}

export default Success
