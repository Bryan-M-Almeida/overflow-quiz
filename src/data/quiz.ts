export type Question = {
  prompt: string
  /** The first option is the correct one; options are shuffled at runtime. */
  options: [string, string, string, string]
  explanation: string
}

export const questions: Question[] = [
  {
    prompt: '¿Qué es el overlay?',
    options: [
      'Cargar distintas partes del programa en la misma área de memoria según se necesiten',
      'Copiar todo el programa al disco',
      'Aumentar la RAM físicamente',
      'Cifrar el programa',
    ],
    explanation: 'Los módulos que no se usan a la vez se turnan en una misma área de memoria.',
  },
  {
    prompt: 'Con overlay, la memoria necesaria es…',
    options: ['raíz + módulo más grande', 'la suma de todos los módulos', 'solo la raíz', 'el módulo más pequeño'],
    explanation: 'La raíz siempre está cargada y el área de overlay debe tener espacio para el módulo más grande.',
  },
  {
    prompt: 'Raíz de 60 KB y módulos de 60 y 70 KB. ¿Cuánta memoria necesita con overlay?',
    options: ['130 KB', '190 KB', '70 KB', '120 KB'],
    explanation: '60 KB (raíz) + 70 KB (módulo más grande) = 130 KB. Sin overlay serían 190 KB.',
  },
  {
    prompt: '¿Por qué la tabla de símbolos está en la raíz?',
    options: [
      'Porque la pasada 2 necesita los datos que generó la pasada 1',
      'Porque es el módulo más grande',
      'Porque el disco no puede guardarla',
      'Porque ocupa menos de 1 KB',
    ],
    explanation: 'Si estuviera en la pasada 1, se perdería al cargar la pasada 2 encima. En la raíz, siempre está disponible.',
  },
  {
    prompt: '¿Quién decide qué se carga en un overlay?',
    options: ['El programador', 'El sistema operativo solo', 'El hardware solo', 'El usuario'],
    explanation: 'El programador divide el programa y define cuándo entra cada módulo. En la memoria virtual, en cambio, decide el sistema.',
  },
  {
    prompt: 'Dos módulos que se alternan muchas veces comparten el área. ¿Qué pasa?',
    options: [
      'Aumentan las cargas desde el disco y sube mucho el tiempo',
      'Nada',
      'Se ahorra más memoria y tiempo',
      'El programa se borra',
    ],
    explanation: 'Cada cambio trae un módulo desde el disco. Muchas alternancias significan muchas cargas y mucho tiempo extra.',
  },
  {
    prompt: '¿Qué técnica desplazó al overlay en los computadores de uso general?',
    options: ['La memoria virtual', 'El spooling', 'El buffering', 'La compilación'],
    explanation: 'La memoria virtual hace el trabajo de forma automática, sin que el programador divida el programa.',
  },
  {
    prompt: '¿NEXUS usa overlay?',
    options: [
      'No, usa carga dinámica sobre demanda',
      'Sí, comparte una región fija',
      'Sí, con un gestor de overlays',
      'No usa memoria',
    ],
    explanation: 'NEXUS carga componentes, como Whisper, solo cuando se necesitan: es carga dinámica, no overlay.',
  },
  {
    prompt: 'Con 120 KB disponibles, ¿cabe el ejemplo con overlay?',
    options: ['No, necesita 130 KB', 'Sí, necesita 100 KB', 'Sí, necesita 120 KB', 'Solo sin overlay'],
    explanation: 'Con overlay necesita 60 + 70 = 130 KB, más que 120 KB. Sin overlay necesitaría aún más: 190 KB.',
  },
]
