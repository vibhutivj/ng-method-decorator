import { BsModalRef, BsModalService } from "ngx-bootstrap/modal"; 
import { ConfirmComponent } from "../common/modals/confirm/confirm.component";

export function ConfirmableAgain<K extends string>(bsModalService: K) {
    
    return (target: Record<K, BsModalService>, key: string, descriptor: any) => {
        const originalMethod: Function = descriptor.value;

        descriptor.value = function (this: Record<K, BsModalService>, ...args: any[]) {
            const config = {
                ignoreBackdropClick: true,
                keyboard: false,
                backdrop: true,
            };
            const bsModalRef: BsModalRef = this[bsModalService].show(ConfirmComponent, config);
            bsModalRef.content.onOk = () => {
                originalMethod.apply(this, args);
                bsModalRef.hide();
            };
            bsModalRef.content.onExit = () => {
                bsModalRef.hide();
            }
            return bsModalRef;
        };
        return descriptor;
    };
  }