Ext.define('CS.menuAzioni.rilevazioneAttivita.dettSommAttivita.AttPlan_ProprietaStore', {
	extend: 'Ext.data.Store',
	alias: 'store.proprietaAttivita',
	fields: [
		{name:'id'},
		{name:'idFascia'},
		{name:'inizio', type:'date'},
		{name:'fine', type:'date'},
		{name:'selected'},
		{name:'descrizione'},
		{name:'codProprieta'},
		{name:'ordine'},
		{name:'raggrupp',
			convert: ( v, record ) => {
            	let idFascia = record.get('idFascia')
            	if (!Ext.isDate(record.get('inizio'))) {
					return ' ' + StdCba.traduci('ATTIVITA_NO_ORARIO')
				}
        		let oraInizio = StdCba.FormattaData( record.get('inizio'), 'H:i' ),
            		oraFine = StdCba.FormattaData( record.get('fine'), 'H:i' ),
            		ordine = record.get('ordine')
            	return `${ordine}_${idFascia}$$${oraInizio} - ${oraFine}`
            }
		}
	],
	sorters: [
        {
            sorterFn: (r1, r2) => {
            	let diff = Ext.Date.diff(r1.data.inizio, r2.data.inizio, Ext.Date.MINUTE);
            	return diff < 0 ? 1 : ( diff == 0 ? 0 : -1 );
            },
            direction: 'ASC'
        }
    ],
	groupField: 'raggrupp',
	autoDestroy: true,
	autoLoad: true
});