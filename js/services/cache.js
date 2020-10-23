const storage_key = 'api-cache';
const cache_duration_in_days = 7;

const get_timestamp = () => new Date().getTime();

const get_cache = () => JSON.parse(localStorage.getItem(storage_key)) || [];

const set_cache = (cache) => localStorage.setItem(storage_key, JSON.stringify(cache));

const get_request_cache = (cache, req_url) => {
    return cache.find(req_cache => req_cache.url === req_url);
};

const remove_expired_cache = (cache) => {
    const now = get_timestamp();
    const ms_in_a_day = 24 * 60 * 60 * 1000;
    const valid_cache = cache.filter(req_cache => req_cache.lastUpdated > (now - cache_duration_in_days * ms_in_a_day));
    set_cache(valid_cache);
    return valid_cache;
}

export const get_cached_data = (req_url) => {
    let cache = get_cache();
    cache = remove_expired_cache(cache);

    const request_cache = get_request_cache(cache, req_url);

    if(request_cache) {
        return request_cache.response;
    } else {
        return null; // no valid cache
    }
};

export const update_cache_data = (req_url, response) => {
    let cache = get_cache();
    const req_cache = {
        url: req_url,
        response: response,
        lastUpdated: get_timestamp(),
    };
    // avoid duplicating cache from the same url
    cache = cache.filter(req_cache => req_cache.url !== req_url);
    cache.push(req_cache);
    set_cache(cache);
};

export const is_data_cached = (req_url) => {
    return get_cached_data(req_url) !== null;
};
