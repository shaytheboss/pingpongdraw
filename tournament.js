document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON file containing the results
    fetch('results.json')
        .then(response => response.json())
        .then(data => {
            for (const match in data) {
                const winner = data[match];
                const matchElement = document.querySelector(`#match-${match} .winner`);
                
                // If there is a winner, display it
                if (winner) {
                    matchElement.textContent = winner;
                    matchElement.style.display = 'block';  // Show the winner row
                } else {
                    matchElement.style.display = 'none';  // Hide the winner row if no result
                }
            }
        })
        .catch(error => console.error('Error loading match results:', error));
});
