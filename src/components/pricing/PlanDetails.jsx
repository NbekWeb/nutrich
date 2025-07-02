// MUI Imports
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'
import useUserStore from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

const PlanDetails = ({ data, popular = false }) => {
  const { buyTokePrice } = useUserStore()
  const router = useRouter()

  function buyToken(id) {
    buyTokePrice({ token: id }, () => {
      router.push('/user')
    })
  }
  return (
    <CardContent
      className={classnames('relative border rounded pli-5 pbs-[3.75rem] flex flex-col gap-5', {
        'border-primary': popular
      })}
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
            token
          </Typography>
        </div>
      </div>

      <Button fullWidth color='primary' variant={popular ? 'contained' : 'tonal'} onClick={() => buyToken(data?.id)}>
        Purchase ${parseFloat(data?.price).toFixed(2).replace(/\.00$/, '')}
      </Button>
    </CardContent>
  )
}

export default PlanDetails
