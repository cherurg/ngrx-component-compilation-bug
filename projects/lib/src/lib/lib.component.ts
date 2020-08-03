import { Component, OnInit } from '@angular/core'
import { of } from 'rxjs'

@Component({
  selector: 'lib-lib',
  template: `
    <ng-container *ngrxLet="data$ as data">
      <p>lib works! {{ data }}</p>
    </ng-container>
  `,
  styles: [],
})
export class LibComponent implements OnInit {
  data$ = of(555)

  constructor() {}

  ngOnInit(): void {}
}
