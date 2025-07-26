import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

// ESM equivalent of __dirname
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Entry points for assets
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'assets/js/main.js'),
        admin: resolve(__dirname, 'assets/js/admin.js'),
        style: resolve(__dirname, 'assets/css/style.scss')
      },
      output: {
        // Generate assets in dist folder with proper naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          
          if (/\.(css|scss)$/.test(assetInfo.name)) {
            return `css/[name]-[hash].${extType}`;
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${extType}`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash].${extType}`;
          }
          return `assets/[name]-[hash].${extType}`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      }
    },
    outDir: 'dist',
    manifest: true, // Generate manifest.json for WordPress integration
    sourcemap: process.env.NODE_ENV === 'development',
    // Clean dist folder before build
    emptyOutDir: true
  },
  
  // CSS processing
  css: {
    preprocessorOptions: {
      scss: {
        // Make variables available globally
        additionalData: `@import "${resolve(__dirname, 'assets/css/variables.scss')}";`
      }
    },
    postcss: './postcss.config.js'
  },
  
  // Development server configuration
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 10024,
    strictPort: true,
    
    // Proxy to WordPress development site
    proxy: {
      // Change this to your local WordPress URL
      '/': {
        target: 'http://jiography.local/', 
        secure: false,
        configure: (proxy, options) => {
          // Handle WordPress-specific routing
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err);
          });
        }
      }
    },
    
    // CORS configuration for WordPress
    cors: {
      origin: ['http://jiography.local/'], 
      credentials: true
    }
  },
  
  // Plugin configuration
  plugins: [
    // Handle favicon to prevent 404 errors
    {
      name: 'handle-favicon',
      configureServer(server) {
        server.middlewares.use('/favicon.ico', (req, res, next) => {
          res.statusCode = 204; // No Content
          res.end();
        });
      }
    }
  ],
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'assets'),
      '@css': resolve(__dirname, 'assets/css'),
      '@js': resolve(__dirname, 'assets/js'),
      '@images': resolve(__dirname, 'assets/images')
    }
  },
  
  // Define global variables
  define: {
    __DEV__: process.env.NODE_ENV === 'development'
  }
});