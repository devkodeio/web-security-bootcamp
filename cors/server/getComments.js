const axios = require("axios");

axios
  .get("http://localhost:9999/api/comment")
  .then(function (response) {
    console.log(response?.data);
  })
  .catch(function (error) {
    console.log(error);
  });
