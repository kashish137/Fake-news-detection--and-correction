document.addEventListener('DOMContentLoaded', function() {
  // Process button click handler
  document.getElementById('process-btn').addEventListener('click', function() {
    const processingIndicator = document.getElementById('processing-indicator');
    const resultsSection = document.getElementById('results');
    
    // Show loading and hide results
    processingIndicator.classList.remove('hidden');
    resultsSection.style.display = 'none';
  });

  // Star rating system
  let selectedRating = 0;
  const stars = document.querySelectorAll(".star");

  stars.forEach((star) => {
    star.addEventListener("click", function() {
      selectedRating = parseInt(this.getAttribute("data-value"));
      updateStars(selectedRating);
      
      // Show feedback textarea for low ratings
      const feedbackText = document.getElementById("feedback-text");
      feedbackText.style.display = selectedRating <= 2 ? 'block' : 'none';
    });
    
    // Hover effects
    star.addEventListener("mouseenter", function() {
      const value = parseInt(this.getAttribute("data-value"));
      updateStars(value, true);
    });
    
    star.addEventListener("mouseleave", function() {
      updateStars(selectedRating);
    });
  });

  function updateStars(rating, isHover = false) {
    stars.forEach((star) => {
      const value = parseInt(star.getAttribute("data-value"));
      star.textContent = value <= rating ? "★" : "☆";
      star.style.color = (value <= rating) ? "#ffc107" : (isHover ? "#ccc" : "#ffc107");
    });
  }

  // Feedback submission
  document.getElementById("submit-feedback").addEventListener("click", function() {
    const feedbackMessage = document.getElementById("feedback-message");
    
    if (selectedRating === 0) {
      feedbackMessage.textContent = 'Please select a rating first';
      feedbackMessage.style.color = 'red';
      return;
    }
    
    feedbackMessage.textContent = 'Thank you for your feedback!';
    feedbackMessage.style.color = 'green';
    
    // Prepare data (in a real app, you'd send this to your backend)
    const feedbackData = {
      rating: selectedRating,
      comment: document.getElementById("feedback-text").value,
      newsContent: document.querySelector('.content-box p').textContent,
      prediction: document.querySelector('.tag-fake, .tag-real').textContent
    };
    
    console.log('Feedback data:', feedbackData);
  });

  // Auto-expand textarea
  document.getElementById('feedback-text').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
});