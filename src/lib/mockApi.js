/**
 * Mock API backend for local development & demonstration
 */

let mockSession = {
  active: false,
  userName: '',
  loginTime: null,
  durationSeconds: 3600,
  bytesIn: 1425000,
  bytesOut: 8520000,
};

export async function mockAuthenticate(credentials) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Voucher validation simulation
  if (credentials.voucher) {
    const code = credentials.voucher.trim().toUpperCase();
    if (code === 'EXPIRED' || code === 'INVALID') {
      return {
        success: false,
        error: 'The entered voucher code is invalid or has expired.',
      };
    }
    mockSession = {
      active: true,
      userName: `Voucher (${code})`,
      loginTime: Date.now(),
      durationSeconds: 7200, // 2 hours voucher
      bytesIn: 0,
      bytesOut: 0,
    };
    return {
      success: true,
      redirectUrl: 'https://google.com',
      message: 'Voucher activated successfully!',
    };
  }

  // Guest simulation
  if (credentials.isGuest) {
    mockSession = {
      active: true,
      userName: 'Guest User (Free Wi-Fi)',
      loginTime: Date.now(),
      durationSeconds: 1800, // 30 min free access
      bytesIn: 0,
      bytesOut: 0,
    };
    return {
      success: true,
      redirectUrl: 'https://google.com',
      message: 'Connected to Guest Network.',
    };
  }

  // Username/Password simulation
  if (credentials.user === 'admin' && credentials.password === 'wrong') {
    return {
      success: false,
      error: 'Invalid username or password.',
    };
  }

  mockSession = {
    active: true,
    userName: credentials.user || 'Authenticated User',
    loginTime: Date.now(),
    durationSeconds: 14400, // 4 hours
    bytesIn: 240000,
    bytesOut: 1200000,
  };

  return {
    success: true,
    redirectUrl: 'https://google.com',
    message: 'Login successful!',
  };
}

export async function mockLogout() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  mockSession.active = false;
  return { success: true };
}

export async function mockStatus() {
  if (!mockSession.active) {
    return { authorized: false };
  }

  const elapsedSeconds = Math.floor((Date.now() - mockSession.loginTime) / 1000);
  const remainingSeconds = Math.max(0, mockSession.durationSeconds - elapsedSeconds);

  return {
    authorized: true,
    user: mockSession.userName,
    sessionTimeout: remainingSeconds,
    bytesIn: mockSession.bytesIn + Math.floor(Math.random() * 50000),
    bytesOut: mockSession.bytesOut + Math.floor(Math.random() * 200000),
    ip: '192.168.1.105',
    mac: 'AA:BB:CC:DD:EE:FF',
  };
}
