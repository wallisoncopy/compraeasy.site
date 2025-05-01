
// Countdown Timer
function startCountdown() {
  let minutes = 10;
  let seconds = 0;
  
  const countdown = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(countdown);
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    
    document.getElementById('countdown').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', startCountdown);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
