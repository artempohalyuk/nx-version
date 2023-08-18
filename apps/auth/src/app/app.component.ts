import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './service';

@Component({
  selector: 'nx-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [AuthService],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
