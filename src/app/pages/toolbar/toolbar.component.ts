import { Component } from '@angular/core';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MaterialUiModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {}
