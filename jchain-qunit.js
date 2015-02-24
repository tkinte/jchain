
/*
=====================================================
*****************************************************
Unit testing with Qunit
*****************************************************
=====================================================
*/
/*
==========================
Boolean Properties Testing
==========================
*/
var chainBooleanProperties = ['handlerFirst',
                              'customHandlerFirst',
                             'customWorkerFirst',
                             'optionFirst'];
chainBooleanProperties.forEach(function(current, index, array){
  QUnit.module(current + ' [boolean Property] ',{
    beforeEach: function() {
      this.chain = new Chain();}
  });
  /*-- 1. default value --*/
  QUnit.test( "default value", function( assert ) {
    assert.ok( this.chain[current](), 
              current + " default value is true" );
  });
  /*-- 2. NaN value --*/
  QUnit.test( "NaN value", function( assert ) {
    this.chain[current](NaN);
    assert.ok(! this.chain[current](), 
              current + " = NaN is false" );
  });
  /*-- 3. undefined value --*/
  QUnit.test( "undefined value", function( assert ) {
    this.chain[current] (undefined);
    assert.ok( ! this.chain[current](), 
              current + " = undefined is false");
  });  
  /*-- 4. null value --*/
  QUnit.test( "null value", function( assert ) {
    this.chain[current](null);
    assert.ok( ! this.chain[current](), 
              current + " = null is false" );
  });
  /*-- 5. empty string value --*/
  QUnit.test( "empty string '' value",
    function( assert ){
      this.chain[current]('');
      assert.ok( ! this.chain[current](),
                current + " = '' is false" );
  });
  /*-- 6. untrimed empty string value --*/
  QUnit.test( "untrimed empty string '  ' value", 
    function( assert ) {
      this.chain[current]('   ');
    assert.ok( this.chain[current](),
              current + " = '  ' (untrimed) is true" );
  });
  /*-- 7. not initialized object value --*/
  QUnit.test( "not initialized object value", 
    function( assert ) {
      var o;
      this.chain[current](o);
      assert.ok( ! this.chain[current]() ,
        current + " = o (not initialized) is false" );
    });
  /*-- 8. initialized object value --*/
  QUnit.test( "initialized object value", 
    function( assert ) {
      var o = {};
      this.chain[current](o);
      assert.ok( this.chain[current], 
        current + " = o (initialized) is true" );
    });
});
/*
=====================================
Single Catalogs
=====================================
*/
var catalogs = ['defaults',
               'options',
               'defaultHandlers',
               'customHandlers',
               'defaultWorkers',
               'customWorkers'];
