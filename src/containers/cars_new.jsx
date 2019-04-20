import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { createCar } from '../actions';
import Aside from '../components/aside';

const required = value => value ? undefined : 'Required';
const plate = value => value && !/^[A-Z0-9]+$/.test(value) ? 'All caps and no special characters' : undefined;

const renderField = ({ placeholder, input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} className="form-control" />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
    });
  }

  render() {
    const { handleSubmit, pristine, submitting, garage } = this.props;
    return [
      <Aside key="aside" garage={garage}>
        <Link to="/">Back to list</Link>
      </Aside>,
      <div key="add" className="form-container" style={{ backgroundImage: "url('/assets/images/form.jpg')" }}>
        <div className="overlay"></div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field
              name="brand"
              type="text"
              label="Brand"
              placeholder="Aston Martin"
              component={renderField}
              validate={required}
            />
          </div>
          <div className="form-group">
            <Field
              name="model"
              type="text"
              label="Model"
              placeholder="DB Mark III"
              component={renderField}
              validate={required}
            />
          </div>
          <div className="form-group">
            <Field
              name="owner"
              type="text"
              label="Owner"
              placeholder="James Bond"
              component={renderField}
              validate={required}
            />
          </div>
          <div className="form-group">
            <Field
              name="plate"
              type="text"
              label="Plate"
              placeholder="DB Mark III"
              component={renderField}
              validate={[required, plate]}
            />
          </div>
          <button type="submit" disabled={pristine || submitting}>Add car</button>
        </form>
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}

export default reduxForm({ form: 'newCarForm' })(
  connect(mapStateToProps, { createCar })(CarsNew)
);
