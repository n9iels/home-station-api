import * as Redis from "redis"

export class RedisHelper {
    public redisClient: Redis.RedisClient

    constructor(host: string) {
        this.redisClient = Redis.createClient({ host: host })
        this.redisClient.on('error', (err) => {
            console.log(`${new Date().toISOString()} - Error connection to redis - ${err.toString()}`)
        })
    }

    del(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.redisClient.del(key, (err, value) => {
                if (err) reject(err)

                resolve(value == 1 ? true : false)
            })
        })
    }

    get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, (err, value) => {
                if (err) reject(err)

                resolve(value)
            })
        })
    }

    mget(...keys: string[]): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.redisClient.mget(keys, (err, value) => {
                if (err) reject(err)

                resolve(value)
            })
        })
    }

    set(key: string, value: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, value, (err, res) => {
                if (err) reject(err)

                resolve(res == 'OK' ? true : false)
            })
        })
    }

    lpush(list: string, value: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let success = this.redisClient.lpush(list, value, (err, res) => {
                if (err) reject(err)

                resolve(res == 1 ? true : false)
            })
        })
    }

    lrange(list: string, start: number, stop: number): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.redisClient.lrange(list, start, stop, (err, results) => {
                if (err) reject(err)

                resolve(results)
            })
        })
    }

    ltrim(list: string, start: number, stop: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.redisClient.ltrim(list, start, stop, (err, res) => {
                if (err) reject(err)

                resolve(res == 'OK' ? true : false)
            })
        })
    }
}