import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ServicesSection = ({ mode }) => {
  const gradientTextStyle = {
    color: 'rgb(115, 103, 240)'
  }

  const services = [
    {
      title: '1. Flexible Personal Plans',
      description:
        'Our flagship service, designed for the individual user who seeks a truly tailored nutritional guide. Order a plan for a single day, a full week, or an entire month.',
      features: [
        'Custom Calculation: Analyzes your parameters for optimal calorie intake.',
        'Detailed Nutritional Info: Precise breakdown of calories, proteins, fats, and carbs.',
        'User-Centric: Built on your data and personal food preferences.'
      ]
    },
    {
      title: '2. Family or Couples Plan',
      description:
        'Solves the common problem of what to cook for a household with multiple people who have different tastes and dietary goals.',
      features: [
        'Shared Meals, Custom Portions: AI suggests different serving sizes for each person.',
        'Diverse Goal Management: Accommodates different goals simultaneously.'
      ]
    },
    {
      title: '3. Specialized Programs',
      description:
        'Ready-made, packaged meal plans designed for a specific, focused purpose, like a "7-day Detox" or a "2 Week Marathon Meal Plan".',
      features: [
        'Goal-Oriented: Targeted programs for clear, time-sensitive goals.',
        'Fixed Product: Sold as a complete package for a simple purchase decision.'
      ]
    },
    {
      title: '4. Interactive AI Assistants',
      description:
        'Transforms the platform into a true "daily nutrition assistant" by allowing you to modify your plans on the fly.',
      features: [
        "AI Plan Adaptation: Instantly change a recipe if you're missing ingredients.",
        'Healthy Alternative Creator: Get healthy swaps for unhealthy cravings.'
      ]
    }
  ]

  return (
    <Box id='landingServices' sx={{ py: 10 }}>
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <div className='flex flex-col gap-y-4 items-center justify-center'>
            <Chip size='small' variant='tonal' color='primary' label='OUR SERVICES' />
            <div className='flex items-center gap-x-2 '>
              <Typography color='text.primary' variant='h3'>
                <span className='relative z-[1] font-extrabold'>
                  One
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[19%] block-start-[17px]'
                  />
                </span>{' '}
                Platform, Every Nutritional Need
              </Typography>
            </div>
            <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
              From solo plans to family solutions and specialized programs, we have a service for every goal and
              lifestyle.
            </Typography>
          </div>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {services.map((service, index) => (
            <Grid container spacing={6} key={index} alignItems='center'>
              <Grid item xs={12} md={6} order={{ xs: 1, md: index % 2 === 0 ? 1 : 2 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }} style={gradientTextStyle}>
                  {service.title}
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.secondary', mb: 3 }}>
                  {service.description}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 2, md: index % 2 === 0 ? 2 : 1 }}>
                <Card sx={{ p: 3 }}>
                  <Box component='ul' sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {service.features.map((feature, featureIndex) => (
                      <Box component='li' key={featureIndex} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <div className='flex items-center '>
                          <CheckCircleIcon sx={{ color: 'rgba(115, 103, 240)', mr: 2, mt: 0.5, flexShrink: 0 }} />
                          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                            {feature}
                          </Typography>
                        </div>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default ServicesSection
