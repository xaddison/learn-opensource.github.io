import { get } from "../constant.js";

const organization = {
  _reposUrl: "https://api.github.com/orgs/learn-opensource/repos",
};
// fetching the issues for learn-opensource

const htmlIssuesCard = ({
  repository_url: repo,
  title,
  comments,
  html_url: url,
  body,
  labels,
}) => {
  if (url && url.split("/").slice(-2)[0] !== "pull") {
    return `
   <div class="col-md-4 m-3 card border-0 shadow p-0">
            <div
              class="card-image"
              style="
                background-image: url(https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-dark-purple-minimalistic-gradient-banner-background-image_223093.jpg);
              "
            >
              <!-- Content -->
              <a href="https://github.com/${
                repo && repo.split("/").slice(-2).join("/")
              }" class="text-decoration-none">
                <h3 class="card-title p-3 text-white m-0">${repo
                  .split("/")
                  .pop()}</h3>
              </a>
            </div>
            <div class="card-body white">
              <div
                class="text-white d-flex align-items-center justify-content-between"
              >
                <h4 class="text-main">
                  <a href=${url}>${title}</a>
                </h4>
                <i class="fa fa-comments text-dark"
                  ><span class="pl-3">${comments}</span></i
                >
              </div>
              <p class="text-muted" align="justify">
               ${body && body.substring(0, Math.min(150, body.length))}
              </p>
              <div>

              ${
                (labels &&
                  labels.length > 0 &&
                  labels
                    .map(
                      ({
                        color,
                        name,
                      }) => `<span class="badge badge-pill p-2 m-1" style="background:#${color};color:#fff;"
              >${name}</span
            >`
                    )
                    .join("")) ||
                ""
              }


              </div>
            </div>
          </div>
  `;
  } else {
    return "";
  }
};

// html loader
const htmlLoader = () => {
  const mainContainer = document.getElementById("issueCardContainer");
  const markup = `
  <div class="loader">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>

  `;
  mainContainer.insertAdjacentHTML("afterbegin", markup);
};

// function to clear ui
const clearUi = () => {
  const mainContainer = document.getElementById("issueCardContainer");
  mainContainer.innerHTML = "";
};

// get request to fetching the issues

export const getRepoIssues = async () => {
  const mainContainer = document.getElementById("issueCardContainer");

  htmlLoader();
  try {
    const repoList = await get(organization._reposUrl);
    console.log(repoList);
    const arrayOfFetchingIssue = repoList.map(
      ({ has_issues, issues_url, html_url, name }) => {
        if (has_issues) {
          if (issues_url) {
            return get(issues_url.split("{")[0]);
          }
        }
      }
    );

    const issuesData = await Promise.all(arrayOfFetchingIssue);
    console.log(issuesData);
    clearUi();

    issuesData.flat().forEach((issue) => {
      const card = htmlIssuesCard(issue);
      mainContainer.innerHTML += card;
    });
    // console.log(issues);
  } catch (err) {
    clearUi();
    console.log("error", err);
  }
};
