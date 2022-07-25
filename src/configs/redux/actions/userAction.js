import axios from "axios";

export const userAction = (token) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` } 
    };
    const result = await axios.get(process.env.REACT_APP_BACKEND_API+'/profile/all', config)
    const data = result.data.data
    console.log(data)
    dispatch({ type: 'GET_USER', payload: data })
  } catch (error) {
    console.log(error)
  }
}