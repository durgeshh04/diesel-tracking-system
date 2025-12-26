import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  IsDateString,
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
  @IsPositive()
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
