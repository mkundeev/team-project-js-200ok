import { refs } from '../service/refs';
const { toggle, footer } = refs;
const theme = {
  DARK_THEME: 'night-theme',
  LIGHT_THEME: 'light-theme',
};
const LOCAL_STORAGE_KEY = 'theme';

const bodyTheme = document.body.classList;
const footerTheme = footer.classList;
footerTheme.add(
  localStorage.getItem(LOCAL_STORAGE_KEY) === null
    ? theme.LIGHT_THEME
    : localStorage.getItem(LOCAL_STORAGE_KEY)
);

bodyTheme.add(
  localStorage.getItem(LOCAL_STORAGE_KEY) === null
    ? theme.LIGHT_THEME
    : localStorage.getItem(LOCAL_STORAGE_KEY)
);

if (bodyTheme.value === theme.DARK_THEME) {
  toggle.checked = true;
}

toggle.addEventListener('change', addNightDayTheme);
function addNightDayTheme(evt) {
  console.log(evt.target.checked);
  const themeNaw = evt.target.checked;
  if (themeNaw) {
    footer.classList.remove('light');
    localStorage.setItem(LOCAL_STORAGE_KEY, theme.DARK_THEME);
    bodyTheme.replace(theme.LIGHT_THEME, theme.DARK_THEME);
    footerTheme.replace(theme.LIGHT_THEME, theme.DARK_THEME);

    return;
  }
  localStorage.setItem('theme', theme.LIGHT_THEME);
  bodyTheme.replace(theme.DARK_THEME, theme.LIGHT_THEME);
  // footerTheme.replace(theme.DARK_THEME, theme.LIGHT_THEME);
  footer.classList.add('light');
}
