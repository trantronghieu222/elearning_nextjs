import React from 'react'
import styles from '../assets/css/Layout/carousel.module.css'
import btn from '../assets/css/Components/button.module.css'
import Link from 'next/link'
const Carousel = () => {
    

    return (
        <div className={`${styles.carousel} container`}>
          <div className='row'>
            <div className={`col-12 col-md-6 ${styles.carouselLeft}`}>
                <div className={`${styles.carouselContent}`}>
                    <h1><span>Chào mừng</span> <br></br> đến với E-learning</h1>
                    <p>Trung tâm giáo dục <br></br> hàng đầu về lập trình tại Việt Nam</p>
                    <div className={`${styles.carouselBtn}`}>
                        <Link className={`${btn.buttonBg1}`} href="/khoahoc" role="button">Xem khoá học</Link>
                        <Link className={`${btn.buttonBg2}`} href="#contact" role="button">Tư vấn học</Link>              
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-6'>
                <div className={`${styles.carouselImg}`}></div>
            </div>
          </div>
        </div>
    )
}

export default Carousel