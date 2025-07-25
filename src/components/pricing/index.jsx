'use client'

import { useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Backdrop from '@mui/material/Backdrop'

import CircularProgress from '@mui/material/CircularProgress'

import Pricing from '@/components/pricing/Main'

import useUserStore from '@/store/useUserStore'
import useCoreStore from '@/store/useCoreStore'

const PricingPage = ({ title = true }) => {
  const { loadingUrl } = useCoreStore()
  const { pricingTokens, getTokenPrice } = useUserStore()

  useEffect(() => {
    getTokenPrice()
  }, [getTokenPrice])

  return (
    <>
      <Card
        sx={{
          background: 'transparent',
          boxShadow: 'none'
        }}
      >
        <CardContent className='!p-0'>
          <Pricing data={pricingTokens} title={title} />
        </CardContent>
      </Card>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loadingUrl.has('user-detail/') || loadingUrl.has('pricing-tokens/')}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default PricingPage
