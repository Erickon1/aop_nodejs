//const { LoggerAOP } = require('./LoggerAOP.js');
const { LoggerAOP } = require('../logger/LoggerAOP.js');

class Hello extends LoggerAOP {

    constructor() { super("Hello") }
    
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
    creds(username, password, url) {
        //console.log("Calling power")
        return "success"
    }
    defaults(us=1, pas="as", url) {
        //console.log("Calling power")
        return "success"
    }

    response( ) {
      return {
        'statusCode': 200,
        'body': JSON.stringify({'message': 'hello world'})
      }
    }


}

module.exports = {
  Hello
};

