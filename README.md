# Gaza Youth Tech Hackathon

Website for a youth technology hackathon in Gaza, built in collaboration between Tech From Palestine and Code Sprouts Palestine.

The site includes:

- A landing page that introduces the hackathon, tracks, partners, and FAQs
- A bilingual English and Arabic experience
- An application page for young participants to prepare their submission details

## Frontend Repo

This repository is the frontend application.

- Run `npm install`
- Run `npm run dev` for the frontend
- Run `npm run build` to create the production bundle

## Backend Repo

The backend is intended to live in its own repository: `Mohammed-salah12/gaza-youth-tech-hackathon-backend`.

For full-stack local development, clone that backend repo into a local `backend/` folder next to this frontend code:

```bash
git clone https://github.com/Mohammed-salah12/gaza-youth-tech-hackathon-backend.git backend
```

If you are running the frontend against a deployed backend instead of a local checkout, set `VITE_API_BASE_URL` before starting Vite.
