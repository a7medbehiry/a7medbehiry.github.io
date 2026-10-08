# Ahmed Behiry — Portfolio

Personal portfolio for Ahmed Behiry, Flutter developer. Live at **https://a7medbehiry.github.io/**

It lists my published apps with store links and includes three interactive demos that run in the browser inside a phone frame, with push notifications, a lock screen and Arabic/English switching:

- `#demo-shopsiia` — multi-vendor marketplace
- `#demo-salasa` — offline-first CRM (turn the internet off and watch it sync)
- `#demo-lets` — chat with voice and video calls

The demos are web recreations of the Flutter apps and use sample data only.

## Edit content

- Text, projects, links, experience and skills: `src/content.ts`
- Profile photo: `src/assets/photo.jpg`
- CV: `public/Ahmed_Behiry_CV.pdf`
- Demos: `src/demos/<app>/`

## Run locally

```bash
npm install
npm run dev      # opens /dev.html
npm run build    # writes the self-contained index.html to dist/ and the repo root
```

The root `index.html` is the built site, so GitHub Pages works whether it deploys from the branch or from Actions. Pushing to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.
