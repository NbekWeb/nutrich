import React from 'react'

const Rocket = props => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M4.5 16.5C-3 10 3 2 7.5 2C11.5 2 13.5 4 15.5 6C17.5 8 19.5 10 19.5 13.5C19.5 18 11.5 22.5 4.5 16.5Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 15L15 12L12 9L9 12L12 15Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M18 6L21 3L18 0' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default Rocket
