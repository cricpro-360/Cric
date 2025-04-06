const apiKey = 'YOUR_API_KEY_HERE'; // Replace this with your API key
const scoresContainer = document.getElementById('scores');

async function fetchScores() {
  try {
    const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=' + apiKey + '&offset=0');
    const data = await response.json();

    if (!data || !data.data) {
      scoresContainer.innerHTML = "No live scores available.";
      return;
    }

    scoresContainer.innerHTML = "";

    data.data.forEach(match => {
      const matchElement = document.createElement('div');
      matchElement.classList.add('match');

      matchElement.innerHTML = `
        <div class="team">
          <span>${match.teams[0]}</span>
          <span>vs</span>
          <span>${match.teams[1]}</span>
        </div>
        <div class="status">${match.status}</div>
      `;

      scoresContainer.appendChild(matchElement);
    });
  } catch (error) {
    console.error(error);
    scoresContainer.innerHTML = "Failed to fetch scores.";
  }
}

fetchScores();
setInterval(fetchScores, 30000); // Auto refresh every 30 seconds
