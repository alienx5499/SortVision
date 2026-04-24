export function getInitialPopupVisibility() {
  if (typeof window === 'undefined') return false;

  const forceFlag = localStorage.getItem('sv-show-star-popup');
  const params = new URLSearchParams(window.location.search);
  const urlFlag = params.get('showStarPopup');
  const testMode =
    params.get('testGithub') === '1' ||
    localStorage.getItem('sv-test-github') === '1';

  return urlFlag === '1' || forceFlag === '1' || testMode;
}

export function isGithubPopupTestMode() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get('testGithub') === '1' ||
    localStorage.getItem('sv-test-github') === '1'
  );
}
