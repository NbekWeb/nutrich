import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const StatisticsSection = ({mode}) => {
  const gradientTextStyle = {
   color: 'rgb(115, 103, 240)'
  }

  const stats = [
    { value: '1,900', label: 'Kcal calculated for a user wanting to lose 5 kg in a month.' },
    { value: '3', label: 'Unique meal variations for one family dinner.' },
    { value: '<60s', label: 'Time it takes to register and create your personal profile.' },
    { value: '10+', label: 'Specialized programs and AI assistants available.' }
  ]

  return (
    <Box sx={{ py: 10, bgcolor: mode === 'dark' ? '#2f3349' : 'grey.50' }}>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h3' sx={{ fontWeight: 900, mb: 2 }} style={gradientTextStyle}>
                  {stat.value}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default StatisticsSection
