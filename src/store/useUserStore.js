import { create } from 'zustand'
import { api } from '@/utils/api'
import { toast } from 'react-toastify'
import useCoreStore from './useCoreStore'

const useUserStore = create(set => ({
  user: null,
  pricingTokens: null,
  historyTokens: null,
  shareTokens: null,

  getUser: (callback = () => {}) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()
    addLoadingUrl('user-detail/')
    api({
      url: 'user-detail/',
      method: 'GET'
    })
      .then(res => {
        set({ user: res?.data })
        callback()
      })
      .catch(er => {
        toast.error('Failed to fetch user data')
        console.log(er)
      })
      .finally(() => {
        removeLoadingUrl('user-detail/')
      })
  },
  getPricing: () => {
    api({
      url: 'pricing-tokens/',
      method: 'GET'
    })
      .then(res => {
        set({ user: res?.data })
      })
      .catch(er => {
        toast.error('Failed to fetch user data')
        console.log(er)
      })
      .finally(() => {
        removeLoadingUrl('pricing-tokens/')
      })
  },
  putUser: (data, callback) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()
    addLoadingUrl('user-detail/')

    let requestData
    let headers = {}

    const avatar = data.avatar

    const isBase64Avatar = typeof avatar === 'string' && avatar.startsWith('data:image')

    if (isBase64Avatar) {
      const formData = new FormData()

      // ✅ Base64 stringni Blob'ga aylantiruvchi funksiya
      const base64ToBlob = (base64Data, contentType = '') => {
        const byteCharacters = atob(base64Data.split(',')[1])
        const byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512)
          const byteNumbers = new Array(slice.length)
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }
          byteArrays.push(new Uint8Array(byteNumbers))
        }

        return new Blob(byteArrays, { type: contentType })
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'avatar') {
          const contentType = value.substring(5, value.indexOf(';'))
          const blob = base64ToBlob(value, contentType)
          formData.append('avatar', blob, 'avatar.png')
        } else {
          formData.append(key, value)
        }
      })

      requestData = formData
      headers['Content-Type'] = 'multipart/form-data'
    } else {
      const { avatar, ...rest } = data
      requestData = rest
    }

    api({
      url: 'user-detail/',
      method: 'PUT',
      data: requestData,
      headers
    })
      .then(res => {
        callback()
      })
      .catch(er => {
        toast.error('Failed to update user')
        console.error(er)
      })
      .finally(() => {
        removeLoadingUrl('user-detail/')
      })
  },
  shareToken: (data, callback) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()
    addLoadingUrl('gift-tokens/')
    api({
      url: 'gift-tokens/',
      method: 'POST',
      data
    })
      .then(res => {
        toast.success(`Token successfully shared!`)
        callback()
      })
      .catch(er => {
        if (er?.response?.data?.receiver) {
          toast.error(er?.response?.data?.receiver)
        } else {
          toast.error('Failed to fetch user data')
        }
        console.log(er)
      })
      .finally(() => {
        removeLoadingUrl('gift-tokens/')
      })
  },
  getTokenPrice: () => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()
    addLoadingUrl('pricing-tokens/')
    api({
      url: 'pricing-tokens/',
      method: 'GET'
    })
      .then(res => {
        set({ pricingTokens: res?.data?.tokens })
      })
      .catch(er => {})
      .finally(() => {
        removeLoadingUrl('pricing-tokens/')
      })
  },
  buyTokePrice: (data, callback) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()
    addLoadingUrl('pricing-tokens/')
    api({
      url: 'buy-tokens/',
      method: 'POST',
      data
    })
      .then(res => {
        toast.success('Token bought succesfull!')
        callback()
      })
      .catch(er => {})
      .finally(() => {
        removeLoadingUrl('pricing-tokens/')
      })
  },
  getTokenHystory: () => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()
    addLoadingUrl('token-history/')
    api({
      url: 'token-history/',
      method: 'GET'
    })
      .then(res => {
        set({ historyTokens: res?.data?.purchases })
      })
      .catch(er => {})
      .finally(() => {
        removeLoadingUrl('token-history/')
      })
  },
  getTokenShared: () => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()
    addLoadingUrl('gift-history/')
    api({
      url: 'gift-history/',
      method: 'GET'
    })
      .then(res => {
        set({ shareTokens: res?.data })
      })
      .catch(er => {})
      .finally(() => {
        removeLoadingUrl('gift-history/')
      })
  }
}))

export default useUserStore
