import { ConfirmService } from "../service/confirm.service";

export function Confirmable<K extends string>(confirmService: K) {
    
    return (target: Record<K, ConfirmService>, key: string, descriptor: any) => {
        const originalMethod: Function = descriptor.value;

        descriptor.value = function (this: Record<K, ConfirmService>, ...args: any[]) {
            this[confirmService].open().subscribe(
                (res) => {
                    if(res === 'confirm') {
                    return originalMethod.apply(this, args);
                    } else {
                        return null;
                    }
                }
            );
        };
        return descriptor;
    };
  }