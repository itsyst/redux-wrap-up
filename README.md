# Bug Tracker - React Redux Application

![Bug Tracker Layout](https://example.com/path-to-your-screenshot.png)

A **Bug Tracker** application built with React, Redux, and TypeScript. This application allows users to track, manage, and resolve bugs efficiently. It includes features like adding bugs, editing bug details, assigning users, and reordering bugs using drag-and-drop functionality.

---

## Features

- **Add Bugs**: Add new bugs with details like description, severity, priority, tags, and more.
- **Edit Bugs**: Edit existing bugs to update their status, assigned user, or other details.
- **Assign Users**: Assign bugs to specific users from a list of available users.
- **Drag-and-Drop**: Reorder bugs using drag-and-drop functionality.
- **Persistent State**: Bug order and details are persisted in `localStorage`.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

---

## Table Layout

The application displays bugs in a table with the following columns:

| **Assigned User** | **Severity** | **Description**       | **Priority** | **Tags**          | **Status** | **Reported At** | **Actions** |
|-------------------|--------------|-----------------------|--------------|-------------------|------------|-----------------|-------------|
| Leanne Graham     | Major        | Firend button issue   | High         | Ui, Critical      | Resolved   | 2025-01-01      | Edit, Delete|
| Unknown User      | Minor        | CSS styling glitch    | Low          | Ui, Styling       | Pending    | 2025-01-15      | Edit, Delete|
| Chiskey Deirich   | Major        | Password email issue  | High         | Auth, Email       | Pending    | 2025-01-07      | Edit, Delete|
| ...               | ...          | ...                   | ...          | ...               | ...        | ...             | ...         |

---

## Folder Structure

The project is organized into the following folders for better maintainability:
```
src/
├── common/ # Reusable components (e.g., EditableSelect, EditableCell, ActionButtons)
├── bugs/ # Bug-specific components (e.g., BugList, BugRow, BugAdd)
├── store/ # Redux store, slices, and selectors
├── components/ # General components (e.g., Spinner, Header)
├── utils/ # Utility functions (e.g., caching, helpers)
├── App.tsx # Main application component
├── index.tsx # Entry point
└── README.md # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itsyst/redux-wrap-up.git

2. Navigate to the project directory:
   ```bash
   redux-wrap-up

3. Install dependencies:
   ```bash
   npm install

4. Start the development server:
  ```bash
  npm run dev
````

---

### Technologies Used

- **React**: Frontend library for building user interfaces.
- **Redux**: State management for managing application state.
- **TypeScript**: Adds static typing to JavaScript.
- **React Icons**: Provides icons for actions like edit and delete.
- **React Beautiful DnD**: Enables drag-and-drop functionality.
- **Bootstrap**: For responsive and pre-styled components.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Screenshot

Here’s a screenshot of the application in action:

<a href="https://github.com/itsyst/redux-wrap-up">
 <img src="(https://github.com/itsyst/redux-wrap-up/blob/master/src/assets/light-mode.png)" alt="home" border="0"> 
 <img src="(https://github.com/itsyst/redux-wrap-up/blob/master/src/assets/dark-mode.png)" alt="filter" border="0"> 
</a>
