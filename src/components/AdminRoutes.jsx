import { match } from "path-to-regexp";

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
 * @param {string} path 
 * @param {string[]} routes 
 * @returns {boolean} 
 */
export const isAdminRoute = (path, routes) => {
  return routes.some((route) => {
    const matcher = match(route, { decode: decodeURIComponent });
    return !!matcher(path);
  });
};
