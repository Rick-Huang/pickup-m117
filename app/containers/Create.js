import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity, Dimensions, StyleSheet, View, Image } from 'react-native'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as GamesActions from '../actions/games'
// import RNGooglePlacePicker from 'react-native-google-place-picker';

class Create extends Component {
  constructor(props) {
    super(props)
  }
  openSearchModal() {
//     RNGooglePlacePicker.show((response) => {
//   if (response.didCancel) {
//     console.log('User cancelled GooglePlacePicker');
//   }
//   else if (response.error) {
//     console.log('GooglePlacePicker Error: ', response.error);
//   }
//   else {
//     this.setState({
//       location: response
//     });
//   }
// })
console.log('hey')
  }

  render() {
    return (
      <View style={{marginTop:100}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text>Open Place Picker</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GamesActions, dispatch)
}

export default connect(mapDispatchToProps)(Create)
