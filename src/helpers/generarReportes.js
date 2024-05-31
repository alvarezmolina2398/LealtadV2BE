const { QueryTypes } = require('sequelize');
const XLSX = require('xlsx');
// const XLSXStyle = require('xlsx-style');
const { reporteClientesParticipando } = require('../controllers/reports.controller.js')
const { Campania } = require('../models/campanias');
const { Configuraciones } = require('../models/configuraciones');
const { ConfigReport } = require('../models/configReport');
const { getUsuariosNotificacionesOfferCraftSel } = require('../helpers/OferCraftReport.js')
const { getParticipaciones } = require('../helpers/referidos.js')
const { getParticipacionesFechasGeneral } = require('../helpers/GeneralReport.js')
const { postDatosCupon } = require('../helpers/promocionReport.js')




const generarReportereGeneralReferidos = async(fecha1, fecha2) => {

    const datas = await getParticipacionesFechasGeneral(fecha1, fecha2);
    console.log('esto biene en referidos', datas)

    const wb = XLSX.utils.book_new();


    let row1 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
        { v: 'REPORTE GENERAL DE ', t: 's', s: { font: { sz: 16 }, alignment: { horizontal: 'center' } } },
    ];
    let row2 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
        { v: 'REFERIDOS', t: 's', s: { font: { sz: 16 }, alignment: { horizontal: 'center' } } },
    ];
    let row3 = [''];
    let row4 = [
        '',
        { v: '#', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'CÓDIGO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'REFERIDOR', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'NUMERO TEL.REFERIDOR', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'REFERIDO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'NUMERO TEL.REFERIDO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'FECHA', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
    ];
    let infoFinal = [row1, row2, row3, row4];
    var contador = 1;
    var longitud1 = 0;
    var longitud2 = 0;
    var longitud3 = 0;
    var longitud4 = 0;

    datas.forEach((dataArray) => {
        dataArray.forEach(data => {
            let rowInfo = [
                '',
                { v: contador, t: 's' },
                { v: data["codigo"], t: 's' },
                { v: data["nombreReferidor"], t: 's' },
                { v: data["userno"], t: 's' },
                { v: data["nombreReferido"], t: 's' },
                { v: data["noReferido"], t: 's' },
                { v: data["fecha"], t: 's' }, // Asegúrate de que la propiedad "fecha" tenga el formato adecuado
            ];
            infoFinal.push(rowInfo);
            contador += 1;
        });
    });



    const ws = XLSX.utils.aoa_to_sheet(infoFinal);

    ws['!cols'] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 25 },
        { wch: 25 }, // Ajuste de ancho para 'Campaña' y 'Fecha Participacion'
        { wch: 20 },
        { wch: 20 },
    ];

    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ s: { r: 0, c: 4 }, e: { r: 0, c: 6 } });

    const ws2 = XLSX.utils.aoa_to_sheet([row4]);
    XLSX.utils.book_append_sheet(wb, ws, 'Usuario notificados');

    const file = await XLSX.write(wb, { bookType: "xlsx", bookSST: false, type: "buffer" });

    return file;
}












