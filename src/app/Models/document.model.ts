import { Reference } from '@angular/fire/storage/interfaces';

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
    public DownloadUrl: string;
    public Reference: Reference;
}

export interface Document2 {
    Id: string;
    FileName: string;
    Subject: string;
    Position: number;
    Description: string;
}
