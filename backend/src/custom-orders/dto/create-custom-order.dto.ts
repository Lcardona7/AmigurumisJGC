import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateCustomOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  customerName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  customerPhone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @IsOptional()
  @IsString()
  referenceImageUrl?: string;
}
