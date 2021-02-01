
export default new class UtilService {


    getDirectoryImage(dir: string) {
        return dir.substring(10);
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}