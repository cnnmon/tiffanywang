// Markdown preloader utility for optimized content loading
class MarkdownPreloader {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
  }

  // Preload all markdown files at app start
  async preloadAll() {
    const markdownFiles = [
      '/text/about.md',
      '/text/home.md'
    ];

    const promises = markdownFiles.map(file => this.preload(file));
    await Promise.all(promises);
  }

  // Preload a specific markdown file
  async preload(file) {
    if (this.cache.has(file) || this.loading.has(file)) {
      return this.loading.get(file) || Promise.resolve(this.cache.get(file));
    }

    const promise = fetch(file)
      .then(res => res.text())
      .then(text => {
        this.cache.set(file, text);
        this.loading.delete(file);
        return text;
      })
      .catch(error => {
        console.error(`Failed to preload markdown file: ${file}`, error);
        this.loading.delete(file);
        return '';
      });

    this.loading.set(file, promise);
    return promise;
  }

  // Get preloaded content (synchronous)
  getContent(file) {
    return this.cache.get(file) || '';
  }

  // Get content with fallback to fetch if not preloaded
  async getContentAsync(file) {
    if (this.cache.has(file)) {
      return this.cache.get(file);
    }
    return this.preload(file);
  }

  // Check if content is preloaded
  isPreloaded(file) {
    return this.cache.has(file);
  }
}

// Create singleton instance
const markdownPreloader = new MarkdownPreloader();

export default markdownPreloader;
