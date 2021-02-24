const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const user = await response.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const user = await response.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  const message = await response.json();
  dispatch(removeUser());
  return message;
};


export const signUp = (username, email, password, city, state, profileImage) => async (dispatch) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("profileImage", profileImage);

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData,
  });
  const user = await response.json();
  if (!user.errors) {
    dispatch(setUser(user));
  }
  return user;
};

const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.payload.errors && action.payload.errors[0] === "Unauthorized") {
        return { ...state, user: null }
      }
      return { ...state, user: action.payload }
    case REMOVE_USER:
      return { ...state, user: null }
    default:
      return state;
  }
};

export default sessionReducer;
