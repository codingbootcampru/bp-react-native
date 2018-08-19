import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, Badge } from 'react-native-elements';
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ROOT_URL = 'http://fobos.j123.ru:3000';

const FORM_STATE = {
  phone: 'phone',
  code: 'code',
  pageCourses: 'pageCourses'
};

const PERMISSIONS = [ 'COMMON_USER' ];

export default class SignUpForm extends Component {
  state = {
    form: FORM_STATE.phone,
    formHasMessage: false,
    formMessage: '',
    phone: '',
    phoneHasErrorMessage: false,
    phoneErrorMessage: '',
    code: '',
    codeHasErrorMessage: false,
    codeErrorMessage: '',
    token: ''
  };

  handlePhoneChange = (phone) => {
    this.setState({ phone });
  };

  handleRequestOtp = () => {
    axios.post(`${ROOT_URL}/api/request-otp`, { phone: this.state.phone })
      .then((res) => {
        const { data: phoneMessage } = res;
        this.setState({
          form: FORM_STATE.code,
          formHasMessage: true,
          formMessage: phoneMessage
        });
      })
      .catch((e) => {
        const { response: { data } = {} } = e;
        if (data) {
          this.setState({
            phoneHasErrorMessage: true,
            phoneErrorMessage: data.error
          });
        } else {
          console.log('! error e', e);
        }
      });
  };

  handleCodeChange = (code) => {
    this.setState({ code });
  };

  handleVerifyOtp = () => {
    axios.post(
      `${ROOT_URL}/api/verify-otp`,
      {
        phone: this.state.phone,
        code: this.state.code,
        permissions: PERMISSIONS
      })
      .then((res) => {
        const { data: token } = res;
        this.setState({
          form: FORM_STATE.pageCourses,
          formHasMessage: true,
          formMessage: 'Successfully Authenticated'
        });
      })
      .catch((e) => {
        const { response: { data } = {} } = e;
        if (data) {
          this.setState({
            codeHasErrorMessage: true,
            codeErrorMessage: data.error
          });
        } else {
          console.log('! error e', e);
        }
      });
  };

  render() {
    return (
      <View style={ styles.block }>
        <Text style={ styles.page }>
          PAGE: { this.state.form }
        </Text>
        {
          (this.state.formHasMessage) &&
          <Text style={ styles.message }>
            { this.state.formMessage }
          </Text>
        }
        {
          (this.state.form === FORM_STATE.phone) &&
          this.renderPhoneForm()
        }
        {
          (this.state.form === FORM_STATE.code) &&
          this.renderCodeForm()
        }
        {
          (this.state.form === FORM_STATE.pageCourses) &&
          this.renderPageCourses()
        }
      </View>
    );
  }

  renderPhoneForm() {
    return (
      <View>
        <View style={ styles.input }>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput value={ this.state.phone } onChangeText={ this.handlePhoneChange }/>
        </View>
        {
          (this.state.phoneHasErrorMessage) &&
          <Text style={ styles.errorMsg }>
            { this.state.phoneErrorMessage }
          </Text>
        }
        <Button title='Submit' onPress={ this.handleRequestOtp } />
      </View>
    );
  }

  renderCodeForm() {
    return (
      <View>
        <View style={ styles.input }>
          <FormLabel>Enter Code</FormLabel>
          <FormInput value={ this.state.code } onChangeText={ this.handleCodeChange }/>
        </View>
        {
          (this.state.codeHasErrorMessage) &&
          <Text style={ styles.errorMsg }>
            { this.state.codeErrorMessage }
          </Text>
        }
        <Button title='Submit' onPress={ this.handleVerifyOtp } />
      </View>
    );
  }

  renderPageCourses() {
    return (
      <View>
        <Text style={ styles.page }>TODO Page Courses</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    width: SCREEN_WIDTH
  },
  page: {
    color: 'green',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  message: {
    color: 'blue',
    paddingLeft: 20,
    paddingRight: 20
  },
  input: {
    marginBottom: 10
  },
  errorMsg: {
    color: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
});