/*
=====================================
Single Catalog Default access Testing
with no argument
=====================================
*/
catalogs.forEach(function(current,index, array){
  QUnit.module(current + ' [single catalog default access with no argument & reset] ',{
    beforeEach: function() {
      this.chain = new Chain();
    }
  });
  /*-- 1. default value --*/
  QUnit.test( "default value : empty object", function( assert ) {
    var value = {};
    assert.deepEqual( this.chain[current](), value,
                     current + " : return default value is empty {} when empty {} catalog." );
  });
  /*-- 2. default value --*/
  QUnit.test( "populated object value", function( assert ) {
    var value = {value1:'value',value2:'value2', value3:null,value4:undefined};
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](), value,
                     current + " : return value is deepEqual to populated catalog." );
  });
  /*-- 4. default value --*/
  QUnit.test( "undefined value", function( assert ) {
    var value;
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](), value,
                     current + " : return value is UNDEFINED when UNDEFINED catalog." );
  });
  /*-- 5. default value --*/
  QUnit.test( "null value", function( assert ) {
    var value = null;
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](), value,
                     current + " : return value is NULL when NULL catalog." );
  });
});
/*
=====================================
Single Catalog Default access Testing
with a string entryKey argument
=====================================
*/
catalogs.forEach(function(current,index, array){
  QUnit.module(current + ' [single catalog default access with an entryKey argument] ',{
    beforeEach: function() {
      this.chain = new Chain();
      this.entryKey = 'value1';}
  });
  /*-- 1. default value --*/
  QUnit.test( "`empty catalog", function( assert ) {
    assert.deepEqual( this.chain[current](this.entryKey), undefined,
                     current + " : entryKey undefined in the empty catalog." );
  });
  /*-- 2. default value --*/
  QUnit.test( "populated catolog", function( assert ) {
    var value = {value1:'value',value2:'value2', value3:null,value4:undefined};
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](this.entryKey), value[this.entryKey],
                     current + " : entry found in the catalog with the approriate key." );
  });
  /*-- 3. default value --*/
  QUnit.test( "undefined catalog", function( assert ) {
    var value;
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](this.entryKey), undefined,
                     current + " : returns UNDEFINED entry when UNDEFINED catalog." );
  });
  /*-- 4. default value --*/
  QUnit.test( "null catalog", function( assert ) {
    var value = null;
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](this.entryKey), undefined,
                     current + " : returns UNDEFINED entry when NULL catalog." );
  });
  
});
/*
=====================================
Single Catalog Default access Testing
with an only not string argument
=====================================
*/
catalogs.forEach(function(current,index, array){
  QUnit.module(current + ' [single catalog default access with entryKey  & entryValue arguments] ',{
    beforeEach: function() {
      this.chain = new Chain();
    }
  });
  /*-- 1. undefined catalog --*/
  QUnit.test( "undefined entry", function( assert ) {
    var value;
    //undefinedfy all catalags
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value,value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    // set entries
    this.chain.defaults(value,value);
    this.chain.options(value,value);
    this.chain.defaultHandlers(value,value);
    this.chain.customHandlers(value,value);
    this.chain.defaultWorkers(value,value);
    this.chain.customWorkers(value,value);
    assert.deepEqual( this.chain[current](value), value,
                     current + " : sets and returns undefined as catalog." );});
  /*-- 2. null catalog --*/
  QUnit.test( "null entry", function( assert ) {
    var value = null;
    this.chain.defaults(value,value);
    this.chain.options(value,value);
    this.chain.defaultHandlers(value,value);
    this.chain.customHandlers(value,value);
    this.chain.defaultWorkers(value,value);
    this.chain.customWorkers(value,value);
    assert.deepEqual( this.chain[current](value), value,
                     current + " : sets and returns null as catalog." );});
  /*-- 3. null catalog --*/
  QUnit.test( "string entry", function( assert ) {
    
    var value = 'string';
    this.chain.defaults(value,value);
    this.chain.options(value,value);
    this.chain.defaultHandlers(value,value);
    this.chain.customHandlers(value,value);
    this.chain.defaultWorkers(value,value);
    this.chain.customWorkers(value,value);
    assert.deepEqual( this.chain[current](value), value,
                     current + " : try to set a string as catalog, but NOT ALLOWED.  Apply the normal behaviour : use the passed string as entryKey and returns undefined as missing entryKey in the catalog." );});
  /*-- 4. null catalog --*/
  QUnit.test( "array entry", function( assert ) {
    var value = [1,2];
    this.chain.defaults(value,value);
    this.chain.options(value,value);
    this.chain.defaultHandlers(value,value);
    this.chain.customHandlers(value,value);
    this.chain.defaultWorkers(value,value);
    this.chain.customWorkers(value,value);
    assert.deepEqual( this.chain[current](value), value,
                     current + " : sets and returns an array as catalog." );});
  /*-- 4. null catalog --*/
  QUnit.test( "object [key:value] entry", function( assert ) {
    var value = {value1:'value',value2:'value2', value3:null,value4:undefined};
    this.chain.defaults(value,value);
    this.chain.options(value,value);
    this.chain.defaultHandlers(value,value);
    this.chain.customHandlers(value,value);
    this.chain.defaultWorkers(value,value);
    this.chain.customWorkers(value,value);
    assert.deepEqual( this.chain[current](value), value,
                     current + " : sets and returns a populated object [key:value] as catalog." );});
 });  
