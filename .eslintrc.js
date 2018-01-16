const eslintrc = {
  "extends": ["eslint-config-cetitife"], // including these options
  // "parser": "babel-eslint",
  // "env": {
  //   "browser": true,
  //   "node": true,
  //   "commonjs": true,
  //   "es6": true,
  // },
  // "parserOptions": {
  //   "sourceType": "module",
  //   "ecmaVersion": 6,
  //   "ecmaFeatures": {
  //     "jsx": true,
  //     "experimentalObjectRestSpread": true, //允许对象的解构赋值
  //   },
  // },
  "rules": {
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link", "NavLink"],
      "specialLink": ["to"]
    }] // fix react-router component <Link to="/path"> error
  }
};
module.exports = eslintrc;
