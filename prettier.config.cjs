const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  tailwindConfig: './tailwind.config.cjs',
  tailwindFunctions: ['clsx'],
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
