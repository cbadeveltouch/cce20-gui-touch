Ext.define('CS.consegne.TipoConsegna', {
	extend: 'Ext.data.Store',
	fields: [
        {name: 'tipoConsegna'},
		{name: 'abbreviazione'},
		{name: 'src'},
		{name: 'classe'},
		{name: 'columnTblPersonConsegne'} //campo nel db di personalizzazioni delle consegne
	],
	//store usato sia per la mobile che per la parte desktop  per definire tipi classi e descrizioni delle consegne
	data: [
	       	{
				tipoConsegna: StdCba.traduci('LIBERA_REPARTO'), 
				abbreviazione: 'L', 
				src: 'resources/images/generali/cog-weel.svg',
				classe: 'prt-consegne'
			},
			{ 
				tipoConsegna: StdCba.traduci('TERAPIE'), 
				abbreviazione: 'T', 
				src: 'resources/images/generali/cog-weel.svg'
			},
			{ 
				tipoConsegna: StdCba.traduci('PARAMETRI'), 
				abbreviazione: 'V', 
				src:'resources/images/popup/parametri.svg', 
				classe: 'icon-parametri',
				columnTblPersonConsegne: 'parametri' 
			},
			{ 
				tipoConsegna: StdCba.traduci('PATOLOGIE'), 
				abbreviazione: 'P', 
				src: 'resources/popup/anamnesiPatologica.svg',
				classe: 'icon-anamnesi-patologica'
			},
			{
				tipoConsegna: StdCba.traduci('ACCERTAMENTI'), 
				abbreviazione: 'A', 
				src: 'resources/images/popup/accertamenti.svg',
				classe: 'icon-accertamenti'
			},
			{
				tipoConsegna: StdCba.traduci('CONTENZIONI'), 
				abbreviazione: 'C', 
				src: 'resources/images/popup/contenzioni.svg',
				classe: 'icon-contenzioni',
				columnTblPersonConsegne: 'contenzioni' 
			},
			{
				tipoConsegna: StdCba.traduci('CADUTE'), 
				abbreviazione: 'U', 
				src: 'resources/images/popup/cadute.svg',
				classe: 'icon-cadute',
				columnTblPersonConsegne: 'cadute' 
			},
			{
				tipoConsegna: StdCba.traduci('SOST_FARMACO'), 
				abbreviazione: 'F', 
				src: 'resources/images/generali/cog-weel.svg'
			},
			{
				tipoConsegna: StdCba.traduci('MANCATA_SOMM'), 
				abbreviazione: 'O', 
				src: 'resources/images/generali/cog-weel.svg'
			},
	       	/*{
				id: 10,
				tipoConsegna: 'SCHEDA_ASSISTENZIALE', 
				abbreviazione: 'K', 
				src:'/cba/css/generali/images/generali/cog-weel.svg'
			},*/
			{
				tipoConsegna: StdCba.traduci('DIARI'), 
				abbreviazione: 'D', 
				src: 'resources/images/popup/diari.svg',
				classe: 'icon-diario', 
				columnTblPersonConsegne: 'diari'
			},
			{
				tipoConsegna: StdCba.traduci('EVENTI_AVVERSI'), 
				abbreviazione: 'H', 
				src: 'resources/images/popup/eventiAvversi.svg',
				classe: 'icon-eventiavversi', 
				columnTblPersonConsegne: 'eventiAvversi'
			},
			{
				tipoConsegna: StdCba.traduci('CATETERE'), 
				abbreviazione: 'G', 
				src: 'resources/images/popup/catetere.svg', 
				classe: 'icon-catetere',
				columnTblPersonConsegne: 'catetere' 
			},
			{
				tipoConsegna: StdCba.traduci('LESIONI'), 
				abbreviazione: 'E',
				src: 'resources/images/popup/lesioni.svg',
				classe: 'icon-lesioni',  
				columnTblPersonConsegne: 'lesioni' 
			},
			{
				tipoConsegna: StdCba.traduci('NUTRIZIONI_ENTERALI'), 
				abbreviazione: 'W', 
				src: 'resources/images/popup/nutrizioniEnterali.svg',
				classe: 'icon-peg',
				columnTblPersonConsegne: 'nutrizioni'
			},
			{
				tipoConsegna: StdCba.traduci('SCHEDA_INFEZIONI'), 
				abbreviazione: 'Q', 
				src: 'resources/images/popup/infezioni.svg',
				classe: 'icon-infezioni', 
				columnTblPersonConsegne: 'skInfezioni'
			},
			{
				tipoConsegna: StdCba.traduci('SCHEDA_STOMIA'), 
				abbreviazione: 'Y', 
				src: 'resources/images/popup/stomia.svg', 
				classe: 'icon-stomia',
				columnTblPersonConsegne: 'skStomia'
			}
	      
	],
	sorters: [
		{
			property: 'tipoConsegna',
			direction: 'ASC'
		}	
	],
	autoDestroy: true	
});
