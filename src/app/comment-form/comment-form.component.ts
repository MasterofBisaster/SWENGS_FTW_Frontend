import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../service/category.service';
import {CommentService} from '../service/comment.service';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  commentFormGroup;
  @Input() eventId: number;
  comment: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService, private commentService: CommentService, private userService: UserService) {
  }

  ngOnInit() {
    this.commentFormGroup = this.fb.group({
      id: [null],
      event: [this.eventId],
      creator: [this.userService.userId()],
      content: ['', [Validators.required]],
      create_date: [null],
    });
  }

  createComment() {
    const comment = this.commentFormGroup.value;
    comment.create_date = this.dateAsYYYYMMDDHHNNSS(new Date());

    this.commentService.createComment(comment)
        .subscribe((response: any) => {
          window.location.reload();
        });
  }

  dateAsYYYYMMDDHHNNSS(date): string {
    return date.getFullYear()
        + '-' + this.leftpad(date.getMonth() + 1, 2)
        + '-' + this.leftpad(date.getDate(), 2)
        + ' ' + this.leftpad(date.getHours(), 2)
        + ':' + this.leftpad(date.getMinutes(), 2)
        + ':' + this.leftpad(date.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
        + String(val)).slice(String(val).length);
  }
}
