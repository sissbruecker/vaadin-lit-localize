// Entry point for bundle containing shims required to get jsdom to parse the web components sources
import ResizeObserver from "resize-observer-polyfill";

window.ResizeObserver = ResizeObserver;

document.execCommand = () => {};
