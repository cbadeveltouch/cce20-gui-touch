Ext.define('CS.schede.schede.Tinetti.StoreDati', {
	extend: 'Ext.data.ArrayStore',
	fields: [
	
		{name: 'tab'},
		{name: 'descrDomanda'},
		{name: 'name'},
		{name: 'risposte'},
		{name: 'sottoDomanda'},
	],	
	data: [
		[1,'TINETTIAND_DOMANDA1','andInizioDeamb',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA1', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA2', punteggio: 1}, 
			]
		],
		[1,'TINETTIAND_DOMANDA3.1','andLunghPassoDx',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA3', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA4', punteggio: 1},
						
			],true
		],
		[1,'TINETTIAND_DOMANDA3.2','andAltezzaPassoDx',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA5', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA6', punteggio: 1},
						
			],true
		],
		[1,'TINETTIAND_DOMANDA4.1','andLunghPassoSx',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA7', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA8', punteggio: 1},
				
			],true
		],
		[1,'TINETTIAND_DOMANDA4.2','andAltezzaPassoSx',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA9', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA10', punteggio: 1},
					
			],true
		],
		[1,'TINETTIAND_DOMANDA5','andSimmetria',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA11', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA12', punteggio: 1}, 
			]
		],
		[1,'TINETTIAND_DOMANDA6','andContinuitaPasso',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA13', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA14', punteggio: 1}, 
			]
		],
		[1,'TINETTIAND_DOMANDA7','andTraiettoria',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA15', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA16', punteggio: 1}, 
				{testoRisp: 'TINETTIAND_RISPOSTA17', punteggio: 2}, 
				
			
			]
		],
		[1,'TINETTIAND_DOMANDA8','andTronco',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA18', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA19', punteggio: 1}, 
				{testoRisp: 'TINETTIAND_RISPOSTA20', punteggio: 2}, 
			]
		],
		[1,'TINETTIAND_DOMANDA9','andCammino',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA21', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA22', punteggio: 1}, 
				
			
			]
		],
		/*Equilbrio*/
		
		[2,'TINETTIAND_DOMANDA10','eqDaSeduto',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA23', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA24', punteggio: 1}, 
			]
		],
		[2,'TINETTIAND_DOMANDA11','eqAlzarsiSedia',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA25', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA26', punteggio: 1},
				{testoRisp: 'TINETTIAND_RISPOSTA27', punteggio: 2},
						
			]
		],
		[2,'TINETTIAND_DOMANDA12','eqTentativo',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA28', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA29', punteggio: 1},
				{testoRisp: 'TINETTIAND_RISPOSTA30', punteggio: 2},
						
			]
		],
		[2,'TINETTIAND_DOMANDA13','eqStazEretta5Sec',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA31', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA32', punteggio: 1},
				{testoRisp: 'TINETTIAND_RISPOSTA33', punteggio: 2},
			]
		],
		[2,'TINETTIAND_DOMANDA14','eqStazErettaProl',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA34', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA35', punteggio: 1},
				{testoRisp: 'TINETTIAND_RISPOSTA36', punteggio: 2},
					
			]
		],
		[2,'TINETTIAND_DOMANDA15','eqRomberg',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA37', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA38', punteggio: 1}, 
			]
		],
		[2,'TINETTIAND_DOMANDA16','eqRombergSens',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA39', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA40', punteggio: 1}, 
				{testoRisp: 'TINETTIAND_RISPOSTA41', punteggio: 2},
			]
		],
		[2,'TINETTIAND_DOMANDA17','eqGirarsi',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA42', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA43', punteggio: 1}, 
				
			],
			
		],
		[2,'TINETTIAND_DOMANDA18','eqGirarsiStab',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA44', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA45', punteggio: 1}, 
			],true,
		],
		[2,'TINETTIAND_DOMANDA19','eqSedersi',
			[
				{testoRisp: 'TINETTIAND_RISPOSTA46', punteggio: 0}, 
				{testoRisp: 'TINETTIAND_RISPOSTA47', punteggio: 1}, 
				{testoRisp: 'TINETTIAND_RISPOSTA48', punteggio: 2}, 
			]
		],	
	],
	autoLoad: true,
	autoDestroy: true
});