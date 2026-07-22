# Guide du template,  conception & personnalisation

Landing page en Next.js (export statique) + CMS Sveltia.

Ce guide sert à **comprendre** le template et à le **personnaliser** pour un client.

---

## L'architecture

Une landing page est un contenu statique : même HTML pour tous, qui ne change que lors d'une mise à jour délibérée.

- **Export statique** `output: 'export'` : le build produit un dossier `out/` de fichiers HTML/CSS/JS.
- **Aucun serveur** en production : hébergement gratuit, zéro maintenance, réversible.
- **Contenu séparé du code** : tout l'éditable vit dans `content/site.json`. Les composants lisent ce fichier.
- **CMS Git-based** Sveltia sur `/admin` : Le cleint édite dans une interface web, le "click" sur "Enregistrer" déclenche un **commit GitHub**, la CI Cloudflare rebuild `npm run build` puis déploie.

Chaîne : *édition &rarr; commit &rarr; build &rarr; site à jour*.

> **Principe : le statique est en lecture seule à l'exécution.** Toute modification passe par un commit puis un build (1 à 2 min). C'est le prix de l'architecture, et son avantage : chaque changement est versionné et réversible.

---

## Récupérer et lancer le projet

```bash
npm ci          # installe exactement depuis package-lock.json
npm run dev     # serveur de dev (Turbopack) sur http://localhost:3000
npm run build   # build de production dans dossier out/
npx serve out   # sert l'export du build localement
```

> **Ne jamais ouvrir `out/index.html` en double-clic.** Les assets sont référencés en chemins absolus `/_next/...` qui cassent en local `file://`. Toujours *servir* le dossier `npx serve out`, ne pas l'*ouvrir*.

---

## Personnaliser le contenu

Tout se joue dans **`content/site.json`** : textes des sections, coordonnées, témoignages. Squelette à adapter aux couleurs et à l'identité de la marque, le client modifie ensuite le contenu autorisé (textes, couleurs restreintes...) via le CMS.

`content/site.json` est la surface du client, le code reste celle du développeur.

> **Principe** `content/site.ts` lit le JSON en le typant `site.types.ts`. Si le JSON perd un champ ou a une clé mal orthographiée, **le build échoue en désignant l'erreur** — un contenu invalide ne peut pas être déployé. Le type n'est pas une contrainte, c'est une assurance.

---

## Personnaliser l'apparence

- **Couleurs de marque** : design tokens dans `app/globals.css` variables `--color-*` et/ou éditables via le CMS (section "Charte graphique").
- **Police** : `next/font` dans `app/layout.tsx` (auto-hébergée, conforme RGPD &rarr; aucune requête vers Google).
- **CSS** : un module par composant `Composant.module.css`, **mobile first**, sur les tokens.

> **Mobile first.** Les styles de base sont les styles mobile et une media query `min-width` *enrichit* vers le grand écran. Un breakpoint en `rem` suit la taille de police de l'utilisateur (RGAA).

> **Attention aux échecs CSS silencieux.** Une propriété invalide `font-weight: 2rem` ou une classe de module absente n'affiche aucune erreur, la règle est ignorée. **Réflexe** : `F12`&rarr;`Elements`&rarr;`Style` chercher les lignes barrées, comme on lit un message d'erreur.

> **Principe de grille flexible.** `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))` s'adapte à x éléments et taille d'écran sans media query. On rend le CSS robuste au lieu de contraindre le contenu.

---

## Le formulaire (Brevo)

Le formulaire `POST` vers un **endpoint public Sveltia/Brevo** `cta.formEndpoint`. Aucune clé d'API côté client.

> **Jamais de secret dans du code client.** Sur un site statique, tout le JS est public : une clé d'API embarquée est une clé donnée à tous. On poste vers un endpoint public prévu pour ça, jamais vers l'API authentifiée.

Personnalisation : créer un formulaire Brevo (liste dédiée, **double opt-in**), copier son endpoint dans `site.json#cta.formEndpoint`, tester de bout en bout (soumission &rarr; email de confirmation &rarr; contact dans la liste).

---

## Mesure d'audience - GA4 (googleAnalytics) avec consentement 

`analytics.gaId` dans `site.json` (chaine vide = désactivé). La bannière de consentement **ne charge aucun script Google avant le clic sur "Accepter"**.

> **Conformité par construction.** Le script GA n'est pas dans la page tant que le consentement n'est pas acquis.L'acception et le refus on la même importance visuel.

> Test de conformité : onglet Network, filtre sur `google`, aucunes requêtes avant l'acceptation.

---

## Déploiement

- **Client réel hébergé chez Cloudflare Pages** (usage commercial gratuit). Connecter le dépôt Git.
- **Entraînement : GitHub Pages** (non commercial). Attention au sous-chemin (`basePath`).

> **Les chemins et le contexte de déploiement.** Sur un sous-chemin (GitHub Pages `/projet/`), il faut un `basePath` injecté par la CI, **jamais écrit en dur** dans `next.config.ts` (sinon il casse le déploiement racine). Les liens internes doivent utiliser `<Link>` (préfixé automatiquement), pas des `<a href>` bruts.

> **Réflexe build.** `out/` est un *screenshot* du dernier build, pas le code vivant. Une modification n'est en ligne qu'une fois **commitée et poussée** (la CI rebuild). "Ça marche en local" est différent de "C'est en ligne".

---

## Le CMS (`/admin`)

Le cleint édite sur `/admin` via "Se connecter avec GitHub". Ce qui est éditable est décrit dans **`public/admin/config.yml`**.

> **`config.yml` est une frontière de permissions.** Un champ retiré du disparaît de l'interface **mais reste intact dans le JSON**. On expose le contenu, on cache les rouages technique `formEndpoint`, `url`, `gaId`.

> **Structure fixe pour le livrable.** Le CMS ne peut pas réagencer les sections (clés JSON fixes). C'est voulu : on ne la rend pas modifiable une fois le design accepter par le client.

---

## Réflexes React utiles (composants interactifs)

Trois composants seulement sont "client" `"use client"` : le formulaire, la bannière de consentement, le bouton de gestion des cookies. Tout le reste est rendu en HTML pur au build.

> **Le rendu décrit, les handlers agissent.** Le corps d'un composant doit être *pur* : aucun `setState`, aucun appel d'API, aucun accès `localStorage` pendant le rendu. Tout ça vit dans les gestionnaires `onClick`, `handleSubmit` ou les effets. Violer cette règle donne "Too many re-renders" ou un crash au build.