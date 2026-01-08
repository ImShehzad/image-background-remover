const imgInput = document.getElementById("img");
const preview = document.getElementById("preview");
const resultImg = document.getElementById("result");

const imagesContainer = document.getElementById("imagesContainer");
const originalCard = document.getElementById("originalCard");
const resultCard = document.getElementById("resultCard");

const removeBtn = document.getElementById("removeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const loader = document.querySelector(".loader");

/* RESET UI */
function resetUI() {
  resultCard.classList.add("d-none");
  downloadBtn.classList.add("d-none");
  removeBtn.classList.remove("d-none");
  resultImg.src = "";
}

/* Image Upload */
imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (!file) return;

  resetUI();

  preview.src = URL.createObjectURL(file);

  imagesContainer.classList.remove("d-none");
  originalCard.classList.remove("d-none");
});

/* Remove Background */
removeBtn.addEventListener("click", async () => {
  const file = imgInput.files[0];
  if (!file) return alert("Please select an image");

  loader.style.display = "block";
  removeBtn.classList.add("d-none");

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("/remove-bg", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Failed");

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    resultImg.src = url;
    downloadBtn.href = url;

    resultCard.classList.remove("d-none");
    downloadBtn.classList.remove("d-none");

  } catch (err) {
    alert("Background removal failed");
    removeBtn.classList.remove("d-none");
  }

  loader.style.display = "none";
});