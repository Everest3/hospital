// document.getElementById("shiko").addEventListener("click", shiko);
window.onload = function () {
  var date = document.querySelector("input");
  date.addEventListener("change", shiko);
  shiko();
  function shiko() {
    var delAlert = document.getElementById("alert");
    delAlert.className = "";
    delAlert.innerHTML = "";
    var table = document.querySelector("table");
    if (table != null) {
      table.remove();
    }
    fetch(
      `https://hospital-38c21-default-rtdb.europe-west1.firebasedatabase.app/${date.value}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          table = document.createElement("table");
          table.className += " table table-bordered";
          var row = table.insertRow(0);
          row.insertCell(0).outerHTML =
            "<th>Emri</th><th>Mbiemri</th><th>Pozicioni</th><th></th>";
          table.appendChild(row);
          Object.keys(data).map((key) => {
            var user = data[key];
            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            var text1 = document.createTextNode(user.Emri);
            td1.appendChild(text1);
            var td2 = document.createElement("td");
            var text2 = document.createTextNode(user.Mbiemri);
            td2.appendChild(text2);
            var td3 = document.createElement("td");
            var text3 = document.createTextNode(user.Pozicioni);
            td3.appendChild(text3);
            var td4 = document.createElement("td");
            var a = document.createElement("a");
            a.href = `./shiko_punonjes/index.html?id=${key}&date=${date.value}`;
            a.textContent = "SHIKO";
            a.style.fontSize = "20";
            a.className += "btn btn-lg";
            td4.appendChild(a);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.appendChild(tr);
          });
          var container = document.querySelector(".container");
          container.appendChild(table);
        } else {
          alert("Bosh");
        }
      })
      .catch((error) => {
        alert("failed");
      });
  }
};
function alert(check) {
  var alert = document.getElementById("alert");
  if (check == "Bosh") {
    alert.className += " alert alert-secondary text-center";
    alert.append(
      document.createTextNode("Nuk ka punojes te rregjistruar ne kete date")
    );
  } else {
    alert.className += " alert alert-danger text-center";
    alert.append(
      document.createTextNode("Pati nje problem ne afishimin e te dhenave")
    );
  }
  setTimeout(function () {
    alert.className = "";
    alert.innerHTML = "";
  }, 4000);
}
