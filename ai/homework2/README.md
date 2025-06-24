# React JSONPlaceholder Dashboard

A modern, responsive dashboard for exploring and managing JSONPlaceholder data (users, posts, todos) with Material UI and Tailwind CSS.

## Features
- **User Management**: View, filter, and delete users. Modal with full user details, posts, and todos.
- **Posts**: Table of posts, filter by user, modal with post details and comments, delete posts (client-side).
- **Todos**: Table of todos, filter by user, modal with todo details, delete todos (client-side).
- **Tabs**: Switch between Users, Posts, and Todos.
- **Responsive Design**: Mobile-first, adaptive tables and modals.
- **Material UI + Tailwind CSS**: Modern UI, utility-first styling.
- **Client-side Filtering**: Instantly filter posts/todos by user.
- **API**: Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for all data.

## Quick Start

### 1. Install dependencies
```bash
npm install
# or
yarn install
```

### 2. Start development server
```bash
npm run dev
# or
yarn dev
```

App will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

## Project Structure
```
src/
  App.tsx                # Main app with tab navigation
  main.tsx               # Entry point
  components/
    user-management/     # User management UI (table, modal, details)
    posts-management.tsx # Posts table, modal, comments
    todos-management.tsx # Todos table, modal
    store/               # Redux store and slices
  index.css, theme.css   # Tailwind and theme styles
```

## Main Components
- **UserManagement**: Table of users, modal with details, posts, todos, navigation to filtered posts/todos.
- **PostsManagement**: Table of posts, filter by user, modal with comments, delete.
- **TodosManagement**: Table of todos, filter by user, modal, delete.

## Technologies
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)

## Extending
- Add new tabs for Albums, Photos, Comments by following the pattern in `src/components/`.
- Use the JSONPlaceholder API for more endpoints.
- Add more filters, sorting, or relations as needed.

## License
MIT

## Author
Your Name (replace with your contact)