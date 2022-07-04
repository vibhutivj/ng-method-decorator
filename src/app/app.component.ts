import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './common/modals/confirm/confirm.component';
import { Confirmable } from './decorators/confirm.decorator';
import { ConfirmableAgain } from './decorators/confirmAgain.decorator';
import { ConfirmService } from './service/confirm.service';

@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-decorator';
  public items = Array.from({length: 10}, () => {return {deleted: false};});
  //new Array(10).fill({deleted: false}); // Bad when filling with objevt as the objects will have same reference
  bsModalRef?: BsModalRef;

  constructor(public bsModalService: BsModalService,
    public confirmService: ConfirmService) {
    this.items = [...this.items];
  }

  // @Confirmable("confirmService")
  @ConfirmableAgain("bsModalService")
  delete(item: any): void {
    // Without decorator
    /*const config = {
      ignoreBackdropClick: true,
      keyboard: false,
      backdrop: true,
    };

    this.bsModalRef = this.bsModalService.show(ConfirmComponent, config)
    
    this.bsModalRef.content.onOk = () => {
      item.deleted = true;
      this.bsModalRef && this.bsModalRef.hide();
    };
    this.bsModalRef.content.onExit = () => {
      this.bsModalRef && this.bsModalRef.hide();
    }
    */
    // With decorator
    item.deleted = true;
  }

}
