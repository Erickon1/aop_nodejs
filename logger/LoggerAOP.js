//const { inject ,before, after, setServiceName } = require("../logger/aop.js")
const { inject ,before, after, setServiceName } = require("./aop.js")

class LoggerAOP {
  constructor(name) {
    inject(this, before, "before", "methods")
    inject(this, after, "afterReturning", "methods")
    //setServiceName(name)
  }
}

module.exports = {
  LoggerAOP
};

