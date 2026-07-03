# Anleitung für den Admin-Bereich

Diese Anleitung erklärt, wie du Übungen auf **kraft-training.netlify.app**
hinzufügst, änderst oder löschst.

## Einloggen

1. Öffne im Browser: **https://kraft-training.netlify.app/admin/**
2. Klicke auf **„Mit Netlify Identity einloggen"**.
3. E-Mail-Adresse und Passwort eingeben → **Login**.

Nach dem Einloggen siehst du links die 6 Kategorien:
Aufwärmen, Passspiel, Torabschluss, Spielform, Halle, Kondition.

## Neue Übung hinzufügen

1. Links auf die gewünschte **Kategorie** klicken (z.B. „Aufwärmen").
2. Oben rechts auf **„New Aufwärm-Übung"** klicken.
3. Formular ausfüllen:
   - **Name der Übung** — z.B. „Passspiel im Quadrat" *(Pflicht)*
   - **Übungsbild** — Bild vom Computer hochladen *(Pflicht)*
   - **Reihenfolge** — Zahl, kleiner = weiter vorne *(optional, leer lassen = alphabetisch)*
   - **Beschreibung** — was wird trainiert, wie läuft die Übung *(optional)*
   - **Video-Link** — YouTube- oder Vimeo-URL *(optional)*
   - **Dauer** — z.B. „10 Minuten" *(optional)*
   - **Spielerzahl** — z.B. „8 Spieler" oder „4 vs 4" *(optional)*
4. Oben rechts auf **„Save"** klicken.

Die Übung ist jetzt ein **Entwurf** (Draft). Sie ist noch nicht online.

## Entwurf veröffentlichen

Damit eine gespeicherte Übung wirklich auf der Website erscheint:

1. Links oben auf **„Workflow"** klicken.
2. Deine Übung erscheint in der Spalte **„Drafts"**.
3. Ziehe die Karte nach rechts in **„Ready"** oder klicke auf **„Set status: Ready"**.
4. Dann auf **„Publish now"** klicken.

Nach ca. **1-2 Minuten** ist die Übung auf **kraft-training.netlify.app** live.

> **Warum dieser Umweg?** So kannst du in Ruhe an einer Übung arbeiten,
> ohne dass sie sofort öffentlich sichtbar wird. Erst wenn du „Publish"
> klickst, wird sie online gestellt.

## Übung bearbeiten

1. Kategorie öffnen → Übung in der Liste anklicken.
2. Änderungen machen → **„Save"**.
3. Danach im **Workflow** wieder auf „Ready" → „Publish now".

## Übung löschen

1. Kategorie öffnen → Übung anklicken.
2. Oben rechts **„Delete entry"** klicken.
3. Bestätigen. Nach 1-2 Minuten ist sie von der Website entfernt.

## Bilder verwalten

- Beim Feld **„Übungsbild"** auf **„Choose an image"** klicken.
- Oben auf **„Upload"** → Bild vom Computer wählen.
- Optimal: **quadratisch oder 4:3**, unter 500 KB, JPG oder PNG.
- Bereits hochgeladene Bilder erscheinen in der Bildergalerie und können
  wiederverwendet werden.

## Häufige Fragen

**Wo ist der „Neue Kategorie"-Knopf?**
Die 6 Kategorien sind fest eingebaut. Neue Kategorien müssen vom Entwickler
angelegt werden (Änderung im Code + Deploy).

**Ich habe was falsch gemacht — wie kann ich rückgängig?**
Solange du noch nicht auf **„Publish"** geklickt hast: den Entwurf einfach
im **Workflow** löschen. Nach dem Veröffentlichen: die Übung im Admin
öffnen, korrigieren, wieder speichern und veröffentlichen.

**Wie lange dauert es bis die Änderung sichtbar ist?**
Nach „Publish now" ca. **1-2 Minuten**. Wenn du nichts siehst:
Seite im Browser neu laden (Strg+F5).

**Ich sehe die Änderung nicht auf dem Handy.**
Der Browser cached alte Versionen. Neu laden oder App-Cache leeren.

## Passwort vergessen?

Auf der Login-Seite auf **„Passwort vergessen?"** klicken.
Netlify schickt einen Reset-Link an deine E-Mail-Adresse.

## Bei Problemen

Erreichbar unter: [deine Kontaktdaten hier eintragen]
