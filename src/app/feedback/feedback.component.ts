import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Feedback } from '../models/feedback.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private toastr: ToastrService) { }
  approvedFeedback: Array<Feedback> = new Array<Feedback>();
  notApprovedFeedback: Array<Feedback> = new Array<Feedback>();
  displayedColumns: string[] = ['IP', 'Date', 'Actions'];
  dataSource;
  ngOnInit() {
    this.feedbackService.getFeedbackList().subscribe((response) => {
      this.approvedFeedback = response.filter(p => p.IsApproved);
      this.notApprovedFeedback = response.filter(p => !p.IsApproved);
    })
    this.feedbackService.getIpList().subscribe((response) => {
      this.dataSource = response;
    })
  }
  approveFeedback(feedback: Feedback) {
    this.feedbackService.approveFeedback(feedback);
  }
  removeFeedback(feedback: Feedback) {
    this.feedbackService.removeFeedback(feedback);
  }
  disableIP(feedback: Feedback) {
    this.feedbackService.disableIP(feedback).then((success) => {
      this.toastr.success("IP заблоковано");
    },
      (error) => {
        console.log(error);
        this.toastr.error("Помилка");
      })
  }
  removeDisableIp(ip) {
    this.feedbackService.removeDisableIP(ip);
  }

}
