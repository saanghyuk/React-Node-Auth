import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

const renderInput=field=>{

    return(
        <div>
            <input {...field.input} type={field.type}/>
            {
                field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>
            }
        </div>
    );
};
//위 셋다 true면 마지막꺼 리턴 1.클릭했고 2.에러있으면 3. div 리턴


class Signup extends Component{

    handleFormSubmit(formProps){
        //Call action creator to sign up the user
        this.props.signupUser(formProps, ()=>{
            this.props.history.push('/feature')
        })

    }
    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    render(){
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Company:</label>
                    <Field
                        name="company"
                        component={renderInput}
                        type="text"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field
                        name="email"                            // Specify field name
                        component={renderInput}        // Specify render component above
                        type="email"                            // Specify "type" prop passed to renderInput
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field
                        name="password"                        // Specify field name
                        component={renderInput}        // Specify render component above
                        type="password"                        // Specify "type" prop passed to renderInput
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <Field
                        name="passwordConfirm"
                        component={renderInput}
                        type="password"
                    />
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up</button>
            </form>
        );
    }
}


function validate(formProps){
    const errors={};

    if(!formProps.email){
        errors.email='이메일을 입력해라'
    }
    if(!formProps.company){
        errors.company='회사명 입력해'
    }
    if(!formProps.password){
        errors.password='비번을 입력해라'
    }
    if(!formProps.passwordConfirm){
        errors.passwordConfirm='요것도 입력해라'
    }

    if(formProps.password !== formProps.passwordConfirm){
        errors.passwordConfirm='패스워드 not 일치!'
    }
    return errors;
}


function mapStateToProps(state){
    return {errorMessage: state.auth.error}
}

export default reduxForm({
    form: 'signup',    // no fields array given
    validate
})(
    connect(mapStateToProps, actions)(Signup)
);