(() => {
  const projects = {
    nse: {
      title: 'OCR seal detection',
      summary: 'An OCR-based seal-detection system deployed at the National Stock Exchange.',
      focus: 'Applied research · OCR · document processing',
      role: 'Research Intern · CEERI, Chennai',
      outcomeBrief: 'System deployed at NSE',
      badge: 'CEERI / NATIONAL STOCK EXCHANGE',
      problemTitle: 'Detect seals in documents.',
      problem: 'This applied research project focused on identifying seals with an OCR-based system for use at the National Stock Exchange.',
      approachTitle: 'Build an applied OCR system.',
      approach: 'I built an OCR-based system focused on detecting seals in documents, then worked through to deployment.',
      outcomeTitle: 'Move the work into deployment.',
      outcome: 'The system was deployed at the National Stock Exchange.'
    }
  };

  const params = new URLSearchParams(window.location.search);
  const project = projects[params.get('project')] || projects.nse;
  document.title = `${project.title} — Adi`;
  document.querySelector('#project-title').firstChild.textContent = project.title;
  document.querySelector('#project-crumb').textContent = project.title;
  document.querySelector('#project-summary').textContent = project.summary;
  document.querySelector('#project-focus').textContent = project.focus;
  document.querySelector('#project-role').textContent = project.role;
  document.querySelector('#project-outcome-brief').textContent = project.outcomeBrief;
  document.querySelector('#project-badge').textContent = project.badge;
  document.querySelector('#project-problem-title').textContent = project.problemTitle;
  document.querySelector('#project-problem').textContent = project.problem;
  document.querySelector('#project-approach-title').textContent = project.approachTitle;
  document.querySelector('#project-approach').textContent = project.approach;
  document.querySelector('#project-outcome-title').textContent = project.outcomeTitle;
  document.querySelector('#project-outcome').textContent = project.outcome;
})();
