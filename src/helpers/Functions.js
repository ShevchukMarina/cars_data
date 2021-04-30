const codePassport = [100, 1167, 1168, 1053, 382, 1247];
const codeNewPassport = [1167, 1168, 1247];

export class Functions {

    getMetaDataFields(arr) {
        return arr.filter(item => codePassport.includes(item.docType.ID));
    }
    //
    // isPresentPassport(arrPas) {
    //     return arrPas.length !== 0
    // }
    //
    // isPresentDateOfReceiptPassport(arrPas) {
    //     const isDate = pas => pas.ddoc;
    //     return arrPas.every(isDate)
    // }
    //
    // isAbsentSeriesInNewPassport(pas) {
    //     return !isNaN(Number(pas.ndoc))
    // }
    //
    // getLastPassport(arrPas) {
    //     let lastDate = new Date(1900, 0, 1);
    //     let ind = -1;
    //     arrPas.forEach((pas, index) => {
    //         const year = Number(pas.ddoc.slice(0, 4));
    //         const month = Number(pas.ddoc.slice(5, 7)) - 1;
    //         const day = Number(pas.ddoc.slice(8));
    //         const date = new Date(year, month, day);
    //         if (lastDate < date) {
    //             lastDate = date;
    //             ind = index;
    //         }
    //     })
    //     return arrPas[ind]
    // }
    //
    // isPassportNew(pas) {
    //     return codeNewPassport.includes(pas.docType.ID)
    // }
    //
    // setEmptyIfNull(val) {
    //     return val === null ? "" : val
    // }
    //
    // setVal(val) {
    //     return val ? val : "дані відсутні в базі"
    // }
    //
    // convertDate(date) {
    //     return date.substring(6, 10) + "-" + date.substring(3, 5) + "-" + date.substring(0, 2)
    // }
    //
    // arraysAreEqual(arr1, arr2){
    //     return (arr1.join('') === arr2.join(''));
    // }
}

const
    f = new Functions()

export default f