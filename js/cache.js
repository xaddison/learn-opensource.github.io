const storageKey = 'issues-cache';

const getCachedRepos = () => JSON.parse(localStorage.getItem(storageKey));

const updateRepoCache = (repos) => localStorage.setItem(storageKey, JSON.stringify(repos));