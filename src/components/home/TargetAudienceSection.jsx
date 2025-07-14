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
import WorkIcon from '@mui/icons-material/Work'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const targetAudience = [
  {
    icon: (
      <WorkIcon
        sx={{
          fontSize: 64,
          color: 'var(--mui-palette-primary-main)',
          fill: 'color-mix(in srgb, var(--mui-palette-primary-main) 20%, transparent)',
          stroke: 'currentColor',
          strokeWidth: 1.2,
          opacity: 0.7
        }}
      />
    ), // outlined style
    title: 'For Busy Professionals',
    description:
      'Save time and mental energy. Get your weekly meals planned out so you can focus on your work, knowing your nutrition is optimized for performance.'
  },
  {
    icon: (
      <FamilyRestroomIcon
        sx={{
          fontSize: 64,
          color: 'var(--mui-palette-primary-main)',
          fill: 'color-mix(in srgb, var(--mui-palette-primary-main) 20%, transparent)',
          stroke: 'currentColor',
          strokeWidth: 1.2,
          opacity: 0.7
        }}
      />
    ), // outlined style
    title: 'For Families & Couples',
    description:
      'Finally solve the "what to cook for everyone" problem. Our Family Plan service generates shared meals with clever recipe changes for everyone.'
  },
  {
    icon: (
      <FitnessCenterIcon
        sx={{
          fontSize: 64,
          color: 'var(--mui-palette-primary-main)',
          fill: 'color-mix(in srgb, var(--mui-palette-primary-main) 20%, transparent)',
          stroke: 'currentColor',
          strokeWidth: 1.2,
          opacity: 0.7
        }}
      />
    ), // outlined style
    title: 'For Fitness Enthusiasts',
    description:
      'Dial in your nutrition with precision. Our system accurately calculates macros to help you reach your specific fitness goals.'
  },
  {
    icon: (
      <HealthAndSafetyIcon
        sx={{
          fontSize: 64,
          color: 'var(--mui-palette-primary-main)',
          fill: 'color-mix(in srgb, var(--mui-palette-primary-main) 20%, transparent)',
          stroke: 'currentColor',
          strokeWidth: 1.2,
          opacity: 0.7
        }}
      />
    ), // outlined style
    title: 'For a Healthier Lifestyle',
    description:
      'Get started easily. Simply provide your data and preferences, and let our AI guide you. All plans are saved in your personal account.'
  }
]

const TargetAudienceSection = () => {
  return (
    <Box
      sx={{
        py: 10,
        bgcolor: 'customColors.chatBg',
        borderRadius: '2rem'
      }}
    >
      <Container maxWidth='lg'>
        <section id='target-audience'>
          <div className={classnames('flex flex-col gap-12 pbs-12 pbe-[100px]', frontCommonStyles.layoutSpacing)}>
            <div className='flex flex-col gap-y-4 items-center justify-center'>
              <Chip size='small' variant='tonal' color='primary' label='Target Audience' />
              <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
                <div className='flex items-center gap-x-2'>
                  <Typography color='text.primary' variant='h4' className='text-center'>
                    <span className='relative z-[1] font-extrabold'>
                      Designed
                      <img
                        src='/images/front-pages/landing-page/bg-shape.png'
                        alt='bg-shape'
                        className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                      />
                    </span>{' '}
                    For Your Unique Life
                  </Typography>
                </div>
                <Typography className='text-center'>
                  Whether you&apos;re a busy professional, a family manager, or a fitness enthusiast, nutrich.io is
                  built to adapt to your specific needs.
                </Typography>
              </div>
            </div>
            <div>
              <Grid container spacing={6}>
                {targetAudience.map((item, index) => (
                  <Grid item xs={12} sm={6} lg={3} key={index}>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                      {item.icon}
                      <Typography className='mbs-2' variant='h5'>
                        {item.title}
                      </Typography>
                      <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
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

export default TargetAudienceSection
