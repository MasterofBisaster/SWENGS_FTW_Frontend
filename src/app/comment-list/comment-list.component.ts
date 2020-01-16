import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {CommentService} from '../service/comment.service';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {

  comments: any[];
  @Input() eventId: number;

  constructor(private commentService: CommentService, public userService: UserService) {
  }

  ngOnInit() {
    this.commentService.getCommentsForEvent(this.eventId)
      .subscribe((response: any[]) => {
        this.comments = response;
      });
  }

  deleteComment(comments: any) {
    this.commentService.deleteComment(comments)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
