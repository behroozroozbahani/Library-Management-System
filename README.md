# Library Management System

A full-stack library management application. The backend is an ASP.NET Core Web API with Entity Framework Core and SQL Server, and the frontend is a React single-page app. It manages books together with their authors, genres, and publishers.

## Features

- Create, read, update, and delete **books**, **authors**, **genres**, and **publishers**
- Each book is linked to an author, a genre, and a publisher through foreign keys
- A single `Save` endpoint per entity handles both insert and update
- React interface with routing, modal forms, client-side checks for required fields, and delete confirmation dialogs
- Right-to-left Persian user interface
- Swagger UI for exploring the API in development
- SQL Server database with a Persian UTF-8 collation, created by an EF Core migration

## Data Model

| Entity | Fields |
|---|---|
| Author | first name, last name, date of birth, date of death (optional) |
| Genre | name |
| Publisher | name, phone, address |
| Book | title, publish date, author, genre, publisher |

A book belongs to exactly one author, one genre, and one publisher. Each of those has many books.

## API

Routes follow the pattern `api/{Controller}/{Action}`, where the controller is `Books`, `Authors`, `Genres`, or `Publishers`.

| Method | Route | Description |
|---|---|---|
| GET | `/api/Books/List` | List all books |
| POST | `/api/Books/Save` | Create a book, or update it when `id` is present |
| DELETE | `/api/Books/Delete/{id}` | Delete a book |

`Authors`, `Genres`, and `Publishers` expose the same three actions (`List`, `Save`, `Delete/{id}`).

## Project Structure

```
Src
├── Library Management System
│   └── EndPoint            ASP.NET Core Web API
│       ├── Controllers     One controller per entity
│       ├── Models
│       │   ├── Entities    EF Core entities
│       │   ├── DBContext   DataBaseContext and model configuration
│       │   └── Services    Service interfaces and implementations
│       ├── ModelDto        Data transfer objects
│       └── Migrations      EF Core migration
└── library-client          React frontend
    └── src
        ├── components      Author, Book, Genre, Publisher pages and save modals
        └── assets/css      Styles
```

## Tech Stack

**Backend:** C#, ASP.NET Core Web API, Entity Framework Core (code-first), SQL Server, Swagger (Swashbuckle)

**Frontend:** React, React Router, Axios, React-Bootstrap, SweetAlert2

## Getting Started

### Prerequisites
- .NET SDK
- Node.js and npm
- SQL Server 2019 or later (the database uses a UTF-8 collation)

### 1. Backend
1. Set the connection string `ConnectionStrings:DefaultConnection` in `Src/Library Management System/EndPoint/appsettings.json`. The default is the local instance `.\SQL2022` with Windows authentication and a database named `LibraryManagementDb`.
2. Create the database:
   ```bash
   cd "Src/Library Management System/EndPoint"
   dotnet ef database update
   ```
3. Start the API:
   ```bash
   dotnet run
   ```
   Swagger is available at `/swagger` in development.

### 2. Frontend
The client calls the API at `https://localhost:44396` (the IIS Express HTTPS port from `launchSettings.json`). If your API runs on another address, update the URL in the files under `Src/library-client/src/components`.

```bash
cd Src/library-client
npm install
npm start
```

## Known Limitations

- The API address is written directly in the React components instead of a configuration file.
- The book form takes author, genre, and publisher as numeric IDs, and the book table shows IDs instead of names.
- Deleting an author, genre, or publisher also deletes all of its books (cascade delete).
- Missing records produce a generic server error instead of a 404 response.
- Lists are not paginated and the API has no authentication.
- Automated tests are not included yet.
- The backend targets .NET 6, which is out of support and should be upgraded to a current LTS version.

## Roadmap

- Upgrade the backend to .NET 8
- Replace the ID inputs with dropdowns and show names in the book table
- Return proper HTTP status codes (404, 400) through exception-handling middleware
- Move the API URL to an environment variable
- Add xUnit tests for the services and React tests for the main pages
- Add search, pagination, and authentication

## Author

Behrooz Roozbahani, .NET / C# developer
GitHub: https://github.com/behroozroozbahani
