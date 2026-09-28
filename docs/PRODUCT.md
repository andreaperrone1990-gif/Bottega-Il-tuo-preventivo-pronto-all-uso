# Decisioni di prodotto

Bottega esplora la creazione di preventivi per artigiani partendo dal lavoro da svolgere invece che da un foglio vuoto. Il primo settore è quello degli elettricisti.

## Flusso
1. Scegliere una delle tre lavorazioni dimostrative.
2. Specificare quantità, accessibilità e accessori.
3. Controllare materiali, ore, tariffa e ricarico.
4. Salvare il preventivo, duplicarlo o stamparlo.

## Scelte implementate
- Ricette deterministiche: risultati ispezionabili senza chiamate a modelli AI.
- Materiali: prezzo di vendita, quando disponibile; altrimenti costo netto più ricarico.
- Manodopera: ore per tariffa oraria, modificabili.
- Memoria personale per combinazioni identiche di parametri; non apprendimento automatico generalizzato.
- Demo pubblica statica: nessun account, database condiviso o chiave API. Archivio in localStorage.

## Limiti e prossimi passi
Le compatibilità dipendono dai gruppi assegnati manualmente. Le ricette e le ore sono sintetiche e non validate per offerte reali. Mancano lavori multipli, sincronizzazione tra dispositivi, cronologia e condivisione PDF diretta. La stampa usa il browser. L'importazione Excel richiede associazione delle colonne.

Priorità: validare poche ricette con elettricisti, semplificare il percorso su telefono, distinguere eccezioni da preferenze ricordate, migliorare ricerca e aggiornamento dei listini. Testare con persone di diversa familiarità digitale, misurando tempo, richieste di aiuto e correzioni.

## Dati e riservatezza
Il repository contiene solo dati sintetici e codice selezionato. Non contiene database, account, feedback, preventivi dei tester o cataloghi commerciali. La demo privata è un ambiente distinto, non incluso qui. I file Excel caricati nella demo sono elaborati nel browser; i dati della prova possono essere rimossi dal comando di reset. L'hosting riceve le normali richieste HTTP per servire i file statici.
