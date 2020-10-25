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

export function createApiImportRecipeUrl(url) {
  if (url) {
    return `/api/recipe/import?url=${encodeURIComponent(url)}`;
  }
  return `/api/recipe/import`;
}
