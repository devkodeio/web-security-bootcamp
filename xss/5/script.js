function chooseTab(num) {
  const html = "<img src='./img/" + num + ".png' />";
  // const html = '<img src="./img/' + num + '.png" />';
  document.querySelector("#output").innerHTML = html;

  window.location.hash = num;
}

window.onload = function () {
  chooseTab(unescape(self.location.hash.substr(1)) || "1");
};
