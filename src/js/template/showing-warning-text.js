const warningTextEl = document.querySelector('.warning-text');

export function showingWarningText(total_pages) {
  const classCheck = warningTextEl.classList.contains('is-hidden');

  if (total_pages === 0) {
    if (classCheck) {
      warningTextEl.classList.remove('is-hidden');
    }
  } else if (!classCheck) {
    warningTextEl.classList.add('is-hidden');
  }
}
