# Guide du template, conception & personnalisation

Landing page Next.js (export statique) + CMS Sveltia.

**Le développeur** personnalise le template pour un client entrepreneur. Le client, lui, éditera ensuite certains contenus via le CMS.

---

## La carte du projet

```
app/                  routes : page d'accueil, layout, pages légales, 404, sitemap, robots
components/           un dossier par section (Composant.tsx + Composant.module.css)
content/
  site.json           contenu éditable (textes, coordonnées, témoignages, couleurs)
  site.types.ts       le type qui valide site.json au build
  site.ts             relit le JSON en le typant (façade)
public/
  admin/config.yml    ce que le CMS autorise à éditer
  images/             visuels (uploadés par le client via le CMS)
app/globals.css       design tokens (couleurs, espacements, typo)
next.config.ts        output: 'export' + images unoptimized
```

> **Le statique est en lecture seule à l'exécution.** Le build produit un dossier `out/` de fichiers servis sans serveur. Toute modification passe par un commit puis un build (1 à 2 min). Chaque changement est versionné et réversible.
>> Chaîne : *édition &rarr; commit &rarr; build &rarr; site à jour*.

---

## Lancer le projet

```bash
npm ci          # "clean install", installe exactement depuis package-lock.json, sans chercher de version plus récente 
npm run dev     # serveur de dev (Turbopack) sur http://localhost:3000
npm run build   # build de production dans out/
npx serve out   # sert l'export du build localement
```

> **Ne jamais ouvrir `out/index.html` en double-clic.** Les assets sont en chemins absolus `/_next/...` qui cassent en `file://`.
>> Toujours *servir* le dossier `npx serve out`, ne pas l'*ouvrir*.

---

## Deux niveaux de personnalisation

Le template est un **squelette fonctionnel** à adapter.

- **Le développeur** adapte le squelette à la marque : couleurs, mise en forme, structure fine, textes de départ. C'est un travail sur le **code**.
- **Le client** modifie ensuite, via le CMS, les contenus qu'on lui a autorisés (textes, couleurs restreintes…). C'est un travail sur `content/site.json`.

---

## Personnaliser l'apparence

- **Couleurs de marque** : design tokens dans `app/globals.css` (variables `--color-*`).
- **Police** : `next/font` dans `app/layout.tsx` (auto-hébergée, conforme RGPD, aucune requête vers Google).
- **Styles** : un module CSS par composant `Composant.module.css`, **mobile-first**, qui consomme les variables plutôt que des valeurs en dur.

> **Les design tokens.** Un token est une variable de design centralisée (`--color-primary`, `--space-md`). Les modules écrivent `var(--color-primary)`, jamais `#1d4ed8` en dur.
>> re-brander = changer la variable à un seul endroit, tout le site suit.

> **Mobile-first.** Les styles de base sont les styles mobile, une media query `min-width` *enrichit* vers le grand écran.
>> Un breakpoint en `rem` suit la taille de police choisie par l'utilisateur (accessibilité RGAA).

> **Le CSS échoue en silence.** Une propriété invalide comme `font-weight: 2rem` ou une classe de module absente n'affiche aucune erreur : la règle est simplement ignorée.
>> Réflexe : ouvrir l'inspecteur d'éléments et chercher les lignes barrées, comme on lit un message d'erreur.

> **Approche CSS Grid flexible** avec `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))` s'adapte au nombre d'éléments et à la largeur d'écran, sans media query.
>> On rend le CSS robuste au lieu de contraindre le contenu.

---

## Le contenu de départ

Le contenu vit dans **`content/site.json`** : textes des sections, coordonnées, témoignages. Textes initiaux que le client fera évoluer via le CMS.

> **Le contrat façade.** `content/site.ts` relit le JSON en le typant `site.types.ts`. Si le JSON perd un champ ou a une clé mal orthographiée, **le build échoue en désignant l'erreur** : un contenu invalide ne peut pas être déployé. Le type n'est pas une contrainte, c'est une assurance.

---

## Le formulaire (Brevo)

Le formulaire poste vers un **endpoint public Brevo**, stocké dans le champ `cta.formEndpoint` de `site.json`. Aucune clé d'API côté client.

> **Jamais de secret dans du code client.** Sur un site statique, tout le JS est public. On poste vers un endpoint public prévu pour ça, jamais vers l'API authentifiée.

Pour chaque client : créer un formulaire Brevo (liste dédiée, **double opt-in**), copier son endpoint dans `site.json`, tester de bout en bout (soumission &rarr; email de confirmation &rarr; contact dans la liste).

---

## Mesure d'audience (GA4 + consentement)

Le champ `analytics.gaId` de `site.json` active Google Analytics (chaîne vide = désactivé). La bannière **ne charge aucun script Google avant le clic sur "Accepter"**.

> **Conformité par construction.** Le script GA n'est pas dans la page tant que le consentement n'est pas acquis. "Accepter" et "Refuser" ont la même importance visuelle.
>> Test : onglet Network, filtre `google`, aucune requête avant l'acceptation.

---

