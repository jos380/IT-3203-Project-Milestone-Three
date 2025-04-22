// quiz.js file for quiz.html

// Wait for the page to load
window.onload = function() {
    // The answers to the quiz
    var answers = {
        q1: "b",  // Tim Berners-Lee
        q2: "b",  // 1989
        q3: "b",  // Hyper Text Markup Language
        q4: "CERN",  // Fill in the blank
        q5: ["a", "b", "d"]  // CSS, JavaScript, HTTP
    };
    
    // Get elements from the page
    var submitButton = document.getElementById("submit-quiz");
    var restartButton = document.getElementById("restart-quiz");
    var resultsContainer = document.getElementById("results-container");
    var scoreDisplay = document.getElementById("score-display");
    var detailedResults = document.getElementById("detailed-results");
    var passFail = document.getElementById("pass-fail");
    
    // When submit button is clicked
    submitButton.onclick = function() {
        // Initialize score
        var score = 0;
        var results = "";
        
        // Question 1 (Radio)
        var q1Answer = document.querySelector('input[name="q1"]:checked');
        if (q1Answer && q1Answer.value === answers.q1) {
            score++;
            results += '<div class="correct"><p><strong>Question 1:</strong> Correct!</p>';
            results += '<p>Your answer: Tim Berners-Lee</p></div>';
        } else {
            results += '<div class="incorrect"><p><strong>Question 1:</strong> Incorrect</p>';
            results += '<p>Your answer: ' + (q1Answer ? q1Answer.parentNode.textContent.trim() : "No answer") + '</p>';
            results += '<p>Correct answer: Tim Berners-Lee</p></div>';
        }
        
        // Question 2 (Radio)
        var q2Answer = document.querySelector('input[name="q2"]:checked');
        if (q2Answer && q2Answer.value === answers.q2) {
            score++;
            results += '<div class="correct"><p><strong>Question 2:</strong> Correct!</p>';
            results += '<p>Your answer: 1989</p></div>';
        } else {
            results += '<div class="incorrect"><p><strong>Question 2:</strong> Incorrect</p>';
            results += '<p>Your answer: ' + (q2Answer ? q2Answer.parentNode.textContent.trim() : "No answer") + '</p>';
            results += '<p>Correct answer: 1989</p></div>';
        }
        
        // Question 3 (Radio)
        var q3Answer = document.querySelector('input[name="q3"]:checked');
        if (q3Answer && q3Answer.value === answers.q3) {
            score++;
            results += '<div class="correct"><p><strong>Question 3:</strong> Correct!</p>';
            results += '<p>Your answer: Hyper Text Markup Language</p></div>';
        } else {
            results += '<div class="incorrect"><p><strong>Question 3:</strong> Incorrect</p>';
            results += '<p>Your answer: ' + (q3Answer ? q3Answer.parentNode.textContent.trim() : "No answer") + '</p>';
            results += '<p>Correct answer: Hyper Text Markup Language</p></div>';
        }
        
        // Question 4 (Write your answer in empty box)
        var q4Answer = document.querySelector('input[name="q4"]').value.trim().toUpperCase();
        if (q4Answer === answers.q4) {
            score++;
            results += '<div class="correct"><p><strong>Question 4:</strong> Correct!</p>';
            results += '<p>Your answer: ' + q4Answer + '</p></div>';
        } else {
            results += '<div class="incorrect"><p><strong>Question 4:</strong> Incorrect</p>';
            results += '<p>Your answer: ' + (q4Answer || "No answer") + '</p>';
            results += '<p>Correct answer: CERN</p></div>';
        }
        
        // Question 5 (Checkboxes)
        var q5Selected = [];
        var q5Checkboxes = document.querySelectorAll('input[name="q5"]:checked');
        
        // Get all selected values
        for (var i = 0; i < q5Checkboxes.length; i++) {
            q5Selected.push(q5Checkboxes[i].value);
        }
        
        // Check if all correct answers are selected and no incorrect ones
        var allCorrectSelected = true;
        var noIncorrectSelected = true;
        
        // Check if all correct answers were selected
        for (var i = 0; i < answers.q5.length; i++) {
            if (!q5Selected.includes(answers.q5[i])) {
                allCorrectSelected = false;
                break;
            }
        }
        
        // Check if no incorrect answers were selected
        for (var i = 0; i < q5Selected.length; i++) {
            if (!answers.q5.includes(q5Selected[i])) {
                noIncorrectSelected = false;
                break;
            }
        }
        
        // If both conditions are met, the answer is correct
        if (allCorrectSelected && noIncorrectSelected) {
            score++;
            results += '<div class="correct"><p><strong>Question 5:</strong> Correct!</p>';
            results += '<p>Your answer: CSS, JavaScript, HTTP</p></div>';
        } else {
            results += '<div class="incorrect"><p><strong>Question 5:</strong> Incorrect</p>';
            
            // Convert selected checkboxes to text
            var selectedText = [];
            for (var i = 0; i < q5Checkboxes.length; i++) {
                selectedText.push(q5Checkboxes[i].parentNode.textContent.trim());
            }
            
            results += '<p>Your answer: ' + (selectedText.length > 0 ? selectedText.join(", ") : "No answer") + '</p>';
            results += '<p>Correct answer: CSS, JavaScript, HTTP</p></div>';
        }
        
        // Calculate percentage over 5 questions
        var percentage = (score / 5) * 100;
        
        // Display score
        scoreDisplay.innerHTML = "<p>You scored " + score + " out of 5 (" + percentage + "%)</p>";
        
        // Display detailed results
        detailedResults.innerHTML = results;
        
        // Display result message
        if (percentage >= 70) {
            passFail.innerHTML = "<p><strong>PASS</strong>: Congratulations!</p>";
        } else {
            passFail.innerHTML = "<p><strong>FAIL</strong>: Try again to improve your score.</p>";
        }
        
        // Show results and restart button, hide submit button
        resultsContainer.style.display = "block";
        submitButton.style.display = "none";
        restartButton.style.display = "inline-block";
        
        // Disable all form inputs
        var inputs = document.querySelectorAll('#quiz-form input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    };
    
    // When restart button is clicked
    restartButton.onclick = function() {
        // Reset the form
        document.getElementById("quiz-form").reset();
        
        // Hide results and restart button, show submit button
        resultsContainer.style.display = "none";
        submitButton.style.display = "inline-block";
        restartButton.style.display = "none";
        
        // Enable all form inputs
        var inputs = document.querySelectorAll('#quiz-form input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
        
        // Scroll back to top
        window.scrollTo(0, 0);
    };
};