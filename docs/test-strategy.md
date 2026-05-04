# Estrategia de Automatización de Pruebas

## Objetivo

Esta estrategia describe cómo construir un framework de pruebas que sea mantenible, escalable y confiable usando Playwright con TypeScript.

No queremos solo scripts que funcionen. Queremos un *proyecto* de software real donde el equipo pueda agregar nuevas pruebas sin que todo se desmorone. La meta es dar feedback rápido, evitar la regresión manual repetitiva y aumentar la confianza antes de cada release.

## Objetivos Principales

Lo que queremos lograr:

- Ejecutar menos pruebas manualmente (y hacerlo más rápido).
- Encontrar problemas antes de que lleguen a producción.
- Tener reportes que el equipo entienda de un vistazo.
- Hacer que otros testers o devs puedan agregar nuevas pruebas sin necesidad de capacitación exhaustiva.
- Mantener las pruebas legibles y fáciles de modificar.

## Cómo Medimos el Éxito (OKR)

Para saber si la estrategia está funcionando, podemos medir:

### Objetivo 1: Automatizar lo Crítico Rápido

- Automatizar los escenarios P1 (sin estos no hay negocio) primero.
- Casos estables, sin cambios cada semana.
- Ejecutar smoke tests automáticamente en cada PR (feedback en minutos).

**Meta:** Al menos 50% de los flujos críticos automatizados en la primera fase.

### Objetivo 2: Reducir la Regresión Manual

- Cada vez menos tiempo validando manualmente.
- Reportes automáticos que el equipo confía.
- Bugs encontrados por automatización antes de llegar a prod.

**Meta:** Regresi\u00f3n 70-80% m\u00e1s rápida que la manual.

## Cuáles Tests Valen la Pena Automatizar

No todo debe automatizarse. Un buen candidato es aquel donde:

- Se ejecuta frecuentemente (no queremos escribir algo que corra una sola vez).
- Toca flujos importantes del negocio.
- Es estable (no cambia cada semana).
- Hoy se valida manualmente y consume tiempo.
- El resultado esperado es claro: "debe fallar" o "debe pasar", sin ambigüedades.
- Hay varias combinaciones de datos que probar.

Por el contrario, *no* automatices si:

- La funcionalidad cambia constantemente.
- El resultado es subjetivo ("se ve bien").
- La curva de mantenimiento es muy alta para el valor que entrega.

## Qué Pruebas Ejecutamos Primero

No todo es igual. Clasificamos por criticidad:

- **P1:** Sin estos flujos el negocio no funciona. Prioridad: automatizar ya.
- **P2:** Importantes pero no críticos. Automatizar en segunda ola.
- **P3:** Features secundarias. Opcional automatizar.

La primera fase enfatiza P1 + smoke tests.

## Qué Probamos

### Pruebas API

Hacemos llamadas HTTP directas al backend y validamos respuestas. Ventajas:

- Más rápidas que esperar a que Playwright cargue UI.
- Pruebas más aisladas (no dependemos de navegador).
- Podemos validar casos positivos, negativos y edge cases.
- Validamos códigos de estado, datos en respuesta, contratos.

### Pruebas E2E

Usamos Playwright para clickear, llenar formularios y navegar. Por qué:

- Simulan lo que *realmente* hace un usuario.
- Confirman que frontend + backend funcionan juntos.
- Detectan problemas de UI que la API puede no mostrar.

## Cómo las Ejecutamos

- **En cada PR:** Smoke tests (API + E2E básicos). Son rápidas.
- **Cada noche:** Regresión completa si nos lo permite el contexto. Puede tardar más.
- **Etiquetado:** Las pruebas llevan tags (`@smoke`, `@regression`, `@api`, `@e2e`, `@critical`) para ejecutar solo lo que necesitamos.
- **Cross-browser:** Para flujos críticos, ejecutar en Firefox y Safari (future).

## Quality Gates: Lo que NO Puede Pasar

Antes de mergear un cambio, tienen que pasar estos checks:

