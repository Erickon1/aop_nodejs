//const { LoggerAOP } = require('./LoggerAOP.js');
const { LoggerAOP } = require('../logger/LoggerAOP.js');

class Hello2 extends LoggerAOP {

    constructor() { super("Hello2") }
    
    async add(a, b) {
        //console.log("Calling add")
        return a + b
    }

    async concat(a, b) {
        //console.log("Calling concat")
        return a + b
    }

    async power(a, b) {
        //console.log("Calling power")
        return a ** b
    }

    response( ) {
      return {
        'statusCode': 200,
        'body': JSON.stringify({'message': 'hello world'})
      }
    }

    /*
    const test1 = async (param1, param2) => {
        try {
          console.log("from test1");
          return param1 + param2;
        } catch (err) {
          if (err.response) {
            console.log("Error status : " + err.response.status + " : " + err);
          } 
          throw new Error('Wowza!')
          return err.response;
        }
    }
    */
}

module.exports = {
  Hello2
};

