import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import styles from './styles';

class TypeSelecter extends Component {
    render() {
        return (
            <div>
                <div style={styles.selectedField}>
                   type 多選區 ( 目前無功能 )
                </div>
            </div>
        );
    }
}

export default TypeSelecter;
