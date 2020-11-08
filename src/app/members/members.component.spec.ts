import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';

import { MembersComponent } from './members.component';
import { MembersService } from '../services/members.service';
import { members } from '../services/services.mock.data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Member } from '../services/model/member';
export class MatDialogStub {
  result: boolean = true;

  setResult(val: boolean) {
    this.result = val;
  }

  open() {
    return { afterClosed: () => of(this.result) , close:()=> {} };
  }
}
describe('MembersComponent', () => {
  let component: MembersComponent;
  let componentDelete: DeleteConfirmationComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let fixtureDelete: ComponentFixture<DeleteConfirmationComponent>;
  let el: DebugElement;
  let deleteEl: DebugElement;
  let membersService: any;
  let loader: HarnessLoader;
  let loaderDelete: HarnessLoader;
  const dialogStub = new MatDialogStub();
  let dialog: MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule
      ],
      declarations: [MembersComponent, DeleteConfirmationComponent],
      providers: [
        {
          provide: MembersService, useValue: {
            getAllMembers: () => of(members),
            deleteMember: (member:Member) => of(members[4]),
          },
        },
        {
          provide: Router, useValue: {
            navigateByUrl(url: string) { return url; }
          }
        },
        {
          provide: MatDialog, useValue: dialogStub
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MembersComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      membersService = TestBed.inject(MembersService);
      dialog = TestBed.inject(MatDialog);
    });
  }));
  it('should create and do ngOnIt', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        expect(component.members).toBeDefined();
        expect(component.members.length).toEqual(5);
        el.queryAllNodes(By.css("mat-cell cdk-cell cdk-column-firstname mat-column-firstname"));
        return fixture.whenStable();
      });
  });
  it("should call get all members services bind to component", async () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    membersService.getAllMembers().subscribe((members) => {
      fixture.detectChanges();
      expect(members).toHaveBeenCalledWith(members);
      expect(true).toBeTruthy();
      const rows = el.queryAllNodes(By.css("mat-cell cdk-cell cdk-column-firstname mat-column-firstname"));
      expect(rows.length).toBe(6, "Unexpected number of members found");
    });
  });
  it('should click add member button', async () => {
    let router = TestBed.inject(Router);
    expect(component).toBeTruthy();
    fixture.detectChanges();
    spyOn(router, 'navigateByUrl');
    component.AddMember();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalled();
  })
  it('should click edit member button', async () => {
    let router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const editMembersButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.mat-primary' }));
    await editMembersButtons[4].click();
    expect(fixture.componentInstance.EditMember).toBeTruthy();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
  it('should click delete member button', async () => {
    let router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const deleteMembersButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.mat-warn' }));
    await deleteMembersButtons[4].click();
    expect(fixture.componentInstance.deleteMemberConfirm).toBeTruthy();
  });

  it('should click delete member button Open Dailog No Click', async () => {
    let router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const deleteMembersButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.mat-warn' }));
    console.log(`editMembersButtons: ${deleteMembersButtons.length}`);
    await deleteMembersButtons[4].click();
    dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open').and.callThrough();
    expect(fixture.componentInstance.deleteMemberConfirm).toBeTruthy();

    fixtureDelete = TestBed.createComponent(DeleteConfirmationComponent);
    loaderDelete = TestbedHarnessEnvironment.loader(fixtureDelete);
    componentDelete = fixtureDelete.componentInstance;
    fixtureDelete.detectChanges();
    await fixtureDelete.whenStable().then(async () => {
      componentDelete.ngOnInit();
      dialogStub.setResult(false);
      expect(dialog.open).toBeTruthy();
      loaderDelete = TestbedHarnessEnvironment.loader(fixtureDelete);
      let DeleteNoEl = fixtureDelete.debugElement.query(By.css('#matDialogDeleteNo'));
      expect(DeleteNoEl).toBeTruthy();
      DeleteNoEl.triggerEventHandler('click', false);
    });
  });
  it('should click delete member button Open Dailog yes Click', async () => {
    let router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const deleteMembersButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '.mat-warn' }));
    console.log(`editMembersButtons: ${deleteMembersButtons.length}`);
    await deleteMembersButtons[4].click();
    dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open').and.callThrough();
    expect(fixture.componentInstance.deleteMemberConfirm).toBeTruthy();

    fixtureDelete = TestBed.createComponent(DeleteConfirmationComponent);
    loaderDelete = TestbedHarnessEnvironment.loader(fixtureDelete);
    componentDelete = fixtureDelete.componentInstance;
    fixtureDelete.detectChanges();
    await fixtureDelete.whenStable().then(async () => {
      componentDelete.ngOnInit();
      expect(dialog.open).toBeTruthy();
      dialogStub.setResult(true);
      loaderDelete = TestbedHarnessEnvironment.loader(fixtureDelete);
      let DeleteYesEl = fixtureDelete.debugElement.query(By.css('#matDialogDeleteYes'));
      expect(DeleteYesEl).toBeTruthy();
      DeleteYesEl.triggerEventHandler('click', true);
      spyOn(console, 'log');
      spyOn(membersService, 'deleteMember').and.returnValue(of(members[4]));
      // expect(membersService.deleteMember).toHaveBeenCalled();
      // expect(console.log).toHaveBeenCalled();
    });
  });
});
