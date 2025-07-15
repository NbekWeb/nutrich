'use client'

import { Box, Typography } from '@mui/material'

const TestPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Test Page
      </Typography>
      <Typography variant='body1'>This is a test page to verify Material-UI components are working.</Typography>
    </Box>
  )
}

export default TestPage
