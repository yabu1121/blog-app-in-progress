const separator = '.'

export const formatDate = (ISODate: string) => {
  const yyyymmdd = ISODate.slice(0,10);
  const [year, month, date] = yyyymmdd.split('-') 
  return `${year}${separator}${month}${separator}${date}`;
}