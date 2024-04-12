const { LOG_LEVEL = "info", HIDE_LEVEL, DISABLE_COLOR } = process.env;

const consoleCodes = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",
  FgGray: "\x1b[90m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
  BgGray: "\x1b[100m",
};

const levelToColor = {
  debug: "FgCyan",
  info: "FgGreen",
  warn: "FgYellow",
  error: "FgRed",
};

const levelToNumber = {
  debug: 1,
  warn: 2,
  info: 3,
  error: 4,
};

class Logger {
  constructor(options = {}) {
    this.options=this.getOptions(options);
    
  }

  getOptions(options = {}) {
    options.logLevel = options.logLevel || LOG_LEVEL;

    if (!this.isValidLevel(options.logLevel)) {
      throw new Error(`Invalid log level, ${options.logLevel}`);
    }

    options.disableColor = options.disableColor || DISABLE_COLOR === "true";
    options.hideLevel = options.hideLevel || HIDE_LEVEL === "true";

    return options;
  }

  prefix() {
    return `[${new Date().toLocaleString()}]`;
  }

  suffix() {
    return "";
  }

  levelToColor(level) {
    return levelToColor[level];
  }

  levelToNumber(level) {
    return levelToNumber[level];
  }

  isValidLevel(level) {
    return ["debug", "info", "warn", "error"].indexOf(level) >= 0;
  }

  shouldLog(level) {
    const { logLevel } = this.options;
    return this.levelToNumber(logLevel) <= this.levelToNumber(level);
  }

  stringWithColor(string, color) {
    return `${consoleCodes[color]}${string}${consoleCodes.Reset}`;
  }

  output(level, args) {
    const { hideLevel,disableColor } = this.options;

    if (!this.isValidLevel(level)) {
      throw new Error(`Invalid log level, ${level}`);
    }

    if (!this.shouldLog(level)) {
      return;
    }

    if (!hideLevel) {
      const levelString = disableColor
        ? level.toUpperCase()
        : this.stringWithColor(level.toUpperCase(), this.levelToColor(level));
      args = [levelString, ...args];
    }

    const prefix = this.prefix();
    if (prefix) args = [prefix, ...args];

    const suffix = this.suffix();
    if (suffix) args = [...args, suffix];

    console[level](...args);
  }

  info(...args) {
    this.output("info", args);
  }

  warn(...args) {
    this.output("warn", args);
  }

  debug(...args) {
    this.output("debug", args);
  }

  error(...args) {
    this.output("error", args);
  }
}

module.exports = {
  Logger,
  levelToColor,
  levelToNumber,
  consoleCodes,
  LOG_LEVEL,
};
