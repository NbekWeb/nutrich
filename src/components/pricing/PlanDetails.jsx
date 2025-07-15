// MUI Imports
import { useRouter } from 'next/navigation'

import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'

import useUserStore from '@/store/useUserStore'
import styles from './PlanDetails.module.css'

const PlanDetails = ({ data, popular = false }) => {
  const { buyTokePrice, getUser } = useUserStore()
  const router = useRouter()

  function buyToken(id) {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
      router.push('/login')

      return
    } else {
      buyTokePrice({ token: id }, () => {
        getUser()
      })
    }
  }

  return (
    <CardContent
      className={classnames('relative flex flex-col gap-5')}
      sx={{
        borderRadius: 1,
        p: popular ? 6 : 4,
        minHeight: popular ? 480 : 420,
        boxShadow: popular ? 4 : 1,
        position: 'relative',
        zIndex: popular ? 2 : 1,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {popular ? (
        <Chip
          color='primary'
          label='Popular'
          size='small'
          className='absolute block-start-4 inline-end-5'
          variant='tonal'
        />
      ) : null}
      <div className='text-center flex flex-col gap-1'>
        <Typography variant='h4'>{data?.token_name}</Typography>
      </div>
      <div className='relative mbe-4'>
        <div className='flex justify-center'>
          <Typography component='sup' className='self-start font-medium'></Typography>
          <Typography variant='h1' component='span' color='primary'>
            {data?.token_value}
          </Typography>
          <Typography component='sub' className='self-end font-medium'>
            /token
          </Typography>
        </div>
        <p className='text-start mt-5 '>{data?.description}</p>
      </div>
      <div style={{ flex: 1 }} />
      <Button
        fullWidth
        color={data?.currentPlan ? 'success' : 'primary'}
        variant={popular ? 'contained' : 'tonal'}
        onClick={() => buyToken(data?.id)}
        className={`${data?.popularPlan ? 'bg-primary' : ''}`}
      >
        Purchase ${parseFloat(data?.price).toFixed(2).replace(/\.00$/, '')}
      </Button>
    </CardContent>
  )
}

export default PlanDetails
