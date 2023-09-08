// response.js

// TypeScript의 interface 대신에 JavaScript의 객체를 사용하여 표현
const Success = (data) => {
    return {
      result: 'success',
      data: data
    };
  };
  
  const Failure = (error) => {
    return {
      result: 'fail',
      error: error
    };
  };
  
  // CommonJS 스타일로 export
  module.exports = {
    Success,
    Failure
  };
  