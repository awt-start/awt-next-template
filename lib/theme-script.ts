/**
 * 主题初始化脚本工具函数
 * 用于在服务端生成主题初始化脚本，防止主题闪烁
 */

/**
 * 获取主题初始化脚本
 * 这个函数可以在服务端调用，用于在 HTML head 中内联执行
 */
export function getThemeScript(): string {
  const script = `
    (function() {
      function getStoredTheme() {
        try {
          return localStorage.getItem('theme-preference');
        } catch (e) {
          return null;
        }
      }
      
      function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      function applyTheme(theme) {
        const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;
        if (resolvedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      const theme = getStoredTheme() || 'system';
      applyTheme(theme);
    })();
  `;

  return script.trim();
}
