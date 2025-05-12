document.getElementById('process-btn').addEventListener('click', function () {
  document.getElementById('processing-indicator').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('processing-indicator').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('original-news').classList.add('hidden');
    document.getElementById('corrected-news').classList.remove('hidden');
  }, 3000);
});

let selectedRating = 0;
// Example condition: if credibility is above 70%, it's REAL
const credibilityScore = 89; // Change this dynamically in a real app
const tagElement = document.querySelector(".tags .tag-fake");

if (credibilityScore >= 70) {
  tagElement.textContent = "REAL";
  tagElement.classList.remove("tag-fake");
  tagElement.classList.add("tag-real");
} else {
  tagElement.textContent = "FAKE";
  tagElement.classList.remove("tag-real");
  tagElement.classList.add("tag-fake");
}

// Handle star clicks
const stars = document.querySelectorAll(".star");
stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.getAttribute("data-value"));
    updateStars(selectedRating);
  });
});

function updateStars(rating) {
  stars.forEach((star) => {
    const value = parseInt(star.getAttribute("data-value"));
    star.textContent = value <= rating ? "★" : "☆";
  });
}


// Handle feedback submission
document.getElementById("submit-feedback").addEventListener("click", () => {
  const feedbackText = document.getElementById("feedback-text");

  // Simulate feedback save or process
  feedbackText.value = "Thank you for submitting your feedback.";
  feedbackText.disabled = true;

  // Optional: prevent duplicate submissions
  document.getElementById("submit-feedback").disabled = true;
});

