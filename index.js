const { Hello } = require("./service/Hello.js");
const { Hello2 } = require("./service/Hello2.js");
const logger = require('./logger/logger.js');
const { setRequestId } = require("./logger/aop.js")

exports.handler = async (event, context) => {
  //siempre al inicio para seguir la traza
  setRequestId(context.awsRequestId)


  const hello = new Hello()
  const hello2 = new Hello2()
  hello.add(2,2)
  let res = hello.response();
  hello2.add(2,2)
  hello.creds("erick", "roberto","blabla")
  hello.defaults(url="erick")

  logger.log('info', 'Pass a message and this works', {
    label: 'labeeeeeeelll'
  });
  // return context.logStreamName;

  try {
    logger.info("Server Sent A Hello World!");
    /*
       //this not works on this format
    logger.log('info', 'Pass a message and this works', {
      additional: 'properties',
      are: 'passed along'
    });

    logger.info('Use a helper method if you want', {
      additional: 'properties',
      are: 'passed along'
    });
    */
    return hello.response();

  } catch (error) {
    console.log( error )
    throw new Error(error);
  }

};
