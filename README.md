# Gemini Chat App (FastAPI + Vanilla JS)

Simple full-stack chat app:
- `backend/`: FastAPI API that calls Gemini
- `frontend/`: static HTML/CSS/JS chat UI

## Project Structure

```text
FastAPIProject/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── test_main.http
```

## Prerequisites

- Python 3.10+
- A Gemini API key

## Backend Setup

From project root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_api_key_here
```

Start API:

```bash
uvicorn main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`

## Frontend Setup

In a second terminal:

```bash
cd frontend
python3 -m http.server 5500
```

Open:
- `http://127.0.0.1:5500`

The frontend sends requests to `http://127.0.0.1:8000/chat`.

## API Endpoints

- `GET /`
  - Health check
  - Response: `{"message":"Gemini Chat Backend Running ✅"}`

- `GET /hello/{name}`
  - Simple test route
  - Example: `/hello/User`
  - Response: `{"message":"Hello User"}`

- `POST /chat`
  - Request body:
    ```json
    { "message": "Hello" }
    ```
  - Response:
    ```json
    { "reply": "..." }
    ```
  - Error response:
    ```json
    { "error": "..." }
    ```

## Quick API Tests

Use the included `test_main.http` in your IDE HTTP client, or run:

```bash
curl http://127.0.0.1:8000/
curl http://127.0.0.1:8000/hello/User
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Give me one productivity tip"}'
```

## Notes

- CORS is currently open (`allow_origins=["*"]`) for local development.
- `google-generativeai` is deprecated upstream; consider migrating to `google-genai` in a future update.
