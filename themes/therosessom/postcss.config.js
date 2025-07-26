export default {
  plugins: {
    // Import CSS files
    'postcss-import': {},
    
    // Tailwind CSS with custom config path
    tailwindcss: {
      config: './tailwind.config.cjs'
    },
    
    // Autoprefixer for vendor prefixes
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie 11'
      ],
      grid: 'autoplace' // Enable CSS Grid prefixes
    },
    
    // CSS optimization for production
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: [
          'default',
          {
            // Remove comments
            discardComments: {
              removeAll: true
            },
            // Normalize whitespace
            normalizeWhitespace: true,
            // Merge rules
            mergeRules: true,
            // Minify selectors
            minifySelectors: true,
            // Minify font values
            minifyFontValues: true,
            // Convert values to shorter equivalents
            convertValues: true,
            // Remove duplicate rules
            discardDuplicates: true,
            // Merge media queries
            mergeMediaQueries: true,
            // Reduce CSS calc() expressions
            calc: true,
            // Optimize background properties
            normalizeUrl: false, // Keep URLs as-is for WordPress
            // Don't remove unused CSS (Tailwind handles this)
            discardUnused: false
          }
        ]
      }
    } : {})
  }
}