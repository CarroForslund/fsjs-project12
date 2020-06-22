import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;
  let errorsArray = null;
  console.log(errors);
  if (errors.length) {
    
    // if(errors[0] !== 'Sign-in was unsuccessful' &&  
    //     errors[0] !== 'Validation error. Title and description are both required to be able to update this course.' &&
    //     errors[0] !== undefined){
    //   errorsArray = errors.split(',');
    if (errors.length > 0) {
      errorsArray = errors.split(',');
    }  else {
      errorsArray = errors;
    }

    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errorsArray.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
    
  }
  return errorsDisplay;
}
