import js from '@eslint/js';

export default [
  // Basic ESLint recommended rules
  js.configs.recommended,
  
  {
    files: ['assets/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        
        // WordPress globals
        jQuery: 'readonly',
        $: 'readonly',
        wp: 'readonly',
        
        // Common library globals
        Swiper: 'readonly',
        AOS: 'readonly',
        gsap: 'readonly',
        lozad: 'readonly'
      }
    },
    rules: {
      // Error prevention
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }],
      'no-undef': 'error',
      'no-redeclare': 'error',
      
      // Best practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      
      // Style consistency
      'indent': ['error', 2],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      
      // Modern JavaScript
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'arrow-spacing': 'error',
      'template-curly-spacing': 'error'
    }
  },
  
  // Admin JS files (if any)
  {
    files: ['assets/js/admin/**/*.js'],
    languageOptions: {
      globals: {
        // Additional WordPress admin globals
        ajaxurl: 'readonly',
        pagenow: 'readonly',
        adminpage: 'readonly'
      }
    }
  },
  
  // Ignore patterns
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      'vendor/**/*',
      '*.min.js'
    ]
  }
];