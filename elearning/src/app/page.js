import Image from "next/image";
import Link from "next/link";
import styles from "./assets/css/Components/card.module.css";
import btn from "./assets/css/Components/button.module.css";
import title from "./assets/css/Components/title.module.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import NumberCounter from "./components/NumberCounter";
import { getCategoryCourse, getCourseApi } from "./server/action/course";
import { Rate } from 'antd';
import Feedback from "./components/Feedback";
import Instructor from "./components/Instructor";
import Contact from "./components/Contact";
import BackToTop from "./components/BackToTop";


export default async function Home() {
  const category = await getCategoryCourse();
  const courseList = await getCourseApi();
  const sortedCourses = courseList.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao)).slice(0, 8);
  return (
    <main>
      <Header category={category}></Header>
      <Carousel></Carousel>
      <div className='homePage container'>
        {/* Title */}
        <div className={`${title.title2}`}>
          <h3 className={`${title.title_content}`}>Các Khoá Học <span>Mới Nhất</span></h3>
        </div>
        {/* Content */}
        <div className="newProd">
          <div className="row">
            {/* Render khoá học */}
            {
              sortedCourses?.map((course, index) => {
                return (
                  <div
                    className={`${styles.course} col-12 col-md-6 col-lg-4 col-xl-3`}
                    key={index}
                  >
                    <div className={`${styles.cardBox}`}>
                      <div className={`mb-3 card ${styles.card} ${styles[`index${index}`]}`}>
                        <Link href={`/chitiet/${course.maKhoaHoc}`} className={styles.cardContent}>
                          <img className={`${styles.cardImg} card-img-top`} src={course.hinhAnh} alt="Title" />
                          <div className="card-body">
                            <h5 className={`card-title ${styles.cardTitle}`}>{course.tenKhoaHoc}</h5>
                            <small className="card-text pe-2">4.5</small>
                            <Rate
                              allowHalf
                              defaultValue={4.5}
                              disabled
                              style={{ fontSize: '14px' }}
                            />
                            <small className="card-text px-2">({course.luotXem})</small>
                            <p className={styles.price}>
                              <span className={styles.discounted}>500.000đ</span>
                              <span className={styles.original}>1.499.000đ</span>
                            </p>
                          </div>
                          <div className={`${styles.ribbon} ${styles.left}`}>Bán chạy</div>
                        </Link>
                        <div className={styles.overlay}>
                          <div className={styles.overlayContent}>
                            <div className='row mb-2'>
                              <div className='col-3'>
                                <img src='/image/avt_girl.png' className='h-100 w-100 rounded-circle'></img>
                              </div>
                              <div className='col-9 d-flex align-items-center p-0'>
                                <span>{course?.nguoiTao?.hoTen || 'N/A'}</span>
                              </div>
                            </div>
                            <h5 className={styles.overlayTitle}>Bootcamp - {course.tenKhoaHoc}</h5>
                            <div className={styles.overlayUpdated}>
                              <span>Mới</span>
                              <small>Đã cập nhật {course?.ngayTao || 'N/A'}</small>
                            </div>
                            <p className={styles.overlayDescribe}>{course.moTa}</p>
                            <p className={styles.price}>
                              <span className={styles.discounted}>500.000đ</span>
                              <span className={styles.original}>1.499.000đ</span>
                            </p>
                            <Link href={`/chitiet/${course.maKhoaHoc}`} className={`btn w-100 ${btn.buttonSearch}`}>Xem Chi Tiết</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <NumberCounter></NumberCounter>
      <Feedback></Feedback>
      <Instructor></Instructor>
      <Contact></Contact>
      <Footer></Footer>
      <BackToTop></BackToTop>
    </main>
  );
}