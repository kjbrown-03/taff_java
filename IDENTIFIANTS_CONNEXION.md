# 🔐 Identifiants de Connexion - Hotel Management System

## 👤 Comptes Utilisateurs

### 🔴 Administrateur
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** admin@hotel.com
- **Rôle:** ADMIN
- **Accès:** Accès complet au système

### 🟡 Réceptionniste
- **Username:** `john_receptionist`
- **Password:** `staff123`
- **Email:** john@hotel.com
- **Rôle:** RECEPTIONIST
- **Accès:** Gestion des réservations, clients, paiements

### 🟢 Client
- **Username:** `jane_client`
- **Password:** `client123`
- **Email:** jane@hotel.com
- **Rôle:** CLIENT
- **Accès:** Consultation et gestion de ses propres réservations

---

## 📝 Notes
- Tous les mots de passe sont en clair dans le code pour faciliter les tests
- En production, changez tous les mots de passe par défaut
- Les utilisateurs sont créés automatiquement au démarrage de l'application si ils n'existent pas

---

## 🚀 URL de Connexion
- **Frontend:** http://localhost:5176/login (ou le port affiché par Vite)
- **Backend API:** http://localhost:8080/api/auth/login
