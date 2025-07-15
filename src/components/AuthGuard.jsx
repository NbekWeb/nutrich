'use client'

import { useEffect } from 'react'

import { useRouter, usePathname } from 'next/navigation'

const AuthGuard = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')

    // If no access token and not on login/register pages, redirect to home
    if (
      !access_token &&
      !pathname.includes('/login') &&
      !pathname.includes('/register') &&
      !pathname.includes('/info')
    ) {
      router.push('/home')
    } else if (access_token && pathname.includes('/home')) {
      router.push('/user')
    }
  }, [pathname, router])

  return children
}

export default AuthGuard
