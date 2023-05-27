function fetchDataWithThen() {
  const apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      renderTable(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Fetch data from the API using async/await
async function fetchDataWithAsyncAwait() {
  try {
    const apiUrl =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    window.alert(error);
    console.log("Error:", error);
  }
}

// Render the table with the fetched data
function renderTable(data) {
  const tableBody = document.getElementById("coinTableBody");
  tableBody.innerHTML = "";

  data.forEach((coin) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const idCell = document.createElement("td");
    const imageCell = document.createElement("td");
    const symbolCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const volumeCell = document.createElement("td");

    nameCell.textContent = coin.name;
    idCell.textContent = coin.id;
    symbolCell.textContent = coin.symbol;
    priceCell.textContent = coin.current_price;
    volumeCell.textContent = coin.total_volume;

    const image = document.createElement("img");
    image.src = coin.image;
    image.alt = coin.name;
    image.style.width = "30px";
    image.style.height = "30px";

    nameCell.appendChild(image);

    row.appendChild(nameCell);
    row.appendChild(idCell);
    row.appendChild(imageCell);
    row.appendChild(symbolCell);
    row.appendChild(priceCell);
    row.appendChild(volumeCell);

    tableBody.appendChild(row);
  });
}

// Search functionality
document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const tableRows = document.querySelectorAll("#coinTableBody tr");

  tableRows.forEach((row) => {
    const name = row.getElementsByTagName("td")[0].textContent.toLowerCase();

    if (name.includes(searchTerm)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Sort by market cap functionality
document.getElementById("sortMarketCapButton").addEventListener("click", () => {
  const table = document.getElementById("coinTable");
  const tableBody = document.getElementById("coinTableBody");
  const rows = Array.from(tableBody.getElementsByTagName("tr"));

  rows.sort((a, b) => {
    const capA = parseFloat(
      a.getElementsByTagName("td")[4].textContent.replace(",", "")
    );
    const capB = parseFloat(
      b.getElementsByTagName("td")[4].textContent.replace(",", "")
    );
    return capB - capA;
  });

  rows.forEach((row) => tableBody.appendChild(row));
});

// Sort by percentage change functionality
document
  .getElementById("sortPercentageChangeButton")
  .addEventListener("click", () => {
    const table = document.getElementById("coinTable");
    const tableBody = document.getElementById("coinTableBody");
    const rows = Array.from(tableBody.getElementsByTagName("tr"));

    rows.sort((a, b) => {
      const changeA = parseFloat(a.getElementsByTagName("td")[5].textContent);
      const changeB = parseFloat(b.getElementsByTagName("td")[5].textContent);
      return changeB - changeA;
    });

    rows.forEach((row) => tableBody.appendChild(row));
  });

// Fetch data on page load
fetchDataWithAsyncAwait();
// fetchDataWithThen();
