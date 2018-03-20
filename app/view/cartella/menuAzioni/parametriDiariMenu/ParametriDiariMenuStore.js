Ext.define('CS.menuAzioni.parametriDiariMenu.ParametriDiariMenuStore', {
	extend: 'Ext.data.Store',
	fields: [
		{name: 'descrizione'},
		{name: 'icona'},
		{name: 'percorso'} 
	],
	data: [
	       	{
				descrizione: 'PRESSIONE_ORTO', 
				icona: 'icon-pressione',
				cnt: 'PressioneOrto'
			},
			{
				descrizione: 'PRESSIONE_CLINO', 
				icona: 'icon-pressione',
				cnt: 'PressioneClino'
			},
			{
				descrizione: 'FREQCARDIACA', 
				icona: 'icon-freqCardiaca',
				cnt:'FreqCardiaca'
			},
			{
				descrizione: 'FREQRESPIRATORIA', 
				icona: 'icon-respiro',
				cnt: 'FreqRespiratoria'
			},
			{
				descrizione: 'TEMPERATURA', 
				icona: 'icon-temperatura',
				cnt: 'Temperatura'
			},
			{
				descrizione:'GLICEMIA', 
				icona: 'icon-glicemia',
				cnt: 'Glicemia'
			},
			{
				descrizione: 'PESO', 
				icona: 'icon-peso',
				cnt: 'Peso'
			},
			{
				descrizione: 'ALTEZZA', 
				icona: 'icon-altezza',
				cnt: 'Altezza'
			},
			{
				descrizione: 'DIURESI', 
				icona: 'icon-diuresi',
				cnt: 'Diuresi'
			},
			{
				descrizione: 'O2 A.A.', 
				icona: 'icon-o2',
				cnt: 'O2'
			},
			{
				descrizione: 'ALVO', 
				icona: 'icon-alvo',
				cnt: 'Alvo'
			},
			{
				descrizione: 'Sonno', 
				icona: 'icon-sonno',
				cnt: 'Sonno'
			},
			{
				descrizione: 'MOBILITA', 
				icona: 'icon-mobilita',
				cnt: 'Mobilita'
			},
			{
				descrizione: 'DIARIO', 
				icona: 'icon-diari',
				cnt: 'Diario'
			},
			//TODO_PLS
//			{
//				descrizione: 'ALCOOL', 
//				icona: 'icon-diari',
//				cnt: 'Alcool'
//			},
//			{
//				descrizione: 'DROGHE', 
//				icona: 'icon-diari',
//				cnt: 'Droghe'
//			},
			{
				descrizione: 'TUTTI_PARAMETRI', 
				icona: 'icon-contenzioni',
				cnt: 'Tutti'
			}
	      
	],
	
	autoDestroy: true	
});
