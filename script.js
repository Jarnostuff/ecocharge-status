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

    // Show timestamp
    if (data.lastUpdated) {
      const timestamp = new Date(data.lastUpdated);
      const formatted = timestamp.toLocaleString("nl-BE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
      });
      const lastUpdatedEl = document.getElementById("lastUpdated");
      lastUpdatedEl.textContent = `Laatst geüpdatet op ${formatted}`;
    }

    // Show chargers
    data.chargers.forEach(charger => {
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

const lastUpdatedEl = document.getElementById("lastUpdated");
const now = new Date();

// Optional: Show in Dutch format (e.g. 20/05/2025 15:37)
const formatted = now.toLocaleString("nl-BE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

lastUpdatedEl.textContent = `Laatst geüpdatet op ${formatted}`;
