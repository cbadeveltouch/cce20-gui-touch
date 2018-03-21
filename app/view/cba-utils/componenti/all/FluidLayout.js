Ext.define('CbaUtils.componenti.all.FluidLayout', {
    extend: 'Ext.layout.Box',
    alias: 'layout.fluid',
    setContainer: function (container) {
        this.callSuper(arguments);
        container.innerElement.replaceCls('x-horizontal', 'x-horizontal-fluid');
    }
});