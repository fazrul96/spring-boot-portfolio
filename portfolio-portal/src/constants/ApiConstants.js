//export const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
//export const API_AUTH_URL = `${API_BASE_URL}/auth`;
//export const API_V1 = `${API_BASE_URL}/api/v1`;

export const API_AUTHORIZATION_PATH = "/api/v1/auth";
export const API_PUBLIC_PATH = "/api/v1/public";
export const API_PRIVATE_PATH = "/api/v1/private";

export const API_BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_PRIVATE_URL = process.env.REACT_APP_API_PRIVATE_URL;
export const API_PUBLIC_URL = process.env.REACT_APP_API_PUBLIC_URL;

export const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;

export const AUTH0_SCOPE_READ_ITEMS = 'read:items';
export const AUTH0_PROMPT = 'consent';