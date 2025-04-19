const categories = {
    "Built Use": [
      "Residential",
      "Commercial",
      "Industry",
      "Mixed Use",
      "Public & Semi-public_Administrative",
      "Public & Semi-public_Educational",
      "Public & Semi-public_Religious",
      "Recreational"
    ],
    "Building Height": [
      "Ground Floor",
      "G+1 Temporary",
      "G+1",
      "G+2 Temporary",
      "G+2",
      "G+3",
      "G+4 & Above",
      "Under Construction",
      "Abandoned"
    ],
    "Roof Form": [
      "Agraharam Roof",
      "Flat Roof",
      "Pitched Roof",
      "Temporary roof on Ground floor",
      "Temporary roof on Terrace"
    ],
    "Building Age": [
      "0-25 years",
      "25-50 years",
      "50-75 years",
      "75-100 years",
      "100+ years"
    ]
  };
  
  const categorySelect = document.getElementById("categorySelect");
  const subcategoryContainer = document.getElementById("subcategoryContainer");
  const overlayContainer = document.getElementById("overlay-container");
  
  // Clear overlays
  function clearOverlays() {
    overlayContainer.innerHTML = "";
  }
  
  // Create overlays
  function createOverlay(filename) {
    const img = document.createElement("img");
    img.src = filename;
    img.className = "overlay";
    img.style.display = "none";
    img.dataset.overlay = filename;
    overlayContainer.appendChild(img);
    return img;
  }
  
  // Handle checkbox toggle
  function toggleOverlay(filename, show) {
    const overlay = document.querySelector(`img[data-overlay='${filename}']`);
    if (overlay) overlay.style.display = show ? "block" : "none";
  }
  
  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    subcategoryContainer.innerHTML = ""; // Clear previous
  
    if (categories[selectedCategory]) {
      clearOverlays();
  
      categories[selectedCategory].forEach(sub => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = sub;
        checkbox.name = sub;
  
        // Build image file name (space → underscore, : → nothing)
        const safeSub = sub.replace(/[:]/g, "").replace(/ /g, "_");
        const safeCat = selectedCategory.replace(/[:]/g, "").replace(/ /g, "_");
        let filename = `${selectedCategory}_${sub}.png`;
        
        // Custom fix for mismatches
        if (selectedCategory === "Built Use") filename = `Built Use_${sub}.png`;
        if (selectedCategory === "Building Height") filename = `Building Height_${sub}.png`;
        if (selectedCategory === "Roof Form") filename = `Roof Form_${sub}.png`;
        if (selectedCategory === "Building Age") filename = `Building Age_${sub}.png`;
  
        // Append overlay image
        createOverlay(filename);
  
        checkbox.addEventListener("change", () => {
          toggleOverlay(filename, checkbox.checked);
        });
  
        const label = document.createElement("label");
        label.htmlFor = sub;
        label.textContent = sub;
  
        const wrapper = document.createElement("div");
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
  
        subcategoryContainer.appendChild(wrapper);
      });
    }
  });
  