function submitForm() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const selectedBatch = document.getElementById('selectedBatch').value;
    const fees = document.getElementById('fees').value;

    // Basic validation
    let errorMessage = '';

    if (!name) {
        errorMessage += 'Please enter your name.\n';
    }

    if (!age || isNaN(age) || age < 18 || age > 65) {
        errorMessage += 'Please enter a valid age between 18 and 65.\n';
    }

    if (!selectedBatch) {
        errorMessage += 'Please select a batch.\n';
    }

    if (!fees || fees !== '500') {
        errorMessage += 'Please deposit exactly 500 Rs.\n';
    }

    if (errorMessage) {
        displayResponse(errorMessage, 'error');
        return;
    }

    // Construct the user data
    const userData = {
        name: name,
        age: age,
        selectedBatch: selectedBatch,
        fees: fees
    };

    // Make a call to the backend API (replace the URL with your actual API endpoint)
    fetch('http://localhost:3001/enroll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        // Process the response (handle payment if needed)
        handleResponse(data);
    })
    .catch(error => {
        console.error('Error:', error);
        displayResponse('An error occurred. Please try again later.', 'error');
    });
}

function handleResponse(response) {
    console.log('Server response:', response);

    if (response && response.success) {
        displayResponse('Enrollment successful', 'success');
    } else {
        displayResponse(response.message || 'Enrollment failed. Please try again.', 'error');
    }
}

function displayResponse(message, type) {
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = message;
    responseElement.className = `response ${type}`;
}
