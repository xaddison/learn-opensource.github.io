import { get } from "../constant.js";

const repos = {
  _issuesUrl:
    "https://api.github.com/repos/learn-opensource/learn-opensource.github.io/issues",
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
  return `
 <div class="card m-3 border-0 shadow col-md-4 p-0">
          <div
            class="card-image"
            style="
              background-image: url(https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-dark-purple-minimalistic-gradient-banner-background-image_223093.jpg);
            "
          >
            <!-- Content -->
            <a href="https://github.com/${repo
              .split("/")
              .slice(-2)
              .join("/")}" class="text-decoration-none">
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
             ${body.substring(0, Math.min(150, body.length))}
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
    const issues = await get(repos._issuesUrl);

    clearUi();

    issues.forEach((issue) => {
      const card = htmlIssuesCard(issue);
      mainContainer.innerHTML += card;
    });
    console.log(issues);
  } catch (err) {
    clearUi();
    console.log("error", err);
  }
};
