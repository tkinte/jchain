
/*
================

================
*/
var Result = function(status,output,settings,exceptions){
  var _status=status;
  var _output=output;
  var _settings=settings;
  var _exceptions=exceptions;
  /*-- this.status --*/
  this.status = function(){
    return _status;
  };
  /*-- this.output --*/
  this.output = function(){
    return _output;
  };
  /*-- this.settings --*/
  this.settings = function(){
    return _settings;
  };
  /*-- this.exceptions --*/
  this.exceptions = function(){
    return _exceptions;
  };
};
/*
================

================
*/
var Chain = function(){
  var _defaults = {};
  var _options = {};
  var _defaultHandlers = {};
  var _customHandlers = {};
  var _defaultWorkers = {};
  var _customWorkers = {};
  _handlerFirst = true;
  _customHandlerFirst = true;
  _customWorkerFirst = true;
  _optionFirst = true;
  /*
  ====================================
  -- access utility method --
  ====================================
  */
  var _access = function(target,callerArguments){
    var args = callerArguments ||[];
    //alert('cLength : ' + args.length);
    if(args.length === 1){
      return typeof target === 'undefined' || target === null ? 
          undefined : [args[0],target[args[0]]] ;
    } else if (args.length >= 2){
      // more than one
      if(target === undefined || target === null)
        target = {};
      target[args[0]] = args[1];
    }
    //no argument
    return target;  
  };
  /*
  ====================================
  -- compound access utility method --
  ====================================
  */
  var _compoundAccess = function(couple,defaultTarget, customTarget,callerArguments){
    if(!arguments || arguments.length < 3)
      return undefined;
    var args = callerArguments||[];
    
    if(!args.length){
      return {defaults : _access(defaultTarget,args), 
            options : _access(customTarget,args)};
    }
    
    var defaultResult = _access(defaultTarget, args)[1];
    var customResult = _access(customTarget, args)[1];
    // when one is null and other undefined vice versa
    // the 
    return couple === 'settings' && this.optionFirst || 
        couple === 'handlers' && this.customHandlerFirst ||
        couple === 'workers' && this.customWorkerFirst  ? 
        customResult ||defaultResult : 
        defaultResult||customResult;
  };
  /*
  ====================================
  -- this.defaults method --
  ====================================
  */
  this.defaults = function(){
    //alert('defaults : ' + JSON.stringify(_defaults));
    var result = _access(_defaults, arguments);
    //result !== arguments[0] : when catalog === array
    if(Array.isArray(result) && result !== arguments[0])
      return result[1];
    else
      _defaults = result;
    return _defaults;
  };
  /*
  ====================================
  -- this.defaultsReset method --
  ====================================
  */
  this.defaultsReset = function(){
    if(arguments.length)
      _defaults = arguments[0];
    return _defaults;
  };
  /*
  ====================================
  -- this.options method --
  ====================================
  */
  this.options = function(){
    var result = _access(_options, arguments);
    //result !== arguments[0] : when catalog === array
    if(Array.isArray(result) && result !== arguments[0])
      return result[1];
    else
      _options = result;
    return _options;
  };
  /*
  ====================================
  -- this.optionsReset method --
  ====================================
  */
  this.optionsReset = function(){
    if(arguments.length)
      _options = arguments[0];
    return _options;
  };
  /*
  ====================================
  -- this.settings method --
  ====================================
  */
  this.settings = function(){
    //alert(JSON.stringify(arguments));
    return _compoundAccess('settings',_defaults,_options,arguments);
  };
  /*
  ====================================
  -- this.defaultWorkers method --
  ====================================
  */
  this.defaultWorkers = function(){
    var result = _access(_defaultWorkers, arguments);
    //result !== arguments[0] : when catalog === array
    if(Array.isArray(result) && result !== arguments[0])
      return result[1];
    else
      _defaultWorkers = result;
    return _defaultWorkers;
  };
  /*
  ====================================
  -- this.defaultWorkersReset method --
  ====================================
  */
  this.defaultWorkersReset = function(){
    if(arguments.length)
      _defaultWorkers = arguments[0];
    return _defaultWorkers;
  };
  /*
  ====================================
  -- this.customWorkers method --
  ====================================
  */
  this.customWorkers = function(){
    var result = _access(_customWorkers, arguments);
    //result !== arguments[0] : when catalog === array
    if(Array.isArray(result) && result !== arguments[0])
      return result[1];
    else
      _customWorkers = result;
    return _customWorkers;
  };
  /*
  ====================================
  -- this.customWorkersReset method --
  ====================================
  */
  this.customWorkersReset = function(){
    if(arguments.length)
      _customWorkers = arguments[0];
    return _customWorkers;
  };
  /*
  ====================================
  -- this.workers method --
  ====================================
  */  
  /*-- this.workers --*/
  this.workers = function(){
    return _compoundAccess('workers',_defaultWorkers,_customWorkers,arguments);
  };
  /*
  ====================================
  -- this.defaultHandlers method --
  ====================================
  */
  this.defaultHandlers = function(){
    var result = _access(_defaultHandlers, arguments);
    //result !== arguments[0] : when catalog === array
    if(Array.isArray(result) && result !== arguments[0])
      return result[1];
    else
      _defaultHandlers = result;
    return _defaultHandlers;
  };
  /*
  ====================================
  -- this.defaultHandlersReset method --
  ====================================
  */
  this.defaultHandlersReset = function(){
    if(arguments.length)
      _defaultHandlers = arguments[0];
    return _defaultHandlers;
  };
  /*
  ====================================
  -- this.customHandlers method --
  ====================================
  */
  this.customHandlers = function(){
    var result = _access(_customHandlers, arguments);
    //result !== arguments[0] : when catalog === array
    if(Array.isArray(result) && result !== arguments[0])
      return result[1];
    else
      _customHandlers = result;
    return _customHandlers;
  };
  /*
  ====================================
  -- this.defaultHandlersReset method --
  ====================================
  */
  this.customHandlersReset = function(){
    if(arguments.length)
      _customHandlers = arguments[0];
    return _customHandlers;
  };
  /*
  ====================================
  -- this.handlers method --
  ====================================
  */
  this.handlers = function(){
    return _compoundAccess('handlers',_defaultHandlers,_customHandlers,arguments);
  };
  /*
  ====================================
  -- this.defaultHandlersReset method --
  ====================================
  */
  this.catalogsReset = function(){
    if(!arguments.length)
      return;
    var catalogs =
        ['_defaults','_options','_defaultHandlers', 
         '_customHandlers','_defaultWorkers','_customWorkers'];
    catalogs.forEach(function(current,index, array){
      if(arguments[0].hasOwnProperty(current))
        switch (current){
          case catalogs[0] :
            _defaults = arguments[0][current];
            break;
          case catalogs[1] :
            _options = arguments[0][current];
            break;
          case catalogs[2] :
            _defaultHandlers = arguments[0][current];
            break;
          case catalogs[3] :
            _customHandlers = arguments[0][current];
            break;
          case catalogs[4] :
            _defaultWorkers = arguments[0][current];
            break;
          case catalogs[5] :
            _customWorkers = arguments[0][current];
            break;
        }
    });
  };
  /*
  ====================================
  -- this.handlerFirst method --
  ====================================
  */
  this.handlerFirst = function(){
    if(arguments.length)
      _handlerFirst = Boolean(arguments[0]);
    return _handlerFirst;
  };
  /*
  ====================================
  -- this.customHandlerFirst --
  ====================================
  */
  this.customHandlerFirst = function(){
    if(arguments.length)
      _customHandlerFirst = Boolean(arguments[0]);
    return _customHandlerFirst;
  };
  /*
  ====================================
  -- this.customWorkerFirst --
  ====================================
  */
  this.customWorkerFirst = function(){
    if(arguments.length)
      _customWorkerFirst = Boolean(arguments[0]);
    return _customWorkerFirst;
  };
  /*
  ====================================
  -- this.optionFirst --
  ====================================
  */
  this.optionFirst = function(){
    if(arguments.length)
      _optionFirst = Boolean(arguments[0]);
    return _optionFirst;
  };
  /*
  ====================================
  -- runWorker method --
  ====================================
  */
  var runWorker = function(work,workName,settings){
    if(work && typeof work === 'function'){
      var output;
      var exceptions;
      // simple function to execute
      try {
        output = work(settings);
      } catch(error){
        error.message = '[WorkerError for workName "' + 
          workName + '"] : ' + error.message;
        error.name = 'workerError';
        exceptions = error;
      } 
      return new Result('ok',output,settings,exceptions);
    } else
      return undefined;
  };
  /*
  ====================================
  -- runWorkerFirst method --
  ====================================
  */
  var runHandler = function(handler,workName,settings){
    if(handler && handler.handle && typeof handler.handle === 'function'){
      var output;
      var exceptions;
      var status = 'ok';
      // handle function to execute on a object
      try{
        output = handler.handle(settings);
      } catch(error){
        error.message = '[HandlerError for workname "' + workName +
          '"] : ' + error.message;
        error.name = 'handlerError';
        exceptions = error;
      }
      // ??? what if output null/undefined ?
      return output instanceof Result ? 
          output : new Result(status,output,settings,exceptions);
    } else
      return undefined;    
  };
  /*
  ====================================
  -- this.run method --
  ====================================
  */
  this.run = function(workName,parameters){
    var settings = this.optionFirst ?
        Object.assign({},this.defaults(),this.options(),parameters||{}) :
    Object.assign({},this.options(),parameters||{},this.defaults());
    var handler = this.handlers(workName||undefined);
    var work = this.workers(workName||undefined);
    var result = 
        this.handlerFirst ? 
        runHandler(handler, workName,settings) ||
        runWorker(work,workName,settings) 
    :  runWorker(work,workName,settings) ||
        runHandler(handler, workName,settings);
    if(result)
      return result;
    // undefined result
    var unknownWorknameError = new Error(
        '[UnknownWorknameError for workname "' + 
      workName + '"] : no handler and no worker function found.');
    unknownWorknameError.name = 'unknownWorknameError';
    // return
    return new Result('ok',undefined,settings,unknownWorknameError);
  };
};
