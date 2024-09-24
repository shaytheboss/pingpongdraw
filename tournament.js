// JavaScript to update the bracket based on the results.json file
document.addEventListener("DOMContentLoaded", function() {
    fetch('results.json')
        .then(response => response.json())
        .then(data => {
            for (const match in data) {
                // Update the winner for each match
                const matchElement = document.querySelector(`#match-${match} .winner`);
                if (matchElement) {
                    matchElement.textContent = data[match]; // Set the winner's name in the bracket
                }
            }
        })
        .catch(error => console.error('Error loading match results:', error));
});