/*
=====================================
Compound Catalogs access
=====================================
*/
catalogs = ['settings','handlers','workers'];
/*
=====================================
Compound Catalog Default access Testing
with no argument
=====================================
*/
catalogs.forEach(function(current,index, array){
  QUnit.module(current + ' [Compound catalog default access with no argument] ',{
    beforeEach: function() {
      this.chain = new Chain();}
  });
  /*-- 1. default value --*/
  QUnit.test( "default values : empty catalogs", function( assert ) {
    var settings = {defaults:{},options:{}};
    assert.deepEqual( this.chain[current](), settings,
                     current + " : returns empty catalogs {defaults:{},options:{}}." );
  });
  /*-- 2. default value --*/
  QUnit.test( "populated default catalogs", function( assert ) {
    var value = {value1:'value',value2:'value2', value3:null,value4:undefined};
    var result = {defaults:value,options:value};
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](), result,
                     current + " : returns catalogs {defaults:value,options:value}." );
  });
  /*-- 3. default value --*/
  QUnit.test( "undefined catalogs", function( assert ) {
    var value;
    var result = {defaults:value,options:value};
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](), result,
                     current + " : returns catalogs {defaults:{},options:this.value}." );
  });
  /*-- 3. default value --*/
  QUnit.test( "null catalogs", function( assert ) {
    var value = null;
    var result = {defaults:value,options:value};
    this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current](), result,
                     current + " : returns catalogs {defaults:{},options:this.value}." );
  });
});
/*
=====================================
Compound Catalog Default access Testing
with no argument after catalogsReset
=====================================
*/
catalogs.forEach(function(current,index, array){
  QUnit.module(current + ' [Compound catalog default access with no argument,  after catalogsReset] ',{
    beforeEach: function() {
      this.chain = new Chain();}
  });
  /*-- 1. default value --*/
  QUnit.test( "null catalogs : empty catalogs reset to null", function( assert ) {
    var value = null;
    var result = {defaults:value,options:value};
    this.chain.catalogsReset(); // ignored
    this.chain.catalogsReset({defaults:value, options:value, defaultHandlers:value,customHandlers:value,defaultWorkers:value,customWorkers:value});
    this.chain.catalogsReset(); // ignored
    assert.deepEqual( this.chain[current](), result,
                     current + " : returns  catalogs {defaults:value,options:value}, where value === null." );
  });
  /*-- 1. default value --*/
  QUnit.test( "null catalogs : empty catalogs reset to null", function( assert ) {
    var value = null;
    var result = {defaults:value,options:value};
    this.chain.catalogsReset(); // ignored
    this.chain.catalogsReset({defaults:value, options:value, defaultHandlers:value,customHandlers:value,defaultWorkers:value,customWorkers:value});
    this.chain.catalogsReset(); // ignored
    assert.deepEqual( this.chain[current](), result,
                     current + " : returns  catalogs {defaults:value,options:value}, where value === null." );
  });
  /*-- 2. default value --*/
  QUnit.test( "undefined catalogs : empty catalogs reset to undefined", function( assert ) {
    var value;
    var result = {defaults:value,options:value};
    this.chain.catalogsReset(); // ignored
    this.chain.catalogsReset({defaults:value, options:value, defaultHandlers:value,customHandlers:value,defaultWorkers:value,customWorkers:value});
    assert.deepEqual( this.chain[current](), result,
                     current + " : returns  catalogs {defaults:value,options:value}, where value === null." );
  });
  /*-- 3. default value --*/
  QUnit.test( "populated default catalogs, after catalogs reset to populated object", function( assert ) {
    var value = {value1:'value',value2:'value2', value3:null,value4:undefined};
    var result = {defaults:value,options:value};
    this.chain.catalogsReset({defaults:value, options:value, defaultHandlers:value,customHandlers:value,defaultWorkers:value,customWorkers:value});
    this.chain.catalogsReset(); // ignored
    assert.deepEqual( this.chain[current](), result,
                     current + " : returns catalogs {defaults:value,options:value}, where value === populated catalog" );
  });
});
/*
=====================================
Compound Catalog Default access 
Testing with an argument
=====================================
*/
catalogs.forEach(function(current,index, array){
  QUnit.module(current + ' [Compound catalog default access with an argument] ',{
    beforeEach: function() {
      this.chain = new Chain();
    }
  });
  /*-- 1. default value --*/
  QUnit.test( "default values : empty catalogs", function( assert ) {
    var settings = {defaults:{},options:{}};
    var _undefined;
    assert.deepEqual( this.chain[current](this.entryKey1), _undefined,
                     current + " : returns undefined entry from catalogs {defaults:{},options:{}}." );
    assert.deepEqual( this.chain[current](this.entryKey2), _undefined,
                     current + " : returns undefined entry from catalogs {defaults:{},options:{}}." );
    assert.deepEqual( this.chain[current](this.entryKeyUNDEFINED), _undefined,
                     current + " : returns undefined entry from catalogs {defaults:{},options:{}}." );
    assert.deepEqual( this.chain[current](this.entryKeyNULL), _undefined,
                     current + " : returns undefined entry from catalogs {defaults:{},options:{}}." );
  });
  /*
   * -- 2. custom catalog initialized --
   */
  QUnit.test( "only default catalog initialized", function( assert ) {
    var value = {key1:'value1',key2:'value2', keyNULL:null,keyUNDEFINED:undefined};
    var result = {defaults:value,options:value};
    this.chain.defaultsReset(value);
    //this.chain.optionsReset(value);
    this.chain.defaultHandlersReset(value);
    //this.chain.customHandlersReset(value);
    this.chain.defaultWorkersReset(value);
    //this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current]('key1'),value.key1,
                     current + " : returns entry value for entryKey key1 from default catalog ." );
    assert.deepEqual( this.chain[current]('key2'),value.key2,
                     current + " : returns entry value for 'key2' from default catalog." );
    assert.deepEqual( this.chain[current]('keyUNDEFINED'), value.keyUNDEFINED,
                     current + " : returns entry value for 'keyUNDEFINED' from default catalog." );
    assert.deepEqual( this.chain[current]('keyNULL'),value.keyNULL,
                     current + " : returns NULL entry value for 'keyNULL' from default catalog." );
  });
  /*-- 3. custom catalog initialized --*/
  QUnit.test( "only custom catalog initialized", function( assert ) {
    var value = {key1:'value1',key2:'value2', keyNULL:null,keyUNDEFINED:undefined};
    var result = {defaults:value,options:value};
    //this.chain.defaultsReset(value);
    this.chain.optionsReset(value);
    //this.chain.defaultHandlersReset(value);
    this.chain.customHandlersReset(value);
    //this.chain.defaultWorkersReset(value);
    this.chain.customWorkersReset(value);
    assert.deepEqual( this.chain[current]('key1'),value.key1,
                     current + " : returns entry value for 'key1' from custom catalog ." );
    assert.deepEqual( this.chain[current]('key2'),value.key2,
                     current + " : returns entry value for 'key2' from custom catalog." );
    assert.deepEqual( this.chain[current]('keyUNDEFINED'),value.keyUNDEFINED,
                     current + " : returns undefined entry value for entryKeyUNDEFINED from custom catalog." );
    assert.deepEqual( this.chain[current]('keyNULL'),value.keyNULL,
                     current + " : returns null entry value for 'keyNULL' from custom catalog." );
  });
  
});
/*
=====================================
Setting access with an argument  
when optionFirst & ! optionFirst
=====================================
*/
catalogs = ['settings'];
/*
=====================================
Setting access with an argument  
when optionFirst & ! optionFirst
=====================================
*/
catalogs.forEach(function(current,index, array){
  QUnit.module(current + ' [Setting access with an argument when optionFirst & ! optionFirst] ',{
    beforeEach: function() {
      this.chain = new Chain();
      this.key = 'key';
      this.defaultOnlyKey = 'defaultOnlyKey';
      this.optionOnlyKey = 'optionOnlyKey';
      this.defaults = {key:'default',defaultOnlyKey:'defaultOnly'};
      this.options = {key:'option',optionOnlyKey:'optionOnly'};
      this.chain.optionsReset(this.options);
      this.chain.defaultsReset(this.defaults);
    }
  });
  /*-- 1. default value --*/
  QUnit.test( "optionFirst === true : empty catalogs", function( assert ) {
    var emptySettings = {defaults:{},options:{}};
    this.chain.catalogsReset(emptySettings);
    //this.chain.optionsReset(emptySettings);
    //this.chain.defaultsReset(emptySettings);
    assert.deepEqual( this.chain[current](this.key), undefined,
                     current + " : optionFirst === true,  returns undefined value for 'this.key' from empty settings." );
    assert.deepEqual( this.chain[current](this.defaultOnlyKey), undefined,
                     current + " : optionFirst === true,  returns undefined value for 'this.defaultOnlyKey' from empty settings." );
    assert.deepEqual( this.chain[current](this.optionOnlyKey), undefined,
                     current + " : optionFirst === true,  returns undefined value for 'this.optionOnlyKey' from empty settings." );
    /*
     * this.chain.optionFirst(false);
     */
    this.chain.optionFirst(false);
    assert.deepEqual( this.chain[current](this.key), undefined,
                     current + " : optionFirst === false,  returns undefined value for 'this.key' from empty settings." );
    assert.deepEqual( this.chain[current](this.defaultOnlyKey), undefined,
                     current + " : optionFirst === false,  returns undefined value for 'this.defaultOnlyKey' from empty settings." );
    assert.deepEqual( this.chain[current](this.optionOnlyKey), undefined,
                     current + " : optionFirst === false,  returns undefined value for 'this.optionOnlyKey' from empty settings." );
  });
  /*
   * populated settings 
   */
  QUnit.test( "optionFirst === true : populated settings", function( assert ) {
    assert.deepEqual( this.chain[current](this.key), this.options[this.key],
                     current + " : optionFirst === true,  returns option value for 'this.key' from  options." );
    assert.deepEqual( this.chain[current](this.defaultOnlyKey), this.defaults[this.defaultOnlyKey],
                     current + " : optionFirst === true,  returns default value for 'this.defaultOnlyKey' from defaults." );
    assert.deepEqual( this.chain[current](this.optionOnlyKey), this.options[this.optionOnlyKey],
                     current + " : optionFirst === true,  returns option value for 'this.optionOnlyKey' from options." );
    /*
     * this.chain.optionFirst(false);
     */
    this.chain.optionFirst(false);
    assert.deepEqual( this.chain[current](this.key), this.defaults[this.key],
                     current + " : optionFirst === false,  returns default value for 'this.key' from defaults." );
    assert.deepEqual( this.chain[current](this.defaultOnlyKey), this.defaults[this.defaultOnlyKey],
                     current + " : optionFirst === false,  returns default value for 'this.defaultOnlyKey' from defaults." );
    assert.deepEqual( this.chain[current](this.optionOnlyKey), this.options[this.optionOnlyKey],
                     current + " : optionFirst === false,  returns option value for 'this.optionOnlyKey' from options." );
  });
});
/*
============================================
Run with empty workers and handlers catalogs
============================================
*/
QUnit.module('[Run with empty workers and handlers catalogs] ',{
  beforeEach: function() {
    this.chain = new Chain();
    this.workname = 'workname';
    this.worknameUNDEFINED = undefined ;
    this.worknameNULL = null;
    }
  });
