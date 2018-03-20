Ext.define('CS.schede.schede.mhct.StoreDati', {
	extend: 'Ext.data.ArrayStore',
	fields: [
		{name: 'ordine'},
		{name: 'sezione'},
		{name: 'descrDomanda'},
		{name: 'name'},
		{name: 'risposte'}
	],	
	data: [
		/* SEZIONE COMPORTAMENTALE */
		[1,1,'MHCT_DOMANDA1','domanda1',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA2', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA3', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA4', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA5', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[2,1,'MHCT_DOMANDA2','domanda2',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA7', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA8', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA9', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA10', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[3,1,'MHCT_DOMANDA3','domanda3',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA11', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA12', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA13', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA14', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		/* SEZIONE MENOMAZIONE */
		[4,2,'MHCT_DOMANDA4','domanda4',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA15', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA16', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA17', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA18', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[5,2,'MHCT_DOMANDA5','domanda5',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA19', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA20', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA21', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA22', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		/* SEZIONE PSICOPATOLOGIA */
		[6,3,'MHCT_DOMANDA6','domanda6',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA23', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA24', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA25', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA26', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[7,3,'MHCT_DOMANDA7','domanda7',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA27', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA28', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA29', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA30', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[8,3,'MHCT_DOMANDA8','domanda8Risposta',
			[
				{testoRisp: 'MHCT_DOMANDA8_1', punteggio: 1, subName: 'domanda8'},
				{testoRisp: 'MHCT_DOMANDA8_2', punteggio: 2, subName: 'domanda8'},
				{testoRisp: 'MHCT_DOMANDA8_3', punteggio: 3, subName: 'domanda8'},
				{testoRisp: 'MHCT_DOMANDA8_4', punteggio: 4, subName: 'domanda8'},
				{testoRisp: 'MHCT_DOMANDA8_5', punteggio: 5, subName: 'domanda8'},
				{testoRisp: 'MHCT_DOMANDA8_6', punteggio: 6, subName: 'domanda8'},
				{testoRisp: 'MHCT_DOMANDA8_7', punteggio: 7, subName: 'domanda8'},
				{testoRisp: 'MHCT_DOMANDA8_8', punteggio: 8, subName: 'domanda8'}
			]
		],
		/* SEZIONE SOCIALE */
		[9,4,'MHCT_DOMANDA9','domanda9',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA31', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA32', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA33', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA34', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[10,4,'MHCT_DOMANDA10','domanda10',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA35', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA36', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA37', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA38', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[11,4,'MHCT_DOMANDA11','domanda11',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA39', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA40', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA41', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA42', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[12,4,'MHCT_DOMANDA12','domanda12',
			[
				{testoRisp: 'MHCT_RISPOSTA1', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA39', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA43', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA44', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA45', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		/* SEZIONE STORICO */
		[13,5,'MHCT_DOMANDA13','domanda13',
			[
				{testoRisp: 'MHCT_RISPOSTA46', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA47', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA48', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA49', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA50', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[14,5,'MHCT_DOMANDA14','domanda14',
			[
				{testoRisp: 'MHCT_RISPOSTA51', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA52', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA53', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA54', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA55', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9}
			]
		],
		[15,5,'MHCT_DOMANDA15','domanda15',
			[
				{testoRisp: 'MHCT_RISPOSTA56', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA57', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA58', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA59', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA60', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9},
			]
		],
		[16,5,'MHCT_DOMANDA16','domanda16',
			[
				{testoRisp: 'MHCT_RISPOSTA61', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA62', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA63', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA64', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA65', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9},
			]
		],
		[17,5,'MHCT_DOMANDA17','domanda17',
			[
				{testoRisp: 'MHCT_RISPOSTA66', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA67', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA68', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA69', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA70', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9},
			]
		],
		[18,5,'MHCT_DOMANDA18','domanda18',
			[
				{testoRisp: 'MHCT_RISPOSTA71', punteggio: 0},
				{testoRisp: 'MHCT_RISPOSTA72', punteggio: 1},
				{testoRisp: 'MHCT_RISPOSTA73', punteggio: 2},
				{testoRisp: 'MHCT_RISPOSTA74', punteggio: 3},
				{testoRisp: 'MHCT_RISPOSTA75', punteggio: 4},
				{testoRisp: 'MHCT_RISPOSTA6', punteggio: 9},
			]
		],
	],
	autoLoad: true,
	autoDestroy: true
});