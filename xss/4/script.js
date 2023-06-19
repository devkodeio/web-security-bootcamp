async function addComment() {
  const comment = document.getElementById("comment").value;
  const data = await fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify({
      comment,
    }),
  });

  console.log(data.statusText);

  await loadData();
}

async function loadData() {
  const response = await fetch("/api/comment");
  const list = await response.json();
  console.log(list);
  document.getElementById("output").innerHTML = "";
  const fragment = document.createDocumentFragment();
  list.data.map((data) => {
    const div = document.createElement("div");
    div.classList.add("card");
    // div.innerHTML = data.comment;
    div.append(document.createRange().createContextualFragment(data.comment));
    fragment.append(div);
  });
  document.getElementById("output").append(fragment);
}

loadData();
