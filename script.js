const proxy = "https://corsproxy.io/?";
const apiKey = "07de5d6b-7ed8-422a-a14a-6841c545e373";
const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

fetch(proxy + url)


async function fetchScores() {
  try {
    const res = await fetch(`https://corsproxy.io/?https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`);
    const data = await res.json();

    if (!data || !data.data || data.data.length === 0) {
      scoresContainer.innerHTML = '<p>No live matches available.</p>';
      return;
    }

    scoresContainer.innerHTML = '';
    // Display logic here (same as before)...
  } catch (err) {
    console.error(err);
    scoresContainer.innerHTML = '<p>Error fetching scores. Try again later.</p>';
  }
}



const apiKey = '07de5d6b-7ed8-422a-a14a-6841c545e373';
const scoresContainer = document.getElementById('scores');

async function fetchScores() {
  try {
    const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`);
    const data = await res.json();

    if (!data || !data.data || data.data.length === 0) {
      scoresContainer.innerHTML = '<p>No live matches available.</p>';
      return;
    }

    scoresContainer.innerHTML = '';

    data.data.forEach(match => {
      const { name, status, score, dateTimeGMT } = match;
      const [team1Score = {}, team2Score = {}] = score || [];

      const matchHTML = `
        <div class="match">
          <h2>${name}</h2>
          <p><strong>Status:</strong> ${status || 'N/A'}</p>
          <p><strong>${team1Score.inning || ''}:</strong> ${team1Score.runs || 0}/${team1Score.wickets || 0} (${team1Score.overs || 0} overs)</p>
          <p><strong>${team2Score.inning || ''}:</strong> ${team2Score.runs || 0}/${team2Score.wickets || 0} (${team2Score.overs || 0} overs)</p>
          <p><strong>Date (GMT):</strong> ${new Date(dateTimeGMT).toLocaleString()}</p>
        </div>
      `;

      scoresContainer.innerHTML += matchHTML;
    });
  } catch (err) {
    console.error(err);
    scoresContainer.innerHTML = '<p>Error fetching scores. Try again later.</p>';
  }
}

fetchScores();
setInterval(fetchScores, 30000); // Refresh every 30 seconds
