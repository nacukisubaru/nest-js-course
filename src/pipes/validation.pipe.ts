import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";

//Класс для валидации пока не работает, нужно до разобраться 
@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length > 0) {
            console.log(errors);
            // let message = errors.map(err => {
            //     return `${err.property}`
            // })
            throw new ValidationException('error');
        }
        return value;
    }

}