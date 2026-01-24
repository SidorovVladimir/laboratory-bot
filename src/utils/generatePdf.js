import pdf from 'html-pdf-node';

export const createPdfBuffer = async (data) => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = [];
    acc[item.name].push(item);
    return acc;
  }, {});

  const formatDate = (isoStr) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString('ru-RU');
  };

  let htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; background: #f4f7f6; padding: 20px; color: #333; }
        .employee-card { background: white; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-bottom: 30px; padding: 20px; }
        h2 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; color: #7f8c8d; font-size: 13px; text-transform: uppercase; }
        tr:hover { background-color: #f1f1f1; }
        .expired { color: #e74c3c; font-weight: bold; } /* Для просроченных СИЗ */
    </style>
</head>
<body>
    <h1>Отчет по выдаче СИЗ</h1>
`;

  for (const employee in groupedData) {
    htmlContent += `
    <div class="employee-card">
        <h2>👤 ${employee}</h2>
        <table>
            <thead>
                <tr>
                    <th>Тип СИЗ</th>
                    <th>Наименование</th>
                    <th>Срок (мес)</th>
                    <th>Дата окончания</th>
                </tr>
            </thead>
            <tbody>
                ${groupedData[employee]
                  .map((item) => {
                    const isExpired =
                      new Date(item.date) - new Date() <
                      30 * 24 * 60 * 60 * 1000; // Проверка на просрочку
                    return `
                    <tr>
                        <td>${item.type}</td>
                        <td>${item.templates.trim()}</td>
                        <td>${item.month}</td>
                        <td class="${isExpired ? 'expired' : ''}">${formatDate(
                      item.date
                    )}</td>
                    </tr>`;
                  })
                  .join('')}
            </tbody>
        </table>
    </div>`;
  }
  htmlContent += `</body></html>`;

  // Настройки PDF
  const options = {
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    preferCSSPageSize: true,
  };

  const file = { content: htmlContent };
  const pdfBuffer = await pdf.generatePdf(file, options);

  return pdfBuffer;
};
