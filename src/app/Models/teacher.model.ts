import { Loading } from './loading.model';

export class Teacher implements Loading{
    public loading: boolean;

    
    public Id : string;
    public Email : string;
    public Name : string;
    public Image : string;
    public Phone : string;
    public Details : TeacherDetail[];
    public ImageUrl : any;
    public ImageFile : any;
}
export class TeacherDetail{
    public Id : number;
    public Title : string;
    public Text : string;
    public Position : number;
    public TeacherId : number;
    public expanded : boolean;
}