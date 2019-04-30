import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[phone-number]'
})
export class EditPhoneNumber {
    @HostListener('input', ['$event'])
    async onkeydown(event: any) {
        if(event.inputType !== 'deleteContentBackward') {
            const currentPosition = event.target.selectionStart;
            const input = event.target as HTMLInputElement;
            const regex = /\D/;
            const value = event.target.value
                .replace(regex, '')
                .split('')
                .filter(a => a !== '-');
            let lengthOfValue = 3;
            let lengthDash = 3;
            let editedValue = '';
            for (let i = 0; i < value.length; i++) {
                editedValue += value[i];
                if(i === lengthOfValue -1 && lengthOfValue < 7) {
                    lengthOfValue += lengthOfValue;
                    lengthDash += lengthDash +1;
                    editedValue += '-';
                }
            }
            input.value = editedValue.substr(0, 12);
            const movePosition = currentPosition === lengthDash ? currentPosition : currentPosition + 1;
            event.target.selectionEnd = movePosition;
            event.target.selectionStart = movePosition;
        }
    }
}

@Directive({
    selector: '[code]'
})
export class EditCodeNumber {
    @HostListener('input', ['$event'])
    async onkeydown(event: any) {
        if(event.inputType !== 'deleteContentBackward') {
            const currentPosition = event.target.selectionStart;
            const input = event.target as HTMLInputElement;
            const regex = /\D/;
            const value = event.target.value
                .replace(regex, '')
                .split('')
                .filter(a => a !== '-');
            let lengthOfValue = 3;
            let lengthDash = 3;
            let editedValue = '';
            for (let i = 0; i < value.length; i++) {
                editedValue += value[i];
                if(i === lengthOfValue -1 && lengthOfValue < 4) {
                    lengthOfValue += lengthOfValue;
                    lengthDash += lengthDash +1;
                    editedValue += '-';
                }
            }
            input.value = editedValue.substr(0, 7);
            const movePosition = currentPosition === lengthDash ? currentPosition : currentPosition + 1;
            event.target.selectionEnd = movePosition;
            event.target.selectionStart = movePosition;
        }
    }
}