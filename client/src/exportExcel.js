import React from 'react'
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

const ExportExcel = ({listdData, fileName}) => {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtention = '.xlsx'

  const exportToFile = async() => {
    const ws = XLSX.utils.json_to_sheet(listdData)
    const wb = { Sheets : {"data" : ws}, SheetNames: ["data"]}
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'})
    const data = new Blob([excelBuffer], {type: fileType})
    FileSaver.saveAs(data, listdData.listname + fileExtention)
  }

  return (
    <div>
      <button onClick={()=>exportToFile()}></button>
    </div>
  )
}

export default ExportExcel