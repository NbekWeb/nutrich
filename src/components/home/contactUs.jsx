// React Imports
import { useEffect, useRef, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import styles from './styles.module.css'
import useAuthStore from '@/store/useAuthStore'

const ContactUs = () => {
  const { contactUsApi } = useAuthStore()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = () => {
    contactUsApi(formData, () => {
      setFormData({ name: '', email: '', message: '' })
    })
  }

  return (
    <section id='contact-us' className='plb-[100px] bg-backgroundDefault'>
      <div className={classnames('flex flex-col gap-14', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='tonal' color='primary' label='Contact Us' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4'>
                <span className='relative z-[1] font-extrabold'>
                  Let&#39;s work
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[132%] -inline-start-[19%] block-start-[17px]'
                  />
                </span>{' '}
                together
              </Typography>
            </div>
            <Typography className='text-center'>Any question or remark? just write us a message</Typography>
          </div>
        </div>
        <div className='lg:pis-[38px]'>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={5}>
              <div className={classnames('border p-[10px] relative', styles.contactRadius)}>
                <img
                  src='/images/front-pages/landing-page/contact-border.png'
                  className='absolute -block-start-[7%] -inline-start-[8%] max-is-full max-lg:hidden '
                  alt='contact-border'
                  width='180'
                />
                <img
                  src='/images/front-pages/landing-page/customer-service.png'
                  alt='customer-service'
                  className={classnames('is-full', styles.contactRadius)}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <Card>
                <CardContent>
                  <div className='flex flex-col gap-y-[6px] mbe-6'>
                    <Typography variant='h4'>Send a message</Typography>
                    <Typography>
                      If you would like to discuss anything related to payment, account, licensing, partnerships, or
                      have pre-sales questions, you&#39;re at the right place.
                    </Typography>
                  </div>
                  <form className='flex flex-col items-start gap-6'>
                    <div className='flex gap-5 is-full'>
                      <CustomTextField
                        fullWidth
                        label='Full name'
                        id='name-input'
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                      <CustomTextField
                        fullWidth
                        label='Email address'
                        id='email-input'
                        type='email'
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <CustomTextField
                      fullWidth
                      multiline
                      rows={7}
                      label='Message'
                      id='message-input'
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                    <Button
                      variant='contained'
                      onClick={handleSubmit}
                      disabled={!formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                    >
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
