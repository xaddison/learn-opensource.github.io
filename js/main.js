import { get_organization_contributors } from "./controller/contributors.js";
import { get_organization_repos } from "./controller/repos.js";
import { getRepoIssues } from "./controller/getReposIssues.js";

if (window.location.pathname.slice(1) === "issues.html") {
  getRepoIssues();
} else {
  get_organization_repos();
  get_organization_contributors();
}
