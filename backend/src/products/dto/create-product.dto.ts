import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  images?: string[];

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsNumber()
  categoryId: number;
}
