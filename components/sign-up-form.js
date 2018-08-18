import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, Badge } from 'react-native-elements';
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ROOT_URL = 'http://fobos.j123.ru:3000';

export default class SignUpForm extends Component {
  state = {
    phone: '',
    error: ''
  };

  handleSubmit = () => {
    console.log(555, this.state.phone);
    axios.post(`${ROOT_URL}/api/request-otp`, { phone: this.state.phone })
      .then((res) => {
        console.log(666, res);
      })
      .catch((e) => {
        const { response: { data } = {} } = e;
        if (data) {
          console.log('! error data', data);
          this.setState({ error: data.error });
        } else {
          console.log('! error e', e);
        }
      });
  };

  render() {
    console.log(222, this.state.phone);
    return (
      <View style={ styles.block }>
        <View style={ styles.input }>
          <FormLabel>Enter Phone Number</FormLabel>
          {
            (this.state.error.length > 0)
            && <Badge value={ this.state.error } textStyle={ styles.errorMsg } />
          }
          <FormInput value={ this.state.phone } onChangeText={ phone => this.setState({ phone })}/>
        </View>
        <Button title='Submit' onPress={ this.handleSubmit } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorMsg: {
    color: 'red'
  },
  block: {
    width: SCREEN_WIDTH
  },
  input: {
    marginBottom: 10
  },
});
