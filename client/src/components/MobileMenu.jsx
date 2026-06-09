import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'

function MobileMenu({
  isOpen,
  onClose,
  navItems,
  languages,
  activeLanguage,
  onLanguageSelect,
  content,
}) {
  const [expandedItem, setExpandedItem] = useState(null)

  useEffect(() => {
    if (!isOpen) {
      setExpandedItem(null)
    }
  }, [isOpen])

  const toggleItem = (label) => {
    setExpandedItem((current) => (current === label ? null : label))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mobile-menu-root"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Menyuni yopish"
            className="mobile-menu-backdrop"
          />

          <motion.aside
            initial={{ x: '100%', opacity: 0.7 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.7 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-menu-panel"
          >
            <div className="mobile-menu-head">
              <p className="mobile-menu-title">{content.title}</p>
              <button
                type="button"
                onClick={onClose}
                className="icon-button"
                aria-label={content.close}
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mobile-menu-nav-wrap">
              <ul className="mobile-menu-nav-list">
                {navItems.map((item) => {
                  const isExpanded = expandedItem === item.label
                  return (
                    <li key={item.label} className="mobile-menu-item">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.label)}
                        className="mobile-menu-item-trigger"
                      >
                        <span className="mobile-menu-item-main">
                          <span className="mobile-menu-item-title">{item.label}</span>
                        </span>
                        <ChevronDown
                          size={16}
                          className={`mobile-menu-chevron ${
                            isExpanded ? 'mobile-menu-chevron-open' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="mobile-menu-sublist"
                          >
                            {item.submenu.map((entry) => {
                              const link = typeof entry === 'string' ? { label: entry, href: '#' } : entry
                              return (
                                <li key={link.label}>
                                  <a
                                    href={link.href}
                                    className="mobile-menu-subitem-link"
                                    onClick={onClose}
                                  >
                                    <span className="mobile-menu-subitem-copy">
                                      <strong>{link.label}</strong>
                                      {link.description ? <small>{link.description}</small> : null}
                                    </span>
                                    <ArrowUpRight size={15} />
                                  </a>
                                </li>
                              )
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="mobile-menu-footer">
              <div className="mobile-menu-lang">
                {languages.map((language) => (
                  <button
                    key={language.shortLabel}
                    type="button"
                    onClick={() => onLanguageSelect(language.code)}
                    className={`mobile-menu-lang-item ${
                      activeLanguage === language.code
                        ? 'mobile-menu-lang-item-active'
                        : ''
                    }`}
                  >
                    {language.shortLabel}
                  </button>
                ))}
              </div>

              <a href="/admission" className="btn-primary mobile-menu-cta" onClick={onClose}>
                {content.cta}
              </a>

              <p className="mobile-menu-footnote">{content.footnote}</p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
