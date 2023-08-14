const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, label, prettyPrint, printf, service, requestId } = format;

const myFormat = printf(({ level, message, label, timestamp, service, requestId }) => {
  //if(requestId !== null && requestId !=== "")
  //return `${timestamp} [${(requestId!== null)?requestId:label}] [service:${service}]  ${level.toUpperCase()}: ${message}`;
  //return `${timestamp} [${requestId}] [service:${service}]  ${level.toUpperCase()}: ${message}`;
  var clabel =""
  if( label !==undefined && label.length > 0 ){
    clabel= "["+label+"] "
  }
  return `${timestamp} [${requestId}] ${level.toUpperCase()}: ${clabel}${message}`;
});
const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  //requestId = "NONE-NO"
  levels: config.npm.levels,
  //si quieres agregar esto se pone desde el inicio, el problema es que no es flexible
  //defaultMeta: { service: 'NONE' },
  //vacio para poder settear el requestId
  defaultMeta: {},
  transports: [
    //new transports.File(options.file),
    new transports.Console(options.console),
  ],
  /*
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]
  */
  format: combine(
    //label({ label: 'Custom label' }),
    timestamp(),
    //timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat,
    //format.splat(),
    //format.simple(),
    //prettyPrint()

  ),
  exitOnError: false
})

module.exports = logger
/*
module.exports = {
  logger,
  customFormat
};
*/
