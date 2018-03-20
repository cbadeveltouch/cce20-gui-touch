Ext.define('CS.cruscottoOperatore.calendarioConsegne.panelConsegne.ConsegnaDestModel', {
	extend: 'Ext.data.Model',
    fields: [
        {name: 'destNominativo'},
        {name: 'descrizioneDestFigProf'},
        {name: 'ragg', convert: function(v, rec) {
            
            // 0 = consegna a figura professionale
            // 1 = consegna confidenziale
            //var str = '';
            //str = (Ext.isEmpty(rec.get('destNominativo')) ? 0 : 1 + '_' + rec.get('descrizioneDestFigProf'));

            return  (Ext.isEmpty(rec.get('destNominativo')) ? 0 : 1);
        }}
    ],
    
});