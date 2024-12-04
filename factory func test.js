function createParagraph(text) {
  return {
    text,
    paragraphText: (function writeText() {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = text;
      document.body.appendChild(paragraph);
    })(text),
  };
}
