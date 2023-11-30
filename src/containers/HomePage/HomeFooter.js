import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends React.Component {
    render() {
        return (
            <div className="home-footer">
                <p>
                    &copy; 2023 From Thanh Nhan.
                    <a
                        target="_blank"
                        href="https://www.facebook.com/profile.php?id=100005240080048"
                    >
                        More information
                    </a>
                </p>
            </div>
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
