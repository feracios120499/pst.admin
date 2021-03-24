import { Loading } from './loading.model';

export class User implements Loading{
    public loading: boolean;

    
    public Id : number;
    public Email : string;
    public Name : string;
    public Image : string;
    public IsConfirmed : boolean;
}