/*-- 1. default value --*/
QUnit.test( " no parameters", function( assert ) {
  //worknameUNDEFINED
  var result = this.chain.run(this.worknameUNDEFINED);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
  //worknameNULL
  result = this.chain.run(this.worknameNULL);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
  //workname
  result = this.chain.run(this.workname);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
});
/*
 *
 */
QUnit.test( " empty object parameters", function( assert ) {
  var parameters = {};
  //worknameUNDEFINED
  var result = this.chain.run(this.worknameUNDEFINED, parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
  //worknameNULL
  result = this.chain.run(this.worknameNULL, parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
  //workname
  result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
});
/*
 *
 */
QUnit.test( " empty object parameters", function( assert ) {
  var parameters = {param1:'param1',param2:'param2',param3:'param3'};
  //worknameUNDEFINED
  //worknameUNDEFINED
  var result = this.chain.run(this.worknameUNDEFINED, parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
  //worknameNULL
  result = this.chain.run(this.worknameNULL, parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters)  );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
  //workname
  result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output ok" );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name, 'unknownWorknameError',
                   " execution exceptions 'unknownWorknameError'" );
});
/*
============================================
Run with initialized workers and 
empty handlers catalogs
============================================
*/
QUnit.module('[Run with initialized workers and empty handlers catalogs] ',{
  beforeEach: function() {
    this.chain = new Chain();
    this.workname = 'workname';
    this.worknameThrowError = 'worknameThrowError';
    this.defaultOutput = 'default output';
    this.customOutput = 'custom output';
    this.chain.defaultWorkers(this.workname,function(parameters){return 'default output';});
this.chain.defaultWorkers(this.worknameThrowError,function(parameters){var er = new  Error('defaultWorkerError'); er.name = 'defaultWorkerError'; throw er;});
    this.chain.customWorkers(this.workname,function(parameters){return 'custom output';});
    this.chain.customWorkers(this.worknameThrowError,function(parameters){var er = new  Error('customWorkerError'); er.name = 'customWorkerError'; throw er;});
    this.customWorkerErrorMessage = 'customWorkerError';
    this.defaultWorkerErrorMessage = 'defaultWorkerError';
    }
  });
/*-- 1. default value --*/
QUnit.test( " no parameters", function( assert ) {
  //workname
  var result = this.chain.run(this.workname);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), this.customOutput,
      " execution output " + result.output() );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions(),undefined,
                    " execution exceptions " + undefined);
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output " + undefined );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name,'workerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customWorkerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
 *
 */
