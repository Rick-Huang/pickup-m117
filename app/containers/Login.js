import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { userLogin, updateField } from '../actions';
import { CardSection, Input, Spinner } from '../components/common';

import Button from '../components/button'

import AppStyles from '../styles'

class Login extends Component {

  onButtonPress() {
    const { email, password } = this.props;

      this.props.userLogin({ email, password });
    }


  renderButton() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }

  return (
    <View style={[AppStyles.paddingHorizontal]}>
      <Button
        text={'Login/Sign Up'}
        onPress={this.onButtonPress.bind(this)} />
    </View>
  );
}

  render() {
    return (
      <View>
      <CardSection>
        <Input
          label="Email"
          placeholder=""
          value={this.props.email}
          keyboardType="email-address"
          onChangeText={value => this.props.updateField({ prop: 'email', value })}
        />
      </CardSection>

      <CardSection>
        <Input
          secureTextEntry
          label="Password"
          placeholder=""
          keyboardType="default"
          value={this.props.password}
          onChangeText={value => this.props.updateField({ prop: 'password', value })}
        />
      </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <View style={[AppStyles.paddingHorizontal]}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ authReducer }) => {
  const { email, password, error, loading } = authReducer;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, { userLogin, updateField })(Login);
