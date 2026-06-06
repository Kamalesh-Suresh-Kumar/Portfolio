// JS: The logic for the falling binary code
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to use (0 and 1 as seen in your video)
const binary = "01";
// Convert string to array for easier access
const characters = binary.split("");

const fontSize = 16;
const columns = canvas.width / fontSize; // Number of columns for the rain

// An array of drops - one per column
const drops = [];
// Initialize all drops to y coordinate 1
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function draw() {
  // Black BG for the canvas
  // Translucent BG to show trail effect (0.05 opacity)
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0"; // Green text
  ctx.font = fontSize + "px monospace";

  // Loop over drops
  for (let i = 0; i < drops.length; i++) {
    // A random character to print
    const text = characters[Math.floor(Math.random() * characters.length)];

    // x = i * fontSize, y = value of drops[i] * fontSize
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Sending the drop back to the top randomly after it has crossed the screen
    // Adding a randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // Increment Y coordinate
    drops[i]++;
  }
}

// Loop the animation
setInterval(draw, 33);

// Handle window resize to keep canvas full screen
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Recalculate columns on resize
  const newColumns = canvas.width / fontSize;
  drops.length = 0; // Clear array
  for (let x = 0; x < newColumns; x++) {
    drops[x] = 1;
  }
});
