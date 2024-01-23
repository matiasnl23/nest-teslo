import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { imageFilter, fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(
    private readonly configService: ConfigService,
    private readonly filesService: FilesService
  ) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: imageFilter,
    // limits: { fileSize: 10000 }
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Make sure that the file is an image');

    // Ideal scenario, upload to cloudinary/s3 bucket
    return {
      fileName: `${this.configService.get('HOST_API')}/files/product/${file.filename}`,
    };
  }

  @Get('product/:name')
  findProductImage(
    @Res() res: Response,
    @Param('name') name: string
  ) {
    const path = this.filesService.getStaticProductImage(name);

    res.sendFile(path);
  }
}
