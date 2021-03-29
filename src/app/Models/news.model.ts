import { Loading } from './loading.model';

export class News implements Loading {
    public loading: boolean;

    public Id: string;
    public Title: string;
    public Text: string;
    public Date: Date = new Date();
    public Image: string;
    public Rubric: string;
    public Author: string;
    public IsDeclaration: boolean = false;
    public Images: string[];
    public Documents: NewsDocument[];
}
export class NewsDocument {
    public FileName: string;
    public FileSize: string;
    public FileUrl: string;
}

export class CreateNews {
    public Id: string;
    public Title: string;
    public Text: string;
    public Date: Date = new Date();
    public Rubric: string;
    public Author: string;
    public Images: any[];
    public IsDeclaration: boolean = false;
    public Documents: any[];
    public Image: string;
    public ImageFile: any;
    public ImageUrl: any;
}