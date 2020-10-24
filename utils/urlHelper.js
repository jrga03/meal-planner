export function createLoginUrl(redirectTo) {
  if (redirectTo) {
    return `/api/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`;
  }
  return `/api/auth/login`;
}

export function createAddRecipeUrl(url) {
  if (url) {
    return `/recipe/add?importUrl=${encodeURIComponent(url)}`;
  }
  return `/recipe/add`;
}
