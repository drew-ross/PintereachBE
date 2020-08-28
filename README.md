# Infobox API

## About
This API was created by Drew Ross for a Lambda School Build Week project.
https://github.com/pintereach-1-bw


## Project Contributors
|||
|---|---|
|Zoe Stokes| *Project Lead*|
|Drew Ross |*Backend Engineer*|
|Greg Wilson |*Frontend Engineer*|
|Sierra Jasmine |*Marketing & UI*|
---
## Endpoints/Usage
This project uses npm. Run ```npm install``` to download node modules.
https://pintereach10.herokuapp.com/
|Request|Endpoint|JSON \*required|Response|Restricted
|---|---|---|---|---|
|GET|/ OR /api|| Server status ||
|POST| /api/auth/register | { username*, password* }| JSON Web Token ||
|POST| /api/auth/login | { username*, password* } | JSON Web Token ||
|GET| /api/articles || User's articles | YES
|POST| /api/articles |{ title*, category, article_url, image_url, summary } | Added article | YES
|PUT| /api/articles/:id |{ title*, category, article_url, image_url, summary }| Updated article | YES
|DELETE| /api/articles/:id || Deleted article id | YES
