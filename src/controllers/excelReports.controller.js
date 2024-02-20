const { QueryTypes } = require('sequelize');
const XLSX = require("xlsx");
const { usuarioParticipantes, reporteClientesParticipando } = require('./reports.controller.js')
const { CampanasActualesActivas } = require('./apiPremio.controller.js')

const reporteClientesParticipandoExcel = async (req, res) => {

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
    XLSX.writeFile(wb, "reporte-notificaciones-offercraft.xlsx");

}

module.exports = { clientesParticipando, clientesParticipandoExcel }