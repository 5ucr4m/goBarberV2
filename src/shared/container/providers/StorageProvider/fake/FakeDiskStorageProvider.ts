import IStorageProvider from '../models/IStorageProvider';

class FakeDiskStorageProvider implements IStorageProvider {
    private storage: string[] = [];

    public async saveFile(file: string): Promise<string> {
        this.storage.push(file);
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const fileIndex = this.storage.findIndex(item => item === file);
        this.storage.slice(fileIndex, 1);
    }
}

export default FakeDiskStorageProvider;