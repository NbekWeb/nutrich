// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

// Third-party Imports
import classnames from 'classnames'

// MUI Icon Imports
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import FolderIcon from '@mui/icons-material/Folder'
import PsychologyIcon from '@mui/icons-material/Psychology'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const features = [
  {
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'var(--mui-palette-primary-main)' }} />,
    title: 'Your Flexible Health Wallet',
    description:
      'Purchase tokens with ease and use them for any service you want, whenever you want. Your balance never expires.'
  },
  {
    icon: <FolderIcon sx={{ fontSize: 40, color: 'var(--mui-palette-primary-main)' }} />,
    title: 'Your Personal Result Center',
    description:
      'All purchased meal plans and recipes are automatically saved and always available in your personal account.'
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: 'var(--mui-palette-primary-main)' }} />,
    title: 'Intelligent Personalization',
    description:
      'Our AI analyzes your unique data—height, weight, age, and goals—to calculate your optimal daily calorie intake with precision.'
  },
  {
    icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: 'var(--mui-palette-primary-main)' }} />,
    title: 'Family & Couples Plans',
    description:
      'Generate a shared meal plan for two or more people with different goals, with smart portion sizes for each person.'
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 40, color: 'var(--mui-palette-primary-main)' }} />,
    title: 'Healthy Alternatives',
    description:
      'Craving something unhealthy? Our AI assistant helps you stay on track by offering a healthy and delicious alternative.'
  },
  {
    icon: <AutoFixHighIcon sx={{ fontSize: 40, color: 'var(--mui-palette-primary-main)' }} />,
    title: 'AI Plan Adaptation',
    description:
      'Missing an ingredient? The AI can change a recipe on the fly while maintaining the required nutritional balance.'
  }
]

const FeaturesSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'customColors.chatBg',
        borderRadius: '2rem'
      }}
    >
      <Container maxWidth='lg'>
        <section id='landingFeatures' className='pt-16 max-sm:pt-12 '>
          <div className={classnames('flex flex-col gap-12 pbs-12 pbe-[100px]', frontCommonStyles.layoutSpacing)}>
            <div className='flex flex-col gap-y-4 items-center justify-center'>
              <Chip size='small' variant='tonal' color='primary' label='YOUR PERSONAL NUTRITION OS' />
              <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
                <div className='flex items-center gap-x-2'>
                  <Typography color='text.primary' variant='h4' className='text-center'>
                    <span className='relative z-[1] font-extrabold'>
                      A Smarter
                      <img
                        src='/images/front-pages/landing-page/bg-shape.png'
                        alt='bg-shape'
                        className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                      />
                    </span>{' '}
                    Way to Plan Your Day
                  </Typography>
                </div>
                <Typography className='text-center'>
                  Go beyond static &quot;one-time&quot; plans. Our service is designed to be your daily partner in
                  health, providing dynamic and intelligent solutions for every nutritional challenge.
                </Typography>
              </div>
            </div>
            <div>
              <Grid container spacing={6}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={index}>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                      {feature.icon}
                      <Typography className='mbs-2' variant='h5'>
                        {feature.title}
                      </Typography>
                      <Typography className='max-is-[364px] text-center'>{feature.description}</Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}

export default FeaturesSection
