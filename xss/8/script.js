function showPreview(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    var src = URL.createObjectURL(file);
    var html = "<img src='" + src + "' alt='" + file.name + "'>";
    document.getElementById("output").innerHTML = html;
  }
}
