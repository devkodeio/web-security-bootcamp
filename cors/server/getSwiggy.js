const axios = require("axios");

axios
  .get("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.4723392&lng=80.3447932&page_type=DESKTOP_WEB_LISTING")
  .then(function (response) {
    console.log(JSON.stringify(response?.data));
  })
  .catch(function (error) {
    console.log("Error", error);
  });
