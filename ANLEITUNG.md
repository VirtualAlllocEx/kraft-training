# Anleitung für den Admin-Bereich

Diese Anleitung erklärt, wie du Übungen auf **kraft-training.netlify.app**
hinzufügst, änderst oder löschst.

> **Tipp:** Diese Anleitung gibt es auch direkt auf der Website unter
> **https://kraft-training.netlify.app/hilfe/** — dort ist sie leichter
> wiederzufinden, wenn du sie unterwegs brauchst.

> **Hinweis:** Der Admin-Bereich ist auf Deutsch eingestellt. Nur das
> Login-Fenster (Netlify Identity) gibt es nicht auf Deutsch — dort sind
> Knöpfe wie **„Log in“** oder **„Forgot password?“** auf Englisch.
> Das ist normal und kein Fehler.

## Einloggen

1. Öffne im Browser: **https://kraft-training.netlify.app/admin/**
2. Klicke auf **„Mit Netlify Identity einloggen“**.
3. E-Mail-Adresse und Passwort eingeben → auf **„Log in“** klicken
   (das Login-Fenster ist auf Englisch).

Nach dem Einloggen siehst du links die 6 Kategorien:
Aufwärmen, Passspiel, Torabschluss, Spielform, Halle, Kondition.

## So funktioniert das Veröffentlichen (wichtig!)

Sobald du auf **„Veröffentlichen“** klickst, wird die Übung **direkt online
gestellt**. Es gibt keinen separaten Entwurf-/Freigabe-Schritt und kein
„Arbeitsablauf“-Brett.

> **Merke:** Veröffentlichen = online stellen. Nach dem Veröffentlichen dauert der
> Neuaufbau der Website noch ca. **1–2 Minuten**, bis die Änderung auf
> kraft-training.netlify.app sichtbar ist.

> **⚠ Achtung:** Jede gespeicherte Änderung ist nach dem Build öffentlich.
> Prüfe Name, Bild und Text vor dem Speichern.

## Neue Übung hinzufügen

1. Links auf die gewünschte **Kategorie** klicken (z.B. „Aufwärmen“).
2. Oben auf den Knopf **„＋ Aufwärm-Übung“** klicken.
   
3. Formular ausfüllen:
   - **Name der Übung** — z.B. „Passspiel im Quadrat“ *(Pflicht)*
   - **Übungsbild** — Bild vom Computer hochladen, maximal 3 MB *(Pflicht — genaue Schritte siehe Abschnitt „Bilder hochladen“)*
   - **Reihenfolge** — Zahl, kleiner = weiter vorne *(optional, leer lassen = Sortierung nach Name)*
   - **Beschreibung (optional)** — was wird trainiert, wie läuft die Übung
   - **Video-Link (optional)** — YouTube- oder Vimeo-URL, muss mit `http://` oder `https://` beginnen
   - **Dauer (optional)** — z.B. „10 Minuten“
   - **Spielerzahl (optional)** — z.B. „8 Spieler“ oder „4 vs 4“
4. Oben auf **„Veröffentlichen“** klicken.

Fertig — die Übung geht mit dem nächsten Build online (ca. 1–2 Minuten).

## Übung bearbeiten

1. Kategorie öffnen → Übung in der Liste anklicken.
2. Änderungen machen → **„Veröffentlichen“**.
3. Nach 1–2 Minuten ist die neue Version auf der Website zu sehen
   (bei Bedarf hart neu laden: **Strg+Umschalt+R**).

## Tipp: Übung duplizieren

Wenn du eine ähnliche Übung anlegen willst, musst du nicht bei null anfangen:
Die bestehende Übung öffnen und oben in der Leiste auf **„Veröffentlicht“ → „Duplizieren“**
klicken. Du bekommst eine Kopie mit allen Feldern vorausgefüllt — nur noch
Name und Details anpassen und speichern.

## Übung löschen

1. Kategorie öffnen → Übung anklicken.
2. Oben in der Leiste auf **„Löschen“** (bzw. den entsprechenden
   Löschen-Knopf) klicken.
3. Bestätigen. Nach 1–2 Minuten ist die Übung von der Website entfernt.

> **⚠ Achtung:** Gelöschte Übungen kann nur der Entwickler wiederherstellen —
> im Zweifel lieber melden statt löschen. Und: Jede Übung hat eine eigene
> Seite, deren Link man teilen kann (siehe unten). Wenn du eine Übung löschst
> oder umbenennst, funktionieren bereits verschickte Links auf diese Übung
> nicht mehr.

## Bilder hochladen

Beim Feld **„Übungsbild“**:

1. Auf **„Wähle ein Bild“** klicken — die Bildergalerie öffnet sich.
2. Oben auf **„Hochladen“** klicken und das Bild vom Computer auswählen.
3. Warten, bis das Bild in der Galerie erscheint und markiert ist
   (kann 1–2 Sekunden dauern).
4. **Wichtig:** Danach unten auf **„Ausgewähltes Element verwenden“**
   klicken. Erst damit landet das Bild im Formular — nur Hochladen
   reicht nicht!

Weitere Hinweise:

- Optimal: **quadratisch oder 4:3**, JPG oder PNG. Zeichnungen/Skizzen
  eignen sich besser als große Handyfotos.
