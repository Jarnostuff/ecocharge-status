const statusMapping = {
  0: "Beschikbaar",
  1: "In Gebruik",
  2: "Defect",
  3: "Onbekend"
};

const statusClassMapping = {
  0: "status-available",
  1: "status-inuse",
  2: "status-defective",
  3: "status-unknown"
};

fetch("data/chargers.json")
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#chargersTable tbody");
    data.forEach(charger => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = charger.Name;
      nameCell.setAttribute("data-label", "Naam");

      const status = Number(charger.Status);
      const statusText = statusMapping[status] || "Onbekend";
      const statusClass = statusClassMapping[status] || "status-unknown";

      const statusCell = document.createElement("td");
      statusCell.textContent = statusText;
      statusCell.classList.add(statusClass);
      statusCell.setAttribute("data-label", "Status");

      row.appendChild(nameCell);
      row.appendChild(statusCell);
      tbody.appendChild(row);
    });
  })
  .catch(error => console.error("Fout bij laden JSON:", error));
