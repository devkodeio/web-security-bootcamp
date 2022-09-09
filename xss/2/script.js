const searchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(searchParams);

if (params.search) {
  const search = params.search.replaceAll("script", "");
  // const search = params.search.toLowerCase().replaceAll("script", "");
  // document.write(search);
  document.getElementById("output").append(document.createRange().createContextualFragment(search));
}
