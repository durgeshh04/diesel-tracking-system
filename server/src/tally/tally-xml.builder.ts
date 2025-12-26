/**
 * This is builder file responsible for creating vouchers in Tally Prime
 * @param entry
 * @returns
 */

/**
 * This is IN flow voucher xml
 * @param entry
 * @returns
 */

export function buildDieselPurchaseVoucher(entry: {
  quantity: number;
  siteName: string;
  referenceNo?: string;
  entryDate: Date;
}) {
  return `
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>Diesel Company</SVCURRENTCOMPANY>
        </STATICVARIABLES>
      </REQUESTDESC>
      <REQUESTDATA>
        <TALLYMESSAGE>
          <VOUCHER VCHTYPE="Purchase" ACTION="Create">
            <DATE>${formatTallyDate(entry.entryDate)}</DATE>
            <VOUCHERTYPENAME>Purchase</VOUCHERTYPENAME>
            <REFERENCE>${entry.referenceNo || ''}</REFERENCE>
            <NARRATION>Diesel Purchase - ${entry.siteName}</NARRATION>

            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Diesel Expense</LEDGERNAME>
              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
              <AMOUNT>-${entry.quantity}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>

            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Cash</LEDGERNAME>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <AMOUNT>${entry.quantity}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
          </VOUCHER>
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>
`;
}

/**
 * This is OUT flow voucher xml
 * @param entry
 * @returns
 */

export function buildDieselConsumptionVoucher(entry: {
  quantity: number;
  siteName: string;
  referenceNo?: string;
  entryDate: Date;
}) {
  return `
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>Diesel Company</SVCURRENTCOMPANY>
        </STATICVARIABLES>
      </REQUESTDESC>
      <REQUESTDATA>
        <TALLYMESSAGE>
          <VOUCHER VCHTYPE="Journal" ACTION="Create">
            <DATE>${formatTallyDate(entry.entryDate)}</DATE>
            <VOUCHERTYPENAME>Journal</VOUCHERTYPENAME>
            <REFERENCE>${entry.referenceNo || ''}</REFERENCE>
            <NARRATION>Diesel Consumption - ${entry.siteName}</NARRATION>

            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Diesel Consumption</LEDGERNAME>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <AMOUNT>${entry.quantity}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>

            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Diesel Expense</LEDGERNAME>
              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
              <AMOUNT>-${entry.quantity}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>

          </VOUCHER>
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>
`;
}

function formatTallyDate(date: Date) {
  const d = new Date(date);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}
