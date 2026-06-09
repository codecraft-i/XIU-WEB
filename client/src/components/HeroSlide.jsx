import { motion } from 'framer-motion'

function HeroSlide({ slide, isActive }) {
  return (
    <div className="hero-slide">
      <motion.img
        animate={{ scale: isActive ? 1.14 : 1.06 }}
        transition={{ duration: 7.5, ease: 'linear' }}
        src={slide.image}
        alt=""
        aria-hidden="true"
        className="hero-slide-image"
      />
      <div className="hero-slide-shade" />
      <div className="hero-slide-glow" />
      <div className="hero-slide-vignette" />
    </div>
  )
}

export default HeroSlide
