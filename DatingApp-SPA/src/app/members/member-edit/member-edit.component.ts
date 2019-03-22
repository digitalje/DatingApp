import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { IUser } from '../../_models/iUser';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: IUser;

  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  // Prevents the user from leaving the website if they close or go to a different site.
  // To prevent them from navigating to a different page on this site, I added a unsaved changes guard. Look at the route
  // for this component.
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
// tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updates successfully');
      // When resetting the form, you should pass the model back in so that the page will not be wiped out entirely.
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
}
