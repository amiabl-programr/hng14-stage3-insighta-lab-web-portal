let csrfToken = '';

export function getCsrfToken(): string {
  return csrfToken;
}

export function setCsrfToken(token: string): void {
  csrfToken = token;
}

export async function bootstrapCsrf(): Promise<void> {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/csrf-token`, {
      credentials: 'include',
    });
    const data = await res.json();
    csrfToken = data.token;
  } catch {
    csrfToken = '';
  }
}
