const isProductionEnv = process.env.NODE_ENV === "production";

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "airbnb-base"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": isProductionEnv ? "warn" : "off",
    "no-debugger": isProductionEnv ? "warn" : "off"
  }
};
