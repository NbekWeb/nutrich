'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

// Store Imports
import usePlans from '@/store/usePlans'

const PurchasedPlansPage = () => {
  const { getMyPlans, myPlans } = usePlans()
  const [expandedPlan, setExpandedPlan] = useState(null)

  useEffect(() => {
    getMyPlans()
  }, [getMyPlans])

  const handlePlanChange = planIndex => (event, isExpanded) => {
    setExpandedPlan(isExpanded ? planIndex : null)
  }

  const formatNutrition = nutrition => {
    if (!nutrition) return null

    return (
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={6} sm={3}>
          <Chip
            label={`${nutrition.total_calories || 'N/A'}`}
            size='small'
            color='primary'
            variant='outlined'
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Chip
            label={`Protein: ${nutrition.total_protein || 'N/A'}`}
            size='small'
            color='secondary'
            variant='outlined'
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Chip
            label={`Carbs: ${nutrition.total_carbs || 'N/A'}`}
            size='small'
            color='info'
            variant='outlined'
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Chip
            label={`Fat: ${nutrition.total_fat || 'N/A'}`}
            size='small'
            color='warning'
            variant='outlined'
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    )
  }

  const renderMeal = (meal, index) => {
    if (!meal) return null

    return (
      <Card key={index} sx={{ mb: 2, backgroundColor: 'var(--mui-palette-background-default)' }}>
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant='h6' color='primary'>
              {meal.meal_type || 'Unknown'}
            </Typography>
            <Chip label={meal.serving_size || '1 serving'} size='small' />
          </Box>

          <Typography variant='h6' sx={{ mb: 1 }}>
            {meal.name || 'Unnamed Meal'}
          </Typography>

          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            {meal.recipe || 'No recipe provided'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mb: 2
            }}
          >
            <Typography variant='body2'>⏱️ Prep: {meal.prep_time || 0}min</Typography>
            <Typography variant='body2'>🍳 Cook: {meal.cooking_time || 0}min</Typography>
            <Typography variant='body2'>⏰ Total: {meal.total_time || 0}min</Typography>
          </Box>

          {meal.ingredients && meal.ingredients.length > 0 && (
            <>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Ingredients:
              </Typography>
              <Box sx={{ mb: 2 }}>
                {meal.ingredients.map((ingredient, idx) => (
                  <Typography key={idx} variant='body2' sx={{ ml: 2 }}>
                    • {ingredient.quantity || ''} {ingredient.unit || ''} {ingredient.item || ''}
                  </Typography>
                ))}
              </Box>
            </>
          )}

          {meal.nutrition && (
            <>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>
                Nutrition per serving:
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Chip label={`${meal.nutrition.calories || 0} cal`} size='small' sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Chip label={`${meal.nutrition.protein || 0}g protein`} size='small' sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Chip label={`${meal.nutrition.carbs || 0}g carbs`} size='small' sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Chip label={`${meal.nutrition.fat || 0}g fat`} size='small' sx={{ width: '100%' }} />
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderDay = (day, dayKey, planIndex) => {
    if (!day) return null

    return (
      <Box key={dayKey} sx={{ mb: 3 }}>
        {day.daily_nutrition && (
          <Box sx={{ mb: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Daily Nutrition
            </Typography>
            {formatNutrition(day.daily_nutrition)}
          </Box>
        )}

        <Typography variant='h6' sx={{ mb: 2 }}>
          Meals
        </Typography>
        {day.meals && day.meals.length > 0 ? (
          day.meals.map((meal, mealIndex) => renderMeal(meal, mealIndex))
        ) : (
          <Typography variant='body2' color='text.secondary'>
            No meals available for this day
          </Typography>
        )}
      </Box>
    )
  }

  const renderPlanSummary = summary => {
    if (!summary) return null

    return (
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1'>
              <strong>Total Days:</strong> {summary.total_days || 0}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1'>
              <strong>Daily Calories:</strong> {summary.daily_calories || 0}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1'>
              <strong>Goal:</strong> {summary.goal || 'Not specified'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Purchased Plans
      </Typography>

      {!myPlans || myPlans.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant='body1'>No purchased plans found.</Typography>
          </CardContent>
        </Card>
      ) : (
        myPlans.map((plan, planIndex) => (
          <div key={planIndex} className=' mb-3'>
            <Accordion expanded={expandedPlan === planIndex} onChange={handlePlanChange(planIndex)} sx={{ mb: 2 }}>
              <AccordionSummary aria-controls={`plan-${planIndex}-content`} id={`plan-${planIndex}-header`}>
                <Typography variant='h5' className='font-medium'>
                  {plan.plan_title || `Plan ${planIndex + 1}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className='text-textSecondary'>
                <div className='res-sm'>
                  {plan?.meal_plan?.daily_meal_plans &&
                    Object.entries(plan.meal_plan.daily_meal_plans).map(([dayKey, day]) => (
                      <Accordion key={`${planIndex}-${dayKey}`} sx={{ mb: 2 }} defaultExpanded>
                        <AccordionSummary
                          aria-controls={`${planIndex}-${dayKey}-content`}
                          id={`${planIndex}-${dayKey}-header`}
                        >
                          <Typography variant='h5' className='font-medium'>
                            {dayKey}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className='text-textSecondary'>
                          {renderDay(day, dayKey, planIndex)}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  {plan?.meal_plan?.meal_plan_summary && (
                    <Accordion key={`summary-${planIndex}`} sx={{ mb: 2 }} defaultExpanded>
                      <AccordionSummary
                        aria-controls={`summary-${planIndex}-content`}
                        id={`summary-${planIndex}-header`}
                      >
                        <Typography variant='h5' className='font-medium'>
                          Meal Plan Summary
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className='text-textSecondary'>
                        {renderPlanSummary(plan.meal_plan.meal_plan_summary)}
                      </AccordionDetails>
                    </Accordion>
                  )}
                </div>

                {/* Meal Plan Summary inside family wrapper */}
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      )}
    </Box>
  )
}

export default PurchasedPlansPage
