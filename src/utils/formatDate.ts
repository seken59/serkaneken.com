export default function ncFormatDate(date: string) {
  // CAN LAM THEM PHAN DATE FOrMAT ---- get_option(date_format)
  if (!date) return "";

  let d = new Date(date);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}.${mo}.${ye}`;
}
