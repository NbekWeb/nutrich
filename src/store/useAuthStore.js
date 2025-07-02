import { create } from 'zustand'

import { toast } from 'react-toastify'

import { api } from '@/utils/api'
import useCoreStore from './useCoreStore'

const useAuthStore = create(() => ({
  loginApi: (data, callback = () => {}) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    addLoadingUrl('signin/')

    api({
      url: 'signin/',
      method: 'POST',
      data
    })
      .then(res => {
        console.log(res)
        localStorage.setItem('access_token', res.data.access)
        callback()
      })
      .catch(error => {
        toast.error('Email or password is incorrect')
      })
      .finally(() => {
        removeLoadingUrl('signin/')
      })
  },
  registerApi: (data, callback = () => {}) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    addLoadingUrl('signup/')
    api({
      url: 'signup/',
      method: 'POST',
      data
    })
      .then(() => {
        toast.success('Registration successful')
        callback()
      })
      .catch(error => {
        if (error.response?.data?.email?.[0]) {
          toast.error(error.response?.data?.email?.[0])
        } else {
          toast.error('Error during registration')
        }
      })
      .finally(() => {
        removeLoadingUrl('signup/')
      })
  }
}))

export default useAuthStore
