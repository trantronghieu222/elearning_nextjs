import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../assets/css/Layout/layout.module.css';
import BackToTop from '../components/BackToTop';
const layout = ({children}) => {
  return (
    <div className='profMain'>
        <Header></Header>
        <div className={`${styles.main}`}>
            {children}
        </div>
        <Footer></Footer>
        <BackToTop></BackToTop>
    </div>
  )
}

export default layout