import React from 'react'
import styles from '../assets/css/Layout/feedback.module.css';
import title from '../assets/css/Components/title.module.css';
const Feedback = () => {
    return (
        <div className={`container ${styles.feedbackContainer}`}>
            <div className={title.title2}>
                <h3 className={title.title_content}>Phản Hồi Của <span>Học Viên</span></h3>
            </div>
            <div className={`${styles.feedbackContent}`}>
                <div className='row'>
                    <div className={`col-12 col-lg-4 col-md-6 ${styles.feedbackItems}`}>
                        <div className={`${styles.card} card`}>
                            <div className="card-body">
                                <h5 className="card-title"><i className="fa fa-quote-left" /></h5>
                                <p className="card-text">Nội dung khoá học phong phú và được cập nhật thường xuyên. Giảng viên có nhiều kinh nghiệm thực tế, tạo điều kiện cho học viên học hỏi sâu hơn.</p>
                                <div className='row'>
                                    <div className='col-3'>
                                        <img src='/image/avt_girl.png' className=' w-100 rounded-circle'></img>
                                    </div>
                                    <div className='col-9 d-flex align-items-center'>
                                        <div>
                                            <h5 className="card-title mb-2">Nguyễn Lan</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Học viên xuất sắc</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-4 col-md-6 ${styles.feedbackItems}`}>
                        <div className={`${styles.card} card`}>
                            <div className="card-body">
                                <h5 className="card-title"><i className="fa fa-quote-left" /></h5>
                                <p className="card-text">Khoá học rất bổ ích, giảng viên nhiệt tình và dễ hiểu. Các bài giảng được trình bày rõ ràng, giúp học viên dễ dàng nắm bắt kiến thức.</p>
                                <div className='row'>
                                    <div className='col-3'>
                                        <img src='/image/avt_boy.png' className=' w-100 rounded-circle'></img>
                                    </div>
                                    <div className='col-9 d-flex align-items-center'>
                                        <div>
                                            <h5 className="card-title mb-2">Hoàng Phong</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Học viên xuất sắc</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-12 col-lg-4 ${styles.feedbackItems}`}>
                        <div className={`${styles.card} card`}>
                            <div className="card-body">
                                <h5 className="card-title"><i className="fa fa-quote-left" /></h5>
                                <p className="card-text">Phương pháp giảng dạy sáng tạo và thực tiễn, giúp học viên tiếp thu kiến thức nhanh chóng và áp dụng vào thực tế hiệu quả.</p>
                                <div className='row'>
                                    <div className='col-3'>
                                        <img src='/image/avt_girl.png' className=' w-100 rounded-circle'></img>
                                    </div>
                                    <div className='col-9 d-flex align-items-center'>
                                        <div>
                                            <h5 className="card-title mb-2">Khánh Như</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Học viên xuất sắc</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback