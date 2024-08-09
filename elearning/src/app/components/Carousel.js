import React from 'react'
import styles from '../assets/css/Layout/carousel.module.css'
import btn from '../assets/css/Components/button.module.css'
const Carousel = () => {
    

    return (
        <div className={`${styles.carousel} container`}>
          <div className='row'>
            <div className={`col-12 col-md-6 ${styles.carouselLeft}`}>
                <div className={`${styles.carouselContent}`}>
                    <h1><span>Khởi đầu</span> <br></br> sự nghiệp của bạn</h1>
                    <p>Trở thành lập trình <br></br> chuyên nghiệp tại cybersoft</p>
                    <div className={`${styles.carouselBtn}`}>
                        <a className={`${btn.buttonBg1}`} href="#" role="button">Xem khoá học</a>
                        <a className={`${btn.buttonBg2}`} href="#" role="button">Tư vấn học</a>              
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