1. `cd backend`
2. `cp .env.example .env`
3. `python -m venv .venv`
4. `source .venv/bin/activate` _(Windows: `.\.venv\Scripts\activate`)_
5. `pip install -r requirements.txt`
6. `uvicorn app.main:app --reload`
