# Vibe Match - Prototyping Übung 11
 
Vibe Match ist eine prototypische Webanwendung, die es Nutzern ermöglicht, spontane Freizeitaktivitäten in ihrer Nähe zu finden und sich mit Gleichgesinnten zu vernetzen. Basierend auf persönlichen Interessen schlägt die App passende "Vibes" vor.
 
## 🚀 Live Demo
**URL:** [https://vibe-match-ssingh.netlify.app](https://vibe-match-ssingh.netlify.app)
 
## 🛠 Features & Workflows
 
### 1. Kern-Workflow: "Vibe finden & buchen" (End-to-End)
*   **Registrierung/Login:** Nutzer erstellen ein Profil mit ihren Interessen (Hobbys).
*   **Entdecken:** Im "Swipe-Modus" können Nutzer Aktivitäten durchsehen. Ein Algorithmus priorisiert Aktivitäten, die zu den gewählten Hobbys passen ("DEIN VIBE!").
*   **Kategorisierung:** Filter für Sport, Musik, Kulinarik, Stadtbetrachten und Freizeit.
*   **Buchung:** Nutzer können Details einsehen (inkl. Google Maps Integration) und ihre Teilnahme bestätigen oder stornieren.
*   **Erfolgsbestätigung:** Nach der Buchung erhält der Nutzer eine klare Rückmeldung.
### 2. Erweiterungen (Zusatzpunkte)
*   **Interessen-Matching:** Automatisierte Priorisierung von Aktivitäten basierend auf Nutzerprofilen.
*   **Admin-Bereich:** Unter `/admin/add-activity` können neue Aktivitäten erfasst werden (Rollen-Konzept Prototyp).
*   **Zeitkonflikt-Prüfung:** Das System verhindert die Buchung von zwei Aktivitäten zur gleichen Zeit.
*   **Dashboard:** Eine Übersicht aller aktuell gebuchten Aktivitäten des Nutzers.
## 💻 Technischer Stack
*   **Frontend:** SvelteKit (TypeScript)
*   **Styling:** TailwindCSS
*   **Datenbank:** MongoDB Atlas (Persistente Speicherung von Usern und Aktivitäten)
*   **Animationen:** Svelte Transitions (fade, fly)
## ⚙️ Lokale Installation
 
1.  Repository klonen:
    ```bash
    git clone [dein-repo-url]
    ```
2.  Abhängigkeiten installieren:
    ```bash
    npm install
    ```
3.  `.env` Datei erstellen und MongoDB URI hinzufügen:
    ```env
    MONGODB_URI=mongodb+srv://...
    ```
4.  Datenbank initialisieren (optional):
    ```bash
    node seed-activities.js
    node seed-users.js
    ```
5.  Entwicklungsserver starten:
    ```bash
    npm run dev
    ```
 
## 📝 Abgabe-Hinweise
*   **Collaborators:** `mmeisterhans`, `bkuehnis` zum GitHub-Repo hinzufügen.
*   **Dokumentation:** Diese README dient als Basis für die Projektdokumentation.
---
 
## 🧪 Usability Evaluation
 
### Getestete Version
**URL:** [https://vibe-match-ssingh.netlify.app](https://vibe-match-ssingh.netlify.app) (Prototyp v1.0, Mai 2026)
 
### Ziele der Evaluation
*   Ist der Kern-Workflow (Registrierung → Swipen → Einschreiben) für neue Nutzer intuitiv nachvollziehbar?
*   Sind Navigation und Begriffe eindeutig verständlich?
*   Welche Funktionen fehlen oder sind unklar?
*   Wo treten technische oder inhaltliche Fehler auf, die den Workflow blockieren?
### Vorgehen
Moderiert, on-site. Gegenseitiger Test mit zwei Mitstudierenden (~10 Minuten pro Test). Beobachtungen wurden live im Feedback Grid festgehalten, anschliessend gemeinsam als Issue Map ausgewertet.
 
### Stichprobe
*   **Testperson 1:** Joel (Mitstudierender, kennt das Projekt nicht)
*   **Testperson 2:** Lenny Frei (Mitstudierender, kennt das Projekt nicht)
### Testaufgaben / Szenarien
 
**Aufgabe 1 – Registrierung & Onboarding**
Sie sind neu auf Vibe Match. Erstellen Sie ein Konto und wählen Sie Ihre Hobbys aus.
 
**Aufgabe 2 – Aktivität finden & buchen**
Sie möchten spontan an einer Freizeitaktivität in Ihrer Nähe teilnehmen. Finden Sie eine passende Aktivität und schreiben Sie sich ein.
 
**Aufgabe 3 – Neue Aktivität erfassen**
Sie organisieren ein Mario Kart Turnier und möchten andere Nutzer einladen. Erfassen Sie eine neue Aktivität in der App.
 
**Aufgabe 4 – Freunde & Chat**
Sie möchten einem Freund schreiben, den Sie auf der Plattform gefunden haben. Senden Sie ihm eine Nachricht.
 
### Kennzahlen & Beobachtungen (Feedback Grids)
 
#### Testperson 1: Joel
 
| 😊 Was hat gut funktioniert / gefallen? | 😞 Was hat nicht funktioniert / gestört / gefehlt? |
|---|---|
| Onboarding sehr angenehm und klar – nur notwendige Daten werden erfragt (minimalistisch im positiven Sinn) | Feierabend-Begriff an einem Samstag wirkt unpassend |
| Navigation: Symbole eindeutig, nichts überladen, nichts vermisst | Nach Buchung erscheinen wieder 50 Aktivitäten (Teilnehmerzähler-Bug) |
| Detail-Fenster beim Swipe macht Sinn – erlaubt Prüfung vor Einschreiben, senkt Hemmschwelle | Jazz Night ohne Bild; keine Pflichtfeld-Validierung beim Bildupload |
| Schnelles Einschreiben durch geringen Verbindlichkeitsgefühl | Keine Nachricht an Freund sendbar (Chat-Funktion nicht erreichbar) |
| | Fehlende Pflichtfeld-Validierung bei Bildupload |
| | 999 km Entfernung bei neu erstelltem Eintrag (Geodaten-Bug) |
 
| 💡 Neue Ideen & Anforderungen | ❓ Was war unklar / Welche Fragen sind aufgetaucht? |
|---|---|
| Gemeinsame Anmeldung mit Freunden – Gruppen-Feature | Neues Fenster beim Swipen war zunächst unerwartet (nach kurzer Erklärung verständlich) |
| Filter/Suche für seltene Hobbys falls keine lokalen Matches | Wo findet man Freunde / wie sucht man Freunde auf der Plattform? |
| Option, neue / unbekannte Hobbys zu entdecken | |
 
#### Testperson 2: Lenny Frei
 
| 😊 Was hat gut funktioniert / gefallen? | 😞 Was hat nicht funktioniert / gestört / gefehlt? |
|---|---|
| Allgemeiner Eindruck sehr positiv: «sieht super aus» | Option zur Hobby-Entdeckung fehlt (für Nutzer ohne festes Hobby) |
| Grosse Datenmenge vorhanden – App wirkt lebendig | Schreibweise «Fussball» statt «Fußball» (fehlendes ß) |
| Persönliches Interesse: «etwas, das ich privat gerne nutzen würde» | Mario Kart beim Erfassen doppelt vorhanden |
| | «Feierabend» an einem Samstag kontextuell unpassend |
| | Teilnehmerzähler nach Buchung inkonsistent |
| | Jazz Night kein Bild; keine Bildpflicht beim Erstellen |
| | Freunde suchen – Funktion nicht auffindbar |
| | 999 km Entfernung bei neuem Eintrag |
 
| 💡 Neue Ideen & Anforderungen | ❓ Was war unklar / Welche Fragen sind aufgetaucht? |
|---|---|
| Freundes-Suche / People-Discovery Feature | Wo findet man die Freunde-Suche? |
| Gruppen-Anmeldung (mit Freunden gemeinsam beitreten) | Warum Feierabend am Samstag? |
| Hobby-Entdeckungs-Modus für Nutzer ohne klares Hobby | Warum ändert sich der Teilnehmerstand nach Buchung nicht? |
 
### Issue Map (priorisiert)
 
| ID | Issue / Beobachtung | Schwere (0–4) | Handlungsempfehlung |
|---|---|:---:|---|
| I-01 | 999 km Entfernung bei neu erstellter Aktivität (Geodaten-Bug) | **3** | Standortberechnung bei Aktivitätserstellung prüfen; Default-Koordinate setzen falls leer |
| I-02 | Kein Bild bei Jazz Night; keine Pflichtfeld-Validierung beim Bildupload | **3** | Bild-Feld als Pflichtfeld markieren; Fallback-Bild für fehlende Bilder definieren |
| I-03 | Teilnehmerzähler nach Buchung inkonsistent (wieder 50 angezeigt) | **3** | Reaktives Update des joinedUsers-Arrays sicherstellen; serverseitige Zählerlogik prüfen |
| I-04 | Chat-Funktion nicht erreichbar / keine Nachricht an Freund sendbar | **3** | Navigation zum privaten Chat prüfen; Freundes-Chat-Link im Profil/Freundesliste sicherstellen |
| I-05 | Freunde suchen – Funktion nicht auffindbar (kein Discovery-Flow) | **2** | Freundes-Suche in Navigation integrieren oder auf Dashboard verlinken |
| I-06 | Mario Kart beim Erfassen doppelt vorhanden | **2** | Duplikat-Prüfung oder Hinweis beim Erfassen ähnlicher Aktivitäten einbauen |
| I-07 | Begriff «Feierabend» an einem Samstag – sprachlich unpassend | **1** | Zeitbezeichnungen kontextsensitiv formulieren (z.B. «Nachmittag», «Abend») |
| I-08 | «Fussball» statt «Fußball» – inkonsistente Schreibweise | **1** | Projektweites Finden & Ersetzen; konsequent ß oder Schweizer ss |
| I-09 | Neues Fenster beim Swipe war unerwartet (kein Tinder-Standard) | **1** | Transition/Animation einbauen um Übergang klarer zu machen; Erklärung beim ersten Mal |
 
### Zusammenfassung der Resultate
Beide Testpersonen waren insgesamt sehr positiv gestimmt. Das Onboarding wird als klar und minimalistisch gelobt, die Navigation als intuitiv und übersichtlich. Der Kern-Workflow (Swipen → Detail → Einschreiben) funktioniert gut und die tiefe Hemmschwelle beim Beitreten wird als Stärke wahrgenommen. Kritische Issues betreffen hauptsächlich technische Fehler (Geodaten, Bildpflicht, Teilnehmerzähler) und die noch nicht vollständig implementierte Chat/Freundes-Funktion. Das Grundkonzept wird von beiden als valide und persönlich relevant eingestuft.
 
### Abgeleitete Verbesserungen (priorisiert)
*   **[Hohe Priorität]** I-01: Geodaten-Bug bei neuen Aktivitäten beheben → verhindert sinnvolle Distanzanzeige
*   **[Hohe Priorität]** I-02: Bild-Pflichtfeld + Fallback-Bilder implementieren → verhindert leere Karten
*   **[Hohe Priorität]** I-03: Teilnehmerzähler reaktiv und korrekt updaten → Kernfunktion der App
*   **[Hohe Priorität]** I-04: Chat-Navigation vollständig implementieren → soziale Funktion nutzbar machen
*   **[Mittlere Priorität]** I-05: Freundes-Suche sichtbar in Navigation integrieren
*   **[Tiefe Priorität]** I-07/I-08: Sprachliche Korrekturen (Feierabend-Begriff, Fussball/Fußball)
