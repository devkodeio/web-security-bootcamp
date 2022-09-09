const searchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(searchParams);

if (params.search) {
  const search = params.search;
  document.getElementById("output").innerHTML = search;
}
