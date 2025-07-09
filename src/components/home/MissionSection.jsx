import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'

const MissionSection = ({ mode }) => {
  return (
    <Box
      sx={{
        py: 10,
        bgcolor: mode === 'dark' ? '#2f3349' : 'grey.50'
      }}
    >
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center' }}>
          <div className='flex flex-col gap-y-4 items-center justify-center'>
            <Chip size='small' variant='tonal' color='primary' label='OUR MISSION' />
            <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
              <Typography className='text-center'>Who is behind these great-looking interfaces?</Typography>

              <div className='flex items-center gap-x-2 '>
                <Typography color='text.primary' variant='h3'>
                  <span className='relative z-[1] font-extrabold'>
                    Beyond 
                    <img
                      src='/images/front-pages/landing-page/bg-shape.png'
                      alt='bg-shape'
                      className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[19%] block-start-[17px]'
                    />
                  </span>{' '}
                  the Plan: Your Daily Partner in Health
                </Typography>
              </div>
              <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
                Our key strategic objective is to be more than just a website you visit once. We aim to transform our
                service from a &ldquo;one-time plan generator&rdquo; into your &ldquo;daily nutrition assistant&rdquo;.
                We believe that true health is an ongoing journey, which is why our AI provides interactive tools that
                adapt to your life, empowering you to build lasting, healthy habits on your own terms.
              </Typography>
            </div>
          </div>
        </Box>
      </Container>
    </Box>
  )
}

export default MissionSection
