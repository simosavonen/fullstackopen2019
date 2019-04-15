## write down commands
1. git clone url, npm install, npm start
2. npm install --save prop-types
3. npm add --save-dev eslint-plugin-jest
4. npm install --save-dev react-testing-library jest-dom

Getting ESLint to work on Windows machine took some trying.
It kept giving errors about the eslint-react-plugin.

Fixing involved
- removing the globally installed eslint
- deleting node_modules folder, which was problematic too
- adding the correct version of eslint to dependencies, maybe not needed
- adding settings > react > version > detect to .eslintrc.js
- npm install
- follow the course instructions