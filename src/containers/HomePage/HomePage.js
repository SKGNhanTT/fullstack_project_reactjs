import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty.js';
import MedicalFacility from './Section/MedicalFacility.js';
import OutstandingDoctor from './Section/OutstandingDoctor.js';
import HandBook from './Section/HandBook.js';
import About from './Section/About.js';
import HomeFooter from './HomeFooter.js';
import './HomePage.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        return (
            <div>
                <HomeHeader isShowBanner />
                <Specialty setting={settings} />
                <MedicalFacility setting={settings} />
                <OutstandingDoctor setting={settings} />
                {/* <HandBook setting={settings} /> */}
                <About />
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
