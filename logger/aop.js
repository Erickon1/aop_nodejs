
const logger = require('./logger.js');

/** Helping function used to get all methods of an object */
const getMethods = (obj) => Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(item => typeof obj[item] === 'function')

function getParams(func) {
  var str = func.toString();
  // Remove comments of the form /* ... */
  // Removing comments of the form //
  // Remove body of the function { ... }
  // removing '=>' if func is arrow function
  str = str.replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\/\/(.)*/g, '')
          .replace(/{[\s\S]*}/, '')
          .replace(/=>/g, '')
          .trim();
  // Start parameter names after first '('
  var start = str.indexOf("(") + 1;
  // End parameter names is just before last ')'
  var end = str.length - 1;
  var result = str.substring(start, end).split(", ");
  var params = [];
  result.forEach(element => {
      // Removing any default value
      element = element.replace(/=[\s\S]*/g, '').trim();
      if(element.length > 0)
          params.push(element);
  });
  return params;
}

/** Replace the original method with a custom function that will call our aspect when the advice dictates */
function replaceMethod(target, methodName, aspect, advice) {
    //const className = target.constructor.name
    const className = Object.getPrototypeOf(target)?.constructor?.name;
    if(typeof target[methodName] == "function"){
    }
    const originalCode = target[methodName]
    target[methodName] = (...args) => {
        if(["before", "around"].includes(advice)) {
            //logger.info("Calling function: "+methodName);
            //console.log(target.prototype.constructor.name)
            const ob = Object.getPrototypeOf(target)[methodName]
            const params = getParams( ob )
            //console.log( params )
            aspect.apply(target, [className, methodName,args,params])
        }
        const returnedValue = originalCode.apply(target, args)
        if(["after", "around"].includes(advice)) {
            aspect.apply(target, args)
        }
        if("afterReturning" == advice) {
            //return aspect.apply(target, [className, methodName,JSON.stringify(returnedValue)])
            return aspect.apply(target, [className, methodName, returnedValue])
        } else {
            return returnedValue
        }
    }
}

function before(...args) {
    //logger.info("Meeee: " + methodName)
    msg = args[0]+"."+args[1]+" << "
    //for (const item of args) {
    if(args[2].length == 0){
      msg += "No params";
    }else{
      for (var i = 0; i < args[2].length ;i++ ) {
        //console.log( args[2][i] )
        if( args[3].includes("password") ){
          msg += "****, " ;
        }else{
          msg += JSON.stringify(args[2][i]) +", " ;
        }
      }
    }
    logger.info(msg)
    //const childLogger = logger.child({ requestId: '451', label: "labelchild" });
    //childLogger.info("este es el child")
    //logger.info("Arguments received on: "+args.pop()+" << "+ args)
}
function after( ...objects ) {
    //logger.info( JSON.stringify(objects) ) 
    var res = "";
    if ( objects[2] instanceof Promise ){
      objects[2].then(function(value) {
        res = value;
        logger.info( objects[0]+"."+objects[1]+" >> "+res )
      });
    }else if (typeof objects[2] == "object" ){
      res = JSON.stringify(objects[2])
      logger.info( objects[0]+"."+objects[1]+" >> "+res )
    }else{
      logger.info( objects[0]+"."+objects[1]+" >> "+objects[2] )
    }
}
function setServiceName( serviceName ){
  logger.defaultMeta.service= serviceName
}
function setRequestId( requestId ){
  logger.defaultMeta.requestId = requestId
//  logger.defaultMeta.label = requestId
}
module.exports = {
    //Main method exported: inject the aspect on our target when and where we need to
    inject: function(target, aspect, advice, pointcut, method = null) {
        if(pointcut == "method") {
            if(method != null) {
                replaceMethod(target, method, aspect, advice)    
            } else {
                throw new Error("Tryin to add an aspect to a method, but no method specified")
            }
        }
        if(pointcut == "methods") {
            const methods = getMethods(target)
            methods.forEach( m => {
                replaceMethod(target, m, aspect, advice)
            })
        }
    },
    before,
    after,
    setServiceName,
    setRequestId,
    
}
