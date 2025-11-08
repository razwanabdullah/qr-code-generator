const generateBtn = document.getElementById("generateBtn");
const qrContainer = document.getElementById("qrContainer");
const downloadLink = document.getElementById("downloadLink");
const copyBase64Btn = document.getElementById("copyBase64Btn");
const toggleDarkMode = document.getElementById("toggleDarkMode");

generateBtn.addEventListener("click", () => {
  const qrText = document.getElementById("qrText").value.trim();
  const qrSize = parseInt(document.getElementById("qrSize").value);
  const qrColor = document.getElementById("qrColor").value;

  qrContainer.innerHTML = "";
  downloadLink.style.display = "none";
  copyBase64Btn.style.display = "none";

  if (!qrText) {
    alert("Please enter text or URL");
    return;
  }

  // Generate QR Code
  const qrCode = new QRCode(qrContainer, {
    text: qrText,
    width: qrSize,
    height: qrSize,
    colorDark: qrColor,
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Wait for image to render before enabling download/copy
  setTimeout(() => {
    const img = qrContainer.querySelector("img");
    if (img) {
      downloadLink.href = img.src;
      downloadLink.style.display = "block";
      copyBase64Btn.style.display = "inline-block";

      copyBase64Btn.onclick = () => {
        navigator.clipboard.writeText(img.src).then(() => {
          alert("Base64 copied to clipboard!");
        });
      };
    }
  }, 300);
});

// 🌙 Dark Mode Toggle
toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});