const apiKey = '07de5d6b-7ed8-422a-a14a-6841c545e373';
const scoresContainer = document.getElementById('scores');

async function fetchScores() {
  try {
    const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`);
    const data = await response.json();

    if (!data || !data.data) {
      scoresContainer.innerHTML = "No live scores available.";
      return;
    }

    scoresContainer.innerHTML = "";

    data.data.forEach(match => {
      const matchElement = document.createElement('div');
      matchElement.classList.add('match');

      const teams = match.teams;
      const status = match.status || 'Status not available';

      matchElement.innerHTML = `
        <div class="team">
          <span>${teams[0]}</span>
          <span>vs</span>
          <span>${teams[1]}</span>
        </div>
        <div class="status">${status}</div>
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