QUnit.test( " empty object parameters", function( assert ) {
  var parameters = {};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), this.customOutput,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions " + result.exceptions() );
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name,'workerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customWorkerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
 *
 */
QUnit.test( " populated parameters", function( assert ) {
  var parameters = {param1:'param1',param2:'param2',param3:'param3'};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), this.customOutput,
      " execution output " + result.output());
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions  " + result.exceptions());
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name,'workerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customWorkerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
================================================
Run with initialized workers and empty handlers catalogs, and customWorkerFirst(false)
================================================
*/
QUnit.module('[Run with initialized workers and empty handlers catalogs, customWorkerFirst(false)] ',{
  beforeEach: function() {
    this.chain = new Chain();
    this.workname = 'workname';
    this.defaultOutput = 'default output';
    this.customOutput = 'custom output';
    this.chain.defaultWorkers(this.workname,function(parameters){return 'default output';});
    this.chain.customWorkers(this.workname,function(parameters){return 'custom output';});
    /*-- ccustomWorkerFirst(false) --*/
    this.chain.customWorkerFirst(false);
    }
  });
/*-- 1. default value --*/
QUnit.test( " no parameters", function( assert ) {
  //workname
  var result = this.chain.run(this.workname);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), this.defaultOutput,
      " execution output " + result.output() );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions(),undefined,
                    " execution exceptions " + undefined);
});
/*
 *
 */
