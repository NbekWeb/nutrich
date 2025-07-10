'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import CustomIconButton from '@core/components/mui/IconButton'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'

const Header = ({ onModeChange }) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Hooks
  const { settings } = useSettings()
  const isBelowLgScreen = useMediaQuery(theme => theme.breakpoints.down('lg'))

  // Mode o'zgaruvchisi
  const mode = settings.mode

  // Mode o'zgarishini kuzatish
  useEffect(() => {
    // Mode o'zgarganida bajariladigan qo'shimcha amallar
    localStorage.setItem('lastMode', settings.mode)
    document.documentElement.setAttribute('data-mode', settings.mode)

    // Parent komponentga mode'ni yuborish
    if (onModeChange) {
      onModeChange(settings.mode)
    }
  }, [settings.mode, onModeChange])

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    setIsDrawerOpen(false) // Close drawer when clicking a link
    const element = document.getElementById(targetId)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Navigation items
  const navigationItems = [
    { href: '#landingHero', text: 'Home' },
    { href: '#landingFeatures', text: 'Features' },
    { href: '#landingServices', text: 'Services' },
    { href: '#landingPricing', text: 'Pricing' },
    { href: '#landingFAQ', text: 'FAQ' },
    { href: '#landingContacts', text: 'Contact us' }
  ]

  return (
    <>
      <header
        className={classnames(
          frontLayoutClasses.header,
          styles.header,
          'border-none rounded-lg max-sm:w-[calc(100%-1rem)] max-w-[1200px] mx-auto ',
          mode === 'dark' && 'bg-[var(--mui-palette-background-paper)] border-[var(--mui-palette-divider)] border-2'
        )}
      >
        <div className={classnames(frontLayoutClasses.navbar, styles.navbar, { [styles.headerScrolled]: trigger })}>
          <div className={classnames(frontLayoutClasses.navbarContent, styles.navbarContent)}>
            {isBelowLgScreen ? (
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-1'>
                  <IconButton onClick={() => setIsDrawerOpen(true)} className='-mis-2'>
                    <i className='tabler-menu-2 text-textPrimary text-2xl' />
                  </IconButton>
                  <Link href='/' className='flex items-center gap-2'>
                    <Logo />
                  </Link>
                </div>
                <div className='flex items-center gap-2'>
                  <ModeDropdown />
                  <CustomIconButton
                    component={Link}
                    variant='contained'
                    href='/register'
                    color='primary'
                    className='bg-primary text-white dark:shadow-[0_2px_8px_0_rgba(0,0,0,0.32)]'
                  >
                    <i className='tabler-login-2 text-xl' />
                  </CustomIconButton>
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-between w-full'>
               
                <div className='flex items-center gap-2 mr-8'>
                  <Link href='/' className='flex items-center gap-2'>
                    <Logo />
                  </Link>
                </div>
                {/* Navigatsiya menyusi */}
                <nav className='flex items-center gap-6 '>
                  <a
                    href='#landingHero'
                    className={classnames(
                      'text-base font-medium hover:text-primary',
                      mode === 'dark' ? 'text-[#cfcde4]' : 'text-gray-700'
                    )}
                  >
                    Home
                  </a>
                  <a
                    href='#landingFeatures'
                    onClick={e => handleSmoothScroll(e, 'landingFeatures')}
                    className={classnames(
                      'text-base font-medium hover:text-primary cursor-pointer',
                      mode === 'dark' ? 'text-[#cfcde4]' : 'text-gray-700'
                    )}
                  >
                    Features
                  </a>
                  <a
                    href='#landingServices'
                    onClick={e => handleSmoothScroll(e, 'landingServices')}
                    className={classnames(
                      'text-base font-medium hover:text-primary cursor-pointer',
                      mode === 'dark' ? 'text-[#cfcde4]' : 'text-gray-700'
                    )}
                  >
                    Services
                  </a>
                  <a
                    href='#landingPricing'
                    onClick={e => handleSmoothScroll(e, 'landingPricing')}
                    className={classnames(
                      'text-base font-medium hover:text-primary cursor-pointer',
                      mode === 'dark' ? 'text-[#cfcde4]' : 'text-gray-700'
                    )}
                  >
                    Pricing
                  </a>
                  <a
                    href='#landingFAQ'
                    onClick={e => handleSmoothScroll(e, 'landingFAQ')}
                    className={classnames(
                      'text-base font-medium hover:text-primary cursor-pointer',
                      mode === 'dark' ? 'text-[#cfcde4]' : 'text-gray-700'
                    )}
                  >
                    FAQ
                  </a>
                  {/* <a
                    href='#landingContacts'
                    onClick={e => handleSmoothScroll(e, 'landingContacts')}
                    className={classnames(
                      'text-base font-medium hover:text-primary cursor-pointer',
                      mode === 'dark' ? 'text-[#cfcde4]' : 'text-gray-700'
                    )}
                  >
                    Contact us
                  </a> */}
                </nav>
                {/* O'ng tomon */}
                <div className='flex items-center gap-4'>
                  <ModeDropdown />
                  <Button
                    component={Link}
                    variant='contained'
                    href='/register'
                    startIcon={<i className='tabler-login-2 text-xl' />}
                    className='whitespace-nowrap bg-primary text-white shadow-md px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-150 dark:shadow-[0_2px_8px_0_rgba(0,0,0,0.32)]'
                    style={{ boxShadow: '0 2px 8px 0 rgba(76, 78, 100, 0.08)' }}
                  >
                    Login/Register
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'var(--mui-palette-background-default)',
            borderRight: mode === 'dark' ? '1px solid var(--mui-palette-divider)' : '1px solid #e0e0e0'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <div className='flex items-center justify-between mb-4'>
            <Link href='/' className='flex items-center gap-2' onClick={() => setIsDrawerOpen(false)}>
              <Logo />
            </Link>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <i className='tabler-x text-xl' />
            </IconButton>
          </div>

          <Divider sx={{ mb: 2 }} />

          <List>
            {navigationItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={e => handleSmoothScroll(e, item.href.replace('#', ''))}
                  sx={{
                    color: mode === 'dark' ? '#cfcde4' : '#374151',
                    '&:hover': {
                      color: 'var(--mui-palette-primary-main)',
                      backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />
        </Box>
      </Drawer>
    </>
  )
}

export default Header
