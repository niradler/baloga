# Baloga

Baloga is a simple and fast logging library for Node.js, designed to provide easy-to-use logging functionality with native console log support and log level configuration.

## Features

- Easy-to-use logging with minimal setup
- Native support for console logging
- Configurable log levels to control verbosity
- No external dependencies for lightweight integration
- Fast and efficient logging for Node.js applications

## Installation

You can install Baloga via npm:

```bash
npm install baloga
```

## Usage

```javascript
const { Logger } = require('baloga');

const logger = new Logger({ logLevel: "debug" });

// Log messages with different levels
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.debug('This is an debug message');
logger.error('This is an error message');
```

[examples](https://github.com/niradler/baloga/blob/master/examples.js)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
