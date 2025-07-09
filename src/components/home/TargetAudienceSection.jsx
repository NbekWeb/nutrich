import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'

import PeopleIcon from '@mui/icons-material/People'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import StarIcon from '@mui/icons-material/Star'

const TargetAudienceSection = () => {
  const targetAudience = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'For Busy Professionals',
      description:
        'Save time and mental energy. Get your weekly meals planned out so you can focus on your work, knowing your nutrition is optimized for performance.'
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'For Families & Couples',
      description:
        'Finally solve the &ldquo;what to cook for everyone&rdquo; problem. Our Family Plan service generates shared meals with clever recipe changes for everyone.'
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'For Fitness Enthusiasts',
      description:
        'Dial in your nutrition with precision. Our system accurately calculates macros to help you reach your specific fitness goals.'
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: '#007CF0' }} />,
      title: 'For a Healthier Lifestyle',
      description:
        'Get started easily. Simply provide your data and preferences, and let our AI guide you. All plans are saved in your personal account.'
    }
  ]

  return (
    <Box sx={{ py: 10,  }}>
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2 }}>
            Designed For Your Unique Life
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
            Whether you&apos;re a busy professional, a family manager, or a fitness enthusiast, nutrich.io is built to
            adapt to your specific needs.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {targetAudience.map((item, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 4,  }}>
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default TargetAudienceSection
