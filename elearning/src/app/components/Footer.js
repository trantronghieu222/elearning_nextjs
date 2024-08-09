import React from 'react'
import Link from 'next/link'
import styles from '../assets/css/Layout/footer.module.css';
const Footer = () => {
    return (
        <div className={`${styles.footer}`}>
            <div className={`container ${styles.footerContent}`}>
                <div className='row'>
                    <div className={`${styles.ftCol} col-12 col-lg-4`}>
                        <div className={`${styles.Ftlogo}`}>
                            <img src='/image/logo.png' width={200} alt='Logo Cyber'></img>
                            <p>Cybersoft Academy - Hệ thống đào tạo lập trình chuyên sâu theo dự án thực tế</p>
                        </div>
                        <div className={`${styles.ftNews}`}>
                            <h3>Nhận tin sự kiện & khuyến mãi</h3>
                            <p>Cybersoft sẽ gởi các khoá học trực tuyến & các chương trình CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn đến các bạn</p>
                            <div className={`${styles.newsRegis} input-group`}>
                                <div className="form-outline" data-mdb-input-init>
                                    <input type="search" id="form1" className="form-control" placeholder='your.address@gmail.com' />
                                </div>
                                <button type="button" className={`${styles.btnRegis} btn`} data-mdb-ripple-init>
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.ftCol} col-12 col-lg-4`}>
                        <h3>Đăng ký tư vấn</h3>
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Họ và tên *' aria-describedby="helpId" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Email liên hệ *' aria-describedby="helpId" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Điện thoại liên hệ *' aria-describedby="helpId" />
                            </div>
                            <button type="button" className={`${styles.btnRegis} btn`}>
                                Đăng ký
                            </button>
                        </form>
                    </div>
                    <div className={`${styles.ftCol} col-12 col-lg-4`}>
                        <h3>Liên hệ</h3>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 1: 376 Võ Văn Tần - Quận 3</p>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 2: 459 Sư Vạn Hạnh - Quận 10</p>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 3: 82 Ung Văn Khiêm - Bình Thạnh</p>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 4: Đà Năng - Quận Hải Châu</p>
                        <p><i className="fa fa-phone" /> 096.105.1014 - 098.407.5835</p>
                        <div className={`${styles.ftScocial}`}>
                            <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                            <Link href="#"><i className="fab fa-linkedin-in"></i></Link>
                            <Link href="#"><i className="fab fa-twitter"></i></Link>
                            <Link href="#"><i className="fab fa-instagram"></i></Link>
                            <Link href="#"><i className="fab fa-github"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer