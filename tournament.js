document.addEventListener("DOMContentLoaded", function() {
    fetch('results.json')
        .then(response => response.json())
        .then(data => {
            const matchWinners = {};
            const matchLosers = {};

            // Update matches and collect winners and losers
            for (let i = 1; i <= 32; i++) {
                updateMatch(i, data);
            }

            // After updating all matches, propagate winners and losers
            propagateResults();

            function updateMatch(matchNumber, data) {
                const matchId = `match-${matchNumber}`;
                const matchElement = document.getElementById(matchId);

                if (matchElement) {
                    const winnerElement = matchElement.querySelector('.winner');
                    const team1Element = matchElement.querySelector('.team1');
                    const team2Element = matchElement.querySelector('.team2');

                    const result = data[matchNumber];

                    if (result && result !== "") {
                        winnerElement.textContent = `מנצח: ${result}`;
                        winnerElement.style.display = 'block';

                        // Determine the loser
                        let loser;
                        if (team1Element.textContent === result) {
                            loser = team2Element.textContent;
                        } else {
                            loser = team1Element.textContent;
                        }

                        matchWinners[matchNumber] = result;
                        matchLosers[matchNumber] = loser;
                    } else {
                        winnerElement.style.display = 'none';
                    }
                }
            }

            function propagateResults() {
                // Mapping for winners
                const nextMatchesWinners = {
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

                // Mapping for losers
                const nextMatchesLosers = {
                    1: { next: 12, position: 'team1' },
                    2: { next: 12, position: 'team2' },
                    3: { next: 13, position: 'team1' },
                    4: { next: 13, position: 'team2' },
                    5: { next: 14, position: 'team1' },
                    6: { next: 14, position: 'team2' },
                    7: { next: 15, position: 'team1' },
                    8: { next: 15, position: 'team2' },
                    9: { next: 16, position: 'team1' },
                    10: { next: 16, position: 'team2' },
                    11: { next: 17, position: 'team1' },
                    // Match 17 loser does not proceed further
                };

                // Propagate winners
                for (const matchNum in matchWinners) {
                    const winnerName = matchWinners[matchNum];
                    const nextMatchInfo = nextMatchesWinners[matchNum];

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

                // Propagate losers
                for (const matchNum in matchLosers) {
                    const loserName = matchLosers[matchNum];
                    const nextMatchInfo = nextMatchesLosers[matchNum];

                    if (nextMatchInfo) {
                        const nextMatchElement = document.getElementById(`match-${nextMatchInfo.next}`);
                        if (nextMatchElement) {
                            const teamElement = nextMatchElement.querySelector(`.${nextMatchInfo.position}`);
                            if (teamElement && teamElement.textContent.includes('מפסיד משחק')) {
                                teamElement.textContent = loserName;
                            }
                        }
                    }
                }
            }
        })
        .catch(error => console.error('Error loading match results:', error));
});
