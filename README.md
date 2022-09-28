# Repo Ranker

Author: Gregory D. Hardy

This app allows you to browse commits on the default branch for a given public Github organization.

# Running the App

To run the app you will need to generate a [Github personal access token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). The exact permissions you token will need are:

```
repo
read:packages
read:org
read:public_key
read:repo_hook
user
read:discussion
read:enterprise
read:gpg_key
```

1. Create a `.env` file in the root of the project directory
2. Add the `REACT_APP_GITHUB_TOKEN` environment variable to the `.env` file

```
REACT_APP_GITHUB_TOKEN="<YOUR_PERSONAL_ACCESS_TOKEN>"
```

3. Run `npm run start` to launch the development server. The app will start on `http://localhost:3000/`

## Running Tests

Test suites can be excuted by running `npm run test`. Press the `A` key to ensure all suites are executed.

There are three tests:

```
Commits.test.tsx
Repositories.test.tsx
OrganizationControler.test.tsx
```

<font color="red"><b>PLEASE NOTE:</b></font> You must uncomment the line below in order for the tests to run run properly. This line is needed for tests to execute in with `act()` in React 18 but TypeScript does not allow it because it violates the "no explicit any" rule.

```tsx
// OrganizationController.test.tsx

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
```

# What Was Built

The following features where specifically built into this project

- Search functionality returns organization by Github login id
- Repositories ranked by descending stargazer count
- First ten (10) repositories and commits fetched by default
- Commits link to commit details on Github.com
- Paginated record fetching on button click
- GraphQL query result caching to minimize trips to the API server
- Controller unit test and View snapshot samples

## General Design

An `OrganizationController` handles the details of fetching data from the Github API. The `Repositories` and `Commits` views produced by the `ItemFactory` component handles display of the repository and commit information. A `Search` component handles user input.

## Tooling Used

- Create React App
- React Router
- Apollo Client
- Tailwind CSS & UI
- TypeScript
- Jest

### Tooling Choice Considerations

Create React App provided a quick development set up without having to worry about configuration details of Webpack, Babel, and Jest. Apollo Client was chosen for it's convenient GraphQL query caching and merging capabilities. Tailwind CSS & UI was chosen to reduce the time spent on building a functional but beautiful UI. TypeScript was chosen to enforce strict typing and reduce bugs related to ill-constructed interfaces between the app and the GitHub API.

## Areas for Improvements

Given more time, I'd add features like:

- Lazy loading more respositories/commits on scroll.
- Notification auto dismissal

Additionally, I'd address some of the following issues:

- Reduce mixing of concerns, (e.g. there is some View logic that doesn't belong in the `OrganizationController`)
- Handle bad routes more gracefully rather than just rerouting back to home
- Enhance testing suites (e.g. test paginated data fetches)
