document.addEventListener("DOMContentLoaded", function() {
    fetch('results.json')
        .then(response => response.json())
        .then(data => {
            // Store the results of each match
            const results = {};

            // Update the bracket and propagate winners
            for (const match in data) {
                const winner = data[match];
                const matchElement = document.querySelector(`#match-${match} .winner`);

                // If there is a winner, update the current match and propagate to the next round
                if (winner) {
                    matchElement.textContent = winner;
                    matchElement.style.display = 'block'; // Show the winner row
                    
                    // Store the winner and propagate to the next match
                    results[`match-${match}`] = winner;
                    propagateWinner(match, winner);
                } else {
                    matchElement.style.display = 'none'; // Hide the winner row if no result
                }
            }

            function propagateWinner(match, winner) {
                // Determine which next match this winner should go to (based on the bracket structure)
                const nextMatchMapping = {
                    "1": "18", "12": "18",
                    "2": "19", "13": "19",
                    "3": "20", "4": "20",
                    "5": "21", "14": "21",
                    "6": "22", "15": "22",
                    "7": "23", "8": "23",
                    "9": "24", "16": "24",
                    "10": "25", "17": "25",
                    "18": "26", "19": "26",
                    "20": "27", "21": "27",
                    "22": "28", "23": "28",
                    "24": "29", "25": "29",
                    "26": "30", "27": "30",
                    "28": "31", "29": "31",
                    "30": "32", "31": "32"
                };

                // Check if there is a next match to send the winner to
                if (nextMatchMapping[match]) {
                    const nextMatch = nextMatchMapping[match];
                    const nextMatchElement = document.querySelector(`#match-${nextMatch} .team:first-of-type`);

                    // Ensure the next match element is valid
                    if (nextMatchElement) {
                        // Update the first available team slot in the next match
                        nextMatchElement.textContent = winner;
                    }
                }
            }
        })
        .catch(error => console.error('Error loading match results:', error));
});
