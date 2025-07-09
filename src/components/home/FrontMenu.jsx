'use client'

// React Imports
import { useEffect } from 'react'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

const Wrapper = props => {
  // Props
  const { children, isBelowLgScreen, className, isDrawerOpen, setIsDrawerOpen } = props

  if (isBelowLgScreen) {
    return <div className={classnames('flex items-center', className)}>{children}</div>
  }

  return <div className={classnames('flex items-center', className)}>{children}</div>
}

const FrontMenu = props => {
  // Props
  const { isDrawerOpen, setIsDrawerOpen, mode } = props

  // Hooks
  const isBelowLgScreen = useMediaQuery(theme => theme.breakpoints.down('lg'))

  useEffect(() => {
    if (!isBelowLgScreen && isDrawerOpen) {
      setIsDrawerOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBelowLgScreen])

  return (
    <Wrapper isBelowLgScreen={isBelowLgScreen} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}>
      {/* Menu content removed as requested */}
    </Wrapper>
  )
}

export default FrontMenu
