# Not Spotify

A full‑stack music app: Spring Boot backend + two React frontends (Admin and User).

<p align="center">
  <img src="./images/Login%20page.png" alt="Login" width="320" />
  &nbsp;&nbsp;
  <img src="./images/Display%20Page.png" alt="User - Display page" width="320" />
</p>
<p align="center">
  <img src="./images/Album%20Page.png" alt="User - Album page" width="320" />
  &nbsp;&nbsp;
  <img src="./images/Add%20Song%20Page.png" alt="Admin - Add Song" width="320" />
</p>

## What’s inside

- Backend: Spring Boot 3 (Java 21), MongoDB, JWT, Cloudinary
- Admin app: React + Vite (manage albums/songs with uploads)
- User app: React + Vite (browse, search, play)

Repo layout:

```txt
backend/         # Spring Boot API
frontend-admin/  # Admin dashboard
frontend-user/   # User-facing app
```

## Features

- User registration/login with JWT
- Browse albums and songs, search, and playback UI
- Admin CRUD for albums and songs (image/audio uploads to Cloudinary)
- MongoDB persistence, secure routes with role-based access
- CORS preconfigured for local dev

## Quick start (Windows PowerShell)

Backend

```powershell
cd ./backend
$env:CLOUDINARY_API_KEY="<your_key>"
$env:CLOUDINARY_API_SECRET="<your_secret>"
$env:CLOUDINARY_CLOUD_NAME="<your_cloud>"
$env:JWT_SECRET="change-me"
./mvnw.cmd spring-boot:run
```

Admin frontend

```powershell
cd ./frontend-admin
npm install
npm run dev
```

User frontend

```powershell
cd ./frontend-user
npm install
npm run dev
```

Defaults

- API: <http://localhost:8080>
- Admin: <http://localhost:5173>
- User: <http://localhost:5174>


First-run admin user (for testing)

- Email: <admin@not-spotify.com>
- Password: admin123


## Configure environment

You can provide secrets either via environment variables or via `backend/src/main/resources/application.properties`.

Option A — environment variables

PowerShell (Windows):

```powershell
$env:CLOUDINARY_API_KEY = "<your_key>"
$env:CLOUDINARY_API_SECRET = "<your_secret>"
$env:CLOUDINARY_CLOUD_NAME = "<your_cloud>"
$env:JWT_SECRET = "change-me"
```

Option B — application.properties (no quotes around values)

```properties
# Cloudinary
cloudinary.api-key=<your_key>
cloudinary.api-secret=<your_secret>
cloudinary.cloud-name=<your_cloud>

# JWT
jwt.secret=change-me

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/notspotify
```

If you change the API host, also update:

- `frontend-admin/src/services/apiService.js`
- `frontend-user/src/context/AuthContext.jsx`

Dev CORS allows:

- <http://localhost:5173>
- <http://localhost:5174>

Note: Vite picks 5173 for the first dev server; if it’s taken, it increments (5174, 5175, …). The backend allows 5173 and 5174 by default—if you use a different port, either run Vite on one of those ports (e.g., `npm run dev -- --port 5174`) or update `SecurityConfig` allowed origins.

If you deploy to another host, update the allowed origins in `backend` security config and the API base URLs in both frontends.

## API at a glance

Base URL: <http://localhost:8080>

| Area   | Method | Path                      | Auth                | Notes                                                       |
|--------|--------|---------------------------|---------------------|-------------------------------------------------------------|
| Health | GET    | /api/health               | None                | Health check                                                |
| Auth   | POST   | /api/auth/register        | None                | Body: { email, password }                                   |
| Auth   | POST   | /api/auth/login           | None                | Returns { token, email, role }                              |
| Albums | GET    | /api/albums               | Bearer (USER/ADMIN) | List albums                                                 |
| Albums | POST   | /api/albums               | Bearer (ADMIN)      | Multipart: request (JSON), file (image)                     |
| Albums | DELETE | /api/albums/{albumId}     | Bearer (ADMIN)      | Delete album                                                |
| Songs  | GET    | /api/songs                | Bearer (USER/ADMIN) | List songs                                                  |
| Songs  | POST   | /api/songs                | Bearer (ADMIN)      | Multipart: request (JSON), image (image), audio (audio)     |
| Songs  | DELETE | /api/songs/{songId}       | Bearer (ADMIN)      | Delete song                                                 |

## Build & production

Build frontends

```powershell
cd ./frontend-admin
npm run build
cd ../frontend-user
npm run build
```

Build backend JAR (skips tests) and run

```powershell
cd ./backend
./mvnw.cmd -DskipTests package
java -jar ./target/*.jar
```

## Notes

- Requires: Java 21, Maven 3.9+, Node 18+, MongoDB, Cloudinary account
- CORS in dev allows <http://localhost:5173> and <http://localhost:5174>
- Auth uses JWT; send `Authorization: Bearer YOUR_TOKEN`

## Troubleshooting

- MongoDB connection refused: ensure MongoDB is running and `spring.data.mongodb.uri` is correct.
- 401 on admin routes: login as an admin; a test admin is seeded on first run.
- Upload errors (413/validation): check field names and multipart limits in `application.properties`.
- Cloudinary errors: verify all three Cloudinary env vars and account settings.
