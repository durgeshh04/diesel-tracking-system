import {
  buildDieselPurchaseVoucher,
  buildDieselConsumptionVoucher,
} from './tally-xml.builder';

describe('Tally XML Builder', () => {
  describe('buildDieselPurchaseVoucher', () => {
    it('should generate purchase voucher XML', () => {
      const xml = buildDieselPurchaseVoucher({
        quantity: 100,
        siteName: 'Site A',
        entryDate: new Date('2025-04-01'),
      });

      expect(xml).toContain('<VOUCHERTYPENAME>Purchase</VOUCHERTYPENAME>');
      expect(xml).toContain('Diesel Expense');
      expect(xml).toContain('Cash');
      expect(xml).toContain('<DATE>20250401</DATE>');
      expect(xml).toContain('<NARRATION>Diesel Purchase - Site A</NARRATION>');
      expect(xml).toContain('<AMOUNT>-100</AMOUNT>');
      expect(xml).toContain('<AMOUNT>100</AMOUNT>');
      expect(xml).toContain('<REFERENCE></REFERENCE>');
    });

    it('should generate purchase voucher XML with reference', () => {
      const xml = buildDieselPurchaseVoucher({
        quantity: 200,
        siteName: 'Site C',
        referenceNo: 'REF123',
        entryDate: new Date('2025-04-03'),
      });

      expect(xml).toContain('<VOUCHERTYPENAME>Purchase</VOUCHERTYPENAME>');
      expect(xml).toContain('Diesel Expense');
      expect(xml).toContain('Cash');
      expect(xml).toContain('<DATE>20250403</DATE>');
      expect(xml).toContain('<NARRATION>Diesel Purchase - Site C</NARRATION>');
      expect(xml).toContain('<AMOUNT>-200</AMOUNT>');
      expect(xml).toContain('<AMOUNT>200</AMOUNT>');
      expect(xml).toContain('<REFERENCE>REF123</REFERENCE>');
    });
  });

  describe('buildDieselConsumptionVoucher', () => {
    it('should generate consumption voucher XML', () => {
      const xml = buildDieselConsumptionVoucher({
        quantity: 50,
        siteName: 'Site B',
        entryDate: new Date('2025-04-02'),
      });

      expect(xml).toContain('<VOUCHERTYPENAME>Journal</VOUCHERTYPENAME>');
      expect(xml).toContain('Diesel Consumption');
      expect(xml).toContain('Diesel Expense');
      expect(xml).toContain('<DATE>20250402</DATE>');
      expect(xml).toContain(
        '<NARRATION>Diesel Consumption - Site B</NARRATION>',
      );
      expect(xml).toContain('<AMOUNT>50</AMOUNT>');
      expect(xml).toContain('<AMOUNT>-50</AMOUNT>');
      expect(xml).toContain('<REFERENCE></REFERENCE>');
    });

    it('should generate consumption voucher XML with reference', () => {
      const xml = buildDieselConsumptionVoucher({
        quantity: 75,
        siteName: 'Site D',
        referenceNo: 'REF456',
        entryDate: new Date('2025-04-04'),
      });

      expect(xml).toContain('<VOUCHERTYPENAME>Journal</VOUCHERTYPENAME>');
      expect(xml).toContain('Diesel Consumption');
      expect(xml).toContain('Diesel Expense');
      expect(xml).toContain('<DATE>20250404</DATE>');
      expect(xml).toContain(
        '<NARRATION>Diesel Consumption - Site D</NARRATION>',
      );
      expect(xml).toContain('<AMOUNT>75</AMOUNT>');
      expect(xml).toContain('<AMOUNT>-75</AMOUNT>');
      expect(xml).toContain('<REFERENCE>REF456</REFERENCE>');
    });
  });
});
