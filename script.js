document.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements
  const verificationForm = document.getElementById('verification-form');
  const verifyButton = document.getElementById('verify-button');
  const buttonText = verifyButton.querySelector('.button-text');
  const spinner = document.getElementById('spinner');
  const inputField = document.getElementById('internship-id');
  const resultContainer = document.getElementById('result-container');
  
  // Set current year in the footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Handle form submission
  verificationForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      
      const internshipId = inputField.value.trim();
      if (!internshipId) {
          // Simple validation: if input is empty, do nothing.
          // 'required' attribute on input handles this visually.
          return;
      }

      // --- Start the verification process ---
      showLoadingState(true);
      hideResult();

      // Simulate an API call
      simulateApiCall(internshipId)
          .then(data => {
              displayResult(data);
          })
          .catch(error => {
              // This would handle network errors in a real app
              const errorData = {
                  status: 'error',
                  title: 'Network Error',
                  message: 'Could not connect to the server. Please try again later.'
              };
              displayResult(errorData);
          })
          .finally(() => {
              // Always hide loading state, regardless of outcome
              showLoadingState(false);
          });
  });

  /**
   * Toggles the loading state of the verification button.
   * @param {boolean} isLoading - True to show loading, false to hide.
   */
  function showLoadingState(isLoading) {
      if (isLoading) {
          verifyButton.disabled = true;
          verifyButton.classList.add('loading');
      } else {
          verifyButton.disabled = false;
          verifyButton.classList.remove('loading');
      }
  }

  /**
   * Simulates fetching data from a server.
   * Returns a Promise that resolves with mock data after a delay.
   * @param {string} id - The ID being verified.
   */
  function simulateApiCall(id) {
      console.log(`Verifying ID: ${id}...`);
      
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              // --- Dummy Data Logic ---
              // In a real app, this is where you'd use fetch() to a real API endpoint.
              // Here, we'll return different results based on the input for demonstration.
              if (id.toLowerCase() === 'voc-123') {
                  resolve({
                      status: 'success',
                      title: 'Internship Verified!',
                      message: `Congratulations! The internship for ID ${id} is confirmed.`
                  });
              } else if (id.toLowerCase() === 'voc-456') {
                   resolve({
                      status: 'pending',
                      title: 'Verification Pending',
                      message: `The status for ID ${id} is still under review.`
                  });
              } else {
                  resolve({
                      status: 'error',
                      title: 'Not Found',
                      message: `No internship record was found for ID ${id}.`
                  });
              }
          }, 1500); // Simulate 1.5 seconds of network latency
      });
  }

  /**
   * Displays the verification result in the UI.
   * @param {object} data - The result data object.
   */
  function displayResult(data) {
      // Create the result card HTML
      const resultHTML = `
          <div class="result-card ${data.status}">
              <h3>${data.title}</h3>
              <p>${data.message}</p>
          </div>
      `;
      resultContainer.innerHTML = resultHTML;

      // Animate the container into view
      resultContainer.style.padding = '0'; // Reset for animation
      resultContainer.style.maxHeight = resultContainer.scrollHeight + 'px';
  }

  /**
   * Hides the result container.
   */
  function hideResult() {
      resultContainer.style.maxHeight = '0';
      resultContainer.style.padding = '0';
  }
});