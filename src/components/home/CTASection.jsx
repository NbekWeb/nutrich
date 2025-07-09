import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
const CTASection = ({ mode }) => {
  return (
    <Box id='landingContacts' sx={{ py: 10,      bgcolor: mode === 'dark' ? '#2f3349' : 'grey.50' }}>
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 3 }}>
            Ready to Transform Your Nutrition?
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', mb: 4 }}>
            Stop wondering, start knowing. Your personal AI nutrition assistant is waiting. Create your free account
            today and discover how easy healthy eating can be.
          </Typography>
          <Button
            variant='contained'
            size='large'
            sx={{
              background: 'linear-gradient(to right, #007CF0, #00DFD8)',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Register for Free with Google
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default CTASection
