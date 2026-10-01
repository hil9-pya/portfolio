import { profile, projects, stack, resources, contributions } from './content.mjs';

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const icon = name => `<svg aria-hidden="true"><use href="assets/icons.svg#${name}"/></svg>`;
const link = (href, label, className = '') => `<a class="text-link ${className}" href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(label)} <span aria-hidden="true">↗</span></a>`;

let manualTheme = null;
document.querySelector('.motion-toggle').addEventListener('click', event => {
  const paused = document.documentElement.classList.toggle('motion-paused');
  event.currentTarget.setAttribute('aria-pressed', String(paused));
  const label = paused ? 'Resume motion' : 'Pause motion';
  event.currentTarget.setAttribute('aria-label', label);
  event.currentTarget.title = label;
  event.currentTarget.querySelector('path').setAttribute('d', paused ? 'M9 5l10 7-10 7Z' : 'M9 6v12M15 6v12');
});
try {
  const stored = localStorage.getItem('portfolio-theme');
  if (stored === 'light' || stored === 'dark') manualTheme = stored;
} catch { /* Storage is optional; light mode remains the default. */ }
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('[data-theme-label]').textContent = theme === 'dark' ? 'Dark' : 'Light';
  document.querySelector('.theme-toggle use').setAttribute('href', `assets/icons.svg#${theme === 'dark' ? 'moon' : 'sun'}`);
  document.querySelector('.theme-toggle').setAttribute('aria-pressed', String(theme === 'dark'));
}
applyTheme(manualTheme || 'light');
document.querySelector('.theme-toggle').addEventListener('click', () => {
  manualTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(manualTheme);
  try { localStorage.setItem('portfolio-theme', manualTheme); } catch { /* Keep the current session usable. */ }
});

document.querySelector('h1').textContent = profile.name;
document.querySelector('[data-intro]').textContent = profile.intro;
if (profile.photo) {
  const image = document.createElement('img');
  image.src = profile.photo;
  image.alt = profile.name;
  image.className = 'portrait';
  image.addEventListener('load', () => document.querySelector('[data-portrait]').replaceChildren(image));
}

document.querySelector('[data-projects]').innerHTML = projects.map(project => {
  const slides = project.screenshots;
  return `<article class="project-card" data-project-id="${escape(project.id)}" data-status="${project.status}">
    ${project.status === 'upcoming'
      ? `<div class="upcoming-preview"><div class="placeholder-lines" aria-hidden="true"></div><span class="upcoming-mark">TBA</span><span class="upcoming-note">Something new, in time.</span></div>`
      : `<div class="gallery" data-gallery data-project-id="${escape(project.id)}">
          <div class="card-back back-two" aria-hidden="true"></div><div class="card-back back-one" aria-hidden="true"></div>
          <button type="button" class="gallery-open" aria-label="Open ${escape(project.title)} gallery" ${slides.length ? '' : 'disabled'}><img ${slides.length ? `src="${escape(slides[0].src)}"` : ''} alt="${escape(slides[0]?.alt || 'Screenshot to be added')}" loading="lazy"><span class="image-fallback" hidden>Screenshot unavailable</span><span class="expand-cue">${icon('expand')}<span>View gallery</span></span></button>
          ${slides.length > 1 ? `<button class="slide-arrow previous" type="button" aria-label="Previous screenshot">${icon('previous')}</button><button class="slide-arrow next" type="button" aria-label="Next screenshot">${icon('next')}</button>` : ''}
        </div>`}
    <div class="gallery-meta">${project.status === 'upcoming' ? '<span>In the works</span>' : `<span class="slide-caption">${escape(slides[0]?.caption || 'Screenshot to be added')}</span><div class="slide-dots">${slides.length > 1 ? slides.map((_, index) => `<button type="button" aria-label="Show screenshot ${index + 1}" aria-pressed="${index === 0}" data-index="${index}"><span></span></button>`).join('') : ''}</div>`}</div>
    <h3>${escape(project.title)}</h3>
    <p class="project-description">${escape(project.description)}</p>
    <p class="project-stack">${project.technologies.map(escape).join(' / ') || 'To be announced'}</p>
    <div class="project-links">${project.repository ? `${slides.length ? '<button class="text-button view-project" type="button">View project <span aria-hidden="true">↗</span></button>' : ''}${link(project.repository, 'GitHub', 'repository')}` : '<span class="coming-soon">Coming soon</span>'}</div>
  </article>`;
}).join('');

document.querySelector('[data-stack]').innerHTML = stack.map(group => `<div class="stack-group"><h3>${escape(group.group)}</h3><div class="stack-items">${group.items.map(([name, logo]) => `<span class="stack-chip"><img src="assets/logos/${logo}.svg" alt="" width="20" height="20">${escape(name)}</span>`).join('')}</div></div>`).join('');
document.querySelector('[data-resources]').innerHTML = resources.map(resource => `<article>${link(resource.href, resource.name)}<p>${escape(resource.description)}</p></article>`).join('');

