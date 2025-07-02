'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Pricing from '@/components/pricing/Main'

import { useEffect } from 'react'

import useUserStore from '@/store/useUserStore'
import useCoreStore from '@/store/useCoreStore'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const PricingPage = () => {
  const { loadingUrl } = useCoreStore()
  const { pricingTokens, getTokenPrice } = useUserStore()

  useEffect(() => {
    getTokenPrice()
  }, [])
  return (
    <>
      <Card>
        <CardContent className='xl:!plb-16 xl:pli-[6.25rem] pbs-10 pbe-5 pli-5 sm:p-16'>
          <Pricing data={pricingTokens} />
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
