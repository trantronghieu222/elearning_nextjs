// "use client"
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import UserDropdown from '../components/UserDropdown/UserDropdown.js';
// import { getUserInfo } from '../server/action/users';
// import styles from '../assets/css/Layout/header.module.css';
// import { getCategoryCourse } from '../server/action/course';
// import { useRouter } from 'next/navigation';

// const Header = (props) => {
//     const { category } = props;
//     const [userLogin, setUserLogin] = useState(null);
//     const [categoryCourse, setCategoryCourse] = useState(category);
//     const [searchTerm, setSearchTerm] = useState('');
//     const router = useRouter();

//     useEffect(() => {
//         getCategoryCourse().then(result => {
//             setCategoryCourse(result)
//         })
//     }, [])

//     useEffect(() => {
//         getUserInfo()
//             .then(result => {
//                 setUserLogin(result);
//             })
//             .catch(error => {
//                 console.error('Error fetching user info:', error);
//             });
//     }, []);

//     // render ra đăng nhập hoặc tài khoản --
//     const renderLoginLink = () => {
//         if (userLogin) {
//             return <UserDropdown userLogin={userLogin} />;
//         } else {
//             return <Link className='btn btn-warning text-light mx-2' href="/users/dangnhap" role="button">Đăng nhập</Link>;
//         }
//     };

//     // Tìm kiếm
//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchTerm.trim()) {
//             router.push(`/timkiem/${searchTerm}`);
//         }
//     };

//     return (
//         <header>
//             <nav className={`navbar navbar-expand-lg fixed-top ${styles.navbar}`}>
//                 <div className="container">
//                     <Link className="navbar-brand" href="/">
//                         <img src='/image/logo.png' className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} alt="Logo" />
//                     </Link>
//                     <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon" />
//                     </button>
//                     <div className="collapse navbar-collapse px-5" id="collapsibleNavId">
//                         <ul className="navbar-nav me-auto mt-2 mt-lg-0">
//                             <li className="nav-item">
//                                 <Link className="nav-link active" href="/" aria-current="page">Trang chủ
//                                     <span className="visually-hidden">(current)</span></Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" href='/khoahoc' aria-current="page">Khoá học</Link>
//                             </li>
//                             <li className="nav-item dropdown">
//                                 <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Danh mục khoá học</a>
//                                 <div className="dropdown-menu" aria-labelledby="dropdownId">
//                                     {
//                                         categoryCourse?.map((item, index) => {
//                                             return <Link className="dropdown-item" href={`/danhmuckhoahoc/${item.maDanhMuc}`} key={index}>{item.tenDanhMuc}</Link>
//                                         })
//                                     }
//                                 </div>
//                             </li>
//                         </ul>
//                         {/* Form search */}
//                         <form className="d-flex my-2 my-lg-0 me-auto" onSubmit={handleSearch}>
//                             <input
//                                 className="form-control"
//                                 type="text"
//                                 placeholder="Tìm kiếm"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                             <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">
//                                 <i className="fa fa-search"></i>
//                             </button>
//                         </form>
//                         <div>
//                             {renderLoginLink()}
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// }

// export default Header;

"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserDropdown from '../components/UserDropdown/UserDropdown.js';
import { getUserInfo } from '../server/action/users';
import styles from '../assets/css/Layout/header.module.css';
import btn from '../assets/css/Components/button.module.css';
import { getCategoryCourse } from '../server/action/course';
import { useRouter } from 'next/navigation';

const Header = (props) => {
    const { category } = props;
    const [userLogin, setUserLogin] = useState(null);
    const [categoryCourse, setCategoryCourse] = useState(category);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        getCategoryCourse().then(result => {
            setCategoryCourse(result)
        })
    }, [])

    useEffect(() => {
        getUserInfo()
            .then(result => {
                setUserLogin(result);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }, []);

    // render ra đăng nhập hoặc tài khoản --
    const renderLoginLink = () => {
        if (userLogin) {
            return <UserDropdown userLogin={userLogin} />;
        } else {
            return <Link className={`${btn.buttonBg1}`} href="/users/dangnhap" role="button">Đăng nhập</Link>;
        }
    };

    // Tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/timkiem/${searchTerm}`);
        }
    };

    return (
        <header>
            <nav className={`navbar navbar-expand-lg fixed-top ${styles.navbar}`}>
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <img src='/image/logo.png' className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} alt="Logo" />
                    </Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse px-5" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link active ${styles.navLink}`} href="/" aria-current="page">Trang chủ
                                    <span className="visually-hidden">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} href='/khoahoc' aria-current="page">Khoá học</Link>
                            </li>
                            <li className={`nav-item dropdown ${styles.dropdown}`}>
                                <a className={`nav-link dropdown-toggle ${styles.dropdownToggle}`} href="#" id="dropdownId" aria-haspopup="true" aria-expanded="false">Danh mục khoá học</a>
                                <div className={`dropdown-menu ${styles.dropdownMenu}`} aria-labelledby="dropdownId">
                                    {
                                        categoryCourse?.map((item, index) => {
                                            return <Link className={`dropdown-item ${styles.dropdownItem}`} href={`/danhmuckhoahoc/${item.maDanhMuc}`} key={index}>{item.tenDanhMuc}</Link>
                                        })
                                    }
                                </div>
                            </li>
                        </ul>
                        {/* Form search */}
                        <form className="d-flex my-2 my-lg-0 me-auto" onSubmit={handleSearch}>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Tìm kiếm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className={`btn my-2 my-sm-0 ${btn.buttonSearch}`} type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </form>
                        <div>
                            {renderLoginLink()}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;