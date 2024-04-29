class Utils {
  static emptyElement(element) {
    element.innerHTML = '';
  }
  
  static showElement(element) {
    element.style.display = 'block';
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = 'none';
    element.hidden = true;
  }
}

export default Utils;