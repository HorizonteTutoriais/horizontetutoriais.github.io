window.CUSDIS = {};
const makeIframeContent = (target) => {
  const host = target.dataset.host || "https://cusdis.com";
  const iframeJsPath = target.dataset.iframe || `${host}/js/iframe.umd.js`;
  const cssPath = `${host}/js/style.css`;
  return `<!DOCTYPE html><html><head><link rel="stylesheet" href="${cssPath}"><base target="_parent" /><script>window.CUSDIS_LOCALE = ${JSON.stringify(window.CUSDIS_LOCALE)}; window.__DATA__ = ${JSON.stringify(target.dataset)};<\/script><style>:root { color-scheme: light; }</style></head><body><div id="root"></div><script src="${iframeJsPath}" type="module"><\/script></body></html>`;
};
let singleTonIframe;
function createIframe(target) {
  if (!singleTonIframe) {
    singleTonIframe = document.createElement("iframe");
    listenEvent(singleTonIframe, target);
  }
  singleTonIframe.srcdoc = makeIframeContent(target);
  singleTonIframe.style.width = "100%";
  singleTonIframe.style.border = "0";
  singleTonIframe.style.minHeight = "450px";
  singleTonIframe.style.height = "450px";
  singleTonIframe.scrolling = "no";
  return singleTonIframe;
}
function postMessage(event, data) {
  if (singleTonIframe && singleTonIframe.contentWindow) {
    try {
      singleTonIframe.contentWindow.postMessage(JSON.stringify({ from: "cusdis", event, data }), "*");
    } catch(e) {}
  }
}
function listenEvent(iframe, target) {
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onMessage = (e) => {
    try {
      const msg = JSON.parse(e.data);
      if (msg.from === "cusdis") {
        switch (msg.event) {
          case "onload": if (target.dataset.theme === "auto") postMessage("setTheme", darkModeQuery.matches ? "dark" : "light"); break;
          case "resize": if (msg.data && parseInt(msg.data) > 0) iframe.style.height = (parseInt(msg.data) + 30) + "px"; break;
        }
      }
    } catch (e2) {}
  };
  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}
function render(target) {
  if (target) {
    target.innerHTML = "";
    const iframe = createIframe(target);
    target.appendChild(iframe);
  }
}
window.renderCusdis = render;
window.CUSDIS.renderTo = render;
window.CUSDIS.initial = () => {
  let target = document.querySelector("#cusdis_thread") || document.querySelector("#cusdis");
  if (target) render(target);
};
window.CUSDIS.initial();