const generarReporteClientesParticipando = async() => {




    const datas = reporteClientesParticipando();

    const wb = XLSX.utils.book_new();

    let row1 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
        { v: 'REPORTE DE NOTIFICACIONES', t: 's', s: { font: { sz: 16 }, alignment: { horizontal: 'center' } } },
    ];

    let row2 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
        { v: 'OFFERCRAFT', t: 's', s: { font: { sz: 16 }, alignment: { horizontal: 'center' } } },
    ];

    let row3 = [''];

    let row4 = [
        '',
        { v: '#', t: 's', s: { font: { bold: true, color: { rgb: 'ffffff' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '595959' } } } },
        { v: 'Usuario', t: 's', s: { font: { bold: true, color: { rgb: 'ffffff' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '595959' } } } },
        { v: 'Fecha', t: 's', s: { font: { bold: true, color: { rgb: 'ffffff' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '595959' } } } },
        { v: 'Token', t: 's', s: { font: { bold: true, color: { rgb: 'ffffff' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '595959' } } } },
    ];

    let infoFinal = [row1, row2, row3, row4];
    let contador = 1;
    let longitud1 = 0;
    let longitud2 = 0;
    let longitud3 = 0;
    let longitud4 = 0;

    datas.forEach(data => {

        if (longitud1 < String(contador).length)
            longitud1 = String(contador).length;

        if (longitud2 < String(data.nombre).length)
            longitud2 = String(data.nombre).length;

        if (longitud3 < String(data.fecha_uso).length)
            longitud3 = String(data.fecha_uso).length;

        if (longitud4 < String(data.url).length)
            longitud4 = String(data.url).length;

        let rowInfo = [
            '',
            { v: contador, t: 's' },
            { v: data.nombre, t: 's' },
            { v: data.fecha_uso, t: 's' },
            { v: data.url, t: 's' },
        ];

        infoFinal.push(rowInfo);
        contador += 1;

    });

    const ws = XLSX.utils.aoa_to_sheet(infoFinal);
    // ws['!cols'] = [{ width: 30 }, { width: 20 }, { width: 20 }]
    ws['!cols'] = [
        { width: 15 },
        { width: longitud1 + 2 },
        { width: longitud2 + 2 },
        { width: longitud3 + 2 },
        { width: longitud4 + 2 }
    ];

    console.log(ws['!cols'])
    ws['!merges'] = [
        { s: { r: 1, c: 1 }, e: { r: 1, c: 4 } },
        { s: { r: 0, c: 1 }, e: { r: 0, c: 4 } }
    ];

    const ws2 = XLSX.utils.aoa_to_sheet([row4]);
    XLSX.utils.book_append_sheet(wb, ws, 'Usuario notificados');
    const file = await XLSX.writeFile(wb, { bookType: "xlsx", bookSST: false, type: "buffer" });

    return file;

}


const generarReportereReferidos = async(campanas, fecha1, fecha2) => {

    const datas = await getParticipaciones(campanas, fecha1, fecha2);
    console.log('esto biene en referidos', datas)

    const wb = XLSX.utils.book_new();
    let row1 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
        { v: 'REPORTE  DE ', t: 's', s: { font: { sz: 16 }, alignment: { horizontal: 'center' } } },
    ];
    let row2 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
        { v: 'REFERIDOS', t: 's', s: { font: { sz: 16 }, alignment: { horizontal: 'center' } } },
    ];
    let row3 = [''];
    let row4 = [
        '',
        { v: '#', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'MEDIO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'CAMPAÑA', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'TELEFONO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'NOMBRE USUARIO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'FECHA y HORA', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'TRANSACCION', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'MONTO PREMIO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'TELEFONO REFERIDO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'NOMBRE REFERIDO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
    ];
    let infoFinal = [row1, row2, row3, row4];
    var contador = 1;
    var longitud1 = 0;
    var longitud2 = 0;
    var longitud3 = 0;
    var longitud4 = 0;

    datas.forEach(data => {
        let rowInfo = [
            '',
            { v: contador, t: 's' },
            { v: data["descripcionTrx"], t: 's' },
            { v: data["nombre_campania"], t: 's' },
            { v: data["telefono_usuario"], t: 's' },
            { v: data["nombre_usuario"], t: 's' },
            { v: data["fecha"], t: 's' },
            { v: data["idTransaccion"], t: 's' },
            { v: data["valor"], t: 's' },
            { v: data["telefono_usuario"], t: 's' },
            { v: data["nombre_usuario"], t: 'n' }, // Asegúrate de que la propiedad "fecha" tenga el formato adecuado
        ];
        infoFinal.push(rowInfo);
        contador += 1;
    });




    const ws = XLSX.utils.aoa_to_sheet(infoFinal);

    ws['!cols'] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 25 },
        { wch: 25 }, // Ajuste de ancho para 'Campaña' y 'Fecha Participacion'
        { wch: 20 },
        { wch: 20 },
    ];

    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ s: { r: 0, c: 4 }, e: { r: 0, c: 6 } });

    const ws2 = XLSX.utils.aoa_to_sheet([row4]);
    XLSX.utils.book_append_sheet(wb, ws, 'Usuario notificados');

    const file = await XLSX.write(wb, { bookType: "xlsx", bookSST: false, type: "buffer" });

    return file;
}




