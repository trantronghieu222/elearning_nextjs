import React from 'react'
import styles from '../assets/css/Layout/instructor.module.css';
import title from '../assets/css/Components/title.module.css';
const Instructor = () => {
    return (
        <div className={`container ${styles.instructorContainer}`}>
            <div className={title.title2}>
                <h3 className={title.title_content}>Giảng Viên <span>Tiềm Năng</span></h3>
            </div>
            <div className={`${styles.instructorContent}`}>
                <div className='row'>
                    <div className={`col-12 col-md-6 col-lg-3 ${styles.instructorItems}`}>
                        <div className={`card ${styles.card}`} style={{ width: '18rem' }}>
                            <img src="https://wp.w3layouts.com/studious/wp-content/themes/studious/assets/images/team2.jpg" className="card-img-top" alt="..." />
                            <div className={`card-body ${styles.cardBody}`}>
                                <h5 className="card-title">Aida Joe</h5>
                                <p className="card-text">Thiết kế UI/UX</p>
                            </div>
                            <div className={`${styles.overlay}`}>
                                <i className="fab fa-facebook" />
                                <i className="fab fa-twitter" />
                                <i className="fab fa-instagram" />
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 col-lg-3 ${styles.instructorItems}`}>
                        <div className={`card ${styles.card}`} style={{ width: '18rem' }}>
                            <img src="https://wp.w3layouts.com/studious/wp-content/themes/studious/assets/images/team1.jpg" className="card-img-top" alt="..." />
                            <div className={`card-body ${styles.cardBody}`}>
                                <h5 className="card-title">Olive Yew</h5>
                                <p className="card-text">Chuyên gia thiết kế</p>
                            </div>
                            <div className={`${styles.overlay}`}>
                                <i className="fab fa-facebook" />
                                <i className="fab fa-twitter" />
                                <i className="fab fa-instagram" />
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 col-lg-3 ${styles.instructorItems}`}>
                        <div className={`card ${styles.card}`} style={{ width: '18rem' }}>
                            <img src="https://wp.w3layouts.com/studious/wp-content/themes/studious/assets/images/team3.jpg" className="card-img-top" alt="..." />
                            <div className={`card-body ${styles.cardBody}`}>
                                <h5 className="card-title">Teri Dac</h5>
                                <p className="card-text">Tư duy lập trình</p>
                            </div>
                            <div className={`${styles.overlay}`}>
                                <i className="fab fa-facebook" />
                                <i className="fab fa-twitter" />
                                <i className="fab fa-instagram" />
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 col-lg-3 ${styles.instructorItems}`}>
                        <div className={`card ${styles.card}`} style={{ width: '18rem' }}>
                            <img src="https://wp.w3layouts.com/studious/wp-content/themes/studious/assets/images/team4.jpg" className="card-img-top" alt="..." />
                            <div className={`card-body ${styles.cardBody}`}>
                                <h5 className="card-title">Olive Yew</h5>
                                <p className="card-text">Thiết kế website</p>
                            </div>
                            <div className={`${styles.overlay}`}>
                                <i className="fab fa-facebook" />
                                <i className="fab fa-twitter" />
                                <i className="fab fa-instagram" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instructor