import { BsModalRef, BsModalService } from "ngx-bootstrap/modal"; 
import { ConfirmComponent } from "../common/modals/confirm/confirm.component";

interface ConfirmOptions {
    header?: string;
    message?: string;
    okButtonText?: string;
    cancelButtonText?: string;
}

/**
 * Method Decorator:
 * Decorated method executes IFF 'Yes' on confirm modal
 * 
 * @param bsModalService 
 * @param options
 * @returns 
 */
export function ConfirmableAgain<K extends string>(bsModalService: K, options: ConfirmOptions) {
    
    return (target: Record<K, BsModalService>, key: string, descriptor: any) => {
        const originalMethod: Function = descriptor.value;

        descriptor.value = function (this: Record<K, BsModalService>, ...args: any[]) {
            const config = {
                ignoreBackdropClick: true,
                keyboard: false,
                backdrop: true,
            };
            const initialState = options;
            const bsModalRef: BsModalRef = this[bsModalService].show(
                ConfirmComponent,
                Object.assign({}, config, {initialState})
            );
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