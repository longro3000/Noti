// BlogForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import BlogField from './BlogField';
import formFields from './formFields';

class BlogForm extends Component {
     renderFields() {
          return _.map(formFields, ({ label, name }) => {
               return(
                    <Field key={name} component={BlogField} type="text" label={label} name={name} />
               );
          });
     };
     render() {
          return (
               <div>
                    <form >
                         {this.renderFields()}
                         <Link to="/">
                              Cancel
                         </Link>
                         <button type="submit">
                              Next
                         </button>
                    </form>
               </div>
          )
     }
};

function validate(values) {
     const errors = {};
     _.each(formFields, ({name}) => {
          if (!values[name]) {
               errors[name] = 'You must provide a value';
          }
     });
     return errors;
}
export default reduxForm({
     validate,
     form: 'blogForm',
     destroyOnUnmount: false
})(BlogForm);
