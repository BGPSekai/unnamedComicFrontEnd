import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import Chip from 'material-ui/Chip';
import styles from './styles';

class TypeSelecter extends Component {
    constructor(props) {
			super(props);
			this.state = {
				types: []
			};

			this.pushType = this.pushType.bind(this);
    }

		_findRepeat(value) {
			return value.id == this.needBePush;
		}

		requestDelete(key) {
			let typeData = this.state.types; 
			typeData.splice(key, 1);
			this.setState({types: typeData});
		}

		pushType(data) {
			let typeData = this.state.types;
			this.needBePush = data.id;
			if (typeData.filter(this._findRepeat.bind(this)).length === 0) {
				typeData.push(data);
				this.setState({type: typeData});
			}
		}

		getTypes() {
			return this.state.types.map((data) => {return data.id});
		}

    render() {
        return (
            <div>
                <div style={styles.selectedField}>
                   {
										this.state.types.map((element, counter) => {
												return (
													<Chip 
														backgroundColor="#fff" 
														onRequestDelete={this.requestDelete.bind(this, counter)}
														key={element.id}
														style={styles.chip}
														>
														{element.name}
													</Chip>
												);
										})
									}
                </div>
            </div>
        );
    }
}

export default TypeSelecter;
