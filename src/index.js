import "./styles.css";

/* From course video JavaScript 1 */
if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const dsBody = document.getElementById("dataset-body");
  let tr = document.createElement("tr");
  let td = document.createElement("td");

  // fetch code from https://developer.mozilla.org/en-US/docs/Web/API/Response/json
  fetch(
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff "
  )
    .then((response) => response.json())
    .then((data) => {
      let area = Object.values(data.dataset.dimension.Alue.category.label);
      let population = data.dataset.value;

      fetch(
        "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
      )
        .then((response) => response.json())
        .then((data2) => {
          let employment = data2.dataset.value;
          let employmentPercent = 0;

          for (let x = 0; x < Object.keys(population).length; x++) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.appendChild(document.createTextNode(area[x]));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(population[x]));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(employment[x]));
            tr.appendChild(td);

            td = document.createElement("td");

            employmentPercent = employment[x] / population[x];

            td.appendChild(
              document.createTextNode(formatAsPercent(employmentPercent * 100))
            );
            tr.appendChild(td);

            dsBody.appendChild(tr);
            if (employmentPercent > 0.45) tr.classList.add("above");
            if (employmentPercent < 0.25) tr.classList.add("below");
          }
        });
    });
  //code from https://discuss.codecademy.com/t/changing-background-color-with-class/385183
  let elements = document.getElementsByClassName("above"); // get all elements
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "#abffbd";
  }
}
// function from https://bobbyhadz.com/blog/javascript-format-number-as-percent
function formatAsPercent(num) {
  return new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num / 100);
}
