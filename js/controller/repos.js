import { get, organization } from "../constant.js";
import { get_cached_data, update_cache_data, is_data_cached } from "../services/cache.js";

const htmlProjectCard=(link, name, description, stars, forks) => {
    return `<div class="col-sm-12 col-md-4 p-2" data-aos="zoom-in" data-aos-delay="200">
                <div class="rounded border p-3">
                    <h5 class="text-dark">
                        <a href="${link}" class="text-main">
                            <h5>${name}</h5>
                        </a>
                    </h5>
                    <p class="text-muted">${description}</p>
                    <div class="d-flex align-items-between">
                        <div class="mx-2"><i class="fa fa-star text-muted"></i> ${stars}</div>
                        <div class="mx-2"><i class="fa fa-code-branch text-muted"></i> ${forks}</div>
                    </div>
                </div>
            </div>`;
};

export const get_organization_repos=async () => {
    let repos;
    
    if (is_data_cached(organization._repos)) {
        repos = get_cached_data(organization._repos);
    } else {
        repos = await get(organization._repos);
        update_cache_data(organization._repos, repos);
    }
    
    const projects=document.getElementById("projects");
    repos.map(repo => {
        const card=htmlProjectCard(repo.html_url, repo.name, repo.description, repo.stargazers_count, repo.forks_count)
        projects.innerHTML+=card;
    });
};