QUnit.test( " empty object parameters", function( assert ) {
  var parameters = {};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), this.defaultOutput,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions " + result.exceptions() );
});
/*
 *
 */
QUnit.test( " populated parameters", function( assert ) {
  var parameters = {param1:'param1',param2:'param2',param3:'param3'};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), this.defaultOutput,
      " execution output " + result.output());
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions  " + result.exceptions());
});




/*
============================================
Run with empty workers and 
initialized handlers catalogs
============================================
*/
QUnit.module('[Run with empty workers and initialized handlers catalogs] ',{
  beforeEach: function() {
    this.chain = new Chain();
    this.workname = 'workname';
    this.worknameThrowError = 'worknameThrowError';
    this.defaultOutput = 'defaultHandlers';
    this.customOutput = 'customHandlers';
    this.chain.defaultHandlers(this.workname,
          {handle:function(parameters){return new Result('defaultHandlers',
             'default output',parameters,undefined);}});
    this.chain.defaultHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('defaultHandlerError'); 
              er.name = 'defaultHandlerError'; throw er;}});
    this.chain.customHandlers(this.workname,
          {handle:function(parameters){return new Result('customHandlers',
              'customHandlers',parameters,undefined);}});
    this.chain.customHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('customHandlerError'); 
              er.name = 'customHandlerError'; throw er;}});
    this.customHandlerErrorMessage = 'customHandlerError';
    this.defaultHandlerErrorMessage = 'defaultHandlerError';
    }
  });
