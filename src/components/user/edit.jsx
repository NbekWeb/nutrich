'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import { useRouter } from 'next/navigation'
import useUserStore from '@/store/useUserStore'
import useCoreStore from '@/store/useCoreStore'

const UserEditPage = () => {
  const router = useRouter()
  const { user, getUser, putUser } = useUserStore()
  const { loadingUrl } = useCoreStore()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
    height: '',
    weight: '',
    gender: '',
    age: '',
    goal: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        avatar: user.avatar || '',
        height: String(user.height || ''),
        weight: String(user.weight || ''),
        gender: user.gender || '',
        age: String(user.age || ''),
        goal: user.goal || ''
      })
    }
  }, [user])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleNumericInput = (field, rawValue) => {
    let cleaned = rawValue.replace(/[^\d]/g, '')
    if (cleaned !== '') cleaned = String(parseInt(cleaned, 10))
    handleChange(field, cleaned)
  }

  const handleAvatarChange = event => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        avatar: reader.result // base64 string
      }))
    }
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const newErrors = {}

    if (!form.first_name.trim()) newErrors.first_name = 'First name is required'
    if (!form.last_name.trim()) newErrors.last_name = 'Last name is required'
    if (!form.height) newErrors.height = 'Height is required'
    if (!form.weight) newErrors.weight = 'Weight is required'
    if (!form.age) newErrors.age = 'Age is required'
    if (!form.gender) newErrors.gender = 'Gender is required'
    if (!form.goal) newErrors.goal = 'Goal is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      // Replace with your API call
      putUser({ ...user, ...form }, () => {
        getUser(() => {
          toast.success('Profile updated!')
          router.push('/user')
        })
      })
    }
  }

  return (
    <>
      <Card>
        <CardContent className='xl:!plb-16 xl:pli-[6.25rem] pbs-10 pbe-5 pli-5 sm:p-16'>
          <div className='flex  gap-5'>
            <div className='relative w-fit  max-h-max'>
              <Avatar src={form.avatar} alt='User Avatar' sx={{ width: 120, height: 120 }} />
              <IconButton component='label' sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                <PhotoCamera />
                <input type='file' hidden accept='image/*' onChange={handleAvatarChange} />
              </IconButton>
            </div>

            <Grid item xs={12} sm={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='First Name'
                    fullWidth
                    value={form.first_name}
                    onChange={e => handleChange('first_name', e.target.value)}
                    error={!!errors.first_name}
                    helperText={errors.first_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Last Name'
                    fullWidth
                    value={form.last_name}
                    onChange={e => handleChange('last_name', e.target.value)}
                    error={!!errors.last_name}
                    helperText={errors.last_name}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Height (cm)'
                    fullWidth
                    value={form.height}
                    onChange={e => handleNumericInput('height', e.target.value)}
                    error={!!errors.height}
                    helperText={errors.height}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Weight (kg)'
                    fullWidth
                    value={form.weight}
                    onChange={e => handleNumericInput('weight', e.target.value)}
                    error={!!errors.weight}
                    helperText={errors.weight}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant='body2' className='mb-1'>
                    Gender
                  </Typography>
                  <Select
                    fullWidth
                    value={form.gender}
                    onChange={e => handleChange('gender', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value=''>Select gender</MenuItem>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography variant='caption' color='error'>
                      {errors.gender}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Age'
                    fullWidth
                    value={form.age}
                    onChange={e => handleNumericInput('age', e.target.value)}
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loadingUrl.has('user-detail/')}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default UserEditPage
