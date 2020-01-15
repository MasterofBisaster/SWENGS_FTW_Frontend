import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../service/category.service';
import {CommentService} from '../service/comment.service';


@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
    commentFormGroup;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
                private categoryService: CategoryService, private commentService: CommentService) {
    }

    ngOnInit() {
        this.commentFormGroup = this.fb.group({
            id: [null],
            content: ['', [Validators.required]]
        });
    }

    createComment() {
        const comment = this.commentFormGroup.value;
        if (comment.id) {
            this.commentService.updateComment(comment)
                .subscribe(() => {
                    alert('updated successfully');
                });
        } else {
            this.commentService.createComment(comment)
                .subscribe((response: any) => {
                    this.router.navigate(['/comment-form/' + response.id]);
                });
        }
    }
}