/*-- 1. default value --*/
QUnit.test( " no parameters", function( assert ) {
  //workname
  var result = this.chain.run(this.workname);
  assert.deepEqual( result.status(), this.customOutput,
      " execution status " + this.customOutput );
  assert.deepEqual( result.output(), this.customOutput,
      " execution output " + result.output() );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions(),undefined,
                    " execution exceptions " + undefined);
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output " + undefined );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name,'handlerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customHandlerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
 *
 */
QUnit.test( " empty object parameters", function( assert ) {
  var parameters = {};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), this.customOutput,
      " execution status " + this.customOutput );
  assert.deepEqual( result.output(), this.customOutput,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions " + result.exceptions() );
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name,'handlerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customHandlerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
 *
 */
QUnit.test( " populated parameters", function( assert ) {
  var parameters = {param1:'param1',param2:'param2',param3:'param3'};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(),this.customOutput,
      " execution status " + this.customOutput );
  assert.deepEqual( result.output(), this.customOutput,
      " execution output " + result.output());
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions  " + result.exceptions());
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name,'handlerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customHandlerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
================================================
Run with initialized workers and empty handlers catalogs, and customHandlerFirst(false)
================================================
*/
QUnit.module('[Run with empty workers and initialized handlers catalogs, and customHandlerFirst(false)] ',{
  beforeEach: function() {
    this.chain = new Chain();
    this.workname = 'workname';
    this.worknameThrowError = 'worknameThrowError';
    this.defaultOutput = 'defaultHandlers';
    this.customOutput = 'customHandlers';
    this.chain.defaultHandlers(this.workname,
          {handle:function(parameters){return new Result('defaultHandlers',
             'defaultHandlers',parameters,undefined);}});
    this.chain.defaultHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('defaultHandlerError'); 
              er.name = 'defaultHandlerError'; throw er;}});
    this.chain.customHandlers(this.workname,
          {handle:function(parameters){return new Result('customHandlers',
              'customHandlers',parameters,undefined);}});
    this.chain.customHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('customHandlerError'); 
              er.name = 'customHandlerError'; throw er;}});
    this.customHandlerErrorMessage = 'customHandlerError';
    this.defaultHandlerErrorMessage = 'defaultHandlerError';
    /*
     * this.chain.customHandlerFirst(false);
     */
    this.chain.customHandlerFirst(false);
    }
  });
/*-- 1. default value --*/
QUnit.test( " no parameters", function( assert ) {
  //workname
  var result = this.chain.run(this.workname);
  assert.deepEqual( result.status(), this.defaultOutput,
      " execution status " + this.defaultOutput );
  assert.deepEqual( result.output(), this.defaultOutput,
      " execution output " + result.output() );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions(),undefined,
                    " execution exceptions " + undefined);
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output " + undefined );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name,'handlerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.defaultHandlerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
 *
 */
QUnit.test( " empty object parameters", function( assert ) {
  var parameters = {};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(), this.defaultOutput,
      " execution status " + result.status() );
  assert.deepEqual( result.output(), this.defaultOutput,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions " + result.exceptions() );
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name,'handlerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.defaultHandlerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
 *
 */
QUnit.test( " populated parameters", function( assert ) {
  var parameters = {param1:'param1',param2:'param2',param3:'param3'};
  //workname
  var result = this.chain.run(this.workname,parameters);
  assert.deepEqual( result.status(),this.defaultOutput,
      " execution status " + result.status() );
  assert.deepEqual( result.output(), this.defaultOutput,
      " execution output " + result.output());
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions(), undefined,
                   " execution exceptions  " + result.exceptions());
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError,parameters);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output "+ result.output() );
  assert.deepEqual( result.settings(), parameters,
                   " execution settings " + JSON.stringify(parameters) );
   assert.deepEqual( result.exceptions().name,'handlerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.defaultHandlerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});

/*
============================================
Run with initialized workers and 
initialized handlers catalogs
============================================
*/
QUnit.module('[Run with initialized workers and initialized handlers catalogs] ',{
  beforeEach: function() {
    this.chain = new Chain();
    this.workname = 'workname';
    this.worknameThrowError = 'worknameThrowError';
    this.defaultOutput_WORKER = 'defaultWorkers';
    this.customOutput_WORKER = 'customWorkers';
    this.chain.defaultWorkers(this.workname,function(parameters){return 'default output';});
this.chain.defaultWorkers(this.worknameThrowError,function(parameters){var er = new  Error('defaultWorkerError'); er.name = 'defaultWorkerError'; throw er;});
    this.chain.customWorkers(this.workname,function(parameters){return 'custom output';});
    this.chain.customWorkers(this.worknameThrowError,function(parameters){var er = new  Error('customWorkerError'); er.name = 'customWorkerError'; throw er;});
    this.customWorkerErrorMessage = 'customWorkerError';
    this.defaultWorkerErrorMessage = 'defaultWorkerError';
    this.defaultOutput_HANDLER = 'defaultHandlers';
    this.customOutput_HANDLER = 'customHandlers';
    this.chain.defaultHandlers(this.workname,
          {handle:function(parameters){return new Result('defaultHandlers',
             'defaultHandlers',parameters,undefined);}});
    this.chain.defaultHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('defaultHandlerError'); 
              er.name = 'defaultHandlerError'; throw er;}});
    this.chain.customHandlers(this.workname,
          {handle:function(parameters){return new Result('customHandlers',
              'customHandlers',parameters,undefined);}});
    this.chain.customHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('customHandlerError'); 
              er.name = 'customHandlerError'; throw er;}});
    this.customHandlerErrorMessage = 'customHandlerError';
    this.defaultHandlerErrorMessage = 'defaultHandlerError';
    }
  });
