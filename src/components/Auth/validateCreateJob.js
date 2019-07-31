import React from 'react';

const validateCreateLink = values => {
    let errors = {};

    if(!values.companyName) errors.companyName = 'Company Name required'

    if(!values.job) errors.job = 'Company Name required'

    if(!values.description) errors.description = 'Email required'
    else if(values.description.length < 10) {
        errors.description = 'Description must be at least 10 characters'
    }
    return errors;
}

export default validateCreateLink;