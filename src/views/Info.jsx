'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import useUserStore from '@/store/useUserStore'
import useCoreStore from '@/store/useCoreStore'

// Styled Custom Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const Info = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [form, setForm] = useState({
    height: '',
    weight: '',
    gender: '',
    age: '',
    goal: ''
  })

  const [errors, setErrors] = useState({})

  const handleNumericInput = (field, rawValue) => {
    let cleaned = rawValue.replace(/[^\d]/g, '') // Remove non-digits

    if (cleaned !== '') cleaned = String(parseInt(cleaned, 10)) // Remove leading zeros
    handleChange(field, cleaned)
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.height) newErrors.height = 'Height is required'
    if (!form.weight) newErrors.weight = 'Weight is required'
    if (!form.gender) newErrors.gender = 'Gender is required'
    if (!form.age) newErrors.age = 'Age is required'
    if (!form.goal) newErrors.goal = 'Goal is required'

    setErrors(newErrors)
    
return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (validateForm()) {
      putUser({ ...user, ...form }, () => {
        router.push('/user')
      })
    }
  }

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-info-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-info-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-info-dark.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-info-light.png'

  // Hooks
  const router = useRouter()
  const { getUser, putUser, user } = useUserStore()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  useEffect(() => {
    getUser(() => {})
  }, [])
  
return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <RegisterIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Add personal information!`}</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <CustomTextField
              fullWidth
              label='Height (cm)'
              placeholder='Enter your height'
              type='text'
              value={form.height}
              onChange={e => handleNumericInput('height', e.target.value)}
              error={!!errors.height}
              helperText={errors.height}
            />
            <CustomTextField
              fullWidth
              label='Weight (kg)'
              placeholder='Enter your weight'
              type='text'
              value={form.weight}
              onChange={e => handleNumericInput('weight', e.target.value)}
              error={!!errors.weight}
              helperText={errors.weight}
            />
            <CustomTextField
              fullWidth
              label='Age'
              placeholder='Enter your age'
              type='text'
              value={form.age}
              onChange={e => handleNumericInput('age', e.target.value)}
              error={!!errors.age}
              helperText={errors.age}
            />
            <div>
              <Typography variant='body2' className='mb-1'>
                Gender
              </Typography>
              <RadioGroup row value={form.gender} onChange={e => handleChange('gender', e.target.value)}>
                <FormControlLabel value='Male' control={<Radio />} label='Male' />
                <FormControlLabel value='Female' control={<Radio />} label='Female' />
              </RadioGroup>
              {errors.gender && (
                <Typography variant='caption' color='error'>
                  {errors.gender}
                </Typography>
              )}
            </div>

            <div>
              <Typography variant='body2' className='mb-1'>
                Goal
              </Typography>
              <Select fullWidth value={form.goal} onChange={e => handleChange('goal', e.target.value)} displayEmpty>
                <MenuItem value=''>Select goal</MenuItem>
                <MenuItem value='Lose'>Lose</MenuItem>
                <MenuItem value='Gain'>Gain</MenuItem>
                <MenuItem value='Maintain'>Maintain</MenuItem>
              </Select>
              {errors.goal && (
                <Typography variant='caption' color='error'>
                  {errors.goal}
                </Typography>
              )}
            </div>

            <Button fullWidth variant='contained' type='submit'>
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Info
