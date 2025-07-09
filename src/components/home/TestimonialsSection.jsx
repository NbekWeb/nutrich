import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'

const TestimonialsSection = ({ mode }) => {
  const testimonials = [
    {
      text: "The Family Plan is a lifesaver. My husband is trying to lose weight, I'm a vegetarian, and our son just wants tasty food. Nutrich.io creates one menu for all of us. It's brilliant!",
      author: 'Anna K.',
      role: 'Mom & Busy Professional'
    },
    {
      text: 'I\'m down 4 kg in my first month, and I never felt like I was on a diet. The "What if..." AI assistant is the best part. This is the first plan I\'ve actually been able to stick to.',
      author: 'Mark T.',
      role: 'User since June 2025'
    },
    {
      text: 'I bought the "2 Week Marathon Meal Plan" and the results were incredible. All my plans are saved in my personal account, so I can go back to my favorite meals anytime. Highly recommended!',
      author: 'Elena P.',
      role: 'Fitness Enthusiast'
    }
  ]

  return (
    <Box sx={{ py: 10, bgcolor: mode === 'dark' ? '#2f3349' : 'grey.50' }}>
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <div className='flex flex-col gap-y-4 items-center justify-center'>
            <Chip size='small' variant='tonal' color='primary' label='TESTIMONIALS' />
            <div className='flex items-center gap-x-2 '>
              <Typography color='text.primary' variant='h3'>
                <span className='relative z-[1] font-extrabold'>
                  What
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[19%] block-start-[17px]'
                  />
                </span>{' '}
                People Say
              </Typography>
            </div>
            <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
              See what our customers have to say about their experience.
            </Typography>
          </div>
        </Box>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 4, bgcolor: mode === 'dark' ? '#25293c' : 'grey.50', height: '100%' }}>
                <Typography variant='body2' sx={{ color: 'text.secondary', mb: 3 }}>
                  &ldquo;{testimonial.text}&rdquo;
                </Typography>
                <Box>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                    {testimonial.author}
                  </Typography>
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                    {testimonial.role}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default TestimonialsSection
