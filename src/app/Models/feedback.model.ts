export class Feedback {
    public Id: string;
    public Stars: number = 5;
    public Name: string;
    public Image: string;
    public Text: string;
    public IP: string;
    public Date: Date;
    public IsApproved: boolean = false;
    static fromJSON(data: any): Feedback {
        return Object.assign(new this, data);
    }
}