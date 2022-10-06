import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService, User} from "../../core/services/auth.service";

@Component({
  selector: 'ml-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private _authService: AuthService;

  currentUser$: Observable<User>;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;
  }

  signInWithGoogle() {
    this._authService.signInWithGoogle();
  }

  signOut() {
    this._authService.signOut();
  }
}
