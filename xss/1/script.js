const searchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(searchParams);

if (params.search) {
  const search = params.search;
  document.write(search);
  //   document.getElementById("output").append(document.createRange().createContextualFragment(search));
}
