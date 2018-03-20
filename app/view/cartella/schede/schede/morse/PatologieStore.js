Ext.define('CS.schede.schede.morse.PatologieStore', {
    extend: 'Ext.data.Store',
    fields: [
          {name: 'icd'},
          {name: 'descrizionePatologia', 
            convert: function(v, record) {
                var ris;
                if(record.get('descrizionePatologia') != null){
                	ris = record.get('descrizionePatologia');
	            	 if(record.get('stato') == 4){
	                	ris = 'Da Accertare - ' + record.get('descrizionePatologia');
	            	 }
                }else{
                	ris = ' ';
                	if(record.get('stato') == 4){
	                	ris = 'Da Accertare - ' + ' ';
	            	 }
                }
                
                return ris;
            }
		  },
          {name: 'stato'},
          {name: 'etaEvento',
          	convert: function(v,record){
          		var ris;
          		if(v == null){
          			ris = ' ';
          		}
          		return ris;
          	}
          },
          {name: 'icpc'},
          {name: 'ordine'},
          {name: 'data', type:'date'},
          {name: 'dataRiscontro', type:'date'}
    ],
    proxy: {
        type: 'ajax',
        method:'GET',
        url: `${CbaRootServer}`+'/cba/css/cs/ws/anamnesi/patologie/list',
        api: {
            read: `${CbaRootServer}`+'/cba/css/cs/ws/anamnesi/patologie/list',
            create: `${CbaRootServer}`+'/cba/css/cs/ws/anamnesi/patologie/new',
            update: `${CbaRootServer}`+'/cba/css/cs/ws/anamnesi/patologie/update',
            destroy: `${CbaRootServer}`+'/cba/css/cs/ws/anamnesi/patologie/delete'
            
        },
        reader: {
            type: 'json',
            messageProperty: 'message',
            rootProperty: 'data'
        }
    },
    autoDestroy: true,
    filters:[
    	function(rec) {
    		if( rec.get('tipoBlocco')[0].valore != 'A' ){
    			return rec;
    		}
    	}
    ]
});
