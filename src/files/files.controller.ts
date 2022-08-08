import { BadGatewayException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter, // valida el tipo de archivo
    //limits: { fileSize: 1000 }, // tamaño del archivo
    storage: diskStorage({
      destination: './static/uploads'
    })
  }))
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadGatewayException('Make sure that the file is an image');
    }

    return {
      fileName: file.originalname,
    };
  }
}
