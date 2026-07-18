/**
 * OPNsense Captive Portal API & URL Context Helper
 */

// Parse query string or template placeholders
export function getPortalContext() {
  const params = new URLSearchParams(window.location.search);
  
  // Check if running within OPNsense template or development server
  const isLocalDev = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' || 
                     params.get('mock') === 'true';

  return {
    isLocalDev,
    zone: params.get('zone') || '0',
    redirurl: params.get('redirurl') || 'https://google.com',
    clientIp: params.get('ip') || params.get('client_ip') || '192.168.1.105',
    clientMac: params.get('mac') || params.get('client_mac') || 'AA:BB:CC:DD:EE:FF',
    logoutId: params.get('logout_id') || null,
    errorMessage: params.get('err') || null,
  };
}

/**
 * Authenticate with OPNsense Captive Portal API
 * @param {Object} credentials - { user, password, voucher, isGuest }
 */
export async function authenticate(credentials) {
  const context = getPortalContext();

  if (context.isLocalDev) {
    const { mockAuthenticate } = await import('./mockApi');
    return mockAuthenticate(credentials);
  }

  // Live OPNsense Endpoint call
  const zoneId = context.zone || '0';
  const endpoint = `/api/captiveportal/access/logon/${zoneId}/`;

  let payload = {};
  if (credentials.voucher) {
    payload = {
      user: credentials.voucher.trim(),
      password: '',
    };
  } else if (credentials.isGuest) {
    payload = {
      user: 'guest',
      password: 'guestpassword',
    };
  } else {
    payload = {
      user: credentials.user.trim(),
      password: credentials.password,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.clientState === 'AUTHORIZED') {
      return {
        success: true,
        redirectUrl: data.url || context.redirurl || 'https://google.com',
        data,
      };
    } else {
      return {
        success: false,
        error: data.message || 'Authentication failed. Please check your credentials.',
      };
    }
  } catch (err) {
    console.error('OPNsense logon API failed, falling back to form submission', err);
    // Fallback: trigger HTML form submission to $PORTAL_ACTION$ if fetch fails or CORS issue occurs
    return {
      success: false,
      fallbackForm: true,
      error: 'Network request error. Submitting fallback form...',
      credentials: payload,
    };
  }
}

/**
 * Terminate Session (Logout)
 */
export async function logoutSession() {
  const context = getPortalContext();

  if (context.isLocalDev) {
    const { mockLogout } = await import('./mockApi');
    return mockLogout();
  }

  const zoneId = context.zone || '0';
  const endpoint = `/api/captiveportal/access/logout/${zoneId}/`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    console.error('Logout error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch Session Status
 */
export async function checkSessionStatus() {
  const context = getPortalContext();

  if (context.isLocalDev) {
    const { mockStatus } = await import('./mockApi');
    return mockStatus();
  }

  const zoneId = context.zone || '0';
  const endpoint = `/api/captiveportal/access/status/${zoneId}/`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) return { authorized: false };
    const data = await response.json();
    return {
      authorized: data.clientState === 'AUTHORIZED',
      user: data.userName || 'Guest User',
      sessionTimeout: data.sessionTimeout || 7200, // seconds
      bytesIn: data.bytesIn || 0,
      bytesOut: data.bytesOut || 0,
      ip: data.ip || context.clientIp,
      mac: data.mac || context.clientMac,
    };
  } catch (err) {
    return { authorized: false };
  }
}
