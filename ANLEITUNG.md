# Anleitung für den Admin-Bereich

Diese Anleitung erklärt, wie du Übungen auf **kraft-training.netlify.app**
hinzufügst, änderst oder löschst.

> **Hinweis:** Der Admin-Bereich ist auf Deutsch eingestellt. Einzelne
> Meldungen — vor allem Fehlermeldungen beim Einloggen — können trotzdem
> auf Englisch erscheinen, weil das Login-Modul von Netlify nicht
> vollständig übersetzt ist. Das ist normal und kein Fehler.

## Einloggen

1. Öffne im Browser: **https://kraft-training.netlify.app/admin/**
2. Klicke auf **„Mit Netlify Identity einloggen"**.
3. E-Mail-Adresse und Passwort eingeben → **Login**.

Nach dem Einloggen siehst du links die 6 Kategorien:
Aufwärmen, Passspiel, Torabschluss, Spielform, Halle, Kondition.

## Neue Übung hinzufügen

1. Links auf die gewünschte **Kategorie** klicken (z.B. „Aufwärmen").
2. Oben rechts auf **„Neue Aufwärm-Übung"** klicken.
3. Formular ausfüllen:
   - **Name der Übung** — z.B. „Passspiel im Quadrat" *(Pflicht)*
   - **Übungsbild** — Bild vom Computer hochladen, maximal 1 MB *(Pflicht)*
   - **Reihenfolge** — Zahl, kleiner = weiter vorne *(optional, leer lassen = Sortierung nach Name)*
   - **Beschreibung** — was wird trainiert, wie läuft die Übung *(optional)*
   - **Video-Link** — YouTube- oder Vimeo-URL, muss mit `http://` oder `https://` beginnen *(optional)*
   - **Dauer** — z.B. „10 Minuten" *(optional)*
   - **Spielerzahl** — z.B. „8 Spieler" oder „4 vs 4" *(optional)*
4. Oben rechts auf **„Speichern"** klicken.

Die Übung ist jetzt ein **Entwurf**. Sie ist noch nicht online.

## Entwurf veröffentlichen

Damit eine gespeicherte Übung wirklich auf der Website erscheint, gibt es
zwei Wege:

**Der schnelle Weg (direkt im Editor):**
Oben in der Leiste des Editors gibt es das Menü
**„Veröffentlichen" → „Jetzt veröffentlichen"**. Damit ist die Übung sofort
freigegeben — du musst nicht extra zum Workflow-Board wechseln.

**Der Weg über das Workflow-Board:**

1. Links oben auf **„Workflow"** klicken.
2. Deine Übung erscheint in der Spalte **„Entwürfe"**.
3. Ziehe die Karte nach rechts in die Spalte „Bereit" — oder klicke in der
   Übung auf **„Status setzen: Bereit"** (je nach Version heißt der Punkt
   auch „Zur Freigabe").
4. Dann auf **„Jetzt veröffentlichen"** klicken.

Nach ca. **1-2 Minuten** ist die Übung auf **kraft-training.netlify.app** live.

> **Warum dieser Umweg?** So kannst du in Ruhe an einer Übung arbeiten,
> ohne dass sie sofort öffentlich sichtbar wird. Erst wenn du auf
> „Jetzt veröffentlichen" klickst, wird sie online gestellt.

## Übung bearbeiten

1. Kategorie öffnen → Übung in der Liste anklicken.
2. Änderungen machen → **„Speichern"**.
3. Danach wieder veröffentlichen: entweder direkt im Editor über
   **„Veröffentlichen" → „Jetzt veröffentlichen"** oder im **Workflow**
   über „Bereit" → „Jetzt veröffentlichen".

## Übung löschen

1. Kategorie öffnen → Übung anklicken.
2. Oben auf **„Eintrag löschen"** klicken.
3. Bestätigen. Nach 1-2 Minuten ist sie von der Website entfernt.

> **⚠ Achtung:** Gelöschte Übungen kann nur der Entwickler
> wiederherstellen — im Zweifel lieber melden statt löschen.

## Bilder verwalten

- Beim Feld **„Übungsbild"** auf **„Bild auswählen"** klicken.
- Oben auf **„Hochladen"** → Bild vom Computer wählen.
- Optimal: **quadratisch oder 4:3**, JPG oder PNG.
- Maximale Dateigröße: **1 MB** — größere Bilder werden abgelehnt.
  Bei Bedarf das Foto vorher verkleinern (z.B. per Handy-Screenshot
  oder einem Online-Verkleinerer).
- Bereits hochgeladene Bilder erscheinen in der Bildergalerie und können
  wiederverwendet werden.

## Häufige Fragen

**Wo ist der „Neue Kategorie"-Knopf?**
Die 6 Kategorien sind fest eingebaut. Neue Kategorien müssen vom Entwickler
angelegt werden (Änderung im Code + Deploy).

**Ich habe was falsch gemacht — wie kann ich rückgängig?**
Solange du noch nicht auf **„Jetzt veröffentlichen"** geklickt hast: den
Entwurf einfach im **Workflow** löschen. Nach dem Veröffentlichen: die
Übung im Admin öffnen, korrigieren, wieder speichern und veröffentlichen.

**Wie lange dauert es bis die Änderung sichtbar ist?**
Nach „Jetzt veröffentlichen" ca. **1-2 Minuten**. Wenn du nichts siehst:
Seite im Browser komplett neu laden — unter **Windows: Strg+Umschalt+R**
(Ctrl+Shift+R), am **Mac: Cmd+Shift+R**.

**Ich sehe die Änderung nicht auf dem Handy.**
Der Browser cached alte Versionen. Neu laden oder App-Cache leeren.

**Warum ist eine Meldung plötzlich auf Englisch?**
Das Login-Modul (Netlify Identity) ist nicht vollständig übersetzt.
Englische Meldungen dort sind normal — die Funktion ist dieselbe.

## Passwort vergessen?

Auf der Login-Seite auf **„Passwort vergessen?"** klicken.
Netlify schickt einen Reset-Link an deine E-Mail-Adresse.

## Bei Problemen

Erreichbar unter: **daniel@redops.at**
