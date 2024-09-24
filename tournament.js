document.addEventListener("DOMContentLoaded", function() {
    fetch('results.json')
        .then(response => response.json())
        .then(data => {
            // Object to store match winners
            const matchWinners = {};

            // Function to update a match
            function updateMatch(matchNumber) {
                const matchId = `match-${matchNumber}`;
                const matchResult = data[matchNumber];
                const matchElement = document.getElementById(matchId);

                if (matchElement) {
                    const winnerElement = matchElement.querySelector('.winner');
                    const team1Element = matchElement.querySelector('.team1');
                    const team2Element = matchElement.querySelector('.team2');

                    // Update the winner if available
                    if (matchResult && matchResult !== "") {
                        winnerElement.textContent = matchResult;
                        winnerElement.style.display = 'block';
                        matchWinners[matchNumber] = matchResult;
                    } else {
                        winnerElement.style.display = 'none';
                    }
                }
            }

            // Update all matches
            for (let i = 1; i <= 32; i++) {
                updateMatch(i);
            }

            // Function to propagate winners to next matches
            function propagateWinners() {
                // Mapping of matches to their next match and position
                const nextMatches = {
                    1: { next: 18, position: 'team1' },
                    12: { next: 18, position: 'team2' },
                    2: { next: 19, position: 'team1' },
                    13: { next: 19, position: 'team2' },
                    3: { next: 20, position: 'team1' },
                    4: { next: 20, position: 'team2' },
                    5: { next: 21, position: 'team1' },
                    14: { next: 21, position: 'team2' },
                    6: { next: 22, position: 'team1' },
                    15: { next: 22, position: 'team2' },
                    7: { next: 23, position: 'team1' },
                    8: { next: 23, position: 'team2' },
                    9: { next: 24, position: 'team1' },
                    16: { next: 24, position: 'team2' },
                    10: { next: 25, position: 'team1' },
                    17: { next: 25, position: 'team2' },
                    18: { next: 26, position: 'team1' },
                    19: { next: 26, position: 'team2' },
                    20: { next: 27, position: 'team1' },
                    21: { next: 27, position: 'team2' },
                    22: { next: 28, position: 'team1' },
                    23: { next: 28, position: 'team2' },
                    24: { next: 29, position: 'team1' },
                    25: { next: 29, position: 'team2' },
                    26: { next: 30, position: 'team1' },
                    27: { next: 30, position: 'team2' },
                    28: { next: 31, position: 'team1' },
                    29: { next: 31, position: 'team2' },
                    30: { next: 32, position: 'team1' },
                    31: { next: 32, position: 'team2' },
                };

                // Propagate winners
                for (const [matchNum, winnerName] of Object.entries(matchWinners)) {
                    const matchNumber = parseInt(matchNum);
                    const nextMatchInfo = nextMatches[matchNumber];
                    if (nextMatchInfo) {
                        const nextMatchElement = document.getElementById(`match-${nextMatchInfo.next}`);
                        if (nextMatchElement) {
                            const teamElement = nextMatchElement.querySelector(`.${nextMatchInfo.position}`);
                            if (teamElement) {
                                teamElement.textContent = winnerName;
                            }
                        }
                    }
                }
            }

            // After all matches are updated, propagate winners
            propagateWinners();
        })
        .catch(error => console.error('Error loading match results:', error));
});
