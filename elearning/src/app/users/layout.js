import React from 'react'
import styles from '../assets/css/Pages/dangnhap.module.css'
const loginLayout = ({ children }) => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.illustrationWrapper}>
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        {children}
      </div>
    </div >
  )
}

export default loginLayout