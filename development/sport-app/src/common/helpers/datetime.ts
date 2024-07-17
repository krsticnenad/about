interface IOptions {
    format?: 'YYYY-MM-DD H:i:s' | 'DD-MM-YYYY H:i:s'
    withMiliseconds?: boolean
}

/**
 * Date time validator
 * 
 * @param {IOptions} options 
 */
export class DateTime {
    
    public date: Date;
    private options: IOptions;

    constructor(options?: IOptions) {
        this.date = new Date();
        this.options = options
    }

    /**
     * Returns full date
     */
    public getFullDate(): Date | string {

        let getDate: Date | string = this.date.toISOString().replace('T', ' ').replace('Z', '');
        let __date = getDate.split(' ')[0];
        let __time = !this.options?.withMiliseconds ? getDate.split(' ')[1].split('.')[0] : getDate.split(' ')[1];

        switch(this.options?.format) {
            
            case 'DD-MM-YYYY H:i:s':
                __date = getDate.split(' ')[0].split('-').reverse().join('-');
            case 'YYYY-MM-DD H:i:s':
                return `${__date} ${__time}`;
            default:
                return this.date;
        }
    }
}