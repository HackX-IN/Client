> 25 - Nov - 2022


# Client Site Dependencies...

|No| Package Installs           | Use for                                       |
|--|----------------------------|-----------------------------------------------|
|1 | yarn add `react-redux`     | Official React bindings for Redux             |
|2 | yarn add `@reduxjs/toolkit`| tool-set for efficient Redux development      |
|3 | yarn add `redux-persist`   | persist and rehydrate redux stores            |
|4 | yarn add `@mui/icons-material`| Icons distributed as SVG React components  |
|5 | yarn add `@mui/material`   | Components that implement M. Design           |
|6 | yarn add `@emotion/react`  | Simple styling in React                       |
|7 | yarn add `@emotion/styled` | styled API for emotion                        |
|8 | yarn add `dotenv`          | Loads environment variables from .env file    |
|9 | yarn add `react-dropzone`  | Simple HTML5 drag-drop zone with React.js     |
|10| yarn add `react-router-dom`| Declarative routing for React web app         |
|11| yarn add `react-toastify`  | add notifications                             |
|12| yarn add `formik`          | Build forms in React, without the tears       |
|13| yarn add `yup`             | Simple Object schema validation               |
|14| yarn add `axios`           | Promise based HTTP req & res                  |


<br />

# File / Folder short info...
|No| File / Folder | Usage of...                                |
|--|---------------|--------------------------------------------|
|1 | index         | basic config for react + redux store       |
|2 | App.js        | total app routing + auth + theme setup     |
|3 | components    | all reusable ui components...              |
|4 | api          | all REST API request + auth token add in request header |
|5 | pages         | pages/ui for different URL accessing       |
|6 | redux         | global state data available here accessing |
|7 | styles        | UI level custom css + theme configuration  |

<br />

**.env**

```js
REACT_APP_SERVER_URL = http://localhost:3001/
```


## Leaning Context
* REST API call from a single js file.
* Basic architecture of frontend web application.
* Redux toolkit integration with many different slices.
* Access redux store from non react components or vanilla js files.
* Inside `.env` file variables must start with `REACT_APP_`, then its work.

## File & Folder hierarchy 
```
🟨
src
├── api
|   └── index.js
|
├── components
|   ├── FlexBetween.jsx
|   ├── Friend.jsx
|   ├── UserImage.jsx
|   └── WidgetWrapper.jsx
|
├── pages
|   ├── loginPage
|   |   ├── Form.jsx
|   |   ├── index.jsx
|   |   └── value&validation.js
|   |
|   ├── widgets
|   |   ├── Advert.jsx
|   |   ├── DeletePostDialog.jsx
|   |   ├── FriendList.jsx
|   |   ├── index.js
|   |   ├── NewPostCreate.jsx
|   |   ├── PostsContainer.jsx
|   |   ├── SinglePost.jsx
|   |   └── UserInfo.jsx
|   |
|   ├── HomePage.jsx
|   ├── Navbar.jsx
|   └── UserProfilePage.jsx
|
├── redux
|   ├──features
|   |  ├── authSlice.js
|   |  ├── postSlice.js
|   |  └── themeSlice.js
|   |
|   ├── index.js
|   └── rootReducer.js
|
├── styles
|   ├── index.css
|   └── theme.js
|
├── App.jsx
└── index.js
🟨
```


<br />

## Frontend Component Tree Structure...
<img src="./public/appTree.png" />



<br />

## ReactJs | Frontend Basic Data Flow...
<img src="./public/frontendDataFlow.png" />