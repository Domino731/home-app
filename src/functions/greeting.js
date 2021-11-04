// simple functions including a greeting, btw have a nice day :)

const days = ['niedzieli', 'poniedziałku', 'wtorku', 'środy', 'czwartku', 'piątku', 'soboty'];
const welcome = ['Spokojnej', 'Szybkiego', 'Cudownego', `Miłej`, `Przyjemnego`, `Udanego`, `Słonecznej`];
const d = new Date();

/** get day name for greeting text */
export const dayName = () => days[d.getDay()];

/** get greeting text */
export const greeting = () => welcome[d.getDay()];

