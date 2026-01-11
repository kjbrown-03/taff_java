# Instructions pour voir les changements du frontend

## Problème : Les changements ne s'affichent pas

Si tu ne vois pas les nouveaux designs, c'est que le serveur de développement frontend doit être redémarré.

## Solution :

1. **Arrêter le serveur frontend actuel** (Ctrl+C dans le terminal où il tourne)

2. **Nettoyer le cache** :
   ```bash
   cd frontend
   rm -rf node_modules/.vite
   # Ou sur Windows PowerShell :
   Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
   ```

3. **Redémarrer le serveur** :
   ```bash
   npm run dev
   ```

4. **Vider le cache du navigateur** :
   - Appuyer sur `Ctrl + Shift + R` (Windows/Linux) ou `Cmd + Shift + R` (Mac)
   - Ou ouvrir les DevTools (F12) → Onglet Network → Cocher "Disable cache"

## Vérifier que les fichiers sont bien modifiés :

Les fichiers suivants ont été modifiés :
- `src/pages/Login.jsx` - Nouveau design avec animations
- `src/pages/Login.css` - Styles améliorés
- `src/index.css` - Styles globaux modernes
- `src/services/api.js` - URL corrigée

## Si ça ne fonctionne toujours pas :

1. Vérifier que tu es bien sur la page `/login` et non sur `/` (Home)
2. Vérifier la console du navigateur pour les erreurs
3. Vérifier que le backend tourne sur le port 8080
