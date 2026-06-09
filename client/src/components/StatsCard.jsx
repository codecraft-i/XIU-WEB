import { motion } from 'framer-motion'

function StatsCard({ stat, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="stats-card"
    >
      <p className="stats-value">
        {stat.value}
      </p>
      <p className="stats-label">
        {stat.label}
      </p>
      <div className="stats-separator" />
    </motion.article>
  )
}

export default StatsCard
