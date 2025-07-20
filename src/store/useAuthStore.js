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

  loginGoogle: () => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    addLoadingUrl('google/login/')

    api({
      url: 'google/login/',
      method: 'GET'
    })
      .then(res => {
        window.location.href = res.data.auth_url
      })
      .catch(error => {
        toast.error('Email or password is incorrect')
      })
      .finally(() => {
        removeLoadingUrl('google/login/')
      })
  },

  postGoogleLogin: (callbackUrl, callback = () => {}) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    const url = new URL(callbackUrl)
    const code = url.searchParams.get('code')

    if (!code) {
      toast.error('Authorization code not found')

      return
    }

    addLoadingUrl('google/callback/')

    api({
      url: 'google/callback/',
      method: 'POST',
      data: { code }
    })
      .then(res => {
        if (res.data.access_token) {
          localStorage.setItem('access_token', res.data.access_token)
          callback()
        }
      })
      .catch(error => {
        console.error('Google login error:', error)
        toast.error('Google login failed')
      })
      .finally(() => {
        removeLoadingUrl('google/callback/')
      })
  },
  googleCallback:
    (data, callback = () => {}) =>
    () => {
      const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

      addLoadingUrl('google/login/')

      api({
        url: 'google/login/',
        method: 'POST',
        data
      })
        .then(res => {
          callback()
        })
        .catch(error => {
          toast.error('Email or password is incorrect')
        })
        .finally(() => {
          removeLoadingUrl('google/login/')
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
  },
  contactUsApi: (data, callback = () => {}) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    // Form validatsiyasi
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      toast.error('Please fill in all required fields')

      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(data.email)) {
      toast.error('Please enter a valid email address')

      return
    }

    addLoadingUrl('contact-us/')

    api({
      url: 'contact-us/',
      method: 'POST',
      data
    })
      .then(() => {
        toast.success('Your message has been sent successfully!')
        callback()
      })
      .catch(error => {
        console.error('Contact us error:', error)

        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Failed to send message. Please try again.')
        }
      })
      .finally(() => {
        removeLoadingUrl('contact-us/')
      })
  }
}))

export default useAuthStore
