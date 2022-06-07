const ROOT_URL = "https://mighty-oasis-08080.herokuapp.com/api/";
const articlesURL = ROOT_URL + "articles";
const tagsURL = ROOT_URL + "tags";
const articleURL = articlesURL + "/:slug";
const signupURL = ROOT_URL + "users";
const loginURL = ROOT_URL + "users/login";
const localStorageKey = "blog_user";
const userVerifyURL = ROOT_URL + "user";
const newArticle = ROOT_URL+"articles";
export {
  ROOT_URL,
  articlesURL,
  tagsURL,
  signupURL,
  loginURL,
  articleURL,
  localStorageKey,
  userVerifyURL,
  newArticle
};