// const generarReporteOferCraft = async(idCampanas, fecha1, fecha2) => {
//     const datas = await getUsuariosNotificacionesOfferCraftSel(idCampanas, fecha1, fecha2);

//     datas.forEach(data => {
//         data.participaciones.forEach(participacion => {
//             console.log('Participación:', participacion); // Nuevo console.log agregado

//             // Resto del código...
//         });
//     });

//     console.log('esto trae ', datas)

//     const wb = XLSX.utils.book_new();

//     let row1 = [
//         { v: '', t: 's', s: { font: { name: 'Courier', sz: 18 } } },
//         { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
//         { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
//         { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
//         { v: ' REPORTE DE NOTIFICACIONES  OFFERCRAFT', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
//     ];

//     let row2 = [
//         { v: '', t: 's', s: { font: { name: 'Courier', sz: 12 } } },
//         { v: '', t: 's', s: { font: { sz: 12 }, alignment: { horizontal: 'center' } } },
//     ];

//     let row3 = [''];

//     let row4 = [
//         '',
//         { v: '#', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Fecha Acreditacion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Telefono', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Nombre', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Campaña', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Premio', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Monto Premio', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Transaccion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Codigo', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Monto Transaccion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//         { v: 'Fecha Participacion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
//     ];

//     let infoFinal = [row1, row2, row3, row4];
//     let contador = 1;

//     datas.forEach(data => {
//         data.participaciones.forEach(participacion => {
//             let rowInfo = [
//                 '',
//                 { v: contador, t: 's' },
//                 { v: participacion.fecha, t: 's' },
//                 { v: participacion.customerInfo.telno, t: 's' },
//                 { v: participacion.customerInfo.fname + ' ' + participacion.customerInfo.lname, t: 's' },
//                 { v: participacion.campanium.nombre, t: 's' },
//                 { v: participacion.premioDescripcion, t: 's' },
//                 { v: participacion.valor, t: 'n' },
//                 { v: participacion.descripcionTrx, t: 's' },
//                 { v: participacion.idTransaccion, t: 's' },
//                 { v: participacion.urlPremio, t: 's' },
//                 { v: participacion.fecha, t: 's' },
//             ];

//             infoFinal.push(rowInfo);
//             contador += 1;
//         });
//     });

//     const ws = XLSX.utils.aoa_to_sheet(infoFinal);

//     ws['!cols'] = [
//         { wch: 15 },
//         { wch: 15 },
//         { wch: 12 },
//         { wch: 25 },
//         { wch: 25 }, // Ajuste de ancho para 'Campaña' y 'Fecha Participacion'
//         { wch: 20 },
//         { wch: 20 },
//         { wch: 12 },
//         { wch: 20 },
//         { wch: 12 },
//     ];

//     if (!ws['!merges']) ws['!merges'] = [];
//     ws['!merges'].push({ s: { r: 0, c: 4 }, e: { r: 0, c: 6 } });

//     XLSX.utils.book_append_sheet(wb, ws, 'Usuario notificados');

//     const file = await XLSX.write(wb, { bookType: "xlsx", bookSST: false, type: "buffer" });

//     return file;
// };






