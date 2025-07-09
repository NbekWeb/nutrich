'use client'

import { useEffect, useState } from 'react'

import { Grid, Card, CardContent, Typography, Divider } from '@mui/material'
import dayjs from 'dayjs'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { red, green, blue } from '@mui/material/colors'

import useCoreStore from '@/store/useCoreStore'
import useUserStore from '@/store/useUserStore'

const HistoryPage = () => {
  const { loadingUrl } = useCoreStore()
  const { historyTokens, shareTokens, getTokenShared, getTokenHystory } = useUserStore()

  useEffect(() => {
    getTokenHystory()
    getTokenShared()
  }, [getTokenHystory, getTokenShared])

  const renderCard = item => {
    const color = blue[500]

    return (
      <Card
        variant='outlined'
        style={{
          marginBottom: 16,
          borderLeft: `6px solid ${color}`
        }}
        key={item.id}
      >
        <CardContent>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' gutterBottom>
              {item.token_details.token_name}
            </Typography>
            <ArrowForwardIcon sx={{ color: '#1976d2', transform: 'rotate(45deg)' }} />
          </Grid>
          <Typography variant='body2'>Token Count: {item.token_details.token_value}</Typography>
          <Typography variant='body2'>Price: ${item.token_details.price}</Typography>
          <Typography variant='body2'>Purchase Date: {dayjs(item.purchase_date).format('D-MMM,YYYY')}</Typography>
        </CardContent>
      </Card>
    )
  }

  const renderSharedCard = (item, type) => {
    const isReceived = type === 'received'
    const color = isReceived ? green[500] : red[500]
    const iconRotation = isReceived ? 'rotate(45deg)' : 'rotate(-45deg)'

    return (
      <Card
        variant='outlined'
        style={{
          marginBottom: 16,
          borderLeft: `6px solid ${color}`
        }}
        key={item.id}
      >
        <CardContent>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' gutterBottom>
              {isReceived ? item?.sender_email || 'No Name' : item?.receiver_email || 'No Name'}
            </Typography>
            <ArrowForwardIcon sx={{ color, transform: iconRotation }} />
          </Grid>
          <Typography variant='body2'>Token Count: {item.amount}</Typography>
          <Typography variant='body2'>Shared Date: {dayjs(item.received_date).format('D-MMM,YYYY')}</Typography>
          <Typography variant='body2' className='opacity-0'>
            Shared Date: {dayjs(item.received_date).format('D-MMM,YYYY')}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' style={{ marginBottom: 16 }}>
            Purchased History
          </Typography>
          {historyTokens?.map(renderCard)}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='h6' style={{ marginBottom: 16 }}>
            Shared History
          </Typography>

          {shareTokens?.received_gifts?.map(item => renderSharedCard(item, 'received'))}

          {shareTokens?.sent_gifts?.map(item => renderSharedCard(item, 'sent'))}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loadingUrl.has('user-detail/') || loadingUrl.has('pricing-tokens/')}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default HistoryPage
