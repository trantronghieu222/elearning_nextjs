"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserDropdown from '../components/UserDropdown/UserDropdown.js';
import { getUserInfo } from '../server/action/users';
import styles from '../assets/css/Layout/header.module.css';
import btn from '../assets/css/Components/button.module.css';
import { getCategoryCourse } from '../server/action/course';
import { useRouter, usePathname } from 'next/navigation';

const Header = (props) => {
    const { category } = props;
    const [userLogin, setUserLogin] = useState(null);
    const [categoryCourse, setCategoryCourse] = useState(category);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const currentPath = usePathname();

    useEffect(() => {
        getCategoryCourse().then(result => {
            setCategoryCourse(result);
        });
    }, []);

    useEffect(() => {
        getUserInfo()
            .then(result => {
                setUserLogin(result);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // render ra đăng nhập hoặc tài khoản
    const renderLoginLink = () => {
        if (loading) {
            return null;
        }

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

    // Toggle dropdown menu
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
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
                                <Link
                                    href="/"
                                    className={`nav-link ${styles.navLink} ${currentPath === '/' ? `active ${styles.active}` : ''}`}
                                    aria-current="page"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    href="/khoahoc"
                                    className={`nav-link ${styles.navLink} ${currentPath === '/khoahoc' ? `active ${styles.active}` : ''}`}
                                    aria-current="page"
                                >
                                    Khoá học
                                </Link>
                            </li>
                            <li className={`nav-item dropdown ${styles.dropdown}`}>
                                <a className={`nav-link dropdown-toggle ${styles.dropdownToggle}`} href="#" onClick={handleDropdownToggle} aria-haspopup="true" aria-expanded={showDropdown}>Danh mục khoá học</a>
                                <div className={`dropdown-menu ${styles.dropdownMenu} ${showDropdown ? 'show' : ''}`} aria-labelledby="dropdownId">
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
                            <button className={`btn my-2 my-sm-0 search_btn ${btn.buttonSearch}`} type="submit">
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