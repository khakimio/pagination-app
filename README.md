# Pagination Component with React, TypeScript, SCSS, Testing-library

This project demonstrates a reusable and customizable pagination component using React, TypeScript, and SCSS. It includes a pagination logic encapsulated in a custom hook, and the logic itself is abstracted into an Object-Oriented Programming (OOP) class. The component is covered by automated tests using @testing-library/react to ensure reliability and correct functionality

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/khakimio/pagination-app.git
   cd pagination-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run start
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Test:**

   ```bash
   npm run test
   ```

## Usage

**Customize the component:**

The `Pagination` component supports the following props:

- **`totalItems`**: Total number of items.
- **`itemsPerPage`**: Number of items to display per page.
- **`isCircular`**: If `true`, enables circular pagination.

```tsx
<Pagination totalItems={200} itemsPerPage={20} isCircular={false} />
```

## Features

- **Separate pagination logic**: The pagination logic is encapsulated in a custom hook (`usePagination`) and OOP class (`PaginationController`).
- **Supports circular and standard pagination**.
- **Keyboard focus management**: Manage keyboard navigation using the `aria` attributes.
