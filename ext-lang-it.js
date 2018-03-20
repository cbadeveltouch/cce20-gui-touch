Ext.define('Ext.locale.u.data.validator.Bound', {
    override: 'Ext.data.validator.Bound',

    config: {
        emptyMessage: 'Debe estar presente',
        minOnlyMessage: 'El valor debe ser mayor a {0}',
        maxOnlyMessage: 'El valor debe ser menor a {0}',
        bothMessage: 'El valor debe estar entre {0} y {1}'
    }
});