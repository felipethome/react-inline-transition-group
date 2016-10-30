var OFF = 0;
var WARNING = 1;
var ERROR = 2;

module.exports = {
  'parser': 'babel-eslint',

  'env': {
    'browser': true,
    'node': true,
    'jest': true,
  },

  'ecmaFeatures': {
    'jsx': true,
    'modules': true,
  },

  'extends': 'eslint:recommended',

  'plugins': [
    'react',
  ],

  'globals': {
    'Promise': true,
  },

  'rules': {
    'brace-style': [ERROR, 'stroustrup', { 'allowSingleLine': true }],
    'comma-dangle': [ERROR, 'always-multiline'],
    'comma-spacing': [ERROR, {'before': false, 'after': true}],
    'id-length': [ERROR, {'min': 2, 'exceptions': ['i', 'j', 'k']}],
    'indent': [ERROR, 2, {'SwitchCase': WARNING}],
    'key-spacing': [ERROR, {'beforeColon': false, 'afterColon': true}],
    'max-len': [ERROR, 80, 4, {'ignoreUrls': true}],
    'new-cap': [ERROR, {'newIsCap': true, 'capIsNew': true}],
    'no-cond-assign': ERROR,
    'no-console': [ERROR, {'allow': ['warn', 'error']}],
    'no-dupe-keys': ERROR,
    'no-dupe-args': ERROR,
    'no-multiple-empty-lines': ERROR,
    'no-trailing-spaces': ERROR,
    'no-undef': ERROR,
    'no-unreachable': ERROR,
    'no-unused-expressions': ERROR,
    'no-unused-vars': ERROR,
    'object-curly-spacing': [ERROR, 'never'],
    'object-shorthand': OFF,
    'one-var': [ERROR, 'never'],
    'quotes': [ERROR, 'single', 'avoid-escape'],
    'semi': ERROR,
    'space-before-blocks': [ERROR, 'always'],
    'space-before-function-paren': [
      ERROR, {'anonymous': 'always', 'named': 'never'}
    ],
    'space-infix-ops': ERROR,
    'space-unary-ops': [ERROR, {'words': true, 'nonwords': false}],

    // ES6
    'constructor-super': OFF,
    'no-const-assign': OFF,
    'no-var': OFF,
    'object-shorthand': OFF,
    'prefer-arrow-callback': OFF,
    'prefer-const': [OFF, {'destructuring': 'any'}],
    'prefer-template': OFF,

    // React
    'jsx-quotes': [ERROR, 'prefer-double'],
    'react/display-name': ERROR,
    'react/jsx-boolean-value': ERROR,
    'react/jsx-closing-bracket-location': ERROR,
    'react/jsx-curly-spacing': ERROR,
    'react/jsx-handler-names': [
      ERROR,
      {'eventHandlerPrefix': '_?handle', 'eventHandlerPropPrefix': 'on'},
    ],
    'react/jsx-indent-props': OFF,
    'react/jsx-indent': [ERROR, ERROR],
    'react/jsx-key': ERROR,
    'react/jsx-max-props-per-line': [ERROR, {'maximum': 3}],
    'react/jsx-no-duplicate-props': ERROR,
    'react/jsx-no-undef': ERROR,
    'react/sort-prop-types': ERROR,
    'react/jsx-uses-react': WARNING,
    'react/jsx-uses-vars': WARNING,
    'react/jsx-wrap-multilines': [
      ERROR,
      {'declaration': true, 'assignment': true, 'return': true},
    ],
    'react/no-danger': ERROR,
    'react/no-deprecated': ERROR,
    'react/no-did-update-set-state': ERROR,
    'react/no-direct-mutation-state': ERROR,
    'react/no-multi-comp': ERROR,
    'react/no-string-refs': ERROR,
    'react/no-unknown-property': ERROR,
    'react/prop-types': ERROR,
    'react/self-closing-comp': ERROR,
    'react/sort-comp': ERROR,
  },
};