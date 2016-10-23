import { Component ,OnInit} from '@angular/core';

import { Logger } from './logger.service'

@Component({
    selector: 'driver-app',
    template: `HelloWorld`,
})
export class DriverComponent implements OnInit{

    constructor(private log: Logger) {}

    ngOnInit() {

    }
}