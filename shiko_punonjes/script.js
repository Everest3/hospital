var params = window.location.search.substring(1);
var query = parse_query_string(params);

window.onload = function () {
  document.querySelector(".hBack").addEventListener("click", (e) => {
    e.preventDefault();
    window.history.back();
  });
  if (query.id && query.date) {
    document.getElementById("Fshi").addEventListener("click", (e) => fshi(e));

    fetch(
      `https://hospital-38c21-default-rtdb.europe-west1.firebasedatabase.app/${query.date}/${query.id}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data != null) {
          document.getElementById("EMRI").textContent = data.Emri;
          document.getElementById("MBIEMRI").textContent = data.Mbiemri;
          document.getElementById("POZICIONI").textContent = data.Pozicioni;
          document.getElementById("PAGE_ORE").textContent = data.PagaPerOre;
          document.getElementById("DATE_RREGJ").textContent = data.date;
          // console.log(diff(DATE_RREGJ));
          var nr_ditesh = Math.round(
            diff(stringToDate(data.date, "yyyy-mm-dd", "-")) / 1000 / 3600 / 24
          );
          var ore_pune = nr_ditesh * 8;
          document.getElementById("ORE_PUNE").textContent = ore_pune;
          var paga = ore_pune * data.PagaPerOre;
          document.getElementById("PAGA").textContent = paga;
        } else {
          // alert("Bosh");
        }
      })
      .catch((error) => {
        document.body.innerHTML = "";
        var div = document.createElement("div");
        div.className += "container text-center";
        var a = document.createElement("h1");
        a.innerHTML = "Page not found";
        a.className += "mt-5";
        div.appendChild(a);
        var link = document.createElement("a");
        link.className += "btn btn-outline-secondary";
        link.href = "../index.html";
        link.innerHTML = "Home";
        div.appendChild(link);
        document.body.appendChild(div);
      });
  }
  function fshi(e) {
    fetch(
      `https://hospital-38c21-default-rtdb.europe-west1.firebasedatabase.app/${query.date}/${query.id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        window.location.replace("../index.html");
      }) // or res.json()
      .catch((error) => {
        console.log(error);
      });
  }
};

function diff(date_rreg) {
  var date_now = new Date();
  var diff = Math.abs(date_now - date_rreg);
  return diff;
}

function stringToDate(_date, _format, _delimiter) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  return formatedDate;
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}
