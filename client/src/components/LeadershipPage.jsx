import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock3, Mail } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  getLeadershipMember,
  leadershipGroups,
} from '../data/leadershipPageData'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.4, ease: 'easeOut' },
}

function RevealShell({ className, children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.99, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function LeaderPortrait({ member, className }) {
  const style = {
    '--leader-from': member.accent.from,
    '--leader-to': member.accent.to,
  }

  if (member.image) {
    return (
      <img
        src={member.image}
        alt={member.name}
        className={className}
        loading="lazy"
      />
    )
  }

  return <div className={`${className} leadership-portrait-fallback`} style={style} aria-hidden="true" />
}

function LeadershipCard({ member }) {
  return (
    <motion.article className="leadership-directory-card" {...fadeUp}>
      <div className="leadership-directory-media">
        <LeaderPortrait member={member} className="leadership-directory-image" />
      </div>
      <div className="leadership-directory-body">
        <p className="leadership-directory-degree">{member.degree}</p>
        <h3>{member.name}</h3>
        <p className="leadership-directory-role">{member.role}</p>
        <p className="leadership-directory-summary">{member.shortDescription}</p>
        <a href={`/rahbariyat/${member.slug}`} className="leadership-directory-link">
          Batafsil
          <ArrowRight size={16} />
        </a>
      </div>
    </motion.article>
  )
}

function LeadershipListPage() {
  return (
    <main className="about-page about-page-v2 leadership-page">
      <div className="leadership-page-content">
        {leadershipGroups.map((group) => (
          <section key={group.id} className="about-page-section leadership-group-section">
            <RevealShell className="leadership-group-heading">
              <h2>{group.title}</h2>
            </RevealShell>
            <div className="leadership-directory-grid">
              {group.members.map((member) => (
                <LeadershipCard key={member.slug} member={member} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

function LeadershipDetailPage({ member }) {
  const [activeTabId, setActiveTabId] = useState(() => member.tabs[0].id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const activeTab = useMemo(
    () => member.tabs.find((tab) => tab.id === activeTabId) ?? member.tabs[0],
    [activeTabId, member.tabs],
  )

  return (
    <main className="about-page about-page-v2 leadership-page leadership-page-detail">
      <div className="leadership-page-content">
        <section className="about-page-section leadership-detail-section">
          <RevealShell className="about-page-shell leadership-detail-shell">
            <a href="/rahbariyat" className="leadership-detail-back">
              <ArrowLeft size={16} />
              Rahbariyat ro‘yxatiga qaytish
            </a>
            <div className="leadership-detail-hero">
              <div className="leadership-detail-media">
                <LeaderPortrait member={member} className="leadership-detail-image" />
              </div>
              <div className="leadership-detail-meta">
                <span className="about-page-badge">{member.degree}</span>
                <h1 className="about-page-title leadership-detail-name">{member.name}</h1>
                <p className="leadership-detail-id">ID raqam: {member.employeeId}</p>
                <p className="leadership-detail-role">{member.role}</p>
                <div className="leadership-detail-contact">
                  <span>
                    <Clock3 size={16} />
                    {member.reception}
                  </span>
                  <a href={`mailto:${member.email}`}>
                    <Mail size={16} />
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          </RevealShell>
        </section>

        <section className="about-page-section leadership-detail-tabs-section">
          <div className="leadership-detail-tabs" role="tablist" aria-label="Rahbar ma’lumotlari">
            {member.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTab.id}
                className={`leadership-detail-tab ${tab.id === activeTab.id ? 'is-active' : ''}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <RevealShell className="about-page-shell leadership-detail-content-shell">
            <h2 className="about-page-h2">{activeTab.label}</h2>
            <div className="leadership-detail-copy">
              {activeTab.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-page-p">
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealShell>
        </section>
      </div>
    </main>
  )
}

function LeadershipNotFound() {
  return (
    <main className="about-page about-page-v2 leadership-page leadership-page-detail">
      <div className="leadership-page-content">
        <section className="about-page-section leadership-detail-section">
          <RevealShell className="about-page-shell leadership-not-found">
            <span className="about-page-badge">Rahbariyat</span>
            <h1 className="about-page-title">Xodim topilmadi</h1>
            <p className="about-page-p">
              So‘ralgan profil mavjud emas yoki manzil noto‘g‘ri kiritilgan.
            </p>
            <a href="/rahbariyat" className="leadership-directory-link">
              Ro‘yxatga qaytish
              <ArrowRight size={16} />
            </a>
          </RevealShell>
        </section>
      </div>
    </main>
  )
}

function LeadershipPage({ slug = null }) {
  const member = slug ? getLeadershipMember(slug) : null

  useEffect(() => {
    if (member) {
      document.title = `${member.name} | Rahbariyat | Xorazm Iqtisodiyot Universiteti`
    } else if (slug) {
      document.title = 'Rahbariyat | Xorazm Iqtisodiyot Universiteti'
    } else {
      document.title = 'Rahbariyat | Xorazm Iqtisodiyot Universiteti'
    }

    const meta = document.querySelector('meta[name="description"]')
    const content = member
      ? `${member.name} profili, lavozimi va faoliyat yo‘nalishlari.`
      : 'Universitet rahbariyati tarkibi va alohida xodim profillari.'

    if (meta) {
      meta.setAttribute('content', content)
    } else {
      const metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'description')
      metaTag.setAttribute('content', content)
      document.head.appendChild(metaTag)
    }
  }, [member, slug])

  if (slug && !member) {
    return <LeadershipNotFound />
  }

  if (member) {
    return <LeadershipDetailPage member={member} />
  }

  return <LeadershipListPage />
}

export default LeadershipPage
