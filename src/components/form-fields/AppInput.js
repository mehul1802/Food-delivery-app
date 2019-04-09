import React from 'react';
import { FormGroup, Input, FormText } from 'reactstrap';
import _ from 'lodash';

class AppInput extends React.Component {
    constructor (props) {
        super(props);
        this.inputLabel = React.createRef();
    }

    state = {
        labelClass: '',
        labelWidth: 0,
        activeInput: ''
    }

    onFocus = () => {
        this.setState({
            activeInput: 'active'
        });

        if (_.isEmpty(this.state.labelClass) && this.props.label) {
            this.setFocus();
        }
    }

    onBlur = () => {
        this.setState({
            activeInput: ''
        });

        if (_.isEmpty(this.props.value) && _.isEmpty(this.props.placeholder)) {
            this.setState({
                labelClass: null,
                labelWidth: 0
            });
        }
    }

    componentDidMount () {
        if ((this.props.placeholder || this.props.value) && this.props.label) {
            this.setFocus();
        }
    }

    componentDidUpdate () {
        if (this.props.value && _.isEmpty(this.props.labelClass) && !_.isEmpty(this.props.label)) {
            this.setFocus();
        }
    }

    setFocus () {
        if (_.isEmpty(this.state.labelClass) && _.isEmpty(this.state.labelWidth)) {
            this.setState({
                labelClass: 'focus',
                labelWidth: this.inputLabel.current ? this.inputLabel.current.offsetWidth + 4 : 0
            });
        }
    }

    render() {
        let validateField = this.props.validator && this.props.validation;

        const message = validateField ? this.props.validator.message(this.props.name, this.props.value, this.props.validation) : null,
              errorClass = message ? 'invalid' : '',
              className = this.props.className || '',
              innerRefClassName = this.props.innerRefClassName || '',
              titleCls = this.props.titleCls || '',
              helperCls = this.props.helperCls || '';

        return (
            <React.Fragment>
                <FormGroup className={`app-input ${className} ${errorClass}`}>
                    {/* Input Title */}
                    {this.props.title && <div className={`input-title ${titleCls}`}>{this.props.title}</div>}

                    <label ref={this.inputLabel} htmlFor={this.props.name} className={`${this.state.labelClass} ${this.state.activeInput}`}>{this.props.label}</label>

                    <div>
                        <fieldset aria-hidden="true" className={this.state.activeInput}>
                            <legend style={{width: `${this.state.labelWidth}px`}}>
                                <span>&#8203;</span>
                            </legend>
                        </fieldset>

                        <Input className={innerRefClassName} onFocus={this.onFocus} onKeyPress={this.props.onKeyPress} disabled={this.props.disabled} rows={this.props.rows} onChange={this.props.onChange} onBlur={ this.onBlur } type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} />
                    </div>

                    {/* Helper Text */}
                    {this.props.formText && <FormText className={helperCls}>{this.props.formText}</FormText>}

                    {/* Error Message */}
                    {message}
                </FormGroup>
            </React.Fragment>
        )
    }
}

export default AppInput;
