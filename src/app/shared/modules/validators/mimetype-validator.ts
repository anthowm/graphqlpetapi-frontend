import { FormControl, Validators } from '@angular/forms';



export class FileTypeValidator implements Validators {

    static validateMimeType(c: FormControl): { [key: string]: any } {
        const files = c.value._files;
        if (c.value && files.length > 0) {
            return FileTypeValidator.checkExtension(c);
        } else {
            return null;
        }
    }

    private static checkExtension(c: FormControl) {
        const files = c.value._files;
        const isValidMimeType = files.some(element => {
            const valToLower = element.name.toLowerCase();
            const regex = new RegExp('(.*?)\.(jpg|png|jpeg)$');
            const regexTest = regex.test(valToLower);
            return regexTest === false;
        });
        return isValidMimeType ? { 'notSupportedFileType': true } : null;
    }

}