- Maximale Dateigröße: **3 MB**. Bei größeren Bildern erscheint die Meldung
  **„Datei zu groß…“** — dann das Foto vorher verkleinern (z.B. per
  Handy-Screenshot oder einem Online-Verkleinerer).
- Bereits hochgeladene Bilder erscheinen in der Bildergalerie und können
  wiederverwendet werden: Bild anklicken →
  **„Ausgewähltes Element verwenden“**.

> **⚠ Achtung:** Uploads über den Menüpunkt **„Medien“** (oben im Admin)
> umgehen die 3-MB-Prüfung. Bitte trotzdem darauf achten, dass die Bilder
> unter 3 MB bleiben — sonst wird die Website langsam.

## Abmelden

Oben rechts auf deine E-Mail-Adresse (bzw. das runde Symbol) klicken und
**„Abmelden“** wählen.

## Wenn eine Übung nach dem Veröffentlichen nicht erscheint

Nach dem Veröffentlichen wird die Website im Hintergrund neu gebaut — das dauert
normalerweise **1–2 Minuten**. Wenn die Übung danach nicht auftaucht:

1. Seite komplett neu laden: **Windows: Strg+Umschalt+R**,
   **Mac: Cmd+Shift+R**.
2. Hilft das nicht: den Website-Cache im Browser leeren
   (in den Browser-Einstellungen).
3. Immer noch nichts? Dann ist vermutlich der automatische Neuaufbau der
   Website fehlgeschlagen (ein sogenannter Build-Fehler). Das kannst du
   selbst nicht beheben — bitte kurz an **daniel@redops.at** melden, am
   besten mit dem Namen der Übung.

## Die öffentliche Website — gut zu wissen

- **Übungs-Seiten zum Teilen:** Jede Übung hat eine eigene Detailseite
  unter `kraft-training.netlify.app/uebung/…` — z.B. über „Details ansehen“
  erreichbar. Den Link kannst du per WhatsApp oder E-Mail an andere Trainer
  schicken. Aber Achtung: Wird die Übung gelöscht oder umbenannt, führt der
  alte Link ins Leere.
- **Trainingsplan:** Auf der Website lassen sich Übungen für ein Training
  auswählen. Oben rechts erscheint dann ein Merkzettel-Symbol (**📋**) mit
  der Anzahl der ausgewählten Übungen. Ein Klick darauf führt zur Seite
  **/plan/**, wo man die Auswahl ansehen, drucken und teilen kann.

> **⚠ Achtung:** Die 3-MB-Prüfung greift nur beim Hochladen über das Feld
> **„Übungsbild"**. Wer Bilder über den Menüpunkt **„Medien"** (oben in der
> Leiste) hochlädt, umgeht die Größenprüfung — bitte Bilder daher immer
> direkt über das Übungsbild-Feld hochladen und unter 3 MB halten.
> Zu große Bilder machen die Website für alle langsamer.

## Häufige Fragen

**Nach dem Bild-Upload passiert nichts / es kommt ein Fehler.**
Drei typische Ursachen:

1. **Datei zu groß** — Bild über 3 MB. Verkleinern und erneut hochladen.
2. **„Ausgewähltes Element verwenden“ vergessen** — nach dem Hochladen muss
   das Bild in der Galerie noch übernommen werden.
3. **Nicht eingeloggt / Sitzung abgelaufen** — abmelden, neu einloggen und
   nochmal versuchen.

Wenn der Admin eine rote Fehlermeldung („There's been an error…“) zeigt:
Seite neu laden, neu einloggen und mit einem Bild unter 3 MB erneut
versuchen. Bleibt der Fehler, an **daniel@redops.at** melden.

**Ich sehe meine Änderung nicht auf der Website, obwohl ich veröffentlicht habe.**
1–2 Minuten warten, dann Seite mit **Strg+Umschalt+R** neu laden
(**Cmd+Shift+R** am Mac). Falls das nichts hilft: den Website-Cache im
Browser leeren. Falls immer noch nichts: an **daniel@redops.at** melden —
das kann ein Build-Fehler sein.

**Der „Passwort vergessen“-Link ist auf Englisch.**
Richtig — er heißt **„Forgot password?“**. Das Login-Fenster kommt von
Netlify Identity und lässt sich nicht auf Deutsch umstellen. Die Funktion
ist dieselbe.

**Wo ist der „Neue Kategorie“-Knopf?**
Die 6 Kategorien sind fest eingebaut. Neue Kategorien müssen vom Entwickler
angelegt werden (Änderung im Code + Deploy).

**Ich habe was falsch gemacht — wie kann ich rückgängig?**
Die Übung wieder öffnen, korrigieren und speichern. Zum kompletten
Entfernen: Übung öffnen und löschen. Bei Unsicherheit lieber an
**daniel@redops.at** schreiben, bevor du etwas löschst.

**Ich sehe die Änderung nicht auf dem Handy.**
Der Browser speichert alte Versionen zwischen. Seite neu laden oder den
Browser-Cache leeren.

**Warum ist eine Meldung plötzlich auf Englisch?**
Das Login-Modul (Netlify Identity) gibt es nicht auf Deutsch. Englische
Meldungen dort sind normal — die Funktion ist dieselbe.

## Passwort vergessen?

Auf der Login-Seite auf **„Forgot password?“** klicken (der Link ist auf
Englisch). Netlify schickt einen Reset-Link an deine E-Mail-Adresse.

## Bei Problemen

Erreichbar unter: **daniel@redops.at**
