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
    var emptySettings = {};
    this.chain.optionsReset(emptySettings);
    this.chain.defaultsReset(emptySettings);
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
