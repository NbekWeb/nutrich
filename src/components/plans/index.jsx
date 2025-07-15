'use client'

import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'

import usePlans from '@/store/usePlans'
import useCoreStore from '@/store/useCoreStore'
import useUserStore from '@/store/useUserStore'

// Type-based icons
const getTypeIcon = type => {
  switch (type) {
    case 'personal':
      return 'tabler-user'
    case 'family':
      return 'tabler-users'
    case 'ai_assistant':
      return 'tabler-stethoscope'
    case 'ai_assistant1':
      return 'tabler-chef-hat'
    default:
      return 'tabler-package'
  }
}

const Plans = () => {
  const { loadingUrl } = useCoreStore()
  const { getPlans, plansData, buyPlan, addAiAssistant } = usePlans()
  const { user, getUser } = useUserStore()

  // Modal state
  const [openModal, setOpenModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [familyMembers, setFamilyMembers] = useState([])

  // Simple modal state for non-purchase endpoints
  const [request, setRequest] = useState('')
  const [adaptationDetails, setAdaptationDetails] = useState('')

  // Add serviceRequest state for purchase endpoint
  const [serviceRequest, setServiceRequest] = useState('')

  useEffect(() => {
    getPlans()
  }, [getPlans])

  const handlePlanSelect = plan => {
    if (user?.balance < plan.token_cost) {
      return
    }

    setSelectedPlan(plan)

    // Check if this is a purchase endpoint
    if (plan.api_endpoint === '/api/v1/purchase/') {
      // Initialize family members based on plan type
      if (plan.max_family_members > 1) {
        setFamilyMembers([
          {
            id: 1,
            name: '',
            age: '',
            gender: 'male',
            goal: 'weight_loss'
          }
        ])
      } else if (plan.max_family_members === 1) {
        // Single member for personal plans
        setFamilyMembers([
          {
            id: 1,
            name: '',
            age: '',
            gender: 'male',
            goal: 'weight_loss'
          }
        ])
      } else {
        // No members for plans with max_family_members = 0
        setFamilyMembers([])
      }
    } else {
      // Reset simple modal fields
      setRequest('')
      setAdaptationDetails('')
    }

    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedPlan(null)
    setFamilyMembers([])
    setRequest('')
    setAdaptationDetails('')
    setServiceRequest('') // reset serviceRequest
  }

  const addFamilyMember = () => {
    if (familyMembers.length < selectedPlan.max_family_members) {
      const newMember = {
        id: familyMembers.length + 1,
        name: '',
        age: '',
        gender: 'male',
        goal: 'weight_loss',
        weight: '',
        height: '',
        activity_level: 'sedentary' // default value
      }

      setFamilyMembers([...familyMembers, newMember])
    }
  }

  const removeFamilyMember = id => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter(member => member.id !== id))
    }
  }

  const updateFamilyMember = (id, field, value) => {
    setFamilyMembers(familyMembers.map(member => (member.id === id ? { ...member, [field]: value } : member)))
  }

  // Add this function to filter only positive numbers for age
  const handleAgeInput = (id, value) => {
    // Only allow digits
    const filtered = value.replace(/\D/g, '')

    updateFamilyMember(id, 'age', filtered)
  }

  // Add this function to filter only positive numbers for weight
  const handleWeightInput = (id, value) => {
    const filtered = value.replace(/\D/g, '')

    updateFamilyMember(id, 'weight', filtered)
  }

  // Add this function to filter only positive numbers for height
  const handleHeightInput = (id, value) => {
    const filtered = value.replace(/\D/g, '')

    updateFamilyMember(id, 'height', filtered)
  }

  const handleGenerate = () => {
    if (selectedPlan.api_endpoint === '/api/v1/purchase/') {
      // Only send required fields for each member
      const filteredMembers = familyMembers.map(({ name, age, gender, weight, height, goal, activity_level }) => ({
        name,
        age,
        gender,
        weight,
        height,
        goal,
        activity_level: activity_level || 'sedentary'
      }))

      const payload = {
        plan_id: selectedPlan.id,
        family_members: filteredMembers,
        service_request: serviceRequest
      }

      buyPlan(payload, () => {
        getUser()
        handleCloseModal()
      })
    } else {
      // Use addAiAssistant from usePlans store for non-purchase endpoints
      const payload = {
        plan_id: selectedPlan.id,
        request: request,
        adaptation_details: adaptationDetails,
        service_type: selectedPlan.ai_service_type
      }

      addAiAssistant(payload, () => {
        getUser()
        handleCloseModal()
      })
    }
  }

  const isPurchaseEndpoint = selectedPlan?.api_endpoint === '/api/v1/purchase/'

  return (
    <>
      <Card
        sx={{
          boxShadow: 'none',
          background: 'transparent',
          boxShadow: 'none'
        }}
      >
        <CardContent className='!p-0 '>
          <Box className='text-center mbe-8'>
            <Typography variant='h3' className='mbe-2'>
              Choose Your Nutrition Plan
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Select the perfect plan that fits your nutrition goals and lifestyle
            </Typography>
          </Box>

          <Grid container spacing={5}>
            {plansData?.map(plan => {
              const hasEnoughBalance = user?.balance >= plan.token_cost

              return (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <Card className='h-full flex flex-col transition-all duration-300 hover:shadow-lg cursor-pointer'>
                    <CardContent className='text-center p-6 flex flex-col h-full'>
                      {/* Plan Icon */}
                      <Box className='text-center mbe-4'>
                        <i
                          className={getTypeIcon(plan?.plan_type)}
                          style={{ fontSize: '3rem', color: 'var(--mui-palette-primary-main)' }}
                        />
                      </Box>

                      {/* Plan Name */}
                      <Typography variant='h5' className='mbe-2' fontWeight='bold'>
                        {plan?.plan_title}
                      </Typography>

                      {/* Plan Description */}
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        className='mbe-4'
                        sx={{
                          minHeight: '60px',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {plan.plan_description}
                      </Typography>

                      {/* AI Service Type Display */}
                      {plan.specialized_category_display && (
                        <Chip
                          label={plan.specialized_category_display}
                          size='small'
                          sx={{
                            fontSize: '0.75rem',
                            height: '24px',
                            backgroundColor: 'var(--mui-palette-secondary-main)',
                            color: 'white',
                            maxWidth: 'max-content',
                            margin: '0 auto',
                            '& .MuiChip-label': {
                              padding: '0 8px'
                            }
                          }}
                          className='mbe-4'
                        />
                      )}

                      {/* Price */}
                      <Box className='mbe-4'>
                        <Typography variant='h4' fontWeight='bold' color='primary'>
                          {plan.token_cost} Tokens
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          for {plan.plan_duration_days} days
                        </Typography>
                      </Box>

                      {/* Max Users */}
                      {plan.max_family_members > 0 && (
                        <Chip
                          label={`Up to ${plan.max_family_members} user${plan.max_family_members > 1 ? 's' : ''}`}
                          color='default'
                          size='small'
                          sx={{
                            fontSize: '0.75rem',
                            height: '24px',
                            maxWidth: 'max-content',
                            margin: '0 auto',
                            '& .MuiChip-label': {
                              padding: '0 8px'
                            }
                          }}
                          className='mbe-4'
                        />
                      )}

                      {/* Buy Button */}
                      <Button
                        variant='contained'
                        fullWidth
                        color='primary'
                        disabled={!hasEnoughBalance}
                        className='mt-auto'
                        onClick={e => {
                          e.stopPropagation()
                          handlePlanSelect(plan)
                        }}
                      >
                        {hasEnoughBalance ? 'Buy Plan' : 'Insufficient Balance'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth='md' fullWidth>
        <DialogTitle>
          <Typography variant='h5' color='primary'>
            {selectedPlan?.plan_title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={3}>
            <Typography variant='body1' color='text.secondary'>
              {selectedPlan?.plan_description}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {isPurchaseEndpoint ? (
            <Box>
              <Box mb={3}>
                <TextField
                  fullWidth
                  label='Service Request '
                  value={serviceRequest}
                  onChange={e => setServiceRequest(e.target.value)}
                  multiline
                  rows={2}
                  placeholder='Traditional Italian Carbonara pasta with eggs, and parmesan cheese...'
                />
              </Box>
              {selectedPlan?.max_family_members > 0 && (
                <>
                  <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
                    <Typography variant='h6' color='primary'>
                      {selectedPlan?.max_family_members > 1 ? 'Family Members' : 'Member Details'}
                    </Typography>
                    {selectedPlan?.max_family_members > 1 && familyMembers.length < selectedPlan.max_family_members && (
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={addFamilyMember}
                        startIcon={<i className='tabler-plus' />}
                      >
                        Add Member
                      </Button>
                    )}
                  </Box>
                  {familyMembers.map((member, index) => (
                    <Box key={member.id} mb={3} p={2} border={1} borderColor='divider' borderRadius={1}>
                      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
                        <Typography variant='subtitle1' fontWeight='bold'>
                          Member {member.id}
                        </Typography>
                        {selectedPlan?.max_family_members > 1 && familyMembers.length > 1 && (
                          <IconButton size='small' onClick={() => removeFamilyMember(member.id)} color='error'>
                            <i className='tabler-trash' />
                          </IconButton>
                        )}
                      </Box>
                      <Grid container spacing={5}>
                        {/* Name */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='Name'
                            value={member.name || ''}
                            onChange={e => updateFamilyMember(member.id, 'name', e.target.value)}
                            size='small'
                            required
                          />
                        </Grid>
                        {/* Age */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='Age'
                            type='text'
                            value={member.age || ''}
                            onChange={e => handleAgeInput(member.id, e.target.value)}
                            size='small'
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', minLength: 1, maxLength: 3 }}
                            required
                          />
                        </Grid>
                        {/* Weight */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='Weight (kg)'
                            type='text'
                            value={member.weight || ''}
                            onChange={e => handleWeightInput(member.id, e.target.value)}
                            size='small'
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', minLength: 1, maxLength: 3 }}
                            required
                          />
                        </Grid>
                        {/* Height */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='Height (cm)'
                            type='text'
                            value={member.height || ''}
                            onChange={e => handleHeightInput(member.id, e.target.value)}
                            size='small'
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', minLength: 1, maxLength: 3 }}
                            required
                          />
                        </Grid>
                        {/* Gender (only one, styled) */}

                        {/* Goal */}
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size='small' required>
                            <InputLabel>Goal</InputLabel>
                            <Select
                              value={member.goal}
                              label='Goal'
                              onChange={e => updateFamilyMember(member.id, 'goal', e.target.value)}
                            >
                              <MenuItem value='weight_loss'>Weight Loss</MenuItem>
                              <MenuItem value='muscle_gain'>Muscle Gain</MenuItem>
                              <MenuItem value='maintain'>Maintain</MenuItem>
                              <MenuItem value='health'>Health</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        {/* Activity Level */}
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth size='small' required>
                            <InputLabel>Activity Level</InputLabel>
                            <Select
                              value={member.activity_level || 'sedentary'}
                              label='Activity Level'
                              onChange={e => updateFamilyMember(member.id, 'activity_level', e.target.value)}
                            >
                              <MenuItem value='sedentary'>Sedentary</MenuItem>
                              <MenuItem value='light'>Light</MenuItem>
                              <MenuItem value='moderate'>Moderate</MenuItem>
                              <MenuItem value='active'>Active</MenuItem>
                              <MenuItem value='extra_active'>Extra Active</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} className='justify-end flex'>
                          <FormControl fullWidth size='small' required>
                            <RadioGroup
                              row
                              value={member.gender}
                              onChange={e => updateFamilyMember(member.id, 'gender', e.target.value)}
                            >
                              <FormControlLabel value='male' control={<Radio />} label='Male' />
                              <FormControlLabel value='female' control={<Radio />} label='Female' />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          ) : (
            <Box>
              <Typography variant='h6' color='primary' gutterBottom>
                Plan Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Request'
                    value={request}
                    onChange={e => setRequest(e.target.value)}
                    multiline
                    rows={4}
                    placeholder='Traditional Italian Carbonara pasta with eggs, and parmesan cheese...'
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Adaptation Details'
                    value={adaptationDetails}
                    onChange={e => setAdaptationDetails(e.target.value)}
                    multiline
                    rows={4}
                    placeholder='Make it vegan-friendly by replacing eggs and cheese with plant-based alternatives...'
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseModal} color='inherit'>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={handleGenerate}
            disabled={
              isPurchaseEndpoint
                ? familyMembers.some(member => !member.name || !member.age)
                : !request.trim() || !adaptationDetails.trim()
            }
          >
            Generate
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loadingUrl.has('user-detail/') || loadingUrl.has('pricing-tokens/')}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default Plans
