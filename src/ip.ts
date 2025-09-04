export const ip = (headers: Headers) => {
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0]; // 获取第一个 IP 地址
  }

  // 在本地开发时可能没有 `x-forwarded-for`，此时可以使用 `req.ip` 获取 IP 地址
  return headers.get('x-real-ip') || '127.0.0.1';
};
