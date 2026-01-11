# 🔧 Solution pour la Page Blanche et ERR_NETWORK_CHANGED

## ✅ Vérifications Effectuées

### 1. Base de Données ✅
- **Statut** : Connectée
- **Base de données** : `hotel_management` existe
- **Utilisateurs** : 
  - `admin` (admin@hotel.com)
  - `john_receptionist` (john@hotel.com)
  - `jane_client` (jane@hotel.com)

### 2. Configuration CORS ✅
- Tous les ports localhost sont autorisés (`http://localhost:*`)
- Le port 5176 est inclus

## 🔴 Problème : ERR_NETWORK_CHANGED

Cette erreur se produit quand :
- Le serveur Vite redémarre
- Plusieurs instances Node.js tournent en même temps
- Le cache du navigateur est corrompu

## 🛠️ Solution Étape par Étape

### Étape 1 : Arrêter tous les processus Node.js

```powershell
# Dans PowerShell (en tant qu'administrateur si nécessaire)
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force
```

### Étape 2 : Nettoyer le cache Vite

```powershell
cd frontend
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

### Étape 3 : Redémarrer le serveur frontend

```powershell
cd frontend
npm run dev
```

**OU utilise le script automatique :**
```powershell
cd frontend
.\restart-dev.ps1
```

### Étape 4 : Vider le cache du navigateur

1. Appuie sur **F12** pour ouvrir les DevTools
2. Clic droit sur le bouton de rafraîchissement
3. Sélectionne **"Vider le cache et effectuer une actualisation forcée"**
   - OU appuie sur **Ctrl + Shift + R**

### Étape 5 : Vérifier que le backend tourne

```powershell
# Dans un autre terminal
cd backend
mvn spring-boot:run
```

### Étape 6 : Tester la connexion

1. Va sur : `http://localhost:5176/login`
2. Connecte-toi avec :
   - **Admin** : `admin` / `admin123`
   - **Réceptionniste** : `john_receptionist` / `staff123`
   - **Client** : `jane_client` / `client123`

## 🔍 Si ça ne fonctionne toujours pas

### Vérifier les erreurs dans la console

1. Ouvre la console (F12)
2. Regarde l'onglet **Console** pour les erreurs JavaScript
3. Regarde l'onglet **Network** pour les erreurs de requêtes

### Vérifier que les ports sont libres

```powershell
# Vérifier le port 5176
netstat -ano | findstr :5176

# Vérifier le port 8080 (backend)
netstat -ano | findstr :8080
```

### Redémarrer complètement

1. Ferme tous les terminaux
2. Redémarre l'IDE
3. Suis les étapes 1 à 6 ci-dessus

## 📝 Notes Importantes

- **Ne lance JAMAIS plusieurs instances de `npm run dev` en même temps**
- **Toujours vider le cache du navigateur après un redémarrage du serveur**
- **Vérifie que le backend est démarré avant d'accéder au frontend**

## 🆘 En cas de problème persistant

1. Vérifie les logs du backend dans la console
2. Vérifie les logs du frontend dans la console
3. Vérifie que le token JWT est bien stocké dans `localStorage` (F12 → Application → Local Storage)
