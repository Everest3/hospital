document.querySelector("#button").addEventListener("click", submitFunc);
document.querySelector(".hBack").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});

function submitFunc(e) {
  e.preventDefault();
  var e = document.getElementById("pozicioni");
  var pozicioni = e.options[e.selectedIndex].text;
  var data = Array.from(document.querySelectorAll(".form input")).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );
  data["Pozicioni"] = pozicioni;
  var firstDayOfMonth = data.date.split("-")[2];
  if (firstDayOfMonth == "01") {
    fetch(
      `https://hospital-38c21-default-rtdb.europe-west1.firebasedatabase.app/${data.date}.json`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("success");
        document.querySelector("form").reset();
      })
      .catch((error) => {
        alert("failed");
      });
  } else {
    alert("other");
    console.log("yeas");
  }
}

function alert(status) {
  var alert = document.getElementById("alert");
  if (status == "success") {
    alert.className += " alert alert-success text-center";
    alert.append(document.createTextNode("Punojesi u shtua!"));
  } else if (status == "failed") {
    alert.className += " alert alert-danger text-center";
    alert.append(
      document.createTextNode("Pati nje problem ne shtimin e punojesit!")
    );
  } else {
    console.log("blas");
    alert.className += " alert alert-secondary text-center";
    alert.append(
      document.createTextNode(
        "Mund te shtoni punojes vetem diten e pare te muajit."
      )
    );
  }
  setTimeout(function () {
    alert.className = "";
    alert.innerHTML = "";
  }, 2000);
}
