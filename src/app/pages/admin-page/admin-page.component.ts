import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component.js';
import { MaterialUiModule } from '../../global/module/material-ui/material-ui.module.js';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ToolbarComponent, MaterialUiModule, RouterOutlet],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {}
