// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    const commentsArea = document.getElementById('comments');
    const charCountSpan = document.getElementById('char-count');
    const feedbackDisplay = document.getElementById('feedback-display');

    // ---------------------------------------------------------
    // Step 1: Character Count & Event Delegation/Bubbling
    // ---------------------------------------------------------
    // Using delegation on the form to catch input/keydown events
    form.addEventListener('input', (event) => {
        if (event.target === commentsArea) {
            const count = commentsArea.value.length;
            charCountSpan.textContent = count;
        }
    });

    // ---------------------------------------------------------
    // Step 2: Tooltip Mouse Events (Mouseover / Mouseout)
    // ---------------------------------------------------------
    form.addEventListener('mouseover', (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            const tooltip = event.target.parentElement.querySelector('.tooltip');
            if (tooltip) tooltip.style.display = 'block';
        }
    });

    form.addEventListener('mouseout', (event) => {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            const tooltip = event.target.parentElement.querySelector('.tooltip');
            if (tooltip) tooltip.style.display = 'none';
        }
    });

    // ---------------------------------------------------------
    // Step 3: Form Submission, Validation & stop Propagation
    // ---------------------------------------------------------
    form.addEventListener('submit', (event) => {
        // Prevent default submission behavior (reloading page)
        event.preventDefault(); 
        
        // Stop background clicks/events from triggering form related logic
        event.stopPropagation(); 

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const comments = commentsArea.value.trim();

        // Simple validation checks
        let isValid = true;

        if (!username) {
            document.getElementById('name-error').textContent = "Name is required.";
            isValid = false;
        } else {
            document.getElementById('name-error').textContent = "";
        }

        if (!email) {
            document.getElementById('email-error').textContent = "Email is required.";
            isValid = false;
        } else {
            document.getElementById('email-error').textContent = "";
        }

        if (!comments) {
            document.getElementById('comments-error').textContent = "Comments cannot be empty.";
            isValid = false;
        } else {
            document.getElementById('comments-error').textContent = "";
        }

        // If validation passes, dynamically append entries
        if (isValid) {
            const feedbackEntry = document.createElement('div');
            feedbackEntry.classList.add('feedback-entry');
            feedbackEntry.innerHTML = `
                <p><strong>Name:</strong> ${username}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Feedback:</strong> ${comments}</p>
                <hr>
            `;
            feedbackDisplay.appendChild(feedbackEntry);

            // Reset form and character counter
            form.reset();
            charCountSpan.textContent = 0;
        }
    });
});