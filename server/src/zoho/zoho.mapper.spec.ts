import { mapZohoPayloadToDto } from './zoho.mapper';

describe('Zoho Mapper', () => {
  it('should map payload to internal DTO structure', () => {
    const payload = {
      submission_id: 'ZOHO-1',
      submitted_time: '2025-04-01T10:00:00Z',
      fields: {
        diesel_type: 'IN',
        quantity: '100',
        site_name: 'Site A',
      },
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.type).toBe('IN');
    expect(dto.quantity).toBe(100);
    expect(dto.siteName).toBe('Site A');
    expect(dto.referenceNo).toBe('ZOHO-1');
    expect(dto.entryDate).toBe('2025-04-01T10:00:00Z');
  });

  it('should map payload with OUT type', () => {
    const payload = {
      submission_id: 'ZOHO-2',
      submitted_time: '2025-04-02T11:00:00Z',
      fields: {
        diesel_type: 'OUT',
        quantity: '50',
        site_name: 'Site B',
      },
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.type).toBe('OUT');
    expect(dto.quantity).toBe(50);
    expect(dto.siteName).toBe('Site B');
    expect(dto.referenceNo).toBe('ZOHO-2');
    expect(dto.entryDate).toBe('2025-04-02T11:00:00Z');
  });

  it('should default siteName to "Main Site" when site_name is missing', () => {
    const payload = {
      submission_id: 'ZOHO-3',
      submitted_time: '2025-04-03T12:00:00Z',
      fields: {
        diesel_type: 'IN',
        quantity: '75',
      },
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.siteName).toBe('Main Site');
  });

  it('should handle quantity as number when it is a valid string', () => {
    const payload = {
      submission_id: 'ZOHO-4',
      submitted_time: '2025-04-04T13:00:00Z',
      fields: {
        diesel_type: 'OUT',
        quantity: '200.5',
        site_name: 'Site C',
      },
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.quantity).toBe(200.5);
  });

  it('should handle quantity as NaN when it is an invalid string', () => {
    const payload = {
      submission_id: 'ZOHO-5',
      submitted_time: '2025-04-05T14:00:00Z',
      fields: {
        diesel_type: 'IN',
        quantity: 'invalid',
        site_name: 'Site D',
      },
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.quantity).toBeNaN();
  });

  it('should handle missing fields gracefully', () => {
    const payload = {
      submission_id: 'ZOHO-6',
      submitted_time: '2025-04-06T15:00:00Z',
      fields: {},
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.type).toBeUndefined();
    expect(dto.quantity).toBeNaN();
    expect(dto.siteName).toBe('Main Site');
    expect(dto.referenceNo).toBe('ZOHO-6');
    expect(dto.entryDate).toBe('2025-04-06T15:00:00Z');
  });

  it('should handle missing submission_id', () => {
    const payload = {
      submitted_time: '2025-04-07T16:00:00Z',
      fields: {
        diesel_type: 'OUT',
        quantity: '150',
        site_name: 'Site E',
      },
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.referenceNo).toBeUndefined();
  });

  it('should handle missing submitted_time', () => {
    const payload = {
      submission_id: 'ZOHO-8',
      fields: {
        diesel_type: 'IN',
        quantity: '300',
        site_name: 'Site F',
      },
    };

    const dto = mapZohoPayloadToDto(payload);

    expect(dto.entryDate).toBeUndefined();
  });
});
