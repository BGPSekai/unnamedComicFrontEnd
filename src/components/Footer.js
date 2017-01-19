import React, { Component } from 'react';
import Container from './Container';

export default class Footer extends Component {
  
render() {

    let Styles = {
      footer: {
        background: '#f6f9fa',
        color: '#101010',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: '100px'
      },

      container: {
        minHeight: '10px',
        display: 'flex'
      },

      column: {
        flex: 1,
        textAlign: 'center'
      },

      list: {
        listStyleType: 'none'
      },

      copyright: {
        background: '#f6f9fa',
        color: '#101010'
       },

       copyrightContainer: {
         minHeight: 'inline',
         padding: '2px 0'
       }
    };

    return (
        <div style={Styles.footer}>
          <div id="footer">
            <Container style={Styles.container}>
              <div style={Styles.column}>
                <div>帳號</div>
              </div>
              <div style={Styles.column}>
                <div>服務</div>
              </div>
              <div style={Styles.column}>
                <div>關於</div>
              </div>
              <div style={Styles.column}>
                <div>其他</div>
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
