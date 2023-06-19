const searchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(searchParams);

if (params.search) {
  const input = params.search.replaceAll("script", "");
  const search = '<h4>No results found for "' + input +'"</h4>'
  // const search = params.search.toLowerCase().replaceAll("script", "");
  // document.write(search);
  document.getElementById("output").append(document.createRange().createContextualFragment(search));
}
