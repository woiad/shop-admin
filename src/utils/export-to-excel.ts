import * as XLSX from 'xlsx'

export const jsonToExcel = (options: {
  data: any[],
  header: Record<string, string>,
  fileName: string,
  bookType: XLSX.BookType
}) => {
  // 1.创建工作簿 workbook
  const wb = XLSX.utils.book_new()
  // 2. 创建工作表 worksheet
  if (options.header) {
    options.data = options.data.map(item => {
      const obj: Record<string, string> = {}
      for (const key in item) {
        if (options.header[key]) {
          obj[options.header[key]] = item[key]
        } else {
          obj[key] = item[key]
        }
      }
      return obj
    })
  }
  const ws = XLSX.utils.json_to_sheet(options.data)
  // 3. 把工作表放到工作簿中
  XLSX.utils.book_append_sheet(wb, ws)
  // 4. 生成数据保存
  XLSX.writeFile(wb, options.fileName, {
    bookType: options.bookType
  })
}
