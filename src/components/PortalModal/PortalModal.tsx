import React from 'react'
import ReactDOM from 'react-dom'

interface PropsInterface {
  children: React.ReactNode
}

const modalRoot = document.getElementById('modal-root')

const PortalModal = ({ children }: PropsInterface) => {
  return ReactDOM.createPortal(children, modalRoot)
}

export default PortalModal
