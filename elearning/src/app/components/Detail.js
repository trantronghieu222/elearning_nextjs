"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Rate, message } from 'antd';
import { getUserInfo } from '../server/action/users';
import { registerCourseApi } from '../server/action/course';
import styles from '../assets/css/Pages/chitietkhoahoc.module.css';
import title from '../assets/css/Components/title.module.css';
import btn from '../assets/css/Components/button.module.css';
import Link from 'next/link';
const Detail = (props) => {
    const { chiTietKh } = props;
    const router = useRouter();
    const handleRegister = async () => {
        const thongTinTaiKhoan = await getUserInfo();
        if (thongTinTaiKhoan) {
            try {
                const result = await registerCourseApi(chiTietKh.maKhoaHoc, thongTinTaiKhoan.taiKhoan);
                console.log('Kết quả đăng ký:', result);
            } catch (error) {
                console.log('Đăng ký thất bại:', error);
            }
        }
        else {
            message.error('Vui lòng đăng nhập để đăng ký khoá học!');
            router.push('/users/dangnhap');
        }
    };
    return (
        <div className={`${styles.courseDetail}`}>
            <div className={`${title.title1}`}>
                <h1 className={`${title.title_content} container`}>Thông tin khoá học</h1>
            </div>
            <div className='container'>
                {/* Link về trang trước */}
                <div className={styles.breadcrumb}>
                    <Link href="/khoahoc">Khoá học</Link>
                    <i className={`fa fa-angle-right ${styles.separator}`}></i>
                    <Link href="#">{chiTietKh?.tenKhoaHoc || 'N/A'}</Link>
                </div>
                {/* Content */}
                <div className={`${styles.detailContent} row d-flex justify-content-center`}>
                    <div className={`${styles.detailLeft} col-12 col-md-8`}>
                        {/* Title 1 */}
                        <div className={`${title.title2}`}>
                            <h3 className={`${title.title_content} text-start`}>{chiTietKh?.tenKhoaHoc || 'N/A'}</h3>
                        </div>
                        {/* Content */}
                        <p>
                            Bạn đang tìm kiếm cơ hội để bước chân vào thế giới thiết kế website - nâng cao trải nghiệm người dùng? Khóa học
                            <strong>
                                <span style={{ background: '#ffff00' }}>
                                    &nbsp;Kỹ thuật viên thiết kế Website UX/UI&nbsp;
                                </span>
                            </strong>
                            của Trung Tâm sẽ là điểm khởi đầu hoàn hảo cho hành trình của bạn!
                        </p>
                        <p>
                            Với phương pháp học tập thực hành và sự hướng dẫn của các giáo viên đầy kinh nghiệm thiết kế thực tế, khóa học này sẽ trang bị cho bạn những kỹ năng cần thiết để bắt đầu sự nghiệp trong lĩnh vực thiết kế web đầy triển vọng, và đặc biệt hoàn toàn phù hợp với người mới bắt đầu làm quen với thiết kế web.
                        </p>
                        <ul className={`${styles.detailList}`}>
                            <li>
                                <i className="fa fa-arrow-alt-circle-right"></i> Nắm vững nguyên lý thiết kế layout UI/UX
                            </li>
                            <li>
                                <i className="fa fa-arrow-alt-circle-right"></i> Thành thạo các công cụ và ngôn ngữ thiết kế web cơ bản
                            </li>
                            <li>
                                <i className="fa fa-arrow-alt-circle-right"></i> Làm chủ kỹ thuật dựng web tối ưu CSS với SASS/SCSS
                            </li>
                            <li>
                                <i className="fa fa-arrow-alt-circle-right"></i> Tạo ra các trang web thích ứng trên mọi thiết bị
                            </li>
                            <li>
                                <i className="fa fa-arrow-alt-circle-right"></i> Hoàn thành một dự án thực tế, sẵn sàng cho portfolio của bạn
                            </li>
                        </ul>
                        {/* Accordition */}
                        <div className="accordion mb-3" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        Bạn sẽ nhận được gì khi tham gia khoá học?
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Thiết kế được giao diện Web UX/UI hoàn chỉnh</li>
                                            <li>Sử dụng thành thạo ngôn ngữ thiết kế Web (HTML – CSS - JQuery)</li>
                                            <li>Sử dụng thành thạo CSS Framework (Bootstrap)</li>
                                            <li>Thành thạo xử lý Javascript (DOM) và sử dụng các Plugin</li>
                                            <li>Đủ khả năng ứng tuyển vị trí Front-End Developer</li>
                                            <li>Có thể tự đảm nhiệm các dự án Freelancer</li>
                                            <li>Thiết kế hoàn chỉnh Website tĩnh</li>
                                            <li>Chứng nhận "Kỹ thuật viên Thiết kế Website" do Trung Tâm Tin Học Trường ĐH KHTN, ĐHQG-HCM cấp</li>
                                            <li>Cơ hội được hỗ trợ về việc làm sau khi hoàn tất khóa học</li>
                                            <li>Xem thêm: <strong style={{ color: 'rgb(255, 0, 0)' }}>SẢN PHẨM HỌC VIÊN</strong> sau khóa học <a className='text-decoration-none' href="#">TẠI ĐÂY</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        Khoá học có thực sự phù hợp với bạn
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                    <div className="accordion-body">
                                        <p>Nếu bạn hiện đang là:</p>
                                        <ul>
                                            <li>
                                                Sinh viên các trường Đại học, Cao đẳng, Trung cấp nghề chưa có kinh nghiệm thực tế, đang cần trang bị và hoàn thiện một cách có hệ thống kiến thức về Thiết kế Web.
                                            </li>
                                            <li>
                                                Người đi làm cần bổ sung, củng cố và chuẩn hóa kiến thức để có thể tự tay chỉnh sửa giao diện Web, tăng khả năng thăng tiến trong nghề nghiệp.
                                            </li>
                                            <li>
                                                Các bạn yêu thích thiết kế Website và mong muốn một cơ hội nghề nghiệp, thay đổi ngành nghề,…
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                        Chương trình học
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                    <div className="accordion-body">
                                        <h5>Giới thiệu về Thiết kế Website</h5>
                                        <ul>
                                            <li>Tổng quan về UI/UX</li>
                                            <li>Quy trình thiết kế web</li>
                                        </ul>

                                        <h5>Ngôn ngữ thiết kế cơ bản</h5>
                                        <ul>
                                            <li>HTML: Cấu trúc trang web</li>
                                            <li>CSS: Trang trí và bố cục</li>
                                            <li>JavaScript: Tương tác và động học</li>
                                        </ul>

                                        <h5>CSS Frameworks</h5>
                                        <ul>
                                            <li>Bootstrap: Xây dựng giao diện nhanh chóng</li>
                                            <li>SASS/SCSS: CSS mở rộng</li>
                                        </ul>

                                        <h5>Thiết kế Responsive</h5>
                                        <ul>
                                            <li>Thiết kế đa thiết bị</li>
                                            <li>Media Queries</li>
                                        </ul>

                                        <h5>Công cụ và Thực hành</h5>
                                        <ul>
                                            <li>Công cụ thiết kế (Photoshop, Figma)</li>
                                            <li>Thực hành dự án thực tế</li>
                                        </ul>

                                        <h5>Tối ưu hóa Website</h5>
                                        <ul>
                                            <li>Tối ưu hóa hiệu suất và SEO</li>
                                            <li>Thực hành tối ưu hóa</li>
                                        </ul>

                                        <h5>Triển khai và Bảo trì</h5>
                                        <ul>
                                            <li>Triển khai website</li>
                                            <li>Bảo trì và cập nhật</li>
                                        </ul>

                                        <h5>Dự án cuối khóa</h5>
                                        <ul>
                                            <li>Hoàn thiện dự án cá nhân</li>
                                            <li>Trình bày và nhận phản hồi</li>
                                        </ul>

                                        <h5>Cơ hội nghề nghiệp</h5>
                                        <ul>
                                            <li>Chuẩn bị hồ sơ ứng tuyển</li>
                                            <li>Hỗ trợ tìm việc</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                        Phần mềm sử dụng
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Adobe Photoshop</li>
                                            <li>Dreamweaver (HTML5, CSS3, Jquery)</li>
                                            <li>Responsive với Boostraps</li>
                                            <li>Animation</li>
                                            <li>Wordpress</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                        Mức đầu tư của bạn dành cho khoá học
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Khóa học tiêu tốn của bạn 120 giờ và làm hao hụt 7.800.000Đ trong nguồn tài chính</li>
                                            <li>Chúng tôi sẽ <strong>linh hoạt quỹ thời gian</strong>&nbsp;cho bạn trong trường hợp có sự gián đoạn khi tham gia khóa học</li>
                                            <li>
                                                Hỗ trợ &nbsp;<strong><span style={{ color: '#ff0000' }}>1.100.000đ học phí</span></strong>&nbsp;khi bạn đăng ký online và hoàn tất trước hạn, <strong>học phí chính thức 6.700.000đ</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingSix">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                                        Bạn sẽ bỏ lỡ điều gì nếu không tham gia khoá học này?
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseSix" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Một chương trình học xuyên suốt với giáo trình được biên soạn bài bản, thực hành liên tục giúp các bạn tự hoàn thiện Website của mình trong quá trình học</li>
                                            <li>Tự do thể hiện sự sáng tạo của bản thân với giao diện Web thật bắt mắt và hợp xu hướng.</li>
                                            <li>Cơ hội trở thành nhà thiết kế Website thực thụ và tăng thêm thu nhập</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingSeven">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven">
                                        Sản phẩm môn học
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseSeven" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSeven">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Capstone 1...</li>
                                            <li>Capstone 2...</li>
                                            <li>Capstone 3...</li>
                                            <li>Capstone 4...</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingEight">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseEight" aria-expanded="false" aria-controls="panelsStayOpen-collapseEight">
                                        Hướng dẫn thanh toán học phí
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseEight" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingEight">
                                    <div className="accordion-body">
                                        <ul>
                                            <li>Thanh toán trực tiếp tại trung tâm</li>
                                            <li>Chuyển khoản</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card right */}
                    <div className={`${styles.detailRight} col-12 col-md-4`}>
                        <div className={`card ${styles.card}`}>
                            {/* Hình ảnh */}
                            {/* <img src={chiTietKh.hinhAnh} className="card-img-top" alt="..." /> */}
                            {chiTietKh && chiTietKh.hinhAnh ? (
                                <img src={chiTietKh.hinhAnh} className="card-img-top" alt="..." />
                            ) : (
                                <p>No image available</p>
                            )}
                            {/* Card-body */}
                            <div className="card-body">
                                <div className='d-flex justify-content-between'>
                                    <h5 className="card-title">500.000đ</h5><Rate allowHalf defaultValue={4.5} disabled />
                                </div>
                                {/* Đăng ký */}
                                <button className={`btn w-100 mt-2 ${btn.buttonSearch}`} onClick={handleRegister}> Đăng ký</button>
                            </div>
                            {/* Card-info */}
                            <ul className="list-group list-group-flush">
                                <li className={`list-group-item ${styles.listGroupItem}`}>
                                    Lượt xem: <span>{chiTietKh?.luotXem || 'N/A'}</span>
                                </li>
                                <li className={`list-group-item ${styles.listGroupItem}`}>
                                    Số lượng học viên: <span>{chiTietKh?.soLuongHocVien || 'N/A'}</span>
                                </li>
                                <li className={`list-group-item ${styles.listGroupItem}`}>
                                    Giảng viên: <span>{chiTietKh?.nguoiTao?.hoTen || 'N/A'}</span>
                                </li>
                                <li className={`list-group-item ${styles.listGroupItem}`}>
                                    Ngày tạo: <span>{chiTietKh?.ngayTao || 'N/A'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Detail