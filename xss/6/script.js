const searchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(searchParams);

function search(value) {
  if(!value) return;
  const html = "<img src='./img/1.gif?search=" + value + "'>";
  document.querySelector("#output").innerHTML = html;
}

window.onload = function () {
  const input = params.search;
  // const input = params.search.toLowerCase().replaceAll("onload", "");
  search(input);
};
