import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  onHide: Subject<any> = new Subject<any>();
  onOk: Function | undefined;
  onExit: Function | undefined;

  header: string | undefined;
  message: string | undefined;
  okButtonText: string | undefined;
  cancelButtonText: string | undefined;

  constructor(
    private bsModalService: BsModalService,
    private modalRef: BsModalRef,
    ) { }

  ngOnInit(): void {
  }

  exit(): void {
    if(this.onExit === undefined) {
      console.log(`emitting for subcription`);
      const response = 'exit';
      this.bsModalService.setDismissReason(response);
      this.onHide.next(response);
      this.modalRef.hide();
    } else {
      this.onExit();
    }
  }

  ok(): void {
    if(this.onOk === undefined) {
      console.log(`emitting for subcription`);
      const response = 'confirm';
      this.bsModalService.setDismissReason(response);
      this.onHide.next(response);
      this.modalRef.hide();
    } else {
      this.onOk();
    }
  }


}
