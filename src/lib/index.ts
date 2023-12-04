import type { NDEFReader, NDEFRecord } from "../app"

// place files you want to import through the `$lib` alias in this folder.
export const handleScan = async (nfc: NDEFReader) => {
    const data = nfc.scan().then(() => {
        nfc.onreading() = evt = {
            const decoder = new TextDecoder();
            for (let record of evt.message.records) {
              nfc.logger("Record type: " + record.recordType);
              nfc.logger("Record encoding: " + record.encoding);
              nfc.logger("Record data: " + decoder.decode(record.data));
            }
        }
    }).catch(() => {
        return "Error Occured"
    })
    
}