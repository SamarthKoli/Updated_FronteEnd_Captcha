import React from 'react'
import Alert from './Alert'

const Error = () => {
  return (
    <div>
      <Alert alert={{type:'danger', message:"Oops! Looks like there's something wrong!!"}}/>
    </div>
  )
}

export default Error
