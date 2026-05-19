export function resolveOrdersWsOrigin(): string | null {
  const raw = process.env.BURGER_API_URL;
  if (typeof raw !== 'string' || !raw.trim()) {
    return null;
  }
  try {
    const url = new URL(raw.trim());
    const proto = url.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${proto}//${url.host}`;
  } catch {
    return null;
  }
}

export const getWsOrdersAllUrl = (): string | null => {
  const origin = resolveOrdersWsOrigin();
  return origin ? `${origin}/orders/all` : null;
};

export const getWsUserOrdersUrl = (accessToken: string): string | null => {
  const origin = resolveOrdersWsOrigin();
  if (!origin || !accessToken.trim()) {
    return null;
  }
  const token = accessToken.trim().replace(/^Bearer\s+/i, '');
  return `${origin}/orders?token=${encodeURIComponent(token)}`;
};
