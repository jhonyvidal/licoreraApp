export default function setBTNColor(color: string, border: string, textColor: string) {
  document.documentElement.style.setProperty('--btnClientColor', color);
  document.documentElement.style.setProperty('--btnClientBorder', border);
  document.documentElement.style.setProperty('--btnTextColor', textColor);
}
