// components/ToastLayout.jsx
'use client'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const AppReactToastify = ({ theme = 'light' }) => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  )
}

export default AppReactToastify
