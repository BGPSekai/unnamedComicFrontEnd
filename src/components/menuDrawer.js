import React, { Component } from 'react';

export default class MenuDrawer extends Component {
    render() {

        let Styles = {
            drawer: {
                position: 'relative',
                display: 'block',
                width: '100%',
                minHeight: '100px'
            },
            drawerBackground: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'block',
                background: `url('${this.props.background}')`
            }
        };

        return (
            <div style={Styles.drawer}>
                <div style={Styles.drawerBackground}></div>
                {this.props.title}
            </div>
        );
    
    }
}