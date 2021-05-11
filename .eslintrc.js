// Copyright 2017-2021 @paritytech/canvas-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

// const base = require('@polkadot/dev/config/eslint.cjs');

module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "plugins": [
    "only-warn",
    "import",
    "@typescript-eslint",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks"
  ],
  "overrides": [
    {
      "files": ["*.tsx", "*.js", "*.jsx", "*.ts"],
      "rules": {
        "no-undef": "off"
      }
    }
  ],
  "settings": {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "import/named": "warn",
    "import/no-unresolved": "warn",
    "import/default": "warn",
    "import/no-absolute-path": "error",
    "import/no-self-import": "error",
    "import/no-cycle": "error",
    "import/no-useless-path-segments": "warn",
    "import/no-named-as-default": "warn",
    "import/no-named-as-default-member": "warn",
    "import/no-deprecated": "warn",
    "import/no-mutable-exports": "warn",
    "import/first": "warn",
    "import/exports-last": "warn",
    "import/no-duplicates": "warn",
    "import/order": "warn",
    "import/newline-after-import": "warn",
    "@typescript-eslint/restrict-template-expressions": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/display-name": "off"
  }
};
