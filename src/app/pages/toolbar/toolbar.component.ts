import { Component, Input } from '@angular/core';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../data/services/interceptors/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialUiModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  @Input() title: string = 'Title';
  @Input() isAdmin: number = 0;

  onLogout() {
    this.authService.onLogout();
  }
}
