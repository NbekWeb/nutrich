// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import InputLabel from '@mui/material/InputLabel'
import { useTheme } from '@mui/material/styles'

// MUI Icon Imports
import CheckIcon from '@mui/icons-material/CheckCircle'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

const PlanDetails = ({ data, pricingPlan }) => {
  return (
    <CardContent
      className={classnames('relative border rounded pli-5 pbs-[3.75rem] flex flex-col gap-5', {
        'border-primary': data?.popularPlan
      })}
    >
      {data?.popularPlan ? (
        <Chip
          color='primary'
          label='Popular'
          size='small'
          className='absolute block-start-4 inline-end-5'
          variant='tonal'
        />
      ) : null}
      <div className='flex justify-center'>
        <img
          src={data?.imgSrc}
          height={data?.imgHeight}
          width={data?.imgWidth}
          alt={`${data?.title.toLowerCase().replace(' ', '-')}-img`}
        />
      </div>
      <div className='text-center flex flex-col gap-1'>
        <Typography variant='h4'>{data?.title}</Typography>
        <Typography>{data?.description}</Typography>
      </div>
      <div className='relative mbe-4'>
        <div className='flex justify-center'>
          <Typography component='sup' className='self-start font-medium'>
            $
          </Typography>
          <Typography variant='h1' component='span' color='primary'>
            {pricingPlan === 'monthly' ? data?.monthlyPrice : data?.yearlyPlan.monthly}
          </Typography>
          <Typography component='sub' className='self-end font-medium'>
            /month
          </Typography>
        </div>
        {pricingPlan !== 'monthly' && data?.monthlyPrice !== 0 ? (
          <Typography
            variant='caption'
            className='absolute inline-end-1/2 translate-x-[50%]'
          >{`USD ${data?.yearlyPlan.annually}/year`}</Typography>
        ) : null}
      </div>
      <div className='flex flex-col gap-4'>
        {data?.planBenefits.map((item, index) => (
          <div key={index} className='flex items-center gap-2'>
            <span className='inline-flex'>
              <CheckIcon
                style={{ fontSize: 18, color: '#7B7BFF' }}
                className={!data?.popularPlan ? 'opacity-60' : ''}
              />
            </span>
            <Typography>{item}</Typography>
          </div>
        ))}
      </div>
      <Button
        fullWidth
        color={data?.currentPlan ? 'success' : 'primary'}
        variant={data?.popularPlan ? 'contained' : 'tonal'}
      >
        {data?.currentPlan ? 'Your Current Plan' : 'Upgrade'}
      </Button>
    </CardContent>
  )
}

const Pricing = ({ data }) => {
  // States
  const [pricingPlan, setPricingPlan] = useState('annually')

  // Hooks
  const theme = useTheme()

  const handleChange = e => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Typography variant='h3'>Pricing Plans </Typography>
        <div className='flex items-center text-center flex-col  sm:mbe-[3.8rem]'>
          <Typography>
            All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your
            needs.
          </Typography>
        </div>
        <div className='flex justify-center items-center relative mbs-0.5'>
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
            Monthly
          </InputLabel>
          <Switch id='pricing-switch' onChange={handleChange} checked={pricingPlan === 'annually'} />
          <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
            Annually
          </InputLabel>

          <div
            className={classnames('flex absolute max-sm:hidden block-start-[-39px] translate-x-[35%]', {
              'right-full': theme.direction === 'rtl',
              'left-1/2': theme.direction !== 'rtl'
            })}
          >
            <DirectionalIcon
              ltrIconClass='tabler-corner-left-down'
              rtlIconClass='tabler-corner-right-down'
              className='mbs-2 mie-1 text-textDisabled'
            />
            <Chip label='Save up to 10%' size='small' variant='tonal' color='primary' />
          </div>
        </div>
      </div>
      <div className='container mx-auto px-6 '>
        <Grid spacing={6}>
          {data?.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PlanDetails data={plan} pricingPlan={pricingPlan} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

const pricingData = [
  {
    title: 'Basic',
    monthlyPrice: 10,
    currentPlan: false,
    popularPlan: false,
    subtitle: 'A simple start for everyone',
    imgSrc: '/images/illustrations/objects/pricing-basic.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 10,
      annually: 1000
    },
    planBenefits: [
      '100 responses a month',
      'Unlimited forms and surveys',
      'Unlimited fields',
      'Basic form creation tools',
      'Up to 2 subdomains'
    ]
  },
  {
    monthlyPrice: 49,
    title: 'Standard',
    popularPlan: true,
    currentPlan: false,
    subtitle: 'For small to medium businesses',
    imgSrc: '/images/illustrations/objects/pricing-standard.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 40,
      annually: 480
    },
    planBenefits: [
      'Unlimited responses',
      'Unlimited forms and surveys',
      'Instagram profile page',
      'Google Docs integration',
      'Custom "Thank you" page'
    ]
  },
  {
    monthlyPrice: 99,
    popularPlan: false,
    currentPlan: false,
    title: 'Enterprise',
    subtitle: 'Solution for big organizations',
    imgSrc: '/images/illustrations/objects/pricing-enterprise.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 80,
      annually: 960
    },
    planBenefits: [
      'PayPal payments',
      'Logic Jumps',
      'File upload with 5GB storage',
      'Custom domain support',
      'Stripe integration'
    ]
  }
]

const PricingPage = () => {
  return <Pricing data={pricingData} />
}

export default PricingPage
