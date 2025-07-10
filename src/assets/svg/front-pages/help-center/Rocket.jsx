const Rocket = ({ color = 'currentColor', ...props }) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12 2.5C12 2.5 14.5 5.5 14.5 12C14.5 18.5 12 21.5 12 21.5M12 2.5C12 2.5 9.5 5.5 9.5 12C9.5 18.5 12 21.5 12 21.5M12 2.5C6.5 2.5 2.5 6.5 2.5 12C2.5 17.5 6.5 21.5 12 21.5'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.5 7.5C16.5 7.5 18.5 9.5 18.5 12C18.5 14.5 16.5 16.5 16.5 16.5M7.5 7.5C7.5 7.5 5.5 9.5 5.5 12C5.5 14.5 7.5 16.5 7.5 16.5'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Rocket
