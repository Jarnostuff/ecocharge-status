const statusMapping = {
  0: "Beschikbaar",
  1: "In Gebruik",
  2: "Defect",
  3: "Onbekend"
};

fetch("data/chargers.json")
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#chargersTable tbody");
    data.forEach(charger => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = charger.Name;

      const statusCell = document.createElement("td");
      statusCell.textContent = statusMapping[charger.Status] || "Onbekend";

      row.appendChild(nameCell);
      row.appendChild(statusCell);

      tbody.appendChild(row);
    });
  })
  .catch(error => console.error("Fout bij laden JSON:", error));
