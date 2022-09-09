function showPreview(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const src = URL.createObjectURL(file);
    const img = "<img src='" + src + "'>";
    document.getElementById("output").innerHTML = "File Uploaded Successfully: " + file.name;
    document.getElementById("preview").innerHTML = img;
  }
}
