export const logMessages = [];
export const logEventTarget = new EventTarget();
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.log = (...args) => {
  logMessages.push({ message: args.join(" "), type: "log" });
  logEventTarget.dispatchEvent(new Event("newLog"));
  originalConsoleLog.apply(console, args);
};

console.warn = (...args) => {
  logMessages.push({ message: args.join(" "), type: "warn" });
  logEventTarget.dispatchEvent(new Event("newLog"));
  originalConsoleWarn.apply(console, args);
};

console.error = (...args) => {
  logMessages.push({ message: args.join(" "), type: "error" });
  logEventTarget.dispatchEvent(new Event("newLog"));
  originalConsoleError.apply(console, args);
};
