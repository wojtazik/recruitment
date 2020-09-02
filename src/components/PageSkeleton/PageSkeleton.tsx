import React from 'react'
import Navbar from '../Navbar/Navbar'
import './PageSkeleton.scss'

interface PropsInterface {
  children: React.ReactNode
}

const PageSkeleton = ({ children } : PropsInterface) => {
  return (
    <div className='page-skeleton'>
      <Navbar />
      {children}
    </div>
  )
}

export default PageSkeleton
