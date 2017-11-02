import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home';
import { ToolsComponent } from './components/tools/tools';
import { AppRoutingModule, routingComponents } from './app.routing';
import { Router } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MaintenanceComponent } from './components/maintenance/maintenance';
import { OthersComponent } from './components/others/others';
import { FernutureComponent } from './components/fernuture/fernuture';
import { ClothesComponent } from './components/clothes/clothes';
import {
  ResponseOptions,
  Response,
  Http,
  BaseRequestOptions,
  RequestMethod
} from '@angular/http';
/************************************اHomeComponent*****************************************************/
describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: Router }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('JeranCom');
  }));
});
/************************************اAppComponent*****************************************************/

// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent,
//         AppRoutingModule, routingComponents
//       ],
//     }).compileComponents();
//   }));
//   // it('should create the app', async(() => {
//   //   const fixture = TestBed.createComponent(AppComponent);
//   //   const app = fixture.debugElement.componentInstance;
//   //   expect(app).toBeTruthy();
//   // }));
//   // it(`should have as title 'app'`, async(() => {
//   //   const fixture = TestBed.createComponent(AppComponent);
//   //   const app = fixture.debugElement.componentInstance;
//   //   expect(app.title).toEqual('app');
//   // }));
//   // it('should render title in a h1 tag', async(() => {
//   //   const fixture = TestBed.createComponent(AppComponent);
//   //   fixture.detectChanges();
//   //   const compiled = fixture.debugElement.nativeElement;
//   //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
//   // }));
//   // it('should have a defined component', () => {
//   //   expect(routingComponents).toBeDefined();
//   // });
// });

/************************************اToolsComponent*****************************************************/

describe('ToolsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolsComponent
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions]
    }).compileComponents();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ToolsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(ToolsComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ToolsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('JeranCom');
  });
});

/************************************اMaintenanceComponent*****************************************************/

describe('MaintenanceComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MaintenanceComponent
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions]
    }).compileComponents();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MaintenanceComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(MaintenanceComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(MaintenanceComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('JeranCom');
  });
});
/************************************OthersComponent*****************************************************/

describe('OthersComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OthersComponent
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions]
    }).compileComponents();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(OthersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(OthersComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(OthersComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('JeranCom');
  });
});
/************************************FernutureComponent*****************************************************/

describe('FernutureComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FernutureComponent
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions]
    }).compileComponents();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FernutureComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(FernutureComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(FernutureComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('JeranCom');
  });
});
/************************************ClothesComponent*****************************************************/

describe('ClothesComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClothesComponent
      ],
      providers: [
        { provide: Http },
        MockBackend,
        BaseRequestOptions]
    }).compileComponents();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ClothesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(ClothesComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ClothesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('JeranCom');
  });
});