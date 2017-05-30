import { UPDATE_FIELD, CREATE_ACCOUNT, CREATE_USER_FAIL, CREATE_USER_SUCCESS, USER_LOGIN, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  confirm_password: '',
  user: null,
  firstName: '',
  lastName: '',
  error: '',
  loading: false,
  skillLevel: '',
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE_ACCOUNT:
      return { ...state, loading: true, error: '' };
    case CREATE_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case CREATE_USER_FAIL:
      return { ...state, error: 'Account Creation Failed', loading: false };
    case USER_LOGIN:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false};
    default:
      return state;
  }
};
