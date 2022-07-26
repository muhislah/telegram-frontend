const initialState = {
  onlineUser : []
}

const updateUserActive = (state = initialState, action) => {
  if (action.type === 'UPDATE_ONLINE'){
    const data = action.payload
    let users = []
    for ( const prop in data){
      users.push(data[prop])
    }
    console.log(users)
    return {
      onlineUser : users
    }
  }else {
     return state
  }
}

export default updateUserActive