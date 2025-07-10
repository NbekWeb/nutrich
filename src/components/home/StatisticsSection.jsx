// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// SVG Imports
import Check from '@assets/svg/Check'
import User from '@assets/svg/User'
import LaptopCharging from '@assets/svg/LaptopCharging'
import Diamond from '@assets/svg/Diamond'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const StatisticsSection = ({ mode }) => {
  const stats = [
    {
      value: '1,900',
      label: 'Kcal calculated for a user wanting to lose 5 kg in a month.',
      svg: <LaptopCharging color='var(--mui-palette-primary-main)' />,
      color: 'var(--mui-palette-primary-darkerOpacity)'
    },
    {
      value: '3',
      label: 'Unique meal variations for one family dinner.',
      svg: <User color='var(--mui-palette-success-main)' />,
      color: 'var(--mui-palette-success-darkerOpacity)'
    },
    {
      value: '<60s',
      label: 'Time it takes to register and create your personal profile.',
      svg: <Diamond color='var(--mui-palette-info-main)' />,
      color: 'var(--mui-palette-info-darkerOpacity)'
    },
    {
      value: '10+',
      label: 'Specialized programs and AI assistants available.',
      svg: <Check color='var(--mui-palette-warning-main)' />,
      color: 'var(--mui-palette-warning-darkerOpacity)'
    }
  ]

  return (
    <section className='plb-[84px] '>
      <div className={frontCommonStyles.layoutSpacing}>
        <Grid container spacing={6}>
          {stats.map((stat, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <div
                className='flex flex-col items-center justify-center gap-y-4 border p-6 rounded h-full min-h-[200px]'
                style={{
                  borderColor: stat.color
                }}
              >
                {stat.svg}
                <div className='text-center'>
                  <Typography variant='h3' className='font-medium'>
                    {stat.value}
                  </Typography>
                  <Typography className='font-medium'>{stat.label}</Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default StatisticsSection
