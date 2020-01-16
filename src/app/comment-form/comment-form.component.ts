import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../service/category.service';
import {CommentService} from '../service/comment.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  commentFormGroup;
  @Input() eventId: number;
  userId = 1;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService, private commentService: CommentService) {
  }

  ngOnInit() {
    this.commentFormGroup = this.fb.group({
      id: [null],
      event: [this.eventId],
      creator: [this.userId],
      content: ['', [Validators.required]],
      create_date: [null],
    });
  }

  createComment() {
    //  this.commentFormGroup.controls.release_date.value = Date.now();
    const comment = this.commentFormGroup.value;
    comment.create_date = this.dateAsYYYYMMDDHHNNSS(new Date());
    // comment.create_date = Date.now().toLocaleString('en-US');
    if (comment.id) {
      this.commentService.updateComment(comment)
        .subscribe(() => {
          alert('updated successfully');
        });
    } else {
      this.commentService.createComment(comment)
        .subscribe((response: any) => {
          window.location.reload();
          // this.router.navigate(['/event-detail/' + this.eventId]);
        });
    }
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
