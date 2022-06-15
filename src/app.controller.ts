import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export class AppController {
    //инъектируем appService в AppController nest создаст экземпляр класса
    constructor(private appService: AppService) {}

    @Get('/users')
    getUsers() {
        return this.appService.getUsers()
    }
}