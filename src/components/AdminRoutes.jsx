import { match } from "path-to-regexp";

// List of Admin-specific routes
export const adminRoutes = [
  "/admin",
  "/admin/users",
  "/admin/addedituser",
  "/admin/addedituser/:id",
  "/admin/branches",
  "/admin/viewbranchdetail/:id",
  "/admin/addeditbranch",
  "/admin/addeditbranch/:id",
  "/admin/colleges",
  "/admin/collegedetails/:id",
  "/admin/addeditcollege",
  "/admin/addeditcollege/:id",
  "/admin/country",
  "/admin/addeditcountry",
  "/admin/addeditcountry/:id",
  "/admin/state",
  "/admin/addeditstate",
  "/admin/addeditstate/:id",
  "/admin/city",
  "/admin/addeditcity",
  "/admin/addeditcity/:id",
  "/admin/courses",
  "/admin/addeditcourse",
  "/admin/addeditcourse/:id",
  "/admin/collegecourse",
  "/admin/addeditcollegecourse",
  "/admin/addeditcollegecourse/:id",
  "/admin/collegecoursedetails/:id",
  "/admin/dashboard",
];

/**
 * Check if the current route matches any of the admin routes.
 * @param {string} path - The current route path.
 * @param {string[]} routes - The list of admin routes.
 * @returns {boolean} - True if the route matches any admin route, false otherwise.
 */
export const isAdminRoute = (path, routes) => {
  return routes.some((route) => {
    const matcher = match(route, { decode: decodeURIComponent });
    return !!matcher(path);
  });
};
