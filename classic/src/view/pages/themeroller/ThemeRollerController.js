
Ext.define('NgcpCsc.view.pages.callbarring.CallBarringController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.themeroller',

    applyColors: function(btn) {
        var vm = this.getViewModel();

        Fashion.css.setVariables({
            'base-color': '#' + vm.get('basecolor'),
            'color':'#' + vm.get('fontcolor'),
            'body-background-color': '#' + vm.get('bodybgcolor'),
            'neautral-color': '#' + vm.get('neautralcolor')
        });
    }
});
