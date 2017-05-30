import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { userLogin, updateField } from '../actions';
import { CardSection, Input, Button, Spinner } from '../components/common';

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
    <Button onPress={this.onButtonPress.bind(this)}>
      Log In
    </Button>
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

        <CardSection>
          {this.renderButton()}
        </CardSection>
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
