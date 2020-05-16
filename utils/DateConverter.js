export default class DateConverter {
  constructor() {
    throw new Error("Esta classe nao pode ser instanciada");
  }
  static toString(date) {
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
  }
  static toDate(string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(string))
      throw new Error("Deve estar no formato aaaa-mm-dd");

    return new Date(
      ...string.split("-").map((item, index) => item - (index % 2))
    );
  }
  static getDayName(timestamp) {
    const dt = new Date(timestamp * 1000); // expecting date in millisencons
    console.log(dt);

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[dt.getDay()];
  }
}
