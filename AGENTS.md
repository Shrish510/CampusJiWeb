This repository contains the frontend code for the CampusJi web application, a portal for students at IIM Rohtak.

## Development Guidelines

### Code Structure

*   **HTML**: All HTML files are in the root directory.
*   **CSS**: All stylesheets are in the `css/` directory.
*   **JavaScript**: All JavaScript files are in the `js/` directory.

### JavaScript Best Practices

*   **No Hardcoded Keys**: Do not hardcode API keys or other sensitive credentials directly in the source code. Use a `.env` file for local development and environment variables for production.
*   **Modular Code**: Keep JavaScript code modular. Create separate files for different functionalities (e.g., `auth.js` for authentication, `api.js` for API interactions, `ui.js` for UI manipulations).
*   **Shared Functionality**: Reusable functions, such as header loading or utility functions, should be placed in a `js/common.js` file and included in all relevant pages.
*   **No Inline Scripts**: Avoid writing JavaScript code inside `<script>` tags directly in HTML files. All JavaScript should be in external `.js` files.

### HTML Best Practices

*   **File Naming**: Use lowercase letters and hyphens (`-`) for file and directory names (e.g., `about-us.html` instead of `about.html`).
*   **Reusable Components**: Use JavaScript to load reusable HTML components like headers and footers to avoid code duplication.

### Authentication

The current authentication mechanism using `localStorage` is for demonstration purposes only and is not secure. For a production environment, this should be replaced with a proper token-based authentication system (e.g., JWTs) handled by a secure backend.

### Dependencies

This project uses Supabase for its backend. Ensure you have the correct Supabase URL and anonymous key set up in your local `.env` file.

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

To run this project, you will need a local web server to serve the files. You can use any simple server, like Python's `http.server` or the Live Server extension in VS Code.
