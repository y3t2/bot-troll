# 💫 Discord Bot — eGirl/eBoy, Fake Hack & Pseudo Lock 🔒

Un bot Discord en JavaScript avec des commandes fun et des fonctionnalités avancées de "lock pseudo" pour empêcher les membres de changer leur pseudo.

## ✨ Fonctions disponibles :
- `+uwu` → Te traite d'eGirl ou d'eBoy
- `+hack @user` → Fait semblant de hacker quelqu'un
- `+lockpseudo @user` → Verrouille le pseudo d'un membre (seulement pour les rôles autorisés)
- `+unlockpseudo @user` → Déverrouille le pseudo d'un membre (seulement pour les rôles autorisés)
- `+help` → Affiche la liste des commandes

## 🔒 Système de Lock Pseudo :
- Empêche un membre de changer son pseudo.
- Sauvegarde les pseudos lockés dans un fichier `lockedUsers.json` pour les garder après un redémarrage.
- Seulement les membres ayant un rôle spécifique peuvent utiliser les commandes `+lockpseudo` et `+unlockpseudo`.

## 📥 Installation

1. Clone le dépôt :
    ```bash
    git clone https://github.com/TON-NOM-D-UTILISATEUR/TON-REPO.git
    cd TON-REPO
    ```

2. Installe les dépendances :
    ```bash
    npm install discord.js
    ```

3. Crée un fichier `lockedUsers.json` :
    ```json
    {}
    ```

4. Remplis ton **token Discord** dans le fichier `index.js` :
    ```js
    client.login('TON_TOKEN_ICI');
    ```

5. Configure les **ID de rôles autorisés** dans `index.js` :
    ```js
    const allowedRoleIDs = ['ROLE_ID_1', 'ROLE_ID_2']; // Remplace avec les vrais IDs de tes rôles
    ```

## 🚀 Lancer le bot
```bash
node index.js
```

## 📄 Prérequis
- Node.js v16 ou supérieur
- Un bot Discord configuré (token)

## 📝 A faire
- [ ] Ajouter une commande +locklist pour voir tous les pseudos lockés.
- [ ] Système d'anti-changement de pseudo même après kick/rejoin.
- [ ] Système de configuration par serveur (multi-serveur).

## 📜 Licence
Ce projet est open-source sous licence MIT.
