const ROOT_URL = "https://mighty-oasis-08080.herokuapp.com/api/";
const articlesURL = ROOT_URL +"articles";
const tagsURL = ROOT_URL + "tags";
const articleURL = articlesURL + "/:slug";
<<<<<<< Updated upstream
export { ROOT_URL, articlesURL, tagsURL, articleURL }
=======
const signupURL = ROOT_URL + "users";
const loginURL = ROOT_URL + "users/login";
const localStorageKey = "blog_user";
const userVerifyURL = ROOT_URL + "user";
const userURL = ROOT_URL+"user";
const newArticle = ROOT_URL+"articles";
const profileURL = ROOT_URL+"profiles/";
export {
  ROOT_URL,
  articlesURL,
  tagsURL,
  signupURL,
  loginURL,
  articleURL,
  localStorageKey,
  userVerifyURL,
  newArticle,
  userURL,
  profileURL
};
>>>>>>> Stashed changes
