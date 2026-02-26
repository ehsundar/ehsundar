function isPersianChar(char) {
  const persianRegex = /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return persianRegex.test(char);
}

function getFirstTextChar(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while (node = walker.nextNode()) {
    const text = node.textContent.trim();
    if (text.length > 0) {
      return text[0];
    }
  }
  return null;
}

function applyRTLDetection() {
  const article = document.querySelector('article');
  if (!article) return;

  const firstChar = getFirstTextChar(article);
  if (firstChar && isPersianChar(firstChar)) {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  const paragraphs = article.querySelectorAll('p, h1, h2, h3, h4, h5, h6, blockquote, li');
  paragraphs.forEach(element => {
    const firstChar = getFirstTextChar(element);
    if (firstChar && isPersianChar(firstChar)) {
      element.setAttribute('dir', 'rtl');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyRTLDetection);
} else {
  applyRTLDetection();
}
