(() => {
  const places = [
    { id: 'new-zealand', name: 'New Zealand', image: '/images/new-zealand.webp', alt: 'Generic sample lake and mountain landscape', intro: 'A photo journal page for New Zealand.', story: 'Add a moment from the trip, a landscape you remember, or a short note about what you would like to revisit.' },
    { id: 'spiti', name: 'Spiti', image: '/images/spiti.webp', alt: 'Generic sample high mountain valley', intro: 'A photo journal page for Spiti.', story: 'Add your own photograph, route detail, or one small memory from Spiti.' },
    { id: 'japan', name: 'Japan', image: '/images/japan.webp', alt: 'Generic sample Japanese street scene', intro: 'A photo journal page for Japan.', story: 'Add a scene, neighborhood, meal, or detail from the trip that you want to remember.' },
    { id: 'vietnam', name: 'Vietnam', image: '/images/vietnam.webp', alt: 'Generic sample water and mountain landscape', intro: 'A photo journal page for Vietnam.', story: 'Add a photograph and a short note about a place or moment from Vietnam.' },
    { id: 'hampta-pass', name: 'Hampta Pass', image: '/images/hampta-pass.webp', alt: 'Generic sample mountain trail landscape', intro: 'A photo journal page for Hampta Pass.', story: 'Add your trail details, the conditions, or a moment from the crossing.' },
    { id: 'mulki', name: 'Mulki', image: '/images/mulki.webp', alt: 'Generic sample coastal sunset', intro: 'A photo journal page for Mulki.', story: 'Add a coastal photograph, a note about the water, or what you would go back for.' }
  ];

  const params = new URLSearchParams(window.location.search);
  const place = places.find((item) => item.id === params.get('place')) || places[0];
  document.title = `${place.name} — Elsewhere`;
  document.querySelector('#place-title').firstChild.textContent = place.name;
  document.querySelector('#place-crumb').textContent = place.name;
  document.querySelector('#place-intro').textContent = place.intro;
  document.querySelector('#place-story').textContent = place.story;
  const photo = document.querySelector('#place-image');
  photo.src = place.image;
  photo.alt = place.alt;
  document.querySelector('#place-caption').textContent = `Generic sample image for ${place.name} · replace with your own photograph and caption.`;

  const related = places.filter((item) => item.id !== place.id);
  const links = document.querySelector('#related-place-links');
  related.forEach((item) => {
    const link = document.createElement('a');
    link.href = `/elsewhere/place.html?place=${item.id}`;
    link.textContent = `${item.name} ↗`;
    links.append(link);
  });
})();
