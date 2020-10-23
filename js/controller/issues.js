import { get, organization } from "../constant.js";

const htmlIssuesCard=({
    repository_url: repo,
    title,
    comments,
    html_url: url,
    body,
    labels,
}) => {
    if (url&&url.split("/").slice(-2)[0]!=="pull") {
        return `
        <div class="col-md-4 p-3">
            <div class="card border-0 shadow">    
                <div class="card-image"
                style="background-image: url(https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-dark-purple-minimalistic-gradient-banner-background-image_223093.jpg);">
                    <a href="https://github.com/${repo && repo.split("/").slice(-2).join("/") }" class="text-decoration-none">
                        <h4 class="card-title p-3 py-4 text-white m-0">${repo.split("/").pop()}</h4>
                    </a>
                    </div>
                    <div class="card-body white">
                    <div class="text-white d-flex align-items-center justify-content-between">
                        <h6 class="text-main"><a href=${url}>${title}</a></h6>
                    </div>
                    <p class="text-display-light">
                        <i class="fa fa-comments text-dark"><span class="pl-3">Comments - ${comments}</span></i>
                    </p>
                    <div class="mt-2">
                    ${(labels && labels.length > 0 &&labels.map(({color,name,}) => 
                        `<span class="badge badge-pill p-2 m-1" style="background:#${color};color:#fff;">${name}</span>`).join("")) || ""}
                    </div>
                </div>
            </div>
          </div>`;
    } else {
        return "";
    }
};

export const getRepoIssues=async () => {
    const mainContainer=document.getElementById("issueCardContainer");
    const repoList=await get(organization._repos);

    const arrayOfFetchingIssue=repoList.map(
        ({ has_issues, issues_url, html_url, name }) => {
            if (has_issues) {
                if (issues_url) {
                    return get(issues_url.split("{")[0]);
                }
            }
        }
    );

    const issuesData=await Promise.all(arrayOfFetchingIssue);
    issuesData.flat().forEach((issue) => {
        const card=htmlIssuesCard(issue);
        mainContainer.innerHTML+=card;
    });
};