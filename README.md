# FitTrack

Fitness app that tracks diet and activity, daily goals, and uses **OpenRouter** with **Google Gemini** for food nutrition (name + grams) and photo-based nutrition. **ElevenLabs** powers read-aloud voice for your dashboard and suggestions.

## Features

- **Daily goals** – Set calorie, protein, and activity (minutes) goals. Track progress on the dashboard.
- **Diet logging** – Enter **food name** and **amount in grams**; macros (calories, protein, carbs, fat) are looked up automatically via OpenRouter. No manual macro entry.
- **Activity logging** – Log exercise type, duration, and intensity. Each entry shows **estimated calories burned** (MET-based) and **benefits** (e.g. heart health, strength, cardio).
- **Photo food** – Upload a photo of a meal; OpenRouter (vision) detects food and estimates nutrition. You can add the result to today’s log.
- **Voice (ElevenLabs)** – “Read summary” on the dashboard and “Read suggestions aloud” on the Suggestions tab use text-to-speech so you can hear your daily overview and tips.

## How to run

1. **Open a terminal** in the `fitness-app` folder:
   ```bash
   cd fitness-app
   ```
   (Or: `cd "c:\Users\azamk\OneDrive\Documents\Cursor\fitness-app"` on Windows.)

2. **Install dependencies** (once):
   ```bash
   npm install
   ```
   You need [Node.js](https://nodejs.org/) installed.

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open the app** in your browser: **http://localhost:3000**

## API keys (.env)

- **OPENROUTER_API_KEY** – Used for:
  - **Food nutrition** – Looking up calories and macros from food name + grams.
  - **Photo food** – Vision model to analyze meal photos.
- **ELEVENLABS_API_KEY** – Used for read-aloud voice (dashboard summary and suggestions). Optional: `ELEVENLABS_VOICE_ID` to change the voice.
- Optional: `OPENROUTER_VISION_MODEL`, `OPENROUTER_CHAT_MODEL` (default: `google/gemini-2.0-flash-001` for both), `PORT`.

## Deploy to Netlify (APIs included)

The app is set up to run on **Netlify** with the same API routes as serverless functions.

1. **Push the repo** to GitHub (or GitLab/Bitbucket) and connect the site in [Netlify](https://app.netlify.com).
2. **Build settings** (usually auto-detected from `netlify.toml`):
   - **Build command:** leave empty or `npm install`
   - **Publish directory:** `.` (root)
   - **Functions directory:** `netlify/functions`
3. **Environment variables** – In Netlify: **Site settings → Environment variables** add:
   - `OPENROUTER_API_KEY` – required for food lookup and photo analysis
   - `ELEVENLABS_API_KEY` – required for read-aloud and voice log
   - Optional: `OPENROUTER_VISION_MODEL`, `OPENROUTER_CHAT_MODEL`, `ELEVENLABS_VOICE_ID`
4. **Deploy.** The site and all `/api/*` routes (food nutrition, suggestions, text-to-speech, speech-to-text, parse-speech, analyze-food-image) will work on your Netlify URL.

**Local test with Netlify:** `npm install -g netlify-cli` then `netlify dev` to run the app and functions locally with the same routing.

## APIs used

- **OpenRouter** – Google Gemini 2.0 Flash for nutrition lookup (food name + grams → calories, protein, carbs, fat) and vision for photo food analysis. Same OpenRouter API key; you can override with other OpenRouter model IDs if desired.
- **ElevenLabs** – Text-to-speech for “Read summary” and “Read suggestions aloud.”
