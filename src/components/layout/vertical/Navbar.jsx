// Component Imports

'use client'

import LayoutNavbar from '@layouts/components/vertical/Navbar'
import NavbarContent from './NavbarContent'
import useUserStore from '@/store/useUserStore'
import { useEffect } from 'react'

const Navbar = () => {
  const { getUser } = useUserStore()

  useEffect(() => {
    getUser()
  }, [])
  return (
    <LayoutNavbar>
      <NavbarContent />
    </LayoutNavbar>
  )
}

export default Navbar
