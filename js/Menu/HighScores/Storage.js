function GetHighScores()
{
    let scores = JSON.parse(window.localStorage.getItem('HighScores'));

    if (!scores) return {};

    return scores;
}

function SetHighScore(score, difficulty)
{
    let scores = GetHighScores();
    
    let currentHighScore = scores[difficulty];

    if (!currentHighScore || score.score > currentHighScore.score)
    {
        scores[difficulty] = score;

        window.localStorage.setItem('HighScores', JSON.stringify(scores));
    }
}