/*-- 1. default value --*/
QUnit.test( " no parameters", function( assert ) {
  //workname
  var result = this.chain.run(this.workname);
  assert.deepEqual( result.status(), this.customOutput_HANDLER,
      " execution status " + result.status() );
  assert.deepEqual( result.output(), this.customOutput_HANDLER,
      " execution output " + result.output() );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions(),undefined,
                    " execution exceptions " + undefined);
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output " + undefined );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name,'handlerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customHandlerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
/*
============================================
Run with initialized workers and 
initialized handlers catalogs, handlerFirst === false
============================================
*/
QUnit.module('[Run with initialized workers and initialized handlers catalogs, handlerFirst === false] ',{
  beforeEach: function() {
    this.chain = new Chain();
    this.workname = 'workname';
    this.worknameThrowError = 'worknameThrowError';
    this.defaultOutput_WORKER = 'defaultWorkers';
    this.customOutput_WORKER = 'customWorkers';
    this.chain.defaultWorkers(this.workname,function(parameters){return 'default output';});
this.chain.defaultWorkers(this.worknameThrowError,function(parameters){var er = new  Error('defaultWorkerError'); er.name = 'defaultWorkerError'; throw er;});
    this.chain.customWorkers(this.workname,function(parameters){return 'customWorkers';});
    this.chain.customWorkers(this.worknameThrowError,function(parameters){var er = new  Error('customWorkerError'); er.name = 'customWorkerError'; throw er;});
    this.customWorkerErrorMessage = 'customWorkerError';
    this.defaultWorkerErrorMessage = 'defaultWorkerError';
    this.defaultOutput_HANDLER = 'defaultHandlers';
    this.customOutput_HANDLER = 'customHandlers';
    this.chain.defaultHandlers(this.workname,
          {handle:function(parameters){return new Result('defaultHandlers',
             'defaultHandlers',parameters,undefined);}});
    this.chain.defaultHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('defaultHandlerError'); 
              er.name = 'defaultHandlerError'; throw er;}});
    this.chain.customHandlers(this.workname,
          {handle:function(parameters){return new Result('customHandlers',
              'customHandlers',parameters,undefined);}});
    this.chain.customHandlers(this.worknameThrowError,
          {handle:function(parameters){var er = new  Error('customHandlerError'); 
              er.name = 'customHandlerError'; throw er;}});
    this.customHandlerErrorMessage = 'customHandlerError';
    this.defaultHandlerErrorMessage = 'defaultHandlerError';
    /*
     * this.chain.handlerFirst(false);
     */
    this.chain.handlerFirst(false);
    }
  });
/*-- 1. default value --*/
QUnit.test( " no parameters", function( assert ) {
  //workname
  var result = this.chain.run(this.workname);
  assert.deepEqual( result.status(), "ok",
      " execution status " + result.status() );
  assert.deepEqual( result.output(), this.customOutput_WORKER,
      " execution output " + result.output() );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions(),undefined,
                    " execution exceptions " + undefined);
  //Error thrower worker
  result = this.chain.run(this.worknameThrowError);
  assert.deepEqual( result.status(), 'ok',
      " execution status ok" );
  assert.deepEqual( result.output(), undefined,
      " execution output " + undefined );
  assert.deepEqual( result.settings(), {},
                   " execution settings {}" );
   assert.deepEqual( result.exceptions().name,'workerError',
                    " execution exceptions " + result.exceptions().message);
  assert.deepEqual( result.exceptions().message.indexOf(this.customWorkerErrorMessage) > -1,true,
                    " execution exceptions " + result.exceptions().message);
});
