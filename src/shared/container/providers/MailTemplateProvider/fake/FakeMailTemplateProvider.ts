import IMailTemplateProvider from '../models/IMailTemplateProvider';


export class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return "Qualquer coisa";
    }
}

export default FakeMailTemplateProvider;