# Therosessom WordPress Theme

A modern, responsive WordPress theme built for photographers and creative professionals.

## Features

- 🎨 **Modern Design** - Clean, photography-focused layout
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🎯 **SEO Optimized** - Clean markup and semantic HTML
- 🔧 **ACF Pro Support** - Advanced custom fields integration
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📖 **Accessibility Ready** - WCAG compliant navigation and markup

## Requirements

- WordPress 5.9+
- PHP 8.0+
- Node.js 16+
- ACF Pro (recommended)

## Installation

1. **Download and Install**
   ```bash
   cd wp-content/themes/
   git clone [repository-url] therosessom
   cd therosessom
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development Setup**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` for development with hot reload.

4. **Production Build**
   ```bash
   npm run build
   ```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint:js` | Lint JavaScript files |
| `npm run lint:css` | Lint CSS/SCSS files |

## Project Structure

```
therosessom/
├── assets/
│   ├── css/           # SCSS source files
│   ├── js/            # JavaScript modules
│   └── images/        # Theme images
├── template-parts/    # Template partials
├── inc/              # Theme includes
├── dist/             # Built assets (auto-generated)
├── functions.php     # Theme functions
├── style.css         # Theme stylesheet
└── index.php         # Main template
```

## Menu Setup

1. Go to **Appearance → Menus** in WordPress admin
2. Create a new menu
3. Add your pages/links
4. Assign to **"Primary Menu"** location
5. Save menu

## Customization

### Theme Options
- Navigate to **Theme Options** in WordPress admin
- Configure site favicon and other settings

### Custom Fields
- Install ACF Pro for enhanced functionality
- Custom field groups are included for portfolio and content management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This theme is licensed under the GPL v2 or later.

## Support

For support, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for photographers and creative professionals**