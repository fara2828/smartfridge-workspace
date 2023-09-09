// Importing dependencies
const userExitActions = require('../actions/userExit');  // Renamed from "quitAction"
const userProfileActions = require('../actions/userProfile');

// Action Types
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const FETCH_USER_START = 'FETCH_USER_START';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAIL = 'FETCH_USER_FAIL';
const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';

// Action Creators
const addUserSuccess = (payload) => ({
  type: ADD_USER_SUCCESS,
  payload,
});

const fetchUserStart = (payload) => ({
  type: FETCH_USER_START,
  payload,
});

const fetchUserSuccess = (payload) => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

const fetchUserFail = (payload) => ({
  type: FETCH_USER_FAIL,
  payload,
});

const removeUserSuccess = (payload) => ({
  type: REMOVE_USER_SUCCESS,
  payload,
});

// Initial State
const initialState = {
  isLoggedIn: false,
  user: {
    id: null,
    username: null,
    alias: null,
  },
  isLoading: false,
  error: {
    message: '',
  },
};

// User Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          alias: action.payload.alias,
        },
        isLoading: false,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: {
          message: '로그인 정보 없음',
        },
      };
    case REMOVE_USER_SUCCESS:
      return initialState;
    // Adding quitAction and profileActions
    case userExitActions.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userExitActions.SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        user: {
          id: null,
          username: null,
          alias: null,
        },
      };
    case userExitActions.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: {
          message: '탈퇴 실패',
        },
      };
    case userProfileActions.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: {
          message: null,
        },
      };
    case userProfileActions.SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case userProfileActions.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: {
          message: 'api접속에러같음',
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export {
    addUserSuccess,
    fetchUserStart,
    fetchUserSuccess,
    fetchUserFail,
    removeUserSuccess
  };
  
  export default userReducer;