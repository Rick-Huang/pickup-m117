
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TextInput,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import FormValidation from 'tcomb-form-native'

// App Globals
import AppStyles from '../styles'
import AppUtil from '../util'

// Components
import Button from '../components/button'
import Alerts from '../components/alerts'
import { Spinner } from '../components/common';

import { updateField, createAccount } from '../actions';
import { connect } from 'react-redux';


/* Component ==================================================================== */
class Signup extends Component {
  static componentName = 'Signup';

  constructor(props) {
    super(props);

    // Email Validation
    var valid_email = FormValidation.refinement(
      FormValidation.String, function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
      }
    );

    // Password Validation - Must be 6 chars long
    var valid_password = FormValidation.refinement(
      FormValidation.String, function (password) {
        if(password.length < 6) return false;
        return true;
      }
    );

    // Initial state
    this.state = {

      success: false,

      form_fields: FormValidation.struct({
        First_name: FormValidation.String,
        Last_name: FormValidation.String,
        Email: valid_email,
        Password: valid_password,
        Confirm_password: valid_password,
        Skill_level: FormValidation.Number,
      }),
      empty_form_values: {
        First_name: '',
        Last_name: '',
        Email: '',
        Password: '',
        Confirm_password: '',
        Skill_level: '',
      },
      form_values: {
        Email: this.props.email
      },
      options: {
        fields: {
          First_name: { error: 'Please enter your first name' },
          Last_name: { error: 'Please enter your last name' },
          Email: { error: 'Please enter a valid email' },
          Password: {
            error: 'Your new password must be more than 6 characters',
            secureTextEntry: true,
          },
          Confirm_password: {
            error: 'Please repeat your new password',
            secureTextEntry: true,
          },
          Skill_level: {
            error: 'Please enter a number between 1 and 10'
          },
        }
      },
    }
  }

  /**
    * Executes after all modules have been loaded
    */
  componentDidMount = async () => {
    // Get user data from AsyncStorage to populate fields
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.setState({ form_values: JSON.parse(value) });
    }
  }

  /**
    * Delete Data
    */
  _deleteData = () => {
     AsyncStorage.removeItem('user')
      .then(() => {
        this.setState({ form_values: this.state.empty_form_values });
      }).catch(() => {
        Alert.alert('Oops', 'Something went wrong when deleting');
      });
  }

  /**
    * Sign Up
    */
  _signUp = () => {
    // Get new values and update
    var values = this.refs.form.getValue();

    // Check whether passwords match
    if(values && values.Password != values.Confirm_password) {
      this.setState({
        form_values: {
          ...values
        },
        options: FormValidation.update(this.state.options, {
          fields: {
            Confirm_password: {
              hasError: {'$set': true},
              error: {'$set': 'Passwords don\'t match'}
            }
          }
        })
      });
      return false;
    }

    // Form is valid
    if(values) {
      this.setState({
        success: true,
        form_values: {
          ...values
        },
      });
    }
    else {
      this.setState({
        success: false
      });
    }
  }

  _createAccount = () => {
    this._signUp();
    if(this.state.success == true) {
      var values = this.refs.form.getValue();
      if (values) {
        this.props.updateField({ prop: 'email', value: values.Email });
        this.props.updateField({ prop: 'password', value: values.Password });
        this.props.updateField({ prop: 'confirm_password', value: values.Confirm_password });
        this.props.updateField({ prop: 'firstName', value: values.First_name });
        this.props.updateField({ prop: 'lastName', value: values.Last_name });
        this.props.updateField({ prop: 'skillLevel', value: values.Skill_level });
        this.props.createAccount( values.Email, values.Password, values.First_name, values.Last_name, values.Skill_level );
        this.setState({ success: false });
      }
    }
  }

  renderButton() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }

  return (
    <View style={[AppStyles.paddingHorizontal]}>
      <Button
        text={'Sign Up'}
        onPress={this._createAccount} />
    </View>
  );
}

  /**
    * RENDER
    */
  render = () => {
    var Form = FormValidation.form.Form;

    return (
      <ScrollView automaticallyAdjustContentInsets={false}
        ref={'scrollView'}
        style={[AppStyles.container]}
        contentContainerStyle={[AppStyles.containerCentered, styles.container]}>
        <View style={[AppStyles.paddingHorizontal]}>


          <Text style={[AppStyles.baseText, AppStyles.h3, AppStyles.centered]}>
            {this.state.form_values.First_name == '' ? "Sign Up" : "Create Account"}
          </Text>

          <Text style={[AppStyles.baseText, AppStyles.p, AppStyles.centered]}>
            It seems that the email you entered is not associated with an account. Please create an account with this email to begin.
          </Text>

          <View style={AppStyles.spacer_20} />

          <Form
            ref="form"
            type={this.state.form_fields}
            value={this.state.form_values}
            options={this.state.options} />
        </View>


        <View style={AppStyles.hr} />
        <Text style={textStyles.errorTextStyle}>
          {this.props.error}
        </Text>

        <View style={[AppStyles.paddingHorizontal]}>
          {this.renderButton()}
        </View>

      </ScrollView>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

const textStyles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

const mapStateToProps = ({ authReducer }) => {
  const { email, password, confirm_password, firstName, lastName, Skill_level } = authReducer;

  return { email, password, confirm_password, firstName, lastName, Skill_level };
};

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { updateField, createAccount })(Signup);
