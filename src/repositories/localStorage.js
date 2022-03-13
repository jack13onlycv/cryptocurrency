export function localSave(data) {
  localStorage.setItem('j13o-crypto-brief', JSON.stringify(data));
}

export function localLoad() {
  if (localStorage.getItem('j13o-crypto-brief')) {
    const loadedData = JSON.parse(localStorage.getItem('j13o-crypto-brief'));
    if (loadedData.briefState) return loadedData.briefState;
  }
  return {
    briefs: [],
    counter: 0,
  };
}
