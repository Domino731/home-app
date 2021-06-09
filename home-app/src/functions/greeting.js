const days = ['niedzieli', 'poniedziałku', 'wtorku', 'środy', 'czwartku', 'piątku', 'soboty'];
const welcome = ['Spokojnej', 'Szybkiego', 'Cudownego', `Miłej`, `Przyjemnego`, `Udanego`, `Słonecznej`]
const d = new Date();
export const dayName = () => days[d.getDay()];
export const greeting = () => welcome[d.getDay()]
