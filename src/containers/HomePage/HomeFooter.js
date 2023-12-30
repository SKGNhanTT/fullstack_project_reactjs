import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import HelloDoctor from '../../assets/images/footer/093706-hellodoctorlogo.png';
import Bernard from '../../assets/images/footer/082316-logo-bernard.png';
import DoctorCheck from '../../assets/images/footer/110954-doctor-check.png';

class HomeFooter extends React.Component {
    render() {
        return (
            <footer class="footer">
                <div class="container">
                    <div class="footer-top">
                        <div class="footer-left">
                            <h6>Công ty Cổ phần Booking Health Care</h6>
                            <div>
                                <p>
                                    <i className="fa-solid fa-location-dot"></i>{' '}
                                    Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường
                                    Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà
                                    Nội, Việt Nam
                                </p>

                                <p>
                                    <i className="fa-solid fa-phone"></i>{' '}
                                    024-7301-2468 (7h30 - 18h)
                                </p>
                                <p>
                                    <i className="fa-solid fa-envelope"></i>{' '}
                                    support@bookinghealthcare.vn (7h30 - 18h)
                                </p>
                            </div>
                            <h6>Văn phòng Hồ Chí Minh</h6>
                            <p>
                                <i className="fa-solid fa-location-dot"></i> Số
                                01, Hồ Bá Kiện, Phường 15, Quận 10
                            </p>
                        </div>
                        <div class="footer-center">
                            <h6>Thông tin</h6>
                            <p>Tuyển dụng</p>
                            <p>Chính sách bảo mật</p>
                            <p>Quy chế hoạt động</p>
                            <p>Liên hệ hợp tác</p>
                            <p>Điều khoản sử dụng</p>
                            <p>Giải đáp thắc mắc</p>
                        </div>
                        <div class="footer-right">
                            <h6>Đối tác bảo trợ nội dung</h6>
                            <div className="right-item">
                                <img src={HelloDoctor} alt="Description" />
                                <div>
                                    <h6>Hello Doctor</h6>
                                    <p>
                                        Bảo trợ chuyên mục nội dung "Sức khỏe
                                        tinh thần"
                                    </p>
                                </div>
                            </div>
                            <div className="right-item">
                                <img src={Bernard} alt="Description" />
                                <div>
                                    <h6>
                                        Hệ thống y khoa chuyên sâu quốc tế
                                        Bernard
                                    </h6>
                                    <p>
                                        Bảo trợ chuyên mục nội dung "y khoa
                                        chuyên sâu"
                                    </p>
                                </div>
                            </div>
                            <div className="right-item">
                                <img src={DoctorCheck} alt="Description" />
                                <div>
                                    <h6>
                                        Doctor Check - Tầm Soát Bệnh Để Sống Thọ
                                        Hơn
                                    </h6>
                                    <p>
                                        Bảo trợ chuyên mục nội dung "Sức khỏe
                                        tổng quát"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p>
                        <i className="fa-solid fa-mobile-screen-button"></i> Tải
                        ứng dụng Booking Health Care cho điện thoại hoặc máy
                        tính bảng:{' '}
                        <span className="download-app-text">
                            Android - iPhone/iPad - Khác
                        </span>
                    </p>
                </div>
                <div className="bottom-background">
                    <div className="container">
                        <div class="footer-bottom">
                            <div>
                                <p>
                                    &copy; 2023 BookingHealthCare.com. All
                                    Rights Reserved.
                                </p>
                                <span>Designed by Thanh Nhan</span>
                            </div>
                            <div className="footer-logo">
                                <a
                                    href="https://www.facebook.com/bookinghealthcare/"
                                    target="_blank"
                                >
                                    <svg
                                        width="32"
                                        height="32"
                                        preserveAspectRatio="none"
                                        viewBox="0 0 128 128"
                                    >
                                        <path
                                            fill="#3C579E"
                                            d="M128 112c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V16C0 7.2 7.2 0 16 0h96c8.8 0 16 7.2 16 16z"
                                        ></path>
                                        <path
                                            fill="#FFF"
                                            d="M68.877 128V78.188h-17.78V60.425h17.784V44.029c0-16.537 9.764-26.279 24.514-26.279 7.068 0 12.834.756 14.605.991v18.573l-11.874-.005c-8.022 0-9.523 3.979-9.523 9.572v13.544h20.556l-2.904 17.763H86.603V128z"
                                        ></path>
                                    </svg>
                                </a>
                                <svg
                                    width="32"
                                    height="32"
                                    preserveAspectRatio="none"
                                    viewBox="0 0 128 128"
                                >
                                    <path
                                        fill="#CC191E"
                                        d="M128 112c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V16C0 7.2 7.2 0 16 0h96c8.8 0 16 7.2 16 16z"
                                    ></path>
                                    <path
                                        fill="#FFF"
                                        d="M107.122 46.404s-.86-6.064-3.499-8.733c-3.348-3.506-7.098-3.523-8.816-3.728-12.312-.891-30.787-.891-30.787-.891h-.04s-18.474 0-30.787.891c-1.721.204-5.469.221-8.816 3.728-2.639 2.669-3.498 8.733-3.498 8.733S20 53.525 20 60.647v6.677c0 7.119.879 14.242.879 14.242s.859 6.062 3.498 8.732c3.348 3.508 7.745 3.396 9.702 3.764 7.041.676 29.922.885 29.922.885s18.49-.028 30.806-.918c1.721-.206 5.471-.223 8.817-3.729 2.64-2.672 3.499-8.733 3.499-8.733s.877-7.122.877-14.243v-6.677c0-7.122-.878-14.243-.878-14.243m-53.32 30.165-.003-27.038 26 13.565z"
                                    ></path>
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 250 250"
                                    preserveAspectRatio="none"
                                >
                                    <g fill-rule="evenodd" clip-rule="evenodd">
                                        <path
                                            fill="#010101"
                                            d="M25 0h200c13.808 0 25 11.192 25 25v200c0 13.808-11.192 25-25 25H25c-13.808 0-25-11.192-25-25V25C0 11.192 11.192 0 25 0"
                                        ></path>
                                        <path
                                            fill="#ee1d51"
                                            d="M156.98 230c7.607 0 13.774-6.117 13.774-13.662s-6.167-13.663-13.774-13.663h-2.075c7.607 0 13.774 6.118 13.774 13.663S162.512 230 154.905 230z"
                                        ></path>
                                        <path
                                            fill="#66c8cf"
                                            d="M154.717 202.675h-2.075c-7.607 0-13.775 6.118-13.775 13.663S145.035 230 152.642 230h2.075c-7.608 0-13.775-6.117-13.775-13.662s6.167-13.663 13.775-13.663"
                                        ></path>
                                        <ellipse
                                            cx="154.811"
                                            cy="216.338"
                                            fill="#010101"
                                            rx="6.699"
                                            ry="6.643"
                                        ></ellipse>
                                        <path
                                            fill="#fff"
                                            d="M50 196.5v6.925h8.112v26.388h8.115v-26.201h6.603l2.264-7.112zm66.415 0v6.925h8.112v26.388h8.115v-26.201h6.603l2.264-7.112zm-39.81 3.93c0-2.17 1.771-3.93 3.959-3.93 2.19 0 3.963 1.76 3.963 3.93s-1.772 3.93-3.963 3.93c-2.188-.001-3.959-1.76-3.959-3.93m0 6.738h7.922v22.645h-7.922zM87.924 196.5v33.313h7.925v-8.608l2.453-2.248L106.037 230h8.49l-11.133-16.095 10-9.733h-9.622l-7.923 7.86V196.5zm85.47 0v33.313h7.926v-8.608l2.452-2.248L191.509 230H200l-11.133-16.095 10-9.733h-9.622l-7.925 7.86V196.5z"
                                        ></path>
                                        <path
                                            fill="#ee1d52"
                                            d="M161.167 81.186c10.944 7.819 24.352 12.42 38.832 12.42V65.755a39.26 39.26 0 0 1-8.155-.853v21.923c-14.479 0-27.885-4.601-38.832-12.42v56.835c0 28.432-23.06 51.479-51.505 51.479-10.613 0-20.478-3.207-28.673-8.707C82.187 183.57 95.23 189.5 109.66 189.5c28.447 0 51.508-23.047 51.508-51.48V81.186zm10.06-28.098c-5.593-6.107-9.265-14-10.06-22.726V26.78h-7.728c1.945 11.09 8.58 20.565 17.788 26.308m-80.402 99.107a23.445 23.445 0 0 1-4.806-14.256c0-13.004 10.548-23.547 23.561-23.547a23.6 23.6 0 0 1 7.147 1.103V87.022a51.97 51.97 0 0 0-8.152-.469v22.162a23.619 23.619 0 0 0-7.15-1.103c-13.013 0-23.56 10.543-23.56 23.548 0 9.195 5.272 17.157 12.96 21.035"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M153.012 74.405c10.947 7.819 24.353 12.42 38.832 12.42V64.902c-8.082-1.72-15.237-5.942-20.617-11.814-9.208-5.743-15.843-15.218-17.788-26.308H133.14v111.239c-.046 12.968-10.576 23.468-23.561 23.468-7.652 0-14.45-3.645-18.755-9.292-7.688-3.878-12.96-11.84-12.96-21.035 0-13.005 10.547-23.548 23.56-23.548 2.493 0 4.896.388 7.15 1.103V86.553c-27.945.577-50.42 23.399-50.42 51.467 0 14.011 5.597 26.713 14.68 35.993 8.195 5.5 18.06 8.707 28.673 8.707 28.445 0 51.505-23.048 51.505-51.479z"
                                        ></path>
                                        <path
                                            fill="#69c9d0"
                                            d="M191.844 64.902v-5.928a38.84 38.84 0 0 1-20.617-5.887 38.948 38.948 0 0 0 20.617 11.815M153.439 26.78a39.524 39.524 0 0 1-.427-3.198V20h-28.028v111.24c-.045 12.967-10.574 23.467-23.56 23.467-3.813 0-7.412-.904-10.6-2.512 4.305 5.647 11.103 9.292 18.755 9.292 12.984 0 23.515-10.5 23.561-23.468V26.78zm-44.864 59.773v-6.311a51.97 51.97 0 0 0-7.067-.479C73.06 79.763 50 102.811 50 131.24c0 17.824 9.063 33.532 22.835 42.772-9.083-9.28-14.68-21.982-14.68-35.993 0-28.067 22.474-50.889 50.42-51.466"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M154.904 230c7.607 0 13.775-6.117 13.775-13.662s-6.168-13.663-13.775-13.663h-.188c-7.607 0-13.774 6.118-13.774 13.663S147.109 230 154.716 230zm-6.792-13.662c0-3.67 3-6.643 6.7-6.643 3.697 0 6.697 2.973 6.697 6.643s-3 6.645-6.697 6.645c-3.7-.001-6.7-2.975-6.7-6.645"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
