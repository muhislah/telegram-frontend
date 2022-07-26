const initialState = []

const userReducer = (state = initialState, action) => {
  if (action.type === 'GET_USER'){
     return [
      ...action.payload
     ]
  }else {
     return state
  }
}

export default userReducer