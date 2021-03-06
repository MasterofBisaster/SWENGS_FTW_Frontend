import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [MessageService]

})
export class UserDetailComponent implements OnInit {
  ftwUserDetailGroup;
  newPicture;
  fileToUpload: File = null;
  picture;
  userFriendsBool;
  friends: any[];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient,
              private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit() {

    this.ftwUserDetailGroup = this.fb.group({
      id: [null],
      picture: [null],
      user_username: [null],
      first_name: [null],
      last_name: [null],
      user_id: [null],
    });
    const data = this.route.snapshot.data;

    this.setFtwUser();

    this.route.params.subscribe((params: { filter: string }) => {
      this.setFtwUser();
    });
    if (this.userService.userId() != null) {
      this.userService.checkFriends(this.userService.userId(), this.ftwUserDetailGroup.controls.user_id.value).subscribe((response) => {
        if (typeof response === 'string') {
          this.userFriendsBool = Boolean(JSON.parse(response));
        }
      });
    }
  }

  setFtwUser() {
    const data = this.route.snapshot.data;

    if (data.user) {
      this.ftwUserDetailGroup.patchValue(data.user);
    }
    if (data.friends) {
      this.friends = data.friends;
    }
  }

  uploadFile(event) {
    const files = event.files;
    this.fileToUpload = files.item(0);
    this.postFile(this.fileToUpload).subscribe((response: any) => {
      this.newPicture = response;
      this.ftwUserDetailGroup.get('picture').patchValue(this.newPicture.id);
      const user = this.ftwUserDetailGroup.value;
      this.userService.updateUser(user)
        .subscribe(() => {
          window.location.reload();
        });
    });
  }

  postFile(fileToUpload: File) {
    const endpoint = '/api/media/upload';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }

  addOrRemoveAsFriend() {
    this.userService.addOrRemoveUserAsFriend(this.userService.userId(), this.ftwUserDetailGroup.controls.user_id.value)
      .subscribe(() => {
        if (this.userFriendsBool) {
          this.messageService.add({severity: 'success', summary: 'Successfully added!', detail: 'You added this user as a friend!'});
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully removed', detail: 'You removed this user as a friend!'
          });
        }
      });
  }
}
