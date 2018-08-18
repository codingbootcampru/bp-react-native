module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "react-native"
  ],
  "ecmaFeatures": {
    "jsx": true
  },
  "env": {
    "react-native/react-native": true
  },
  "rules": {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 1,
    "react-native/no-color-literals": 1,
    "object-curly-spacing": ["error", "always"],
    "semi": 2
  }
};
