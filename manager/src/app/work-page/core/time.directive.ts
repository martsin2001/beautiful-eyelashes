import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[time]'
})
export class TimeDirective {
    @HostListener('input', ['$event'])
    onkeydown(event: any) {
        const input = event.target as HTMLInputElement;
        const regex = /\D/;
        if(event.inputType !== 'deleteContentBackward') {
            const value = input.value.replace(regex, '').split('').filter(a => a !== ':');
            let newValue = '';
            for (let i = 0; i < value.length; i++) {
                const element = value[i];
                newValue += element;
                if(i === 1) {
                    newValue += ':';
                }
            }
            input.value = newValue.substr(0, 5);
        }
    }
}