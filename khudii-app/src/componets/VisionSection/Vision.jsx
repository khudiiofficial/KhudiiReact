import React from 'react'
import styles from './vision.module.css'
const Vision = () => {
  return (<>
       <div className={`${styles.parent} `}>
    <div className={`${styles.class1}`}>
        {/* <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=60" className={`${styles.class2}`} alt="" /> */}
        <i className={`fa-solid fa-crosshairs ${styles.class2}`} aria-hidden="true"></i>
        <h2 className={`${styles.class4}`}>Vision</h2>
        <p className={`${styles.class3}`}>To build Pakistan’s largest digital home for welfare — a hub where organizations, donors, volunteers, and communities come together seamlessly to create lasting change and uplift every vulnerable life with dignity and hope.</p>
       
    </div>
    <div className={`${styles.class1}`}>
        {/* <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=60" className={`${styles.class2}`} alt="" /> */}
        <i className={`fa-solid fa-chart-area ${styles.class2}` } aria-hidden="true"></i>
        <h2 className={`${styles.class4}`}>Goal</h2>
        <p className={`${styles.class3}`}>To actively identify, support, and amplify credible welfare organizations across Pakistan—building bridges between changemakers and supporters, and laying the digital foundation to empower 25,000 model initiatives through strategic connection, visibility, and collaboration.</p>
       
    </div>
    
    <div className={`${styles.class1} `}>
        {/* <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=60" className={`${styles.class2}`} alt="" /> */}
        <i className={`fa-solid fa-magnifying-glass ${styles.class2}`} aria-hidden="true"></i>
        <h2 className={`${styles.class4}`}>Mission</h2>
        <p className={`${styles.class3}`}>To breathe life into Pakistan’s welfare ecosystem by shining a light on credible organizations, giving them the visibility they deserve, and connecting them with donors, volunteers, and professionals so their impact can reach further and touch more lives.</p>
       
    </div>
    
        </div>
        <br />
</>
  )
}

export default Vision