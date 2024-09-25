import React from 'react'
import styles from '../assets/css/Pages/dangnhap.module.css'
const loginLayout = ({ children }) => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.illustrationWrapper}>
          <img
            src="/image/bg-contact.jpg"
            alt="Login"
          />
        </div>
        {children}
      </div>
    </div >
  )
}

export default loginLayout