export function buildQueryString(params) {
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `${queryString}` : '';
  }