/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the NgcpCsc.Application class.
 */

 Ext.Ajax.on("beforerequest",function(con){
   con.setUseDefaultXhrHeader(false);
   con.setWithCredentials(true);
 });

 console.info(Ext.manifest);

Ext.application({
    name: 'NgcpCsc',

    extend: 'NgcpCsc.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all NgcpCsc classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    //
    requires: [
        'NgcpCsc.*',
        'Ext.window.Toast'
    ]

});
