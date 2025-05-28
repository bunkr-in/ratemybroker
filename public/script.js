// JavaScript for Broker Ratings Website

document.addEventListener('DOMContentLoaded', () => {
    console.log('Broker Ratings Website Loaded');
    fetchAndDisplayBrokers();
    // The addBrokerForm and its event listener have been removed as per the new requirement
    // to hardcode broker data and remove the POST functionality.
});

function generateStarRating(rating, maxStars = 5) {
    const fullStar = '★';
    const emptyStar = '☆';
    let stars = '';
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest 0.5 for half stars, though we use full/empty for simplicity here

    for (let i = 1; i <= maxStars; i++) {
        if (i <= roundedRating) {
            stars += fullStar;
        } else {
            stars += emptyStar;
        }
    }
    return stars;
}

function renderBrokerCards(brokers) {
    const brokerListDiv = document.getElementById('brokerList');
    if (!brokerListDiv) {
        console.error('Broker list container not found!');
        return;
    }

    brokerListDiv.innerHTML = ''; // Clear any existing static content or previous results

    if (!brokers || brokers.length === 0) {
        brokerListDiv.innerHTML = '<p>No broker data available at the moment.</p>';
        return;
    }

    brokers.forEach(broker => {
        const card = document.createElement('div');
        card.className = 'broker-card';

        const nameEl = document.createElement('h2');
        nameEl.textContent = broker.name;
        card.appendChild(nameEl);

        if (broker.organization) {
            const orgEl = document.createElement('p');
            orgEl.innerHTML = `<span class="label">Organization:</span> ${broker.organization}`;
            card.appendChild(orgEl);
        }

        if (broker.phone) {
            const phoneEl = document.createElement('p');
            // Remove non-numeric characters from the phone number for the wa.me link
            const numericPhoneNumber = broker.phone.replace(/\D/g, '');
            phoneEl.innerHTML = `<span class="label">Phone:</span> <a href="https://wa.me/${numericPhoneNumber}" target="_blank" rel="noopener noreferrer">${broker.phone}</a>`;
            card.appendChild(phoneEl);
        }

        if (broker.city) {
            const cityEl = document.createElement('p');
            cityEl.innerHTML = `<span class="label">City:</span> ${broker.city}`;
            card.appendChild(cityEl);
        }

        if (broker.localities) {
            const localitiesEl = document.createElement('p');
            localitiesEl.innerHTML = `<span class="label">Localities:</span> ${broker.localities}`;
            card.appendChild(localitiesEl);
        }

        // Ratings
        if (typeof broker.responsiveness === 'number') {
            const responsivenessEl = document.createElement('p');
            responsivenessEl.innerHTML = `<span class="label">Responsiveness:</span> <span class="rating-stars">${generateStarRating(broker.responsiveness)}</span> (${broker.responsiveness}/5)`;
            card.appendChild(responsivenessEl);
        }
        if (typeof broker.qualityOfHouses === 'number') {
            const qualityEl = document.createElement('p');
            qualityEl.innerHTML = `<span class="label">Quality of Houses:</span> <span class="rating-stars">${generateStarRating(broker.qualityOfHouses)}</span> (${broker.qualityOfHouses}/5)`;
            card.appendChild(qualityEl);
        }
        if (typeof broker.overallRating === 'number') {
            const areaNicenessEl = document.createElement('p');
            areaNicenessEl.innerHTML = `<span class="label">Area Niceness:</span> <span class="rating-stars">${generateStarRating(broker.areaNiceness)}</span> (${broker.areaNiceness}/5)`;
            card.appendChild(areaNicenessEl);

            const overallEl = document.createElement('p');
            overallEl.innerHTML = `<span class="label">Overall Rating:</span> <span class="rating-stars">${generateStarRating(broker.overallRating)}</span> (${broker.overallRating.toFixed(1)}/5)`;
            card.appendChild(overallEl);
        }

        brokerListDiv.appendChild(card);
    });
}

async function fetchAndDisplayBrokers() {
    try {
        const response = await fetch('/api/brokers');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const brokers = await response.json();
        renderBrokerCards(brokers);
    } catch (error) {
        console.error('Failed to fetch or render broker data:', error);
        const brokerListDiv = document.getElementById('brokerList');
        if (brokerListDiv) {
            brokerListDiv.innerHTML = '<p>Error loading broker data. Please try again later.</p>';
        }
    }
}