- TypeScript compila sin errores.
- Linter correcto (sin warnings ignorados).
- Pruebas smoke de API pasan.
- Pruebas smoke E2E pasan.
- No hay `test.only` en el código (evita mergear tests incompletos).
- Se generó el reporte (para que el equipo vea qué se validó).
- Si algo falla, hay evidencia (screenshot, video, trace) para investigar.

## Reportes y Evidencia

Después de cada ejecución, genera automáticamente:

- **HTML de Playwright:** El reporte que cualquiera puede abrir en el navegador. Muestra quiénes pasaron, quiénes fallaron, paso a paso.
- **JUnit XML:** Para que CI/CD lo integre con otras herramientas (Jenkins, GitHub Actions, etc).
- **Screenshots:** Si algo falla, captura la pantalla.
- **Videos:** Graba la ejecución si hay fallo (retener video on-failure, borrar si todo OK).
- **Traces:** La "caja negra" de Playwright: qué clickeamos, qué requests se hicieron, todo.

Esto ayuda a investigar rápido sin necesidad de reproducir manualmente.

## Estrategia de Mantenimiento

Para evitar que el framework se desmorone:

- **Localizadores:** Usar selectores que no cambien constantemente (evitar clases CSS dinámicas). Preferir localizadores por role, label o texto. En este proyecto se apoya mucho en atributos `data-test` porque son más estables.
- **Estructura:** Usar un enfoque híbrido: Page Objects para encapsular la UI, Tasks para orquestar el flujo y Assertions para validar. Si la UI cambia, normalmente tocamos una sola pieza y no todo el test.
- **Configuración:** Variables de entorno para credenciales, URLs y datos sensibles. Nada quemado en el código.
- **Datos de prueba:** Usar Faker (u otra librería de test data) para generar valores dinámicos. Así cada ejecución tiene datos frescos y evitamos efectos secundarios.
- **Lógica de API:** Encapsular las llamadas HTTP en clases específicas, separadas de los tests.
- **Tests determinísticos:** Cada test debe poder ejecutarse de forma independiente, sin depender de otro test o de datos previos.
- **Flakiness:** Si una prueba falla a veces, investigamos la causa en lugar de ignorarla o aumentar timeouts.

## Seguimiento del Progreso

Para no perder la vista de qué se va automatizando, usamos una herramienta (Jira, Excel, Sheet, etc) donde cada caso tiene:

- Nombre y descripción.
- Prioridad (P1/P2/P3).
- Estado (no iniciado, en progreso, bloqueado, hecho).
- Quién es responsable.
- Cuándo se espera terminar.

Esto nos ayuda a:

- No olvidar casos a automatizar.
- Identificar bloqueos rápido.
- Ver el progreso general del equipo.
- Comunicar al stakeholder "llevamos X% completo".

## Métricas: ¿Cómo Sabemos que Está Funcionando?

Podemos monitorear:

- **Cobertura:** Qué % de casos críticos ya están automatizados.
- **Velocidad:** Tiempo de regresión manual vs automatizada. Idealmente 70-80% más rápido.
- **Defectos:** Cuántos bugs encontró la automatización antes de producción.
- **Estabilidad:** Cuántas pruebas fallan "a veces" (flaky) vs fallan por bugs reales.
- **Mantenimiento:** Tiempo promedio para arreglar un test roto (idealmente < 1 hora).

## Escalando el Framework a Todo el Equipo

Si hay más testers o devs queriendo escribir pruebas, estos son los pilares:

- **Estándares comunes:** Que todos sigan la misma estructura (pages, tasks, assertions). No cada uno a su manera.
- **Ownership:** Cada persona responsable de una feature.
- **Code review:** Los tests también se revisan en PR. No queremos tests que sean fruto de desconocimiento.
- **Separación:** Tests por dominio, no todo mezclado en un archivo gigante.
- **Fixtures:** Configuraciones reutilizables. No duplicar setup 20 veces.
- **Smoke en cada PR:** Feedback rápido. Si alguien rompe algo, lo saben en minutos.
- **Regresión programada:** Una vez al día o cada noche, suite completa.
- **Sharding:** Cuando la suite crezca (100+ tests), particionar en paralelo.
- **Documentación:** README, arquitectura, ejemplos. Facilita la onboarding de nuevos.
