export const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
export const API_PRIVATE_URL = process.env.REACT_APP_API_PRIVATE_URL;
export const API_PUBLIC_URL = process.env.REACT_APP_API_PUBLIC_URL;

export const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;

export const AUTH0_SCOPE_READ_ITEMS = 'read:items';
export const AUTH0_PROMPT = 'consent';

export const BLOGS = 'blogs';
export const CERTIFICATIONS = 'certifications';
export const EDUCATIONS = 'educations';
export const EXPERIENCES = 'experiences';
export const PROJECTS = 'projects';
export const SKILLS = 'skills';