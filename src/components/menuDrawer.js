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

			showItem: {
				zIndex: 3,
				position: 'relative',
				padding: '10px 6px',
				boxSizing: 'border-box'
			},

			drawerBackground: {
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 2,
				width: '100%',
				height: '100%',
				display: 'block',
				background: `url('${this.props.background}')`
			}
		};

		return (
			<div style={Styles.drawer}>
				<div style={Styles.showItem}>{this.props.title}</div>
				<div style={Styles.drawerBackground}></div>
			</div>
		);
		
	}
}
