Ext.define('NgcpCsc.view.pages.callbarring.CallBarringController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.themeroller',

    applyTheme: function() {
        var vm = this.getViewModel();
        // defer is needded becuse binding is slower than change listener callback
        Ext.Function.defer(function() {
            Fashion.css.setVariables({
                'base-color': '#' + vm.get('basecolor'),
                'color': '#' + vm.get('fontcolor'),
                'body-background-color': '#' + vm.get('bodybgcolor'),
                'font-family': vm.get('fontfamily'),
                'font-weight': vm.get('fontweight'),
                'font-size': vm.get('fontsize') + 'px',
                'form-field-font-size': vm.get('fontsize') + 'px'
            });
            this.getView().updateLayout()
        }, 300, this);
    },

    resetTheme: function() {
        var vm = this.getViewModel();
        var logoCont = Ext.getCmp('logoContainer');
        var logoField = this.lookupReference('logoField');

        // TODO use model and model.reset()
        vm.setData({
            basecolor: '66A648',
            fontcolor: '000',
            bodybgcolor: 'fff',
            fontfamily: 'Open Sans, Helvetica Neue',
            fontweight: 'normal',
            fontsize: '13'
        });

        logoCont.removeAll();
        logoField.reset();
        this.applyTheme();
    },

    toggleLogo: function(field) {

        var logoCont = Ext.getCmp('logoContainer');

        if (field && field.getValue()) {
            var reader = new FileReader();
            var file = field.getEl().down('input[type=file]').dom.files[0];

            reader.onload = function(e) {
                logoCont.removeAll();
                logoCont.add(Ext.create('Ext.Img', {
                    src: e.target.result
                }));
            }

            reader.readAsDataURL(file);
        }
    },

    saveTheme: function() {
        this.fireEvent('showmessage', true, Ngcp.csc.locales.common.save_success[localStorage.getItem('languageSelected')]);
    }

});
