export const setLastVisit = (req, res, next) => {
  // 1.if cookie is set then add a last visit time date.
//   console.log(req.cookies.lastVisit);
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    // console.log(res.locals.lastVisit, "***");
  }
//   } else {
//     console.log(res.locals.lastVisit, "###");
//   }
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
};
