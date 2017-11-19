import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput=field=>{

    return(
        <div>
            <input {...field.input} type={field.type}/>
            {
                field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>
            }
        </div>
    );
};


class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);
        this.props.signinUser({email, password}, ()=>{
            this.props.history.push('/feature')
        })
        //Need to do something to log user in
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

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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

                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign In</button>
            </form>
        );
    }
}

function mapStateToProps(state){
    return {errorMessage: state.auth.error};
}

export default reduxForm({
    form: 'signin'    // no fields array given
})(
    connect(mapStateToProps, actions)(Signin)
);