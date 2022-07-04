import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../common/modals/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private bsModalService: BsModalService) { }

  public open(): Observable<string> {

    const config = {
      ignoreBackdropClick: true,
      keyboard: false,
      class: 'modal-lg'
    };


    return this.bsModalService.show(ConfirmComponent, config).content!.onHide;
  }
}
