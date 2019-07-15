  import React from 'react';
  import {Formik} from 'formik';
  import './dashboard.css';
  import * as Yup from 'yup';
  import {actions} from './actions';
  import {connect} from 'react-redux';


  class DashboardComponent extends React.Component{
      render(){
        const value = this.props.user;
        if(value.user){
          this.userName = value.user.name;
          this.followers = value.user.followers;
          this.following = value.user.following;
          this.location = value.user.location;
          this.public_repos = value.user.public_repos;
          this.company = value.user.company;
          this.bio = value.user.bio;
          this.created_at = value.user.created_at;
        }
        return (
          <div>
            <Formik
              initialValues = {{ name: ''}}
              onSubmit = {(values, {setSubmitting}) => {
                this.props.loadUserData(values.name);
                setSubmitting(false);
              }}
              validationSchema = {Yup.object().shape({
                name : Yup.string().required('required')
              })}
            >

            {props =>{
                const{
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset
                } = props;


                return (
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name"><b>Github User Name</b></label>
                    <input
                      id="name"
                      placeholder="Enter your username"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name ? 'error': ''}
                    />
                    {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}

                    <button
                      type="button"
                      className="outline"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Reset
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </form>
                );

            }}
          </Formik>
          <div className="result-feedback">
              <p>Name: {this.userName}</p>
              <p>Followers: {this.followers}</p>
              <p>Following: {this.following}</p>
              <p>Location: {this.location}</p>
              <p>Number of public repo: {this.public_repos}</p>
              <p>Company Name: {this.company}</p>
              <p>Bio: {this.bio}</p>
              <p>Created At: {this.created_at}</p>

          </div>
        </div>
      );
      }
  }

  const mapStateToProps= (state)=> {
    return {
      user: state.user
    };
  };

  const mapDispatchToProps= (dispatch) => {
    return {
      loadUserData: name => dispatch(actions.loadUserData(name))
    };
  };

  export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
