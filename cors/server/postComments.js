const axios = require("axios");

axios
  .post("http://localhost:9999/api/comment", { comment: "Hello from Server without CORS Error!" })
  .then(function (response) {
    console.log(response?.data);
  })
  .catch(function (error) {
    console.log(error);
  });
