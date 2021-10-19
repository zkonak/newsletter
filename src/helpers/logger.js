
class Logger {
    constructor(winston) {
        this.logger = winston.createLogger({
        format: winston.format.json(),
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({ filename: 'src/logs/error.log', level: 'error'}),
            new winston.transports.File({ filename: 'src/logs/combined.log' }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ],
        });

        this.stream = {
            write: (msg) => this.logger.info(msg)
        };
    }

    log(status, message) {
        if (status < 500)
            this.logger.log('warn',new Date(), message);
        else {
            console.error(message);
            this.logger.log('error', new Date(),message);
        }
    }
}

export default Logger;