document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.mainForm');
    const predictionContainer = document.getElementById('prediction-container');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Validating user input
        const yearInput = document.getElementById('Year');
        const presentPriceInput = document.getElementById('Present_Price');
        const kmsDrivenInput = document.getElementById('Kms_Driven');
        const fuelTypeInput = document.getElementById('Fuel_Type');
        const sellerTypeInput = document.getElementById('Seller_Type');
        const transmissionInput = document.getElementById('Transmission');
        const ownerInput = document.getElementById('Owner');

        // Checking all the input fields are filled
        let firstEmptyInput;
        let isValid = true;

        // Clearing error messages
        const errorMessages = document.getElementsByClassName('error-message');
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].textContent = '';
        }

        if (yearInput.value.trim() === '') {
            firstEmptyInput = yearInput;
            isValid = false;
            document.getElementById('year-error').textContent = 'Please enter a valid year.';
        } else if (presentPriceInput.value.trim() === '') {
            firstEmptyInput = presentPriceInput;
            isValid = false;
            document.getElementById('present-price-error').textContent = 'Please enter a valid present price.';
        } else if (kmsDrivenInput.value.trim() === '') {
            firstEmptyInput = kmsDrivenInput;
            isValid = false;
            document.getElementById('kms-driven-error').textContent = 'Please enter valid kilometers driven.';
        } else if (fuelTypeInput.value.trim() === '') {
            firstEmptyInput = fuelTypeInput;
            isValid = false;
            document.getElementById('fuel-type-error').textContent = 'Please enter a valid fuel type.';
        } else if (sellerTypeInput.value.trim() === '') {
            firstEmptyInput = sellerTypeInput;
            isValid = false;
            document.getElementById('seller-type-error').textContent = 'Please enter a valid seller type.';
        } else if (transmissionInput.value.trim() === '') {
            firstEmptyInput = transmissionInput;
            isValid = false;
            document.getElementById('transmission-error').textContent = 'Please enter a valid transmission type.';
        } else if (ownerInput.value.trim() === '') {
            firstEmptyInput = ownerInput;
            isValid = false;
            document.getElementById('owner-error').textContent = 'Please enter a valid number of previous owners.';
        }

        // If there is an empty input field, scroll to it and focus it
        if (firstEmptyInput) {
            firstEmptyInput.scrollIntoView({ behavior: 'smooth' });
            firstEmptyInput.focus();
            return;
        }

        const year = Number(yearInput.value);
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || year < 1995 || year > currentYear) {
            document.getElementById('year-error').textContent = 'Please enter a valid year between 1995 and ' + currentYear + '.';
            yearInput.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const presentPrice = Number(presentPriceInput.value);
        if (isNaN(presentPrice) || presentPrice <= 0) {
            document.getElementById('present-price-error').textContent = 'Please enter a valid positive number for the present price.';
            presentPriceInput.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const kmsDriven = Number(kmsDrivenInput.value);
        if (isNaN(kmsDriven) || kmsDriven < 0) {
            document.getElementById('kms-driven-error').textContent = 'Please enter a valid positive value for kilometers driven.';
            kmsDrivenInput.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        const fuelType = capitalizeFirstLetter(fuelTypeInput.value.trim().toLowerCase());
        if (fuelType !== 'Petrol' && fuelType !== 'Diesel' && fuelType !== 'Cng') {
            document.getElementById('fuel-type-error').textContent = 'Please enter a valid fuel type (Petrol, Diesel, or CNG).';
            fuelTypeInput.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const sellerType = capitalizeFirstLetter(sellerTypeInput.value.trim().toLowerCase());
        if (sellerType !== 'Dealer' && sellerType !== 'Individual') {
            document.getElementById('seller-type-error').textContent = 'Please enter a valid seller type (Dealer or Individual).';
            sellerTypeInput.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const transmission = capitalizeFirstLetter(transmissionInput.value.trim().toLowerCase());
        if (transmission !== 'Manual' && transmission !== 'Automatic') {
            document.getElementById('transmission-error').textContent = 'Please enter a valid transmission type (Manual or Automatic).';
            transmissionInput.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        // Submit the form if all validations pass
        if (isValid) {
            // Makeing asynchronous request to the server
            const formData = new FormData(form);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    displayPrediction(response.prediction);
                }
            };
            xhr.send(formData);
        }
    });

    function displayPrediction(prediction) {
        // Create a new element to display the prediction
        const predictionElement = document.createElement('div');
        predictionElement.textContent = 'The price of this car should be INR ' + prediction + ' Lakhs';
        predictionElement.classList.add('prediction-result');

        // Get the prediction container
        const predictionContainer = document.getElementById('prediction-container');

        // Clear existing predictions
        predictionContainer.innerHTML = '';

        // Append the prediction element to the prediction container
        predictionContainer.appendChild(predictionElement);

        // Scroll to the prediction result
        predictionElement.scrollIntoView({ behavior: 'smooth' });
    }
});