import {store} from '@/state/store'

const downloadFile =(data:string,format:'json'|'csv')=>{
    const encodedUri = encodeURI(data)
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `autoscout24.${format}`);
    document.body.appendChild(link); 
    link.click();

}

export const downloadProductasAsCsv = () => {
    const cars = store.getState().autoscout24.cars
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += 'Title,Model,Compnay,Vendor,Numbres,Address,Pro,AddressUrl,Url\n'
    cars.map((car) => {
        csvContent += `${car.data.title.replace(/(\r\n|\n|\r|,)/gm, " ")},${car.data.model.replace(/(\r\n|\n|\r|,)/gm, " ")},${car.data.vendor_info.company.replace(/(\r\n|\n|\r|,)/gm, " ")},${car.data.vendor_info.name.replace(/(\r\n|\n|\r|,)/gm, " ")},${Array.isArray(car.data.vendor_info.numbers) ? car.data.vendor_info.numbers.map(num => num.replace(/(\r\n|\n|\r|,)/gm, " ")).join('/') : car.data.vendor_info.numbers.replace(/(\r\n|\n|\r|,)/gm, " ")},${car.data.vendor_info.address.text.replace(/(\r\n|\n|\r|,)/gm, "-")},${car.data.vendor_info.pro ? "True":"False"},${car.data.vendor_info.address.url.replace(/(\r\n|\n|\r|,)/gm, " ")},${car.url.replace(/(\r\n|\n|\r|,)/gm, " ")}\n`;
    }).join('\n')
    downloadFile(csvContent,'csv')
    // const encodedUri = encodeURI(csvContent)
    // window.open(encodedUri);
}

export const downloadProductsAsJson = () => {
    const cars = store.getState().autoscout24.cars;
    const jsonData = JSON.stringify({"Productas":cars},null,2);
    const dataStr = "data:text/json;charset=utf-8," + jsonData;
    downloadFile(dataStr,'json')
}