/**
 * Type-safe route definitions
 */
export const routes = {
  home: '/',
  docs: '/docs',
  features: '/features',
  about: '/about',
  posts: '/posts'
} as const;

type RouteKeys = keyof typeof routes;
export type Route = (typeof routes)[RouteKeys];

// Type guard to check if a string is a valid route
export function isValidRoute(route: string): route is Route {
  return Object.values(routes).includes(route as Route);
}