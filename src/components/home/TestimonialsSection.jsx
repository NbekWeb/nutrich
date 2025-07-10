'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'

// Third-party Imports
import { useKeenSlider } from 'keen-slider/react'
import classnames from 'classnames'
import 'keen-slider/keen-slider.min.css'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppKeenSlider from '@/libs/styles/AppKeenSlider'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import styles from './styles.module.css'

const testimonials = [
  {
    text: "The Family Plan is a lifesaver. My husband is trying to lose weight, I'm a vegetarian, and our son just wants tasty food. Nutrich.io creates one menu for all of us. It's brilliant!",
    author: 'Anna K.',
    role: 'Mom & Busy Professional',
    rating: 5,
    avatarSrc: '/images/avatars/1.png'
  },
  {
    text: "I'm down 4 kg in my first month, and I never felt like I was on a diet. The 'What if...' AI assistant is the best part. This is the first plan I've actually been able to stick to.",
    author: 'Mark T.',
    role: 'User since June 2025',
    rating: 5,
    avatarSrc: '/images/avatars/2.png'
  },
  {
    text: 'I bought the "2 Week Marathon Meal Plan" and the results were incredible. All my plans are saved in my personal account, so I can go back to my favorite meals anytime. Highly recommended!',
    author: 'Elena P.',
    role: 'Fitness Enthusiast',
    rating: 5,
    avatarSrc: '/images/avatars/3.png'
  },
  {
    text: "The AI meal planning feature is incredible. It understands my dietary restrictions and creates delicious, healthy meals. I've never felt better!",
    author: 'Sarah M.',
    role: 'Health Coach',
    rating: 4,
    avatarSrc: '/images/avatars/4.png'
  },
  {
    text: "As a busy professional, I don't have time to plan meals. Nutrich.io does it all for me. The grocery lists are a game-changer!",
    author: 'David L.',
    role: 'Software Engineer',
    rating: 5,
    avatarSrc: '/images/avatars/5.png'
  },
  {
    text: 'The family meal planning feature is exactly what we needed. Everyone gets their preferences met, and dinner time is no longer a battle!',
    author: 'Maria R.',
    role: 'Working Mother',
    rating: 5,
    avatarSrc: '/images/avatars/6.png'
  }
]

const svgCompanies = [
  // SVG placeholders, replace with real SVG imports later
  <div key='airbnb'>{/* Airbnb SVG */}</div>,
  <div key='netflix'>{/* Netflix SVG */}</div>,
  <div key='dribbble'>{/* Dribbble SVG */}</div>,
  <div key='coinbase'>{/* Coinbase SVG */}</div>,
  <div key='pinterest'>{/* Pinterest SVG */}</div>
]

const TestimonialsSection = ({ mode }) => {
  // Keen Slider
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 3,
        origin: 'auto'
      },
      breakpoints: {
        '(max-width: 1200px)': {
          slides: {
            perView: 2,
            spacing: 10,
            origin: 'auto'
          }
        },
        '(max-width: 900px)': {
          slides: {
            perView: 2,
            spacing: 10
          }
        },
        '(max-width: 600px)': {
          slides: {
            perView: 1,
            spacing: 10,
            origin: 'center'
          }
        }
      }
    },
    [
      slider => {
        let timeout
        const mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }

        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }

        slider.on('created', nextTimeout)
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  return (
    <section className={classnames('flex flex-col gap-8 plb-[100px] bg-backgroundDefault', styles.sectionStartRadius)}>
      <div
        className={classnames('flex max-md:flex-col max-sm:flex-wrap is-full gap-6', frontCommonStyles.layoutSpacing)}
      >
        <div className='flex flex-col gap-1 bs-full justify-center items-center lg:items-start is-full md:is-[30%] mlb-auto sm:pbs-2'>
          <Chip label='TESTIMONIALS' variant='tonal' color='primary' size='small' className='mbe-3' />
          <div className='flex flex-col gap-y-1 flex-wrap max-lg:text-center '>
            <Typography color='text.primary' variant='h4'>
              <span className='relative z-[1] font-extrabold'>
                What people say
                <img
                  src='/images/front-pages/landing-page/bg-shape.png'
                  alt='bg-shape'
                  className='absolute block-end-0 z-[1] bs-[40%] is-[132%] inline-start-[-8%] block-start-[17px]'
                />
              </span>
            </Typography>
            <Typography>See what our customers have to say about their experience.</Typography>
          </div>
          <div className='flex gap-x-4 mbs-11'>
            <CustomIconButton color='primary' variant='tonal' onClick={() => instanceRef.current?.prev()}>
              <i className='tabler-chevron-left' />
            </CustomIconButton>
            <CustomIconButton color='primary' variant='tonal' onClick={() => instanceRef.current?.next()}>
              <i className='tabler-chevron-right' />
            </CustomIconButton>
          </div>
        </div>
        <div className='is-full md:is-[70%]'>
          <AppKeenSlider>
            <div ref={sliderRef} className='keen-slider mbe-6'>
              {testimonials.map((testimonial, index) => (
                <div key={index} className='keen-slider__slide flex p-4 sm:p-3'>
                  <Card elevation={8} className='flex items-start'>
                    <CardContent className='p-8 items-center mlb-auto'>
                      <div className='flex flex-col gap-4 items-start'>
                        {/* SVG placeholder for company logo */}
                        <div className='mb-2'>{svgCompanies[index % svgCompanies.length]}</div>
                        <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2 }}>
                          &ldquo;{testimonial.text}&rdquo;
                        </Typography>
                        {/* <Rating value={testimonial.rating} readOnly /> */}
                        <div className='flex items-center gap-x-3'>
                          <CustomAvatar size={32} src={testimonial.avatarSrc} alt={testimonial.author} />
                          <div className='flex flex-col items-start'>
                            <Typography color='text.primary' className='font-medium'>
                              {testimonial.author}
                            </Typography>
                            <Typography variant='body2' color='text.disabled'>
                              {testimonial.role}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </AppKeenSlider>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
