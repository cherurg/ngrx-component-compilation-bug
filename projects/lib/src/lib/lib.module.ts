import { NgModule } from '@angular/core'
import { LibComponent } from './lib.component'
import { ReactiveComponentModule } from '@ngrx/component'

@NgModule({
  declarations: [LibComponent],
  imports: [ReactiveComponentModule],
  exports: [LibComponent],
})
export class LibModule {}