const dialog = document.querySelector('#gallery-dialog');
let activeGallery = null;
let dialogOpener = null;
function showImage(image, fallback, slide) {
  image.hidden = false;
  fallback.hidden = true;
  image.onload = () => { image.hidden = false; fallback.hidden = true; };
  image.onerror = () => { image.hidden = true; fallback.hidden = false; };
  if (!slide) {
    image.hidden = true;
    fallback.hidden = false;
    fallback.textContent = 'Screenshots to be added';
    return;
  }
  image.alt = slide.alt;
  image.src = slide.src;
  // Cached failures can finish before handlers attach during initial rendering.
  if (image.complete && !image.naturalWidth) image.onerror();
}
function updateDialog() {
  const { project, index } = activeGallery;
  const slide = project.screenshots[index];
  document.querySelector('#gallery-title').textContent = project.title;
  showImage(dialog.querySelector('img'), dialog.querySelector('.image-fallback'), slide);
  dialog.querySelector('[data-dialog-caption]').textContent = `${slide.caption} · ${index + 1} / ${project.screenshots.length}`;
  dialog.querySelectorAll('.dialog-controls button').forEach(button => { button.hidden = project.screenshots.length < 2; });
}
for (const project of projects.filter(project => project.status === 'available')) {
  const card = document.querySelector(`.project-card[data-project-id="${project.id}"]`);
  const image = card.querySelector('.gallery-open img');
  const fallback = card.querySelector('.image-fallback');
  const gallery = { project, index: 0, select };
  function select(index) {
    const count = project.screenshots.length;
    if (!count) return;
    gallery.index = ((index % count) + count) % count;
    const slide = project.screenshots[gallery.index];
    showImage(image, fallback, slide);
    card.querySelector('.slide-caption').textContent = slide.caption;
    card.querySelectorAll('.slide-dots button').forEach((button, index) => button.setAttribute('aria-pressed', String(index === gallery.index)));
    if (activeGallery === gallery && dialog.open) updateDialog();
  }
  function open(event) {
    if (!project.screenshots.length) return;
    activeGallery = gallery;
    dialogOpener = event.currentTarget;
    updateDialog();
    dialog.showModal();
  }
  card.querySelector('.back-one').hidden = project.screenshots.length < 2;
  card.querySelector('.back-two').hidden = project.screenshots.length < 3;
  showImage(image, fallback, project.screenshots[0]);
  card.querySelector('.gallery-open').addEventListener('click', open);
  card.querySelector('.view-project')?.addEventListener('click', open);
  card.querySelector('.previous')?.addEventListener('click', () => select(gallery.index - 1));
  card.querySelector('.next')?.addEventListener('click', () => select(gallery.index + 1));
  card.querySelectorAll('.slide-dots button').forEach(button => button.addEventListener('click', () => select(Number(button.dataset.index))));
}
dialog.querySelector('[aria-label="Close gallery"]').addEventListener('click', () => dialog.close());
dialog.querySelector('[aria-label="Previous screenshot"]').addEventListener('click', () => activeGallery.select(activeGallery.index - 1));
dialog.querySelector('[aria-label="Next screenshot"]').addEventListener('click', () => activeGallery.select(activeGallery.index + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    activeGallery.select(activeGallery.index + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  activeGallery = null;
  dialogOpener?.focus({ preventScroll: true });
});

const sections = [...document.querySelectorAll('main > section')];
const dockLinks = [...document.querySelectorAll('.dock a')];
let scrollPending = false;
function updateDock() {
  const line = innerHeight * .35;
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) current = section.id;
  }
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 3) current = sections.at(-1).id;
  dockLinks.forEach(link => {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollPending = false;
}
addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateDock); }
}, { passive: true });
addEventListener('resize', updateDock);
updateDock();

async function loadContributions() {
  const target = document.querySelector('[data-contributions]');
  try {
    const response = await fetch(contributions.src);
    if (!response.ok) throw new Error('Activity unavailable');
    const data = await response.json();
    if (!Array.isArray(data.days) || !data.days.length || data.username !== profile.github) throw new Error('Invalid activity');
    const valid = data.days.every(day => /^\d{4}-\d{2}-\d{2}$/.test(day.date) && Number.isInteger(day.level) && day.level >= 0 && day.level <= 4);
    if (!valid) throw new Error('Invalid days');
    const firstDay = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
    const cells = '<span class="contribution-cell blank"></span>'.repeat(firstDay) + data.days.map(day => `<span class="contribution-cell level-${day.level}" title="${escape(day.label || `${day.date}: activity level ${day.level} of 4`)}" aria-label="${escape(day.label || `${day.date}: activity level ${day.level} of 4`)}"><span></span></span>`).join('');
    const firstActiveDay = data.days.findIndex(day => Number.isInteger(day.count) ? day.count > 0 : day.level > 0);
    const rows = firstActiveDay < 0 ? '<tr><td colspan="2">No contributions recorded in this period.</td></tr>' : data.days.slice(firstActiveDay).map(day => `<tr><td>${escape(day.date)}</td><td>${escape(Number.isInteger(day.count) ? day.count : `Activity level ${day.level} of 4`)}</td></tr>`).join('');
    target.innerHTML = `<div class="contribution-scroll"><div class="contribution-grid" role="img" aria-label="GitHub contribution activity for ${escape(profile.github)}" style="--weeks:${Math.ceil((data.days.length + firstDay) / 7)}">${cells}</div></div><div class="contribution-meta"><span>${escape(data.summary || 'Public GitHub contribution activity')}</span><span>Snapshot · ${contributions.capturedAt}</span></div><details class="activity-details"><summary>Activity details</summary><div class="activity-table-wrap"><table><caption>Daily contributions for @${escape(profile.github)}</caption><thead><tr><th scope="col">Date</th><th scope="col">Contributions</th></tr></thead><tbody>${rows}</tbody></table></div></details>`;
  } catch {
    target.innerHTML = `<div class="activity-unavailable"><p>Contribution activity unavailable.</p>${link(contributions.profile, 'View activity on GitHub')}</div>`;
  }
}
await loadContributions();

if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    }
  }, { threshold: .08 });
  document.querySelectorAll('.intro-copy,.portrait-wrap,.section-heading,.project-card,.stack-group,.resource-grid article,.github-heading,[data-contributions]').forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${index % 2 * .08}s`);
    revealObserver.observe(element);
  });
}
