// Fleet data - realistic Athens car rental inventory
const fleetData = [
  {
    id: 1,
    name: 'Fiat 500',
    category: 'Economy',
    transmission: 'Manual',
    passengers: 4,
    price: 25,
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&auto=format&fit=crop',
    availability: {
      // Date string: boolean (true = available, false = booked)
      // Sample availability for demo
    }
  },
  {
    id: 2,
    name: 'Toyota Yaris',
    category: 'Economy',
    transmission: 'Automatic',
    passengers: 5,
    price: 30,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 3,
    name: 'Hyundai i20',
    category: 'Economy',
    transmission: 'Manual',
    passengers: 5,
    price: 28,
    image: 'https://images.unsplash.com/photo-1583267746897-c2b0f9c8f7c6?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 4,
    name: 'VW Golf',
    category: 'Compact',
    transmission: 'Automatic',
    passengers: 5,
    price: 45,
    image: 'https://images.unsplash.com/photo-1622353219448-46a2c640977f?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 5,
    name: 'Toyota Corolla',
    category: 'Compact',
    transmission: 'Automatic',
    passengers: 5,
    price: 42,
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31e409f7?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 6,
    name: 'Mazda 3',
    category: 'Compact',
    transmission: 'Automatic',
    passengers: 5,
    price: 48,
    image: 'https://images.unsplash.com/photo-1617531653520-bd466e4fa0a8?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 7,
    name: 'BMW 3 Series',
    category: 'Premium',
    transmission: 'Automatic',
    passengers: 5,
    price: 85,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 8,
    name: 'Mercedes C-Class',
    category: 'Premium',
    transmission: 'Automatic',
    passengers: 5,
    price: 90,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 9,
    name: 'Audi A4',
    category: 'Premium',
    transmission: 'Automatic',
    passengers: 5,
    price: 88,
    image: 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 10,
    name: 'Mercedes S-Class',
    category: 'Luxury',
    transmission: 'Automatic',
    passengers: 5,
    price: 180,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 11,
    name: 'BMW 7 Series',
    category: 'Luxury',
    transmission: 'Automatic',
    passengers: 5,
    price: 175,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop',
    availability: {}
  },
  {
    id: 12,
    name: 'Range Rover Sport',
    category: 'SUV',
    transmission: 'Automatic',
    passengers: 7,
    price: 150,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop',
    availability: {}
  }
];

// Generate random availability for demo purposes
function initializeAvailability() {
  const today = new Date();
  
  fleetData.forEach(car => {
    for (let i = 0; i < 60; i++) { // Next 60 days
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateString = formatDate(date);
      
      // Random availability: 70% available, 30% booked
      car.availability[dateString] = Math.random() > 0.3;
    }
  });
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Check if car is available for date range
function isAvailableForRange(car, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateString = formatDate(d);
    if (!car.availability[dateString]) {
      return false;
    }
  }
  
  return true;
}

// Create car card HTML
function createCarCard(car, showAvailability = false, startDate = null, endDate = null) {
  const isAvailable = showAvailability && startDate && endDate 
    ? isAvailableForRange(car, startDate, endDate)
    : true;
  
  const availabilityBadge = showAvailability 
    ? `<span class="availability-badge ${isAvailable ? 'available' : 'unavailable'}">
         ${isAvailable ? 'Available' : 'Booked'}
       </span>`
    : '';
  
  return `
    <div class="car-card" data-category="${car.category}">
      <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
      <div class="car-info">
        <div class="car-category">${car.category}</div>
        <h3 class="car-name">${car.name}</h3>
        <div class="car-specs">
          <span class="spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M12 12v9"/>
              <path d="M16 21v-3"/>
              <path d="M8 21v-3"/>
            </svg>
            ${car.passengers}
          </span>
          <span class="spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            ${car.transmission}
          </span>
        </div>
        <div class="car-price">
          <div>
            <div class="price">€${car.price}</div>
            <div class="price-label">per day</div>
          </div>
          ${availabilityBadge}
        </div>
      </div>
    </div>
  `;
}

// Render fleet
function renderFleet(container, cars, showAvailability = false, startDate = null, endDate = null) {
  const html = cars.map(car => createCarCard(car, showAvailability, startDate, endDate)).join('');
  container.innerHTML = html;
  
  // Add staggered animation
  const cards = container.querySelectorAll('.car-card');
  cards.forEach((card, index) => {
    card.style.animation = `slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`;
  });
}

// Filter fleet by date range
function filterByDateRange() {
  const startDate = document.getElementById('start-date')?.value;
  const endDate = document.getElementById('end-date')?.value;
  const category = document.getElementById('category-filter')?.value;
  
  if (!startDate || !endDate) {
    return;
  }
  
  let filtered = fleetData.filter(car => 
    isAvailableForRange(car, startDate, endDate)
  );
  
  if (category && category !== 'all') {
    filtered = filtered.filter(car => car.category === category);
  }
  
  const resultsContainer = document.getElementById('fleet-results');
  if (resultsContainer) {
    const resultCount = document.getElementById('result-count');
    if (resultCount) {
      resultCount.textContent = `${filtered.length} vehicle${filtered.length !== 1 ? 's' : ''} available`;
    }
    
    renderFleet(resultsContainer, filtered, true, startDate, endDate);
  }
}

// Set minimum date to today
function setMinDate() {
  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + 86400000));
  
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  
  if (startDateInput) {
    startDateInput.setAttribute('min', today);
    startDateInput.value = today;
  }
  
  if (endDateInput) {
    endDateInput.setAttribute('min', tomorrow);
    endDateInput.value = tomorrow;
  }
}

// Handle start date change
function handleStartDateChange() {
  const startDate = document.getElementById('start-date')?.value;
  const endDateInput = document.getElementById('end-date');
  
  if (startDate && endDateInput) {
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);
    endDateInput.setAttribute('min', formatDate(minEndDate));
    
    // If end date is before new min, update it
    if (endDateInput.value && new Date(endDateInput.value) <= new Date(startDate)) {
      endDateInput.value = formatDate(minEndDate);
    }
  }
}

// Contact form submission
function handleContactSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // In production, this would send to a backend
  // For demo, just show success message
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    submitBtn.textContent = 'Message Sent!';
    form.reset();
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }, 1000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize availability data
  initializeAvailability();
  
  // Set up date inputs
  setMinDate();
  
  // Smooth scroll
  initSmoothScroll();
  
  // Fleet by date page
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const categoryFilter = document.getElementById('category-filter');
  
  if (startDateInput) {
    startDateInput.addEventListener('change', () => {
      handleStartDateChange();
      filterByDateRange();
    });
  }
  
  if (endDateInput) {
    endDateInput.addEventListener('change', filterByDateRange);
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterByDateRange);
  }
  
  // Trigger initial filter if on fleet-by-date page
  if (document.getElementById('fleet-results')) {
    filterByDateRange();
  }
  
  // All fleet page
  const allFleetContainer = document.getElementById('all-fleet');
  if (allFleetContainer) {
    renderFleet(allFleetContainer, fleetData);
  }
  
  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  
  // Add active state to current nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = 'var(--color-accent)';
    }
  });
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fleetData,
    formatDate,
    isAvailableForRange
  };
}
