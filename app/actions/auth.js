import firebase from 'firebase';
import {
  UPDATE_FIELD,
  CREATE_ACCOUNT,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  USER_LOGIN,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS
} from './types';

import { Actions} from 'react-native-router-flux';

export const updateField = ({ prop, value }) => {
  return {
    type: UPDATE_FIELD,
    payload: { prop, value }
  };
};

export const createAccount = ( email, password, firstName, lastName, skillLevel) => {
  return (dispatch) => {
    dispatch({ type: CREATE_ACCOUNT });

    firebase.database().ref("users").orderByChild("email").equalTo(email).once("value", function(snapshot) {
        var existingUser = snapshot.val();
        if(existingUser) {
            alert('An account with this email has already been created');
            createUserFail(dispatch);
        }
        else {
              firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => createUserSuccess(dispatch, user, password, firstName, lastName, email, skillLevel))
                .catch(() => createUserFail(dispatch));
        }
    });
  };
};

const createUserFail = (dispatch) => {
  dispatch({ type: CREATE_USER_FAIL });
};

const createUserSuccess = (dispatch, user, password, firstName, lastName, email, skillLevel) => {
  const { currentUser } = firebase.auth();
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      var users = {};
      console.log(firstName);
      console.log(lastName);
      users['/users/'+user.uid] = { email, firstName, lastName, skillLevel };
      Actions.login();
      firebase.database().ref().update(users)
        .then(() => {
          dispatch({
            type: CREATE_USER_SUCCESS,
            payload: user
          });
        });
    });
    alert('Account created successfully!')
  /* TODO NAVIGATE TO NEXT PAGE */
};

export const userLogin = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        alert('No account associated with this email address');

      Actions.signup();
  });
};
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
