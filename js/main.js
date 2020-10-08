const organization={
    _info: "https://api.github.com/orgs/learn-opensource",
    _repos: "https://api.github.com/orgs/learn-opensource/repos",
};

const get=async (url) => {
    return await (await (await fetch(url)).json());
};

const htmlProjectCard=(link, name, description, stars, forks) => {
    return `<div class="col-sm-12 col-md-4 p-4 border rounded border-dark">
        <h5 class="text-dark">
            <a href="${link}" class="text-main">
                <strong>${name}</strong>
            </a>
        </h5>
        <p class="text-muted">${description}</p>
        <div class="d-flex align-items-between">
            <div class="mx-2"><i class="fa fa-star text-muted"></i> ${stars}</div>
            <div class="mx-2"><i class="fa fa-code-branch text-muted"></i> ${forks}</div>
        </div>
    </div>`;
};

const get_organization_repos=async () => {
    const repos=await get(organization._repos);
    const projects=document.getElementById("projects");
    repos.map(repo => {
        const card=htmlProjectCard(repo.html_url, repo.name, repo.description, repo.stargazers_count, repo.forks_count)
        projects.innerHTML+=card;
    });
};

get_organization_repos();
