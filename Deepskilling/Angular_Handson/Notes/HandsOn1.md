# Hands-On 1: Environment Setup, Project Structure & First Component

**Program:** Digital Nurture 5.0 | .NET Full Stack Engineer Track  
**Course:** Angular (v20.0): Components, Routing, Forms, HTTP, State Management & Testing  
**Difficulty Level:** Beginner  
**Application Context:** Student Course Portal  

---

## 📌 Executive Overview

Hands-On 1 serves as the foundational setup for building the **Student Course Portal** single-page application (SPA). This exercise covers scaffolding a modern Angular v20 workspace using the Angular CLI, analyzing every critical configuration file, examining the compilation build output, understanding build budgets, and creating the initial component tree for the portal.

---

## 📑 Topics Covered

- **Angular CLI & Workspace Scaffolding:** Installation, workspace generation (`ng new`), development server execution (`ng serve`).
- **Angular Project Structure & File System:** Decoupling config files, entry points, component files, and Angular standalone architecture.
- **Build Inspection & Bundle Analysis:** Executing `ng build` and inspecting output bundles in `dist/`.
- **Build Budgets Configuration:** Understanding warning and error thresholds in `angular.json`.
- **Component Architecture:** Creating feature and layout components (`@Component` metadata, templates, styles, test specs).

---

## 🚀 Task 1: Scaffold and Explore the Angular Project

### 1.1 Project Creation & Setup Commands

To establish the Angular v20 project, the following CLI commands were executed:

```bash
# Global installation of Angular CLI v20 (if not already installed)
npm install -g @angular/cli

# Scaffold the Student Course Portal project with CSS and Routing enabled
ng new student-course-portal --routing --style=css

# Navigate into the project workspace
cd student-course-portal

# Start the local development server on http://localhost:4200
ng serve
```

> [!NOTE]
> Angular 17+ and v20 default to **Standalone Components** (`standalone: true`). In modern standalone Angular apps, `AppModule` (`app.module.ts`) is replaced by direct bootstrapping via `src/main.ts` and application config in `src/app/app.config.ts`.

---

### 1.2 Core Project Files & Purpose Analysis

Below is the detailed breakdown of the 8 fundamental configuration and entry point files in the scaffolded application:

| File Path | Category | Description & Purpose |
| :--- | :--- | :--- |
| `angular.json` | Project Config | Stores workspace-wide configuration settings including project targets (build, serve, test), file replacements, styles, assets, and bundle budgets. |
| `tsconfig.json` | TypeScript Config | The root TypeScript compiler configuration specifying global compiler flags, target ES version, module resolution, and path aliases. |
| `tsconfig.app.json` | TypeScript Config | App-specific TypeScript configuration extending `tsconfig.json`, strictly tailored for compiling source code within `src/`. |
| `package.json` | Node Package Manager | Defines project dependencies (`@angular/core`, `@angular/router`, etc.), devDependencies, scripts (`start`, `build`, `watch`, `test`), and metadata. |
| `src/main.ts` | Application Entry Point | The main entry point executed by the browser. It bootstraps the root `App` component using `bootstrapApplication` and `appConfig`. |
| `src/app/app.config.ts` | Application Architecture | Configures root providers, client-side routing (`provideRouter`), state providers, and global service registrations for standalone Angular. |
| `src/app/app.ts` (or `app.component.ts`) | Root Component | Defines the top-level root component (`<app-root>`) that houses the base UI framework and router outlet container. |
| `src/index.html` | Root HTML Document | The single host HTML page loaded by the browser containing basic HTML layout (`<head>`, `<body>`) and the root component tag (`<app-root>`). |

---

### 1.3 Build Output Analysis (`ng build`)

Running `ng build` generates production-ready, optimized JavaScript and CSS bundles under the `dist/student-course-portal/` directory:

- **`browser/index.html`**: Processed HTML page with injected script tags for JavaScript bundles.
- **`browser/main-<hash>.js`**: Contains all compiled application logic, Angular framework runtime code, and component code.
- **`browser/styles-<hash>.css`**: Bundled stylesheet compiled from global styles defined in `src/styles.css`.
- **`browser/favicon.ico`**: Web app icon.
- **`browser/3rdpartylicenses.txt`**: Extracted legal licenses for third-party npm packages.
- **`browser/prerendered-routes.json`**: Metadata defining pre-rendered paths (when SSR/SSG is enabled).

