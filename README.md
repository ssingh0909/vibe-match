# Vibe Match - Prototyping Übung 11

Vibe Match ist eine prototypische Webanwendung, die es Nutzern ermöglicht, spontane Freizeitaktivitäten in ihrer Nähe zu finden und sich mit Gleichgesinnten zu vernetzen. Basierend auf persönlichen Interessen schlägt die App passende "Vibes" vor.

## 🚀 Live Demo
**URL:** [Link zu deiner Netlify/Vercel App hier einfügen]

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
