export class CookieHelper {
    static getCookieValue(key: string): string | undefined {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(key + '=')) {
            const valueStartIndex = key.length + 1;
            return cookie.substring(valueStartIndex);
          }
        }
        return undefined;
    }
}
