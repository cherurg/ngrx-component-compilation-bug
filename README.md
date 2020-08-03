See https://github.com/ngrx/platform/issues/2643

A minimalistic example of `@ngrx/component` compilation problem.

@angular/cli 10.0.5
@angular/core 10.0.7

I observed the same behaviour in Angular 9 too.

The repository contains `lib` project that relies on `@ngrx/component`. Since Ivy isnstill isn't recommended for Angular libraries, `"enableIvy": false` flag is set ([1](https://github.com/cherurg/ngrx-component-compilation-bug/blob/master/projects/lib/tsconfig.lib.json#L15), [2](https://github.com/cherurg/ngrx-component-compilation-bug/blob/master/projects/lib/tsconfig.lib.prod.json#L4)). 

To reproduce the problem just compile the library:

```

npm i
ng build lib

```

I receive the following error:

```

ERROR: Unexpected value 'undefined' exported by the module 'ReactiveComponentModule in /Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/@ngrx/component/ngrx-component.d.ts'
Unexpected value 'undefined' declared by the module 'ReactiveComponentModule in /Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/@ngrx/component/ngrx-component.d.ts'
Can't bind to 'ngrxLet' since it isn't a known property of 'ng-container'.
1. If 'ngrxLet' is an Angular directive, then add 'CommonModule' to the '@NgModule.imports' of this component.
2. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("
    <ng-container [ERROR ->]*ngrxLet="data$ as data">
      <p>lib works! {{ data }}</p>
    </ng-container>
")
Property binding ngrxLet not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the "@NgModule.declarations". ("
    [ERROR ->]<ng-container *ngrxLet="data$ as data">
      <p>lib works! {{ data }}</p>
    </ng-container>
")

An unhandled exception occurred: Unexpected value 'undefined' exported by the module 'ReactiveComponentModule in /Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/@ngrx/component/ngrx-component.d.ts'
Unexpected value 'undefined' declared by the module 'ReactiveComponentModule in /Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/@ngrx/component/ngrx-component.d.ts'
Can't bind to 'ngrxLet' since it isn't a known property of 'ng-container'.
1. If 'ngrxLet' is an Angular directive, then add 'CommonModule' to the '@NgModule.imports' of this component.
2. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("
    <ng-container [ERROR ->]*ngrxLet="data$ as data">
      <p>lib works! {{ data }}</p>
    </ng-container>
")
Property binding ngrxLet not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the "@NgModule.declarations". ("
    [ERROR ->]<ng-container *ngrxLet="data$ as data">
      <p>lib works! {{ data }}</p>
    </ng-container>
")

See "/private/var/folders/r0/1jtc15ss6lq67nnmykxbkb500000gn/T/ng-2cuSau/angular-errors.log" for further details.


```

Basically it can't import `ReactiveComponentModule`. 

The content of the log file:

```

[error] Error: Unexpected value 'undefined' exported by the module 'ReactiveComponentModule in /Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/@ngrx/component/ngrx-component.d.ts'
Unexpected value 'undefined' declared by the module 'ReactiveComponentModule in /Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/@ngrx/component/ngrx-component.d.ts'
Can't bind to 'ngrxLet' since it isn't a known property of 'ng-container'.
1. If 'ngrxLet' is an Angular directive, then add 'CommonModule' to the '@NgModule.imports' of this component.
2. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("
    <ng-container [ERROR ->]*ngrxLet="data$ as data">
      <p>lib works! {{ data }}</p>
    </ng-container>
")
Property binding ngrxLet not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the "@NgModule.declarations". ("
    [ERROR ->]<ng-container *ngrxLet="data$ as data">
      <p>lib works! {{ data }}</p>
    </ng-container>
")

    at Object.<anonymous> (/Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/ng-packagr/lib/ngc/compile-source-files.js:71:19)
    at Generator.next (<anonymous>)
    at fulfilled (/Users/karpovad/recogizer/sandbox/ngrx-component-store/node_modules/ng-packagr/lib/ngc/compile-source-files.js:5:58)

```

As a super urgent workaround for this problem, I created a library internally with the same code but I removed all barrel files (`index.ts`), and it worked for me:

```

.
├── lib
│   ├── core
│   │   ├── cd-aware
│   │   │   ├── cd-aware_creator.ts
│   │   │   └── creator_render.ts
│   │   └── utils
│   │       └── has-zone.ts
│   ├── let
│   │   └── let.directive.ts
│   ├── push
│   │   └── push.pipe.ts
│   └── reactive-component.module.ts
└── public-api.ts

```
