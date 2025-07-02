'use client'

import { useEffect } from 'react'

import useUserStore from '@/store/useUserStore'

const UserAgent = () => {
  const { getUser } = useUserStore()

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (token) {
      getUser()
    }
  }, [])

  return null
}

export default UserAgent
