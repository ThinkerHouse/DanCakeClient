export function isURL(str) {
    // Regular expression for a simple URL validation
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    
    return urlRegex.test(str);
  }