const title = document.querySelector('.title');

// Layout instellen
title.style.display = 'flex';
title.style.flexWrap = 'wrap';
title.style.justifyContent = 'center';
title.style.gap = '0.5rem';

// Berekening vanaf 14 augustus 2024
const startDate = new Date('2024-08-14T00:00:00');
const now = new Date();

const diffMs = now - startDate;
const diffSeconds = Math.floor(diffMs / 1000);
const diffMinutes = Math.floor(diffSeconds / 60);
const diffHours = Math.floor(diffMinutes / 60);
const diffDays = Math.floor(diffHours / 24);
const months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

// Data als object per onderdeel
const onderdelen = {
  dagen: `${diffDays} dagen`,
  uren: `${diffHours} uren`,
  minuten: `${diffMinutes} minuten`,
  seconden: `${diffSeconds} seconden`,
  maanden: `${months} maanden`
};

// Leegmaken
title.innerHTML = '';

// Loop door elk onderdeel
for (const [key, waarde] of Object.entries(onderdelen)) {
  const span = document.createElement('span');
  span.classList.add(key); // bijv. class="dagen"
  span.style.display = 'flex';
  span.style.gap = '0.2rem';

  // Per karakter aparte span toevoegen
  for (let i = 0; i < waarde.length; i++) {
    const charSpan = document.createElement('span');
    charSpan.textContent = waarde[i];
    if (waarde[i] === ' ') {
      charSpan.style.width = '0.5rem';
    }
    const randomDelay = Math.random() * 3;
    charSpan.style.animationDelay = `${randomDelay}s`;
    span.appendChild(charSpan);
  }

  // Voeg onderdeel toe aan de title-container
  title.appendChild(span);
}