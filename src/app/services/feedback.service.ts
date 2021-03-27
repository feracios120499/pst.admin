import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    /**
     *
     */
    constructor(private db: AngularFireDatabase) {

    }
    public getFeedbackList(): Observable<Array<Feedback>> {
        return this.db.list<Feedback>("feedback/").valueChanges().pipe(map((item) => {
            var result = item.map(p => { p.Date = new Date(p.Date); return p });
            return result.sort((a, b) => { console.log(a); return a.Date.getDate() - b.Date.getDate() });
        }));
    }
    public approveFeedback(feedback: Feedback): Promise<any> {
        feedback.IsApproved = true;
        return this.db.object('feedback/' + feedback.Id).update(feedback);
    }

    public removeFeedback(feedback: Feedback): Promise<any> {
        return this.db.object('feedback/' + feedback.Id).remove();
    }

    public disableIP(feedback: Feedback): Promise<any> {
        var object = {
            IP: feedback.IP,
            Date: new Date(),
            Id: null
        };
        var key = this.db.list('disableIP/').push(object).key;
        object.Id = key;
        return this.db.object('disableIP/' + key).update(object);
    }

    public getIpList(): Observable<any> {
        return this.db.list('disableIP/').valueChanges();
    }

    public removeDisableIP(ip): Promise<any> {
        return this.db.object('disableIP/' + ip.Id).remove();
    }
}