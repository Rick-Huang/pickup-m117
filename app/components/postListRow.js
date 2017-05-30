/**
 * List Row
 *
    <ListRow
      title={title}
      image={entry.entry_image}
      onPress={()=>{alert('Go To Entry View')}} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

import Discussion from '../screens/discussion'
// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

var userImg;
var userName;
class PostListRow extends Component {

  _navigate(discussion) {
    this.props.navigator.push({
      title: "Discussion",
      component: Discussion,
      index: 2,
      transition: 'FloatFromBottom',
      passProps: {
        discussion: discussion,
      }
    })
  }

  render = () => {
    let discussion = this.props.discussion;
    console.log(discussion)
    return (
      <TouchableOpacity style={[styles.listRow]} activeOpacity={0.7} onPress={ () => this._navigate(discussion) }>
        <View style={styles.userImage}>
          <Text>user image</Text>
        </View>
        <View style={styles.title}>
          <Text>{discussion.title}</Text>
        </View>
        <View style={styles.date}>
          <Text>{discussion.time}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listRow: {
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    flex: 1,
    padding: 20,
    flexDirection: "row"
  },
  userImage: {
    flex: .25
  },
  title: {
    flex: .5
  },
  date: {
    flex: .25
  },
  listRowInner: {
    borderTopWidth: 1,
    borderTopColor: AppConfig.borderColor,
  },
  listRow_text: {
    color: AppConfig.textColor,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'transparent',
  }

});

/* Export Component ==================================================================== */
export default PostListRow
