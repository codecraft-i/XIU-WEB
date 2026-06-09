import Header from './components/Header'
import AboutPage from './components/AboutPage'
import LeadershipPage from './components/LeadershipPage'
import CampusLifePage from './components/CampusLifePage'
import AboutSection from './components/AboutSection'
import HeroSection from './components/HeroSection'
import NewsSection from './components/NewsSection'
import GallerySection from './components/GallerySection'
import FooterSection from './components/FooterSection'
import ContactSection from './components/ContactSection'
import MessagePage from './components/MessagePage'
import NewsPage from './components/NewsPage'
import AnnouncementsPage from './components/AnnouncementsPage'
import AdmissionPage from './components/AdmissionPage'

const SHOW_GALLERY_SECTION = false

function App() {
  const pathname = window.location.pathname
  const isAboutPage = pathname === '/about'
  const leadershipMatch = pathname.match(/^\/rahbariyat(?:\/([^/]+))?\/?$/)
  const leadershipSlug = leadershipMatch?.[1] ?? null
  const isLeadershipPage = Boolean(leadershipMatch)
  const isCampusLifePage = /^\/(?:campus-life|kampus-hayoti)\/?$/.test(pathname)
  const isMessagePage = /^\/send-message\/?$/.test(pathname)
  const isAdmissionPage = /^\/admission\/?$/.test(pathname)
  const isNewsPage = /^\/news\/?$/.test(pathname)
  const isAnnouncementsPage = /^\/announcements\/?$/.test(pathname)
  const isInnerPage = pathname !== '/'
  const hideChrome = isMessagePage || isAdmissionPage

  return (
    <div className={`app-shell ${isInnerPage ? 'app-shell-inner' : ''}`}>
      {!hideChrome && <Header />}
      <main>
        {isAboutPage ? (
          <AboutPage />
        ) : isLeadershipPage ? (
          <LeadershipPage slug={leadershipSlug} />
        ) : isCampusLifePage ? (
          <CampusLifePage />
        ) : isAdmissionPage ? (
          <AdmissionPage />
        ) : isMessagePage ? (
          <MessagePage />
        ) : isNewsPage ? (
          <NewsPage />
        ) : isAnnouncementsPage ? (
          <AnnouncementsPage />
        ) : (
          <>
            <HeroSection />
            <AboutSection />
            <NewsSection />
            {SHOW_GALLERY_SECTION ? <GallerySection /> : null}
          </>
        )}
        {!hideChrome && !isNewsPage && !isAnnouncementsPage && <ContactSection />}
        {!hideChrome && <FooterSection />}
      </main>
    </div>
  )
}

export default App
