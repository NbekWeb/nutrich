import { create } from 'zustand'

import { toast } from 'react-toastify'

import { api } from '@/utils/api'
import useCoreStore from './useCoreStore'

const usePlans = create(set => ({
  plansData: [],
  planResponse: [],
  myPlans: [],

  getPlans: () => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    addLoadingUrl('plans/')

    api({
      url: 'plans/',
      method: 'GET'
    })
      .then(res => {
        // Transform API data to match component expectations

        set({ plansData: res.data })
      })
      .catch(error => {
        toast.error('Failed to fetch plans')
        console.error('Plans API Error:', error)
      })
      .finally(() => {
        removeLoadingUrl('plans/')
      })
  },
  buyPlan: (data, callback = () => {}) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    addLoadingUrl('purchase/')

    api({
      url: 'purchase/',
      method: 'POST',
      data
    })
      .then(res => {
        callback()
      })
      .catch(error => {
        toast.error('Failed to fetch plans')
      })
      .finally(() => {
        removeLoadingUrl('plans/')
      })
  },

  addAiAssistant: (data, callback = () => {}) => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    addLoadingUrl('plans/')

    api({
      url: 'ai-assistant/',
      method: 'POST',
      data
    })
      .then(res => {
        set({ planResponse: res.data })
        callback()
      })
      .catch(error => {
        toast.error('Failed to add plan')
        toast.error('Failed to fetch plans')
      })
      .finally(() => {
        removeLoadingUrl('plans/')
      })
  },

  getMyPlans: () => {
    const { addLoadingUrl, removeLoadingUrl } = useCoreStore.getState()

    addLoadingUrl('my-plans/')

    api({
      url: 'my-plans/',
      method: 'GET'
    })
      .then(res => {
        set({ myPlans: res.data })
      })
      .catch(error => {
        toast.error('Failed to fetch my plans')
        console.error('My Plans API Error:', error)
      })
      .finally(() => {
        removeLoadingUrl('my-plans/')
      })
  }
}))

export default usePlans
