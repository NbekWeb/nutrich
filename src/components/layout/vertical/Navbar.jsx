// Component Imports

'use client'

import { useEffect } from 'react'

import LayoutNavbar from '@layouts/components/vertical/Navbar'
import NavbarContent from './NavbarContent'
import useUserStore from '@/store/useUserStore'

const Navbar = () => {
  const { getUser } = useUserStore()

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <LayoutNavbar>
      <NavbarContent />
    </LayoutNavbar>
  )
}

export default Navbar
