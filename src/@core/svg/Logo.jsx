import Image from 'next/image'

const Logo = props => {
  return <Image src='/images/logo.svg' alt='Logo' width={30} height={30}  className='h-9 w-auto object-contain'/>
}

export default Logo
