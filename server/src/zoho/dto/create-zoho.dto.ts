import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

/**
 * This is Dto of zoho form
 */

export class CreateZohoDto {
  /** Type field */
  @IsEnum(['IN', 'OUT'])
  type: 'IN' | 'OUT';

  /** quantity */
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'Quantity must be greater than zero' })
  quantity: number;

  /** siteName */
  @IsString()
  @IsNotEmpty()
  siteName: string;

  /** referenceNo */
  @IsString()
  @IsOptional()
  referenceNo?: string;

  /** entryDate */
  @IsDateString()
  entryDate: string;
}
