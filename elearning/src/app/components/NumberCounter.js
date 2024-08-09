"use client"
import React, { useEffect, useRef } from 'react';
import { CountUp } from 'countup.js';
import styles from '../assets/css/Layout/numberCounter.module.css';
import title from '../assets/css/Components/title.module.css';
const NumberCounter = () => {
    const countersRef = useRef([]);

    useEffect(() => {
        const counters = countersRef.current;
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const startValue = 0;
                        const endValue = parseInt(counter.dataset.count.replace(/,/g, ''));

                        const countUp = new CountUp(counter, endValue, {
                            startVal: startValue,
                            duration: 2,
                        });

                        if (!countUp.error) {
                            countUp.start();
                        } else {
                            console.error(countUp.error);
                        }

                        observer.unobserve(counter);
                    }
                });
            },
            {
                threshold: 0.1, // Điều chỉnh ngưỡng để tăng độ nhạy
            }
        );

        counters.forEach(counter => {
            observer.observe(counter);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`py-5 my-5 ${styles.numbercounter}`}>
            {/* Title */}
            <div className={title.title2}>
                <h3 className={`${title.title_content}`}>Thành Tựu Nổi Bật</h3>
                <p className="text-center text-muted">
                    Những con số ấn tượng minh chứng cho sự phát triển và chất lượng giảng dạy của chúng tôi.
                </p>
            </div>
            {/* Content */}
            <div className={`${styles.number__list} container`}>
                <div className="row text-center justify-content-center">
                    <div className={`${styles.number__item} col-12 col-sm-6 col-lg-3`}>
                        <p ref={el => countersRef.current[0] = el} className="counter" data-count="15300">15,300</p>
                        <span>HỌC VIÊN</span>
                    </div>
                    <div className={`${styles.number__item} col-12 col-sm-6 col-lg-3`}>
                        <p ref={el => countersRef.current[1] = el} className="counter" data-count="108">108</p>
                        <span>KHOÁ HỌC</span>
                    </div>
                    <div className={`${styles.number__item} col-12 col-sm-6 col-lg-3`}>
                        <p ref={el => countersRef.current[2] = el} className="counter" data-count="7600">7,600</p>
                        <span>GIỜ HỌC</span>
                    </div>
                    <div className={`${styles.number__item} col-12 col-sm-6 col-lg-3`}>
                        <p ref={el => countersRef.current[3] = el} className="counter" data-count="36">36</p>
                        <span>GIẢNG VIÊN</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumberCounter;