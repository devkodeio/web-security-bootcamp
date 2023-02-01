const axios = require("axios");

axios
  .get("https://www.linkedin.com")
  .then(function (response) {
    const getTitle = response?.data.match(/<title>(.*?)<\/title>/g);
    console.log(getTitle);
  })
  .catch(function (error) {
    console.log("Error", error);
  });
