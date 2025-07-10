import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'

import PricingPage from './PricingPage'

const PricingSection = ({ mode }) => {
  return (
    <Box
      id='landingPricing'
      sx={{
        py: 10,
        bgcolor: 'customColors.chatBg',
        borderTopLeftRadius: '2rem',
        borderTopRightRadius: '2rem'
      }}
    >
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <div className='flex flex-col gap-y-4 items-center justify-center'>
            <Chip size='small' variant='tonal' color='primary' label='PRICING PLANS' />
            <div className='flex items-center gap-x-2 '>
              <Typography color='text.primary' variant='h3'>
                <span className='relative z-[1] font-extrabold'>
                  Choose
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[19%] block-start-[17px]'
                  />
                </span>{' '}
                Your Fuel. Simple, Flexible & Forever.
              </Typography>
            </div>
            <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', mb: 0 }}>
              Tokens are your internal currency for any service on Nutrich.io. Top up your balance, use them whenever
              you want, and remember—<b>your tokens never expire</b>.
            </Typography>
          </div>
        </Box>
        <PricingPage title={false} />
      </Container>
    </Box>
  )
}

export default PricingSection
