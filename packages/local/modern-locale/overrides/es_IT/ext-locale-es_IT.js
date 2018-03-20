
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Lugio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Ene: 1,
            Feb: 2,
            Mar: 3,
            Abr: 4,
            May: 5,
            Jun: 6,
            Jul: 7,
            Ago: 8,
            Sep: 9,
            Oct: 10,
            Nov: 11,
            Dic: 12
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"];
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '$',
            // Peso Argentino
            dateFormat: 'd/m/Y'
        });
        Ext.util.Format.arMoney = Ext.util.Format.currency;
    }
});

