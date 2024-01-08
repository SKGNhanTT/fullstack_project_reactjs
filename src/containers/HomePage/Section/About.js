import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends React.Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    <FormattedMessage id="about.infor" />
                </div>
                <div className="container">
                    <div className="section-about-content">
                        <div className="section-left">
                            <iframe
                                width="100%"
                                height="400px"
                                src="https://www.youtube.com/embed/i0ZabxXmH4Y"
                                title="Coronavirus disease (COVID-19)"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="section-right">
                            <p>
                                <FormattedMessage id="about.infor-text" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
