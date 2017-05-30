import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Login from './Login'
import Games from './Games'
import Create from './Create'
import Signup from './Signup'

class AppRouter extends Component {
  render() {
    return (
       <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key={'auth'}>
          <Scene initial key={'login'} component={Login} title={'Login'} />
          <Scene key={'signup'} component={Signup} title={'Sign up'} />
        </Scene>

        <Scene key={'main'}>
          <Scene key={'games'} component={Games} title={'Games'} />
          <Scene key={'newGame'} component={Create} title={'Create'}/>
        </Scene>
      </Router>
    )
  }
}

export default connect()(AppRouter)