const generarReporteOferCraft = async(idCampanas, fecha1, fecha2) => {
    const datas = await getUsuariosNotificacionesOfferCraftSel(idCampanas, fecha1, fecha2);

    console.log('Esto trae: ', datas);

    const wb = XLSX.utils.book_new();

    // Definir las filas con estilos
    let row1 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 18 } } },
        { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
        { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
        { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
        { v: ' REPORTE DE NOTIFICACIONES  OFFERCRAFT', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
    ];

    let row2 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 12 } } },
        { v: '', t: 's', s: { font: { sz: 12 }, alignment: { horizontal: 'center' } } },
    ];

    let row3 = [''];

    let row4 = [
        '',
        { v: '#', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Fecha Acreditacion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Telefono', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Nombre', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Campaña', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Premio', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Monto Premio', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Transaccion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Codigo', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Monto Transaccion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'Fecha Participacion', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
    ];

    let infoFinal = [row1, row2, row3, row4];
    let contador = 1;

    datas.forEach(data => {
        data.participaciones.forEach(participacion => {
            let rowInfo = [
                '',
                { v: contador, t: 's' },
                { v: participacion.fecha, t: 's' },
                { v: participacion.customerInfo.telno, t: 's' },
                { v: participacion.customerInfo.fname + ' ' + participacion.customerInfo.lname, t: 's' },
                { v: participacion.campanium.nombre, t: 's' },
                { v: participacion.premioDescripcion, t: 's' },
                { v: participacion.valor, t: 'n' },
                { v: participacion.descripcionTrx, t: 's' },
                { v: participacion.idTransaccion, t: 's' },
                { v: participacion.urlPremio, t: 's' },
                { v: participacion.fecha, t: 's' },
            ];

            infoFinal.push(rowInfo);
            contador += 1;
        });
    });

    const ws = XLSX.utils.aoa_to_sheet(infoFinal);

    ws['!cols'] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 25 },
        { wch: 25 }, // Ajuste de ancho para 'Campaña' y 'Fecha Participacion'
        { wch: 20 },
        { wch: 20 },
        { wch: 12 },
        { wch: 20 },
        { wch: 12 },
    ];

    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ s: { r: 0, c: 4 }, e: { r: 0, c: 6 } });

    XLSX.utils.book_append_sheet(wb, ws, 'Usuario notificados');

    const file = XLSX.write(wb, { bookType: "xlsx", bookSST: false, type: "buffer" });

    return file;
};









const generarReportePromociones = async(promocion, fecha1, fecha2) => {


    const datas = await postDatosCupon(promocion, fecha1, fecha2);


    console.log('esto biene en datas datas', datas)



    const wb = XLSX.utils.book_new();

    let row1 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 18 } } },
        { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
        { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
        { v: '', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
        { v: ' REPORTE DE PROMOCIONES', t: 's', s: { font: { sz: 18 }, alignment: { horizontal: 'center' } } },
    ];

    let row2 = [
        { v: '', t: 's', s: { font: { name: 'Courier', sz: 12 } } },
        { v: '', t: 's', s: { font: { sz: 12 }, alignment: { horizontal: 'center' } } },
    ];

    let row3 = [''];

    let row4 = [
        '',
        { v: 'NOMBRE', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'TELEFONO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'CAMPAÑA', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'PREMIO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'MONTO PREMIO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'TRANSACCIÓN', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'CÓDIGO', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'MONTO TRANSACCIONES', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'FECHA ACREDITACIÓN', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
        { v: 'FECHA PARTICIPACIÓN', t: 's', s: { font: { bold: true, color: { rgb: 'FFFFFF' } }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: '808080' } } } },
    ];

    let infoFinal = [row1, row2, row3, row4];
    let contador = 1;

    datas.forEach(data => {
        let rowInfo = [
            '',
            { v: data["NOMBRE"], t: 's' },
            { v: data["Telefono"], t: 's' },
            { v: data["CAMPAÑA"], t: 's' },
            { v: data["PREMIO"], t: 's' },
            { v: data["MONTO PREMIO"], t: 's' },
            { v: data["TRANSACCIÓN"], t: 'n' },
            { v: data["CÓDIGO"], t: 's' },
            { v: data["MONTO TRANSACCIONES"], t: 's' },
            { v: data["FECHA ACREDITACIÓN"], t: 'n' },
            { v: data["FECHA PARTICIPACIÓN"], t: 's' },
        ];

        infoFinal.push(rowInfo);
        contador += 1;
    });

    const ws = XLSX.utils.aoa_to_sheet(infoFinal);

    ws['!cols'] = [
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 25 },
        { wch: 25 }, // Ajuste de ancho para 'Campaña' y 'Fecha Participacion'
        { wch: 20 },
        { wch: 20 },
        { wch: 12 },
        { wch: 20 },
        { wch: 12 },
    ];

    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ s: { r: 0, c: 4 }, e: { r: 0, c: 6 } });

    XLSX.utils.book_append_sheet(wb, ws, 'Usuario notificados');

    const file = await XLSX.write(wb, { bookType: "xlsx", bookSST: false, type: "buffer" });

    return file;
};






module.exports = {
    generarReportereReferidos,
    generarReportereGeneralReferidos,
    generarReporteClientesParticipando,
    generarReporteOferCraft,
    generarReportePromociones
};