> **Key takeaway:** `main-<hash>.js` is the primary executable bundle containing the compiled TypeScript application code and imported Angular libraries.

---

### 1.4 Angular Build Budgets (`angular.json`)

Build budgets in `angular.json` under `architect > build > configurations > production` enforce performance guardrails by preventing application bundles from exceeding specified threshold sizes during production builds.

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kB",
    "maximumError": "1MB"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "4kB",
    "maximumError": "8kB"
  }
]
```

#### Budget Breakdown:
1. **`initial` Budget**:
   - **`maximumWarning: 500kB`**: Angular CLI emits a compilation warning if the initial JavaScript/CSS payload loaded on application boot exceeds 500 KB.
   - **`maximumError: 1MB`**: Angular CLI aborts the build with an error if the initial bundle size exceeds 1 MB.
2. **`anyComponentStyle` Budget**:
   - **`maximumWarning: 4kB`**: Emits a warning if any individual component's CSS stylesheet exceeds 4 KB.
   - **`maximumError: 8kB`**: Fails the build if any component's stylesheet exceeds 8 KB.

---

## 🛠️ Task 2: Create and Organize Components

### 2.1 Component Generation Commands

Four core application components were created to structure the navigation and primary views of the Student Course Portal:

```bash
# Layout Header Component
ng generate component components/header

# Dashboard Page Component
ng generate component pages/home

# Course Catalog Page Component
ng generate component pages/course-list

# Student Profile Page Component
ng generate component pages/student-profile
```

Each `ng generate component` invocation creates a dedicated directory containing **4 files**:
1. `.ts` — TypeScript class decorated with `@Component` containing component state and logic.
2. `.html` — HTML template defining component markup.
3. `.css` — Scoped component CSS styles (isolated via Angular View Encapsulation).
4. `.spec.ts` — Jasmine unit testing suite file.

---

### 2.2 Component Implementations & Code Structure

#### 1. Layout Header (`HeaderComponent`)
- **Location:** `src/app/components/header/`
- **Class (`header.ts`):** Imports `RouterLink` for client-side navigation.
- **Template (`header.html`):** Renders the navigation bar with portal title and navigation links:

```html
<nav>
  <h2>Student Course Portal</h2>
  <ul>
    <li><a routerLink="/">Home</a></li>
    <li><a routerLink="/courses">Courses</a></li>
    <li><a routerLink="/profile">Profile</a></li>
  </ul>
</nav>
```

#### 2. Dashboard (`HomeComponent`)
- **Location:** `src/app/pages/home/`
- **Template (`home.html`):** Displays welcome heading, portal description, and key student dashboard metrics:

```html
<h1>Student Course Portal</h1>
<p>Manage your courses, view your profile, and track your academic progress from one place.</p>

<div class="stats">
  <div class="card">
    <h3>Courses Available</h3>
    <p>12</p>
  </div>
  <div class="card">
    <h3>Enrolled</h3>
    <p>3</p>
  </div>
  <div class="card">
    <h3>GPA</h3>
    <p>3.8</p>
  </div>
</div>
```

#### 3. Root Application View (`App` Component)
- **Location:** `src/app/app.ts` & `src/app/app.html`
- **Template (`app.html`):** Embeds `<app-header>` at the top and `<router-outlet>` to render active page components:

```html
<app-header></app-header>

<main style="padding: 20px;">
  <router-outlet></router-outlet>
</main>
```

---

## ✅ Expected Outcomes & Verification Checklist

- [x] Angular CLI v20 workspace successfully scaffolded without errors.
- [x] Application successfully boots on `http://localhost:4200` via `ng serve`.
- [x] All 8 core configuration files documented in `notes.txt`.
- [x] Production build generated via `ng build` with bundle inspection inside `dist/`.
- [x] `angular.json` build budgets analyzed and documented.
- [x] Layout components (`Header`) and page views (`Home`, `CourseList`, `StudentProfile`) created and registered.
- [x] Header navigation and home page dashboard rendered in the browser.
