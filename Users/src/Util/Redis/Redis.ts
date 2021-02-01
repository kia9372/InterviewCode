import OperationResult from '@nodeidentity/common/build/core/operation/Operation';
import redisClient from 'redis';

export default new class RedisManager {

    //// Client Connect

    client = redisClient.createClient(6379, "127.0.0.1");

    /*******
     * Set Value on Redis
     *  ******/
    async Set(key: string, value: any): Promise<OperationResult<boolean>> {
        try {
            this.client.set(key, JSON.stringify(value));
            return OperationResult.BuildSuccessResult('Operation Success', true);
        }
        catch (err) {
            return OperationResult.BuildFailur(err.message);
        }
    }

    /*******
 * Set Value on Redis
 *  ******/
    async SetValueWithexiperationTime(key: string, value: any, time: number): Promise<OperationResult<boolean>> {
        try {
            this.client.setex(key, time, JSON.stringify(value));
            return OperationResult.BuildSuccessResult('Operation Success', true);
        }
        catch (err) {
            return OperationResult.BuildFailur(err.message);
        }
    }


    /*******
     * Get Value in Redis
     *  ******/
    async Get<TValue>(key: string): Promise<OperationResult<TValue>> {
        try {
            return new Promise((resolve, reject) => {
                this.client.get(key, async (err, data) => {
                    if (err) reject(OperationResult.BuildFailur(err.message));
                    resolve(OperationResult.BuildSuccessResult('Operation Success', JSON.parse(data as string)));
                });
            });
        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /*******
     * Remove Value on Redis
     *  ******/
    async Remove(key: string): Promise<OperationResult<boolean>> {
        try {
            this.client.del(key);
            return OperationResult.BuildSuccessResult('success Operation', true);
        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }
    /*******
    * Reset New Value on Redis
    *******/
    async ResetSingleItem<TValue>(key: string, value: TValue): Promise<OperationResult<boolean>> {
        try {
            let del = await this.Remove(key);
            if (del.success) {
                let setValue = await this.Set(key, value);
                if (setValue.success) {
                    return OperationResult.BuildSuccessResult('success Operation', true);
                } else {
                    return OperationResult.BuildFailur(setValue.message);
                }
            } else {
                return OperationResult.BuildFailur(del.message);
            }
        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    Connet() {
        this.client.on("connect", function () {
            console.log("Redis client connected");
        });
    }


}