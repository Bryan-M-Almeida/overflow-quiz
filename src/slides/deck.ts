import type { ComponentType } from 'react'
import {
  Conclusions,
  Cover,
  DoesNotFit,
  Method,
  Nexus,
  Questions,
  Result,
  Sdg,
  Tradeoff,
  WhoDecides,
  type SlideProps,
} from './Slides'
import { Simulator } from './Simulator'

export type SlideDef = {
  id: string
  title: string
  Component: ComponentType<SlideProps>
  /** Speaker script (plain Spanish), one paragraph per entry. */
  notes: string[]
}

export const deck: SlideDef[] = [
  {
    id: 'portada',
    title: 'Portada',
    Component: Cover,
    notes: [
      'Buenos días. Soy Bryan Maciel de Almeida, de Ingeniería de Sistemas de la UPDS. Mi tema es la técnica de overlay, dentro del bloque de gestión de la memoria.',
      'La pregunta de hoy es simple: ¿cómo se ejecuta un programa que es más grande que la memoria disponible?',
    ],
  },
  {
    id: 'no-cabe',
    title: '¿Y si no cabe?',
    Component: DoesNotFit,
    notes: [
      'Imaginemos un programa de 190 KB y una memoria de solo 140 KB.',
      'Si intentamos cargar todo el programa a la vez, sobran 50 KB: simplemente no cabe.',
      'Antes de la memoria virtual, esto era un problema muy común. Una de las respuestas fue el overlay.',
    ],
  },
  {
    id: 'metodologia',
    title: 'Metodología',
    Component: Method,
    notes: [
      'Para preparar este tema seguí tres pasos.',
      'Primero, revisé fuentes: libros de sistemas operativos como Silberschatz, Stallings y Tanenbaum, y la documentación del enlazador GNU.',
      'Segundo, hice ejemplos con números sencillos para ver cuánta memoria se ahorra.',
      'Tercero, comparé el overlay con otras técnicas, como el intercambio y la memoria virtual.',
    ],
  },
  {
    id: 'simulador',
    title: 'Simulador',
    Component: Simulator,
    notes: [
      'Este es el corazón de la exposición. Los números son ilustrativos.',
      'El programa tiene una raíz de 60 KB que siempre está en memoria. La raíz guarda lo que todos necesitan, por ejemplo la tabla de símbolos y las rutinas comunes.',
      'Además tiene dos módulos que nunca trabajan al mismo tiempo: la pasada 1, de 60 KB, y la pasada 2, de 70 KB.',
      'Clic en «Cargar Pasada 1»: entra en el área de overlay. Clic en «Cargar Pasada 2»: reemplaza a la pasada 1 en la misma área. Miren el contador de memoria usada.',
      'El área de overlay mide 70 KB porque debe caber el módulo más grande. Entonces la memoria necesaria es raíz más módulo más grande: 60 + 70 = 130 KB. Con 140 KB disponibles, sobran 10.',
      'Ahora «Sin overlay»: el programa completo ocupa 190 KB y desborda los 140 KB.',
      'Por último, bajo la memoria a 120 KB: ni siquiera con overlay cabe, porque necesita 130 KB. El overlay ayuda, pero tiene un límite.',
    ],
  },
  {
    id: 'resultado',
    title: 'Resultado',
    Component: Result,
    notes: [
      'Resumiendo el ejemplo: pasamos de necesitar 190 KB a necesitar 130 KB.',
      'Eso es un ahorro de 60 KB, justo el tamaño del módulo que ya no tiene que estar en memoria al mismo tiempo.',
      'La fórmula para recordar es: memoria necesaria igual a raíz más módulo más grande.',
    ],
  },
  {
    id: 'quien-decide',
    title: '¿Quién decide?',
    Component: WhoDecides,
    notes: [
      'Una diferencia clave es quién decide qué entra en memoria.',
      'En el overlay decide el programador: él divide el programa en módulos y define cuándo se carga cada uno.',
      'En el intercambio y en la memoria virtual decide el sistema operativo, de forma automática.',
      'Por eso, en los computadores de uso general, la memoria virtual desplazó al overlay: le quita ese trabajo al programador.',
    ],
  },
  {
    id: 'costo',
    title: 'Gana memoria, pierde tiempo',
    Component: Tradeoff,
    notes: [
      'El overlay no es gratis: ganamos memoria, pero perdemos tiempo, porque cada módulo se trae desde el disco.',
      'Con valores ilustrativos: el programa tarda 10 segundos y cada carga cuesta medio segundo.',
      'Si los módulos se usan en secuencia, primero uno y luego el otro, hay 2 cargas: un segundo extra, apenas un 10 % más.',
      'Pero si dos módulos que comparten el área se alternan muchas veces, por ejemplo 200 cargas, son 100 segundos extra: un 1 000 % más. Por eso hay que agrupar bien los módulos.',
    ],
  },
  {
    id: 'nexus',
    title: 'NEXUS: carga dinámica',
    Component: Nexus,
    notes: [
      'Ahora un caso real: NEXUS, un asistente de escritorio en Python que estoy desarrollando. Está en desarrollo y pronto entrará en pruebas.',
      'Aclaro algo importante: NEXUS no usa overlay. Usa carga dinámica: carga un componente en memoria solo cuando se necesita.',
      'Con Whisper, el modelo de reconocimiento de voz, cargándolo solo cuando hace falta, la RAM bajó de 372 a 114 MB: 258 MB menos.',
      'El costo es el mismo que vimos: tiempo. Volver a cargarlo toma cerca de 0,9 segundos.',
      'Y al revés: cargar la IA durante la apertura del programa bajó la primera respuesta de 30,2 a 1,3 segundos.',
      'La idea de fondo es la misma que en el overlay: decidir qué tener en memoria y cuándo, intercambiando memoria por tiempo.',
    ],
  },
  {
    id: 'ods',
    title: 'Ejes y ODS 9',
    Component: Sdg,
    notes: [
      'Este tema se conecta con el Objetivo de Desarrollo Sostenible 9: industria, innovación e infraestructura.',
      'En particular con la meta 9.5, que busca aumentar la investigación científica y mejorar la capacidad tecnológica.',
      'También con dos ejes de la materia: tecnologías emergentes, porque proyectos como NEXUS necesitan administrar bien la memoria; y pensamiento crítico, porque cada técnica tiene ventajas y costos que hay que comparar.',
    ],
  },
  {
    id: 'conclusiones',
    title: 'Conclusiones',
    Component: Conclusions,
    notes: [
      'Tres ideas para llevarse.',
      'Uno: en el overlay, los módulos que no se usan al mismo tiempo comparten la misma área de memoria.',
      'Dos: así ahorran memoria. La memoria necesaria es la raíz más el módulo más grande.',
      'Tres: el precio es tiempo, sobre todo si los módulos se alternan mucho. Y lo decide el programador, no el sistema.',
    ],
  },
  {
    id: 'preguntas',
    title: '¿Preguntas?',
    Component: Questions,
    notes: [
      'Muchas gracias. ¿Tienen alguna pregunta?',
      'Escaneen el código QR con el celular para jugar un quiz corto de 9 preguntas. No pide registro ni datos personales.',
      'La bibliografía completa está en la página, en formato APA.',
    ],
  },
]
