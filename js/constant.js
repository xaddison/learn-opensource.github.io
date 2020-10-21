export const organization={
    _info: "https://api.github.com/orgs/learn-opensource",
    _repos: "https://api.github.com/orgs/learn-opensource/repos",
    _members: "https://api.github.com/orgs/learn-opensource/public_members"
};

// http helper function!
export const get=async (url) => {
    return (await (await fetch(url)).json());
};
