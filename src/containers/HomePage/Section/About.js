import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends React.Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Thông tin Covid-19</div>
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
                            What do you know about the coronavirus disease
                            (COVID-19) that is causing a health emergency?
                            Coronaviruses (CoV) are a large family of viruses
                            that cause illness ranging from the common cold to
                            more severe diseases such as Middle East Respiratory
                            Syndrome (MERS-CoV) and Severe Acute Respiratory
                            Syndrome (SARS-CoV). COVID-19 is caused by a
                            coronavirus that has not been previously identified
                            in humans (SARS-CoV-2). To find out more, watch this
                            short video which was revised on 15 June 2020 to
                            reflect the evolving context.{' '}
                        </p>
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
