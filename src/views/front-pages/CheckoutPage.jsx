'use client'

// React Imports
import { useEffect } from 'react'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import { useSettings } from '@core/hooks/useSettings'

// Styles Imports
import frontCommonStyles from './styles.module.css'

const Checkout = () => {
  return (
    <div className='text-center py-8'>
      <h2 className='text-2xl font-bold mb-4'>Checkout</h2>
      <p className='text-gray-600'>Checkout functionality coming soon...</p>
    </div>
  )
}

const CheckoutPage = () => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={classnames('md:plb-[100px] plb-6', frontCommonStyles.layoutSpacing)}>
      <Checkout />
    </section>
  )
}

export default CheckoutPage
