import { Loading } from './loading.model';

export class DocumentModel implements Loading {
    public loading: boolean;
    public Id: number;
    public FileName: string;
    public FileSize: number;
    public GoogleUrl: string;
    public Subject: string;
    public Teachers;
    public FullPath: string;
}