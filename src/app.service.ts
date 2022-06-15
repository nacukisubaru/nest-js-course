import { Injectable } from "@nestjs/common";

//делаем класс инъектируемым
@Injectable()
export class AppService {
    getUsers() {
        return [{id: 1, name: 'Alex'}];
    }
}