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
    const tableBody = document.querySelector("#chargersTable tbody");
    const grid = document.getElementById("chargerGrid");

    // Timestamps
    if (data.lastUpdated) {
      const timestamp = new Date(data.lastUpdated);
      const formatted = timestamp.toLocaleString("nl-BE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      document.getElementById("lastUpdated").textContent = `Laatst geüpdatet op ${formatted}`;
    }

    data.chargers.forEach(charger => {
      const name = charger.Name;
      const status = Number(charger.Status);
      const statusText = statusMapping[status] || "Onbekend";
      const statusClass = statusClassMapping[status] || "status-unknown";

      // Tabel (grote schermen)
      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      tdName.textContent = name;
      const tdStatus = document.createElement("td");
      tdStatus.textContent = statusText;
      tdStatus.classList.add(statusClass);
      tr.appendChild(tdName);
      tr.appendChild(tdStatus);
      tableBody.appendChild(tr);

      // Grid (mobiel)
      const card = document.createElement("div");
      card.classList.add("charger-card");

      const nameDiv = document.createElement("div");
      nameDiv.classList.add("charger-name");
      nameDiv.innerHTML = `<span>Laadpaal</span><strong>${name}</strong>`;

      const statusDiv = document.createElement("div");
      statusDiv.classList.add("charger-status", statusClass);
      statusDiv.innerHTML = `<span>Status</span><strong>${statusText}</strong>`;

      card.appendChild(nameDiv);
      card.appendChild(statusDiv);
      grid.appendChild(card);
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
