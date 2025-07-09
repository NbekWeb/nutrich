import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SupportIcon from '@mui/icons-material/Support'
import PsychologyIcon from '@mui/icons-material/Psychology'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'

const FeaturesSection = ({ mode }) => {
  const features = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'Your Flexible Health Wallet',
      description:
        'Purchase tokens with ease and use them for any service you want, whenever you want. Your balance never expires.'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'Your Personal Result Center',
      description:
        'All purchased meal plans and recipes are automatically saved and always available in your personal account.'
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'Intelligent Personalization',
      description:
        'Our AI analyzes your unique data—height, weight, age, and goals—to calculate your optimal daily calorie intake with precision.'
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'Family & Couples Plans',
      description:
        'Generate a shared meal plan for two or more people with different goals, with smart portion sizes for each person.'
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'Healthy Alternatives',
      description:
        'Craving something unhealthy? Our AI assistant helps you stay on track by offering a healthy and delicious alternative.'
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'AI Plan Adaptation',
      description:
        'Missing an ingredient? The AI can change a recipe on the fly while maintaining the required nutritional balance.'
    }
  ]

  return (
    <Box id='landingFeatures' sx={{ py: 10, bgcolor: mode === 'dark' ? '#2f3349' : 'grey.50' }}>
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <div className='flex flex-col gap-y-4 items-center justify-center'>
            <Chip size='small' variant='tonal' color='primary' label='YOUR PERSONAL NUTRITION OS' />

            <div className='flex items-center gap-x-2 '>
              <Typography color='text.primary' variant='h3'>
                <span className='relative z-[1] font-extrabold'>
                  A Smarter
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[19%] block-start-[17px]'
                  />
                </span>{' '}
                Way to Plan Your Day
              </Typography>
            </div>
            <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
              Go beyond static &ldquo;one-time&rdquo; plans. Our service is designed to be your daily partner in health,
              providing dynamic and intelligent solutions for every nutritional challenge.
            </Typography>
          </div>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ height: '100%', p: 4, bgcolor: mode === 'dark' ? '#25293c' : 'grey.50' }}>
                <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default FeaturesSection
