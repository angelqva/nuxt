export function hasClase(element: HTMLElement, clase: string): boolean {
	let clases: string[] = element.className.split(" ");
	return clases.includes(clase);
}
//import { hasClase } from "@/helpers/functions";
