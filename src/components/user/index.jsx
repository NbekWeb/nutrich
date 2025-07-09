'use client'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import Box from '@mui/material/Box'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

import useCoreStore from '@/store/useCoreStore'
import useUserStore from '@/store/useUserStore'

const UserPage = () => {
  const { user, shareToken, getUser } = useUserStore()
  const [open, setOpen] = useState(false)
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})
  const { loadingUrl } = useCoreStore()
  const router = useRouter()

  const handleEdit = () => {
    router.push('/user/edit')
  }

  const handleOpen = () => {
    setReceiver('')
    setAmount('')
    setErrors({})
    setOpen(true)
  }

  const handleNumericInput = (field, rawValue) => {
    let cleaned = rawValue.replace(/[^\d]/g, '')

    if (cleaned !== '') cleaned = String(parseInt(cleaned, 10))
    handleChange(field, cleaned)
  }

  const handleChange = (field, value) => {
    if (field === 'receiver') setReceiver(value)
    if (field === 'amount') setAmount(value)
  }

  const validate = () => {
    const newErrors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!receiver.trim()) {
      newErrors.receiver = 'Receiver is required'
    } else if (!emailRegex.test(receiver.trim())) {
      newErrors.receiver = 'Enter a valid email address'
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    shareToken({ receiver, amount }, () => {
      getUser()
      handleClose()
    })
  }

  const handleClose = () => setOpen(false)

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')

    if (!access_token) {
      router.push('/login')
    }
  }, [router])

  return (
    <>
      <Card>
        <CardContent className='xl:!plb-16 xl:pli-[6.25rem] pbs-10 pbe-5 pli-5 sm:p-16'>
          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={5} sm={2}>
              <Avatar
                alt={`${user?.first_name} ${user?.last_name}`}
                src={user?.avatar}
                sx={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </Grid>

            <Grid item xs={7} sm={9}>
              <Typography variant='h5'>{`${user?.first_name} ${user?.last_name}`}</Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' }
                }}
              >
                <Button variant='outlined' size='small' onClick={handleOpen} className='max-sm:w-full'>
                  Share Token
                </Button>

                <Button
                  variant='contained'
                  size='small'
                  onClick={handleEdit}
                  className='flex items-center gap-1 max-sm:w-full'
                >
                  <ModeEditIcon fontSize='small' />
                  <span>Edit</span>
                </Button>

                <Button
                  variant='text'
                  onClick={handleEdit}
                  sx={{ minWidth: 0, p: 1, display: { xs: 'inline-flex', sm: 'none' } }}
                ></Button>
              </Box>
            </Grid>
          </Grid>

          <Divider className='!my-6' />

          <Grid container spacing={4}>
            <Grid item xs={6} sm={4}>
              <Typography variant='subtitle2' color='text.secondary'>
                Height
              </Typography>
              <Typography>{user?.height} cm</Typography>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Typography variant='subtitle2' color='text.secondary'>
                Weight
              </Typography>
              <Typography>{user?.weight} kg</Typography>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Typography variant='subtitle2' color='text.secondary'>
                Gender
              </Typography>
              <Typography>{user?.gender}</Typography>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Typography variant='subtitle2' color='text.secondary'>
                Age
              </Typography>
              <Typography>{user?.age}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant='subtitle2' color='text.secondary'>
                Balance
              </Typography>
              <Typography>{user?.balance}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant='subtitle2' color='text.secondary'>
                Goal
              </Typography>
              <Typography>{user?.goal}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Share User Profile</DialogTitle>
        <DialogContent>
          <TextField
            label='Receiver'
            fullWidth
            margin='normal'
            value={receiver}
            onChange={e => handleChange('receiver', e.target.value)}
            error={!!errors.receiver}
            helperText={errors.receiver}
          />
          <TextField
            label='Amount'
            fullWidth
            margin='normal'
            value={amount}
            onChange={e => handleNumericInput('amount', e.target.value)}
            error={!!errors.amount}
            helperText={errors.amount}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loadingUrl.has('user-detail/')}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default UserPage
