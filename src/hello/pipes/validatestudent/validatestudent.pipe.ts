import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
class ValidatestudentPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("value", value);
    console.log("metadata", metadata)
    return value;
  }
}

export {ValidatestudentPipe};