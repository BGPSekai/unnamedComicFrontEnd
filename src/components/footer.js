import React, { Component } from 'react';
import Container from './container';

export default class Footer extends Component {

    render() {

        let Styles = {
            footer: {
                background: '#f6f9fa'
            },
            container: {
                minHeight: '100px',
                display: 'flex'
            },
            column: {
                flex: 1
            },
            list: {
                listStyleType: 'none'
            },
            copyright: {
                background: '#212121',
                color: '#F5F5F5'
            },
            copyrightContainer: {
                minHeight: 'inline',
                padding: '10px 0'
            }
        };

        return (
            <div>
                <div id="footer" style={Styles.footer}>
                    <Container style={Styles.container}>
                        <div style={Styles.column}>
                            <h3>帳號</h3>
                            <ul style={Styles.list}>
                                <li></li>
                            </ul>
                        </div>
                        <div style={Styles.column}>
                            <h3>服務</h3>
                            <ul style={Styles.list}>
                                <li></li>
                            </ul>
                        </div>
                        <div style={Styles.column}>
                            <h3>關於</h3>
                            <ul style={Styles.list}>
                                <li></li>
                            </ul>
                        </div>
                        <div style={Styles.column}>
                            <h3>其他</h3>
                            <ul style={Styles.list}>
                                <li></li>
                            </ul>
                        </div>
                    </Container>
                </div>
                <div id="copyright" style={Styles.copyright}>
                    <Container style={Styles.copyrightContainer}>
                        Powered By {process.env.WEBSITE_ENG_TITLE}
                    </Container>
                </div>
            </div>
        );

    }
}