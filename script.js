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
