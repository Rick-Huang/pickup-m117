'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux';
import t from 'tcomb-form-native'
import AppStyles from '../styles'
import AppConfig from '../config'
import * as actions from '../actions/';
import Button from '../components/button'
var Form = t.form.Form;
var Discussion = t.struct({
  title: t.String,
  post_content: t.String
});

var options = {}; // optional rendering options (see documentation)
/* Component ==================================================================== */
class Branch extends Component {

  submit() {
    var value = this.refs.form.getValue();
    var discussion = {
      latest_edit_time: '',
      post_content: value.post_content,
      thread: [],
      time: '',
      title: value.title,
      user_name: ''
    }
    this.props.createPost(discussion)
  }

  render = () => {
    return (
      <ScrollView automaticallyAdjustContentInsets={false}
        style={[AppStyles.container]}>
        <View style={[AppStyles.paddingVertical]}>
        	<View style={[AppStyles.paddingHorizontal]}>
          <Form
            ref="form"
            type={Discussion}
            options={options}
          />
          <Button
            text={'Post'}
            type={'outlined'}
            onPress={()=> this.submit()} />
	        </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}
/* Export Component ==================================================================== */
export default connect(mapStateToProps, actions)(Branch)
