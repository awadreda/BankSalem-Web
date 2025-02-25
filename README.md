# Bank Salem Web Project

## Overview
A comprehensive banking system built with modern web technologies, featuring a React-based frontend and .NET 8 backend. This system provides banking functionalities with a robust architecture and user-friendly interface.

## Live Demo

- **Frontend**: [Bank Salem Web App](https://shimmering-tiramisu-48c301.netlify.app/)
- **Backend API Documentation**: [Swagger UI](https://banksalem.somee.com/swagger/index.html)




### Functionality

#### Banking System Features
- Client Management
  - Add, delete, update, and retrieve client information
  - Manage client balances (withdraw, deposit, transfer)
- Admin Capabilities
  - Create, delete, and update client accounts
  - View and search client list in a table format
- User Dashboard
  - User CRUD operations (delete, update, get by ID)
  - User list management
  - Permission management
- Authentication
  - Login and logout functionality
- Client ATM Interface
  - Balance display
  - Withdraw, deposit, and transfer funds
  - View transaction history
- Additional Features
  - Balance information display
  - Transaction and activity logs



## Technology Stack

### Frontend
- **React.js** with Vite and TypeScript for enhanced development experience
- **React Router** for client-side routing
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for modern and responsive UI components

### Backend
- **.NET 8 Web API**
- **Three-Tier Architecture** for better separation of concerns
- **ADO.NET** for efficient data access
- **SQL Server** for database management

## Project Structure

### Frontend Structure
```
src/
├── Apis/           # API integration and services
├── components/     # Reusable UI components
├── Pages/         # Main application pages
├── Store/         # Redux store configuration
├── features/      # Redux features and slices
├── Types/         # TypeScript type definitions
├── Global/        # Global styles and constants
├── assets/        # Static assets
└── App.tsx        # Main application component
```
### Backend Structure
```
BankSalem-backend/
├── DataAccessLayer/
│   ├── BankSalemDataAccessLayer/
│   │   ├── ClientsData.cs
│   │   ├── DataConnectionSettings.cs
│   │   ├── LogRegisterDb.cs
│   │   ├── TransActionData.cs
│   │   └── UserData.cs
|   |
│   ├── BankbusinessLayer/
│   │   ├── DTOs/
│   │   ├── ClientsBusiness.cs
│   │   ├── clsPerson.cs
│   │   ├── Global.cs
│   │   └── UserBusiness.cs
|   |      
│   └── BankWepAPI/
│       ├── Controllers/
│       │   ├── ClientsController.cs
│       │   ├── LogRegisterController.cs
│       │   ├── TrasnActonsController.cs
│       │   └── UserControllers.cs
│       ├── TransTypes/
│       │   └── TransTypes.cs
│       └── Utilities/
│           └── Checkobjs.cs




## Getting Started

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd BankSalem-frontend/Salem-Bank
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd BankSalem-backend
   ```
2. Ensure you have .NET 8 SDK installed
3. Update the database connection string in `appsettings.json`
4. Run the following commands:
   ```bash
   dotnet restore
   dotnet build
   dotnet run
   ```

## Prerequisites
- Node.js and npm
- .NET 8 SDK
- SQL Server
- IDE (Visual Studio Code recommended for frontend, Visual Studio 2022 for backend)

