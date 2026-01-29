function update() {
  const sb3 = document.getElementById("menu").value;

  // Build bookmarklet safely (no newlines, no template breaks)
  const bookmarklet =
    "javascript:(function(){"+
    "window.ES_SELECTED_SB3='"+ sb3 +"';"+
    "var s=document.createElement('script');"+
    "s.src='https://cdn.jsdelivr.net/gh/EEEE842/esmodinjector@main/injector.js';"+
    "document.body.appendChild(s);"+
    "})();";

  const injectBtn = document.getElementById("inject");

  injectBtn.setAttribute("href", bookmarklet);
  injectBtn.setAttribute("draggable", "true");

  document.getElementById("download").href = sb3;
}
