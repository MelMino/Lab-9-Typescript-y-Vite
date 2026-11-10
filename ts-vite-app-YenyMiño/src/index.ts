
import './style.css'
type Student = { id: number; name: string; scores: number[] };

// Respuesta JSON simulada
//const json = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}';

// caso inválido
const json = '{"id":"1","name":"Hermione","scores":[95, "100", 98]}'

function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

function isStudent(x: unknown): x is Student {
  if (typeof x !== "object" || x === null) {
    return false;
  }

  const obj = x as Record<string, unknown>;

  if (typeof obj.id !== "number") {
    return false;
  }
  if (typeof obj.name !== "string") {
    return false;
  }
  if (!Array.isArray(obj.scores)) {
    return false;
  }

  for (let i = 0; i < obj.scores.length; i++) {
    if (typeof obj.scores[i] !== "number") {
      return false;
    }
  }

  return true;
}

function average(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  let suma = 0;
  for (let i = 0; i < nums.length; i++) {
    suma = suma + nums[i];
  }
  return suma / nums.length;
}

function render(): void {
  const app = document.getElementById("app") as HTMLElement;
  const data = safeParse(json);

  if (isStudent(data)) {
    const h1 = document.createElement("h1");
    h1.textContent = data.name;

    const p = document.createElement("p");
    p.textContent = `Promedio: ${average(data.scores).toFixed(2)}`;

    app.appendChild(h1);
    app.appendChild(p);
  } else {
    const error = document.createElement("p");
    error.textContent =
      "Error: la respuesta de la API no tiene el formato esperado.";
    error.style.color = "red";
    app.appendChild(error);
  }
}

render();
