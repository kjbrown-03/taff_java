# Hotel Management System - RoomRaccoon Inspired

## Description
Application web complète de gestion d'hôtel inspirée de RoomRaccoon, développée avec Spring Boot (backend) et React (frontend), utilisant MySQL comme base de données.

## Technologies Utilisées

### Frontend
- React 18
- React Router DOM
- Axios
- Material-UI / Tailwind CSS
- Redux Toolkit (State Management)

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Security (Authentication & Authorization)
- Spring Data JPA
- MySQL 8.x
- JWT Authentication
- Maven

### Database
- MySQL 8.x

## Architecture
- **Pattern**: MVC (Model-View-Controller)
- **API**: RESTful API
- **Authentication**: JWT + Role-Based Access Control

## Modules Principaux (CRUD + Recherche)

1. **Gestion des Chambres** (Rooms Management)
   - Types de chambres
   - Disponibilité
   - Tarifs
   - Caractéristiques

2. **Gestion des Réservations** (Reservations Management)
   - Créer/modifier/annuler réservations
   - Calendrier de réservations
   - Check-in/Check-out
   - Statuts des réservations

3. **Gestion des Clients** (Guests Management)
   - Profils clients
   - Historique
   - Préférences
   - Documents

4. **Gestion du Personnel** (Staff Management)
   - Employés
   - Rôles et permissions
   - Plannings
   - Départements

5. **Gestion des Services** (Services Management)
   - Services additionnels
   - Restaurant
   - Spa
   - Blanchisserie

6. **Gestion des Paiements** (Payments Management)
   - Factures
   - Paiements
   - Méthodes de paiement
   - Rapports financiers

7. **Reporting & Analytics**
   - Statistiques
   - Taux d'occupation
   - Revenus
   - KPIs

## Installation

### Prérequis
- Java 17+
- Node.js 18+
- MySQL 8.x
- Maven 3.x

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Base de données
```bash
mysql -u root -p
CREATE DATABASE hotel_management;
```

## Deployment
- Frontend: Vercel
- Backend: AWS/Heroku/Railway
- Database: AWS RDS/PlanetScale

## Fonctionnalités Clés
- ✅ Authentification JWT
- ✅ Gestion des rôles (Admin, Manager, Receptionist, Guest)
- ✅ CRUD complet sur 7+ modules
- ✅ Recherche avancée avec filtres
- ✅ Interface responsive
- ✅ Backup automatique de la base de données
- ✅ API RESTful documentée
- ✅ Validation des données
- ✅ Gestion des erreurs
- ✅ Logs et monitoring

## Auteurs
Développé dans le cadre d'un projet académique

## License
MIT
