import axios from "axios";
const requestApi = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
 
});

requestApi.interceptors.request.use((req) => {
  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
// Get the value of the 'authToken' cookie
const authToken = getCookie('authToken') || JSON.parse(localStorage.getItem('authToken'))
  // const authToken = JSON.parse(localStorage.getItem("seller_tokenData"));

  if (authToken || req?.data?.authToken) {
    let tokens = req?.data?.authToken ?? "";
    let newtoken = authToken ?? tokens;
    req.headers = {
      Authorization: `Bearer ${newtoken}`,
      // "Content-Type": "application/x-www-form-urlencoded"
    };
  }
  return Promise.resolve(req);
});
requestApi.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data?.meta?.status === 1) {
      return Promise.resolve(data);
    } else {
      // store.dispatch({type : "test", payload : "/test"})
        // history.push("/hello")
        // window.location.href = "/";
      let error = {
        message: "Something went Wrong",
        statusCode: 500,
      };
      error.message = data.meta.message;
      error.statusCode = data.statusCode;
      return Promise.reject(error);
    }
  },
  function (error) {
    console.log(error,"error")
    return Promise.reject(error?.response?.data);
  }
);

export default requestApi;
