const storageKey = 'issues-cache';
const cacheDurationInDays = 7;

const getTimestamp = () => new Date().getTime();

const getCachedRepos = () => {
    const cache = JSON.parse(localStorage.getItem(storageKey));
    const now = getTimestamp();

    if(cache !== null && cache.lastUpdated > (now - cacheDurationInDays * 24 * 60 * 60 * 1000)) {
        return cache.items;
    } else {
        return null;
    }
};

const updateRepoCache = (repos) => {
    const cache = {
        items: repos,
        lastUpdated: getTimestamp()
    };
    
    localStorage.setItem(storageKey, JSON.stringify(cache));
}