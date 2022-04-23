/**
 * Will be supporting LRU, LFU
 * References:
 * https://medium.com/geekculture/system-design-basics-caching-46b1614915f8#:~:text=Cache%20is%20a%20small%20memory,%2C%20throughput%2C%20and%20compute%20costs.
 */

const CacheWritingPolicy = {
    WRITE_THROUGH: 0,
    WRITE_BACK: 1
}

const CacheEvictionPolicy = {
    LRU: 0,
    LFU: 1,
    MRU: 2
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.hashmap = {}
        this.linkedList = [];
    }

    get(key) {
        let value = null;
        if (key in this.hashmap) {
            value = this.hashmap[key];
            this.put(key, value)
        }
        return value;
    }

    put(key, value) {
        if (key in this.hashmap){

        }
    }
}
