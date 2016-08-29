import React, {Component} from 'react';
import {browserHistory, LinK} from 'react-router';

class Href extends Component {
  _handlePageChange( page = '', e) {
    if (e.nativeEvent.which === 1) {
      e.nativeEvent.preventDefault();
      browserHistory.push('/'+page);
    }
  }

  render() {
    return (
      <div>
        <a onClick={this._handlePageChange.bind(this, this.props.href)} {...this.props}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

export default Href;
