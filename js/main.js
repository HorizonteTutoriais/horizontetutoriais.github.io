document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
  }

  if (darkModeToggle) {
    darkModeToggle.onclick = function() {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
  }
});
