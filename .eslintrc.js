const eslintrc = {
  "extends": ["eslint-config-cetitife"],
  "rules": {
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link", "NavLink"],
      "specialLink": ["to"]
    }] // fix react-router component <Link to="/path"> error
  }
};
module.exports = eslintrc;
