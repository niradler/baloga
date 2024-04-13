const { Logger } = require("./index");

const loggerAll = new Logger({ logLevel: "debug" });

loggerAll.info("logger all levels====>");
loggerAll.debug("debug message");
loggerAll.warn("warn message");
loggerAll.info("info message");
loggerAll.error({
  error: "error message",
  stack: "stack trace",
});

const loggerNoColor = new Logger({ disableColor: true });
loggerNoColor.info("logger no color====>");
loggerNoColor.debug("debug loggerNoColor");
loggerNoColor.warn("warn loggerNoColor");
loggerNoColor.info("info loggerNoColor");
loggerNoColor.error({
  error: "error loggerNoColor",
  stack: "stack trace",
});

const loggerNoLevel = new Logger({ hideLevel: true });
loggerNoLevel.info("logger no level====>");
loggerNoLevel.debug("debug loggerNoLevel");
loggerNoLevel.warn("warn loggerNoLevel");
loggerNoLevel.info("info loggerNoLevel");
loggerNoLevel.error({
  error: "error loggerNoLevel",
  stack: "stack trace",
});

class JsonLogger extends Logger {
  constructor(options) {
    super(options);
  }
  
  prefix(){
    return "JSONLogger";
  }

  output(level, args) {
    if (!this.isValidLevel(level)) {
      throw new Error(`Invalid log level, ${level}`);
    }

    if (!this.shouldLog(level)) {
      return;
    }

    const prefix = this.prefix();
    const suffix = this.suffix();

    console[level](
      JSON.stringify({
        level: level,
        message: args.length > 1 ? args : args[0],
        prefix: prefix,
        suffix: suffix,
      })
    );
  }
}

const jsonLogger = new JsonLogger({});

jsonLogger.info({
  logger: "jsonLogger",
  message: "info message",
});
