import React, { Component } from 'react'
import { TouchableOpacity, Dimensions, StyleSheet, View, Image } from 'react-native'
// import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
// import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
// import MapView from 'react-native-maps';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as GamesActions from '../actions/games'

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      markers: [
        { latlng: 
          { 
            latitude: 34.076222, 
            longitude: -118.444465
          }
        }
      ]
    };
  }

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({initialPosition:position});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({lastPosition:position});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const initialPosition = this.state.initialPosition;
    const lastPosition = this.state.lastPosition;
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window')
    const style = {
      height: windowHeight,
      width: windowWidth,
      zIndex: 0,
    }
    if (initialPosition!='unknown') {
      let position = initialPosition
      if (lastPosition!='unknown')
        position = lastPosition
      console.log(position)
      return (
      <View
        style={styles.main}
      >
        
      </View>
    )
    }
    return (
      <View></View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    top: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  controlButton: {
    position: 'absolute',
    height: 20,
    width: 20,
    top: 10,
    left: 10,
    zIndex: 10,
  }
})

function mapStateToProps(state) {
  return {
    games: state.games.games,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GamesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Games)
