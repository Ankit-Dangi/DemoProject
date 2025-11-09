const resultcontainer = document.getElementById("results");
const searchInput = document.getElementById("search");

async function fetchVisuals() {
  try {
    
    const response = await fetch("http://localhost:5000/api/DemoVisuals");

    const data = await response.json();

    window.visualData = data.items;
    displayVisuals(window.visualData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayVisuals(list) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (list.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  list.forEach(visual => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${visual.imagePath}" alt="${visual.name}">
      <h3>${visual.name}</h3>
    `;

    card.addEventListener("click", () => {
      alert(
        `Name: ${visual.name}\nDescription: ${visual.description}\nWorkspace: ${visual.workspacePath}`
      );
    });

    resultsDiv.appendChild(card);
  });
}

document.getElementById("search").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  const filtered = window.visualData.filter(v => v.name.toLowerCase().includes(query));
  displayVisuals(filtered);
});

// Run fetch on page load7\
fetchVisuals();
