export const profile = {
  name: 'Ariel Casipe',
  github: 'hil9-pya',
  photo: 'assets/ariel-cutout.png',
  intro: 'BSIT student exploring full-stack development.',
};

export const projects = [
  {
    id: 'enrollment', title: 'Enrollment System',
    description: 'A full-stack enrollment application with admissions, student services, and a learning portal.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Node.js', 'Express', 'MongoDB'],
    repository: 'https://github.com/hil9-pya/enrollmentsystem', status: 'available',
    screenshots: [
      { src: 'assets/projects/enrollment-home.png', alt: 'Enrollment System public NCST homepage', caption: 'Campus homepage' },
      { src: 'assets/projects/enrollment-gateway.png', alt: 'Enrollment System applicant, student, and staff sign-in gateway', caption: 'Enrollment gateway' },
      { src: 'assets/projects/enrollment-lms.png', alt: 'Enrollment System learning management sign-in page', caption: 'Learning portal' },
    ],
  },
  {
    id: 'kickcraft', title: 'KickCraft',
    description: 'Interactive 3D shoe customization. Recolor a pair, add charms, and reserve a design for pickup.',
    technologies: ['Vue', 'Tailwind CSS', 'Vite', 'PHP', 'MySQL'],
    repository: 'https://github.com/hil9-pya/kickcraft', status: 'available',
    screenshots: [
      { src: 'assets/projects/kickcraft-studio-colored.png', alt: 'KickCraft studio with a moss green shoe, orange midsole, blue laces, and burgundy accents', caption: 'Custom colorway' },
      { src: 'assets/projects/kickcraft-home.png', alt: 'KickCraft public shoe catalog with a 3D shoe preview', caption: 'Shoe catalog' },
      { src: 'assets/projects/kickcraft-track.png', alt: 'KickCraft pickup reservation tracking form', caption: 'Reservation tracking' },
    ],
  },
  {
    id: 'can-it-fit', title: 'Can It Fit?',
    description: 'A student workload planner with deadline-aware scheduling, weekly capacity, and what-if previews. Plans stay on your device.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    repository: 'https://github.com/hil9-pya/can-it-fit', status: 'available',
    screenshots: [
      { src: 'assets/projects/can-it-fit-week.png', alt: 'Can It Fit weekly workload planner with sample assignments and daily capacity', caption: 'Weekly workload' },
      { src: 'assets/projects/can-it-fit-preview.png', alt: 'Can It Fit preview with four extra study hours on Friday', caption: 'What-if preview' },
      { src: 'assets/projects/can-it-fit-assignment.png', alt: 'Can It Fit assignment form with remaining hours and deadline', caption: 'Assignment planning' },
    ],
  },
  {
    id: 'memory-pins', title: 'Memory Pins',
    description: 'Pin dates and stories to people, objects, and details in your pictures. Pictures and memories stay in your browser.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS', 'IndexedDB'],
    repository: 'https://github.com/hil9-pya/memory-pins', status: 'available',
    screenshots: [
      { src: 'assets/projects/memory-pins-picture.png', alt: 'Memory Pins example porch picture with fictional memories pinned to details', caption: 'Picture memories' },
      { src: 'assets/projects/memory-pins-detail.png', alt: 'Memory Pins editor for a pinned memory with title, date, and story fields', caption: 'Edit a memory' },
      { src: 'assets/projects/memory-pins-list.png', alt: 'Memory Pins list of memories for the selected picture', caption: 'Memory collection' },
    ],
  },
];

export const stack = [
  { group: 'Frontend', items: [['HTML', 'html5'], ['CSS', 'css'], ['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['React', 'react'], ['Vue.js', 'vuedotjs'], ['Tailwind CSS', 'tailwindcss'], ['Vite', 'vite']] },
  { group: 'Backend', items: [['JavaScript', 'javascript'], ['Node.js', 'nodedotjs'], ['Express', 'express'], ['MongoDB', 'mongodb'], ['PHP', 'php'], ['MySQL', 'mysql']] },
  { group: 'Tools', items: [['Git', 'git'], ['GitHub', 'github'], ['Antigravity', 'antigravity'], ['Kimi', 'kimi']] },
];

export const resources = [
  { name: 'The Odin Project', href: 'https://www.theodinproject.com/', description: 'Project-based web development.' },
  { name: 'freeCodeCamp', href: 'https://www.freecodecamp.org/', description: 'Coding practice and guided learning.' },
  { name: 'roadmap.sh', href: 'https://roadmap.sh/', description: 'Learning paths for developer roles.' },
  { name: 'Harvard CS50x', href: 'https://cs50.harvard.edu/x/', description: 'An introduction to computer science.' },
  { name: 'Scrimba', href: 'https://scrimba.com/', description: 'Interactive coding lessons.' },
];

export const contributions = { src: 'assets/contributions.json', profile: 'https://github.com/hil9-pya', capturedAt: '2026-10-02' };
