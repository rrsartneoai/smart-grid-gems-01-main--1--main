### Prerequisites

*   **Bun:** You need Bun installed on your system. If you don't have it yet, follow the installation guide on the [official Bun website](https://bun.sh/docs/installation).

    You can typically install it using:

    ```bash
    curl -fsSL https://bun.sh/install | bash
    ```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository_url]
    cd [project_directory]
    ```
2.  **Install Bun:**
    This project relies on `bun` as a package manager, so you might need to install `bun` globally to your local env or update to the latest version.

    ```bash
    npm i -g bun
    ```
   
    Alternatively, you can use the bun install command:

    ```bash
    bun install
    ```
    **Note:** You can install this globally to use bun commands as a cli tool.
3.  **Install dependencies:**
    ```bash
    npm i
    ```
    or if you want to use bun's install:
    ```bash
    bun install
    ```
    This will install the project's dependencies listed in `package.json`.

### Running the Development Server

To start the development server, use the following command:

```bash
bun run dev
```

Contributing:
After you've cloned the repository, please stick to the following flow:

Create a new branch for your changes:

git checkout -b feature-name
Make your changes, then stage and commit them:

git add .
git commit -m "Description of changes"
Push your branch to the remote repository:

git push origin feature-name
Create a Pull Request: Go to the GitHub repository, create a pull request from your branch, and after approval merge using squash and merge option.
