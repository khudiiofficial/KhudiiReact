import React, { useState, useEffect } from 'react'
import styles from './Topbar.module.css'
import { Link } from 'react-router-dom'

const Topbar = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600)
    }
    
    // Check initially
    checkScreenSize()
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className={`${styles.topbar} ${styles.color}`}>
      <p className={styles.contact}>
        📞 (+92) 3198 - KHUDII (548344)
      </p>

      <p className={styles.mid}>
        Pakistan's 1st E-Community of Human Purpose!
      </p>

      <p className={styles.buttonWrapper}>
        <Link to="/Story">
          <button className={styles.last}>Contribute Your Story</button>
        </Link>
        {isMobile && (
          <Link to="/DonateUS">
            <button className={styles.last}>Donate Now</button>
          </Link>
        )}
      </p>
    </div>
  )
}

export default Topbar