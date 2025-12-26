import { CreateZohoDto } from './dto/create-zoho.dto';

/**
 * This is mapper file for validating the valid data coming from zoho form
 * @param payload
 * @returns
 */

export function mapZohoPayloadToDto(payload: any): CreateZohoDto {
  return {
    type: payload.fields?.diesel_type,
    quantity: Number(payload.fields?.quantity),
    siteName: payload.fields?.site_name || 'Main Site',
    referenceNo: payload.submission_id,
    entryDate: payload.submitted_time,
  };
}
