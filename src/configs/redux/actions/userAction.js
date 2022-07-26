import axios from "axios";

export const userAction = (token, search) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` } 
    };
    const result = await axios.get(process.env.REACT_APP_BACKEND_API+'/profile/all'+(search ? "?search="+search : ""), config)
    const data = result.data.data
    dispatch({ type: 'GET_USER', payload: data })
  } catch (error) {
    console.log(error)
  }
}