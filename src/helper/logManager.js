export const logMessages = [];
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.log = (...args) => {
  logMessages.push({ message: args.join(" "), type: "log" });
  originalConsoleLog.apply(console, args);
};

console.warn = (...args) => {
  logMessages.push({ message: args.join(" "), type: "warn" });
  originalConsoleWarn.apply(console, args);
};

console.error = (...args) => {
  logMessages.push({ message: args.join(" "), type: "error" });
  originalConsoleError.apply(console, args);
};
