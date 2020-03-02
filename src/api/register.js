// Mock server calls
export const register = (payload) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      let response;

      // NOTE: can force error state by setting window.forceRegisterApiError to true in console

      if (window.forceRegisterApiError) {
        response = {
          data: {
            error: 'An error occurred while attempting to register, please refresh the page and try again later.',
          },
        };
        reject(response)
      } else {
        response = {data: {...payload}};
        delete response.data.password; // would never return a password from server

        resolve(response);
      }

      console.log(
        {
          payload,
          response,
        }
      )
    }, 2000);
  });
}

export const getViewModel = () => {
  return new Promise(resolve => {
    window.setTimeout(resolve, 3000);
  })
}