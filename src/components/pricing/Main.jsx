// React Imports
import { useState } from 'react'

// MUI Imports
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import PlanDetails from './PlanDetails'
import DirectionalIcon from '@components/DirectionalIcon'

const Pricing = ({ data, title = true }) => {
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
      </div>
      <div className='container mx-auto px-6 '>
        <Grid spacing={6} container>
          {data?.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PlanDetails data={plan} popular={index == 1} pricingPlan={pricingPlan} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Pricing
