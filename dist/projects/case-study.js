(() => {
  const projects = {
    'incident-management': {
      title: 'Incident management & AI on-call',
      summary: 'A DevRev incident-response system connecting alert triage, ownership, and proposed fixes.',
      focus: 'Incident response · backend systems · AI-assisted on-call',
      role: 'Member of Technical Staff · 4-person team',
      outcomeBrief: 'Average detection time: ~7–8 hours to ~5 minutes',
      badge: 'DEVREV / INCIDENT RESPONSE',
      problemTitle: 'Make incidents easier to detect and act on.',
      problem: 'Incident detection took 7–8 hours on average. The work started with a structured incident model and paging system, then extended into a workflow that could connect alerts to the engineers and code best positioned to resolve them.',
      approachTitle: 'Build the response path end to end.',
      approach: 'I built the incident data models and paging system from scratch. In a four-person team, I helped build an AI on-call agent that triages Datadog alerts, uses GitHub history to suggest likely owners, and proposes code fixes.',
      outcomeTitle: 'Reduce time to detection.',
      outcome: 'Average incident detection time fell from about 7–8 hours to about 5 minutes.'
    },
    'team-workspaces': {
      title: 'Hierarchical team workspaces',
      summary: 'Extending existing workspaces to support organization-aligned teams and team-scoped work across DevRev.',
      focus: 'Platform architecture · access control · cross-system integration',
      role: 'Member of Technical Staff · integration lead',
      outcomeBrief: 'Team hierarchy integrated across platform surfaces and Computer',
      badge: 'DEVREV / PLATFORM ARCHITECTURE',
      problemTitle: 'Reflect how real organizations are structured.',
      problem: 'DevRev already had workspaces. The next step was to support nested teams that reflected an organization hierarchy, with membership and access control, plus issues and sprints scoped to each team.',
      approachTitle: 'Carry the hierarchy across the product.',
      approach: 'I led integration of the team model across navigation, widgets, and workspace-aware resource types, built a migration framework, and connected the hierarchy to DevRev’s Computer agent. This crossed dependent systems and teams, so the architectural shift had to account for those product surfaces together.',
      outcomeTitle: 'Make team context part of the platform.',
      outcome: 'Teams could have controlled membership and access, with their own scoped issues and sprints. The hierarchy was integrated across platform surfaces and Computer.'
    },
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
