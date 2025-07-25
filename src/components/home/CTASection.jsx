// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Hooks Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const GetStarted = () => {
  // MUI theme mode
  const { mode: muiMode } = useColorScheme()
  const mode = muiMode || 'light' // fallback light

  // Vars
  const getStartedImageLight = '/images/front-pages/landing-page/get-started-bg-light.png'
  const getStartedImageDark = '/images/front-pages/landing-page/get-started-bg-dark.png'

  // HOOKNI TO'G'RIDAN-TO'G'RI CHAQIRING!
  const getStartedImage = useImageVariant(mode, getStartedImageLight, getStartedImageDark) || getStartedImageLight

  const router = useRouter()

  function goStart() {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
      router.push('/login')

      return
    }
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className='relative'>
      {mounted && (
        <img
          src={getStartedImage}
          alt='background-image'
          className='absolute is-full flex -z-1 pointer-events-none bs-full block-end-0'
        />
      )}
      <div
        className={classnames(
          'flex items-center flex-wrap justify-center lg:justify-between gap-y-4 gap-x-28',
          frontCommonStyles.layoutSpacing
        )}
      >
        <div className='flex flex-col items-start gap-y-8 pbs-9 lg:plb-9 z-[1]'>
          <div className='flex flex-col'>
            <Typography variant='h3' color='primary' className='font-bold text-[2.125rem]'>
              Ready to Get Started?
            </Typography>
            <Typography variant='h5' color='text.secondary'>
              Start your project with a 14-day free trial
            </Typography>
          </div>
          <Button onClick={goStart} variant='contained'>
            Get Started
          </Button>
        </div>
        <div className='flex pbs-4 lg:pbs-[60px] md:pie-4 z-[1]'>
          <img src='/images/support.png' alt='dashboard-image' className='max-is-[600px] is-full rounded-bs' />
        </div>
      </div>
    </section>
  )
}

export default GetStarted