## Les pages légales

`app/mentions-legales/` et `app/politique-de-confidentialite/` à personnalisé (éditeur, hébergeur, durées de conservation…) à compléter pour chaque client.
>Il s'agit de gabarits à faire **valider par le client** - ce ne sont pas un conseil juridique.

---

## Déploiement

Le template sert **deux usages**, avec deux hébergeurs :

- **Livrable client &rarr; Cloudflare Pages.** Usage commercial gratuit, sert à la racine d'un domaine. On connecte le dépôt Git : Cloudflare détecte les push et build automatiquement - **aucun fichier de CI à écrire**.
- **Entraînement &rarr; GitHub Pages.** Gratuit mais **non commercial** (interdit pour un vrai client), servi sur un sous-chemin. Ici, un workflow GitHub Actions `.github/workflows/` décrit explicitement la CI.

> **Cloudflare** gère la CI en "boîte noire", le workflow GitHub, lui, l'expose en clair (checkout &rarr; `npm ci` &rarr; build &rarr; deploy).
>> Le lire et le manipuler est formateur : c'est *la* compétence CI, visible et transférable.

> **Les chemins et le contexte de déploiement.** Sur un sous-chemin (GitHub Pages `/projet/`) il faut un `basePath`, injecté par la CI et **jamais écrit en dur** dans `next.config.ts` (sinon il casse le déploiement racine de Cloudflare).
>> Les liens internes utilisent `<Link>` (préfixé automatiquement), pas des `<a href>`bruts.

> **Réflexe build.** `out/` est un *screenshot* du dernier build, pas le code vivant. Une modification n'est en ligne qu'une fois **commitée et poussée** (la CI rebuild).
>> "Ça marche en local" est différent de "C'est en ligne".

---

### Le workflow GitHub Actions (entraînement)

Fichier `.github/workflows/deploy.yml` : la CI que GitHub Pages exige (Cloudflare, lui, n'en a pas besoin) :

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]        # se déclenche à chaque push sur main
permissions:
  contents: read
  pages: write              # droit d'écrire sur Pages (moindre privilège)
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4                    # récupère le code
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: npm }
      - uses: actions/configure-pages@v5             # injecte le basePath
        with: { static_site_generator: next }
      - run: npm ci                                  # install reproductible
      - run: npm run build                           # produit out/
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./out }
  deploy:
    needs: build                                     # attend que build réussisse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

> **Lire une CI.** Chaque `step` est une commande, comme dans un terminal, mais sur une machine vierge de GitHub. Si `npm ci && npm run build` passe ici, le projet est réellement reproductible. C'est `configure-pages` qui injecte le `basePath` du sous-chemin, d'où l'inutilité (et le danger) de l'écrire en dur.

---

## Le CMS (`/admin`)

Le client édite sur `/admin` via "Se connecter avec GitHub". Il peut modifier uniquement ce qui est décrit dans **`public/admin/config.yml`**.

> **`config.yml` est une frontière de permissions.** Un champ retiré du config disparaît de l'interface **mais reste intact dans le JSON**. 
>> On expose le contenu, on cache les rouages techniques `formEndpoint`, `url`, `gaId`.

> **Structure fixe.** Le CMS ne peut pas réagencer les sections (clés JSON fixes). C'est voulu, après acceptation du desgn par le client, on ne le rend pas modifiable.

> **YAML : l'indentation EST la syntaxe.** Un espace de travers et le config ne se parse plus.

> **L'authentification du CMS.** La connexion "Se connecter avec GitHub" passe par un petit worker Cloudflare `sveltia-cms-auth`, séparé du dépôt. Il détient le secret OAuth (jamais exposé au navigateur) et fait l'échange avec GitHub. C'est le seul morceau non-statique de l'architecture.

---

## Réflexes React (composants interactifs)

Trois composants seulement sont "client" `"use client"` : le formulaire, la bannière de consentement, le bouton de gestion des cookies. Tout le reste est du HTML pur rendu au build.

> **Le rendu décrit, les handlers agissent.** Le corps d'un composant doit être *pur* : aucun `setState`, appel d'API ou accès `localStorage` pendant le rendu. Tout ça vit dans les gestionnaires `onClick`, `handleSubmit` ou les effets.
>> Violer cette règle amène à "Too many re-renders" ou un crash au build.

> **`onClick={f()}` vs `onClick={() => f()}`.** Le premier *appelle* la fonction au rendu, le second la *passe* pour exécution au clic.

---

## Checklist de livraison client

- [ ] Champ `url` de `site.json` = URL de production réelle
- [ ] Formulaire Brevo créé + endpoint + test de bout en bout (double opt-in)
- [ ] Pages légales complétées et validées par le client
- [ ] `gaId` renseigné si Google Analytics souhaitée, test "zéro requête Google avant consentement"
- [ ] Audit Lighthouse + axe **sur l'URL déployée**
- [ ] DNS : domaine du client rattaché à l'hébergement

---

*Template maintenu par l'équipe pédagogique. Next.js (App Router). Doc : nextjs.org/docs.*
