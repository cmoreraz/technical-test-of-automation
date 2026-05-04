# Pipeline CI/CD, Quality Gates y Reportes

Este documento describe cómo opera el flujo de integración continua para este proyecto de automatización con **Playwright** y **TypeScript**.

La imagen representa la visión general del proceso: los escenarios nacen desde QA funcional, se automatizan, se versionan en Git, se ejecutan en un pipeline y generan reportes para retroalimentar al equipo.

## Diagrama de flujo

<p align="left">
  <img src="images/diagram.png" alt="Diagrama de flujo CI/CD" width="900" />
</p>

## Lectura del flujo

1. **QA Funcional** define y prioriza escenarios de prueba.
2. **Jira** centraliza los escenarios candidatos a automatizar.
3. **QA Automation** toma los escenarios priorizados y los convierte en pruebas automatizadas.
4. **Git** versiona el código de automatización.
5. **CI/CD** ejecuta las pruebas y genera reportes.
6. **Ambientes y reportes** entregan evidencia para que el equipo tome decisiones.
7. **Retroalimentación** permite ajustar escenarios, corregir defectos o mejorar la cobertura.

## Alcance real de este repositorio

Este proyecto cubre actualmente dos tipos de prueba:

- **API:** validación de la cadena evolutiva de Squirtle usando PokéAPI.
- **E2E Web:** validación del flujo de compra en SauceDemo.

El pipeline se enfoca en ejecutar esas pruebas y publicar evidencia clara para revisión.

## Integración con GitHub Actions

El repositorio cuenta con integración en **GitHub Actions** para ejecutar la suite automatizada y publicar evidencia.

El flujo realiza las siguientes acciones:

- Descarga el código del repositorio.
- Configura Node.js.
- Instala dependencias con `npm ci`.
- Instala los navegadores requeridos por Playwright.
- Ejecuta la suite con `npx playwright test`.
- Genera el reporte HTML de Playwright.
- Publica el reporte como artifact y como reporte público mediante GitHub Pages.

## Ejecución local equivalente

### 1. Preparar ambiente

```bash
npm install
```

```bash
npx playwright install
```

### 2. Ejecutar pruebas API

```bash
npx playwright test --project=api
```

### 3. Ejecutar pruebas E2E

```bash
npx playwright test --project=e2e-chromium
```

### 4. Revisar reportes

El proyecto está configurado para generar:

- **HTML Report** de Playwright.
- **Screenshots por pasos funcionales en E2E**.
- **Videos en caso de fallo para E2E**.
- **Trace en reintentos**.

## Quality gates actuales

Para este repositorio, un cambio debería considerarse válido cuando:

- Las pruebas API pasan correctamente.
- Las pruebas E2E pasan correctamente.
- No existe `test.only` en el código.
- Se genera el reporte HTML de Playwright.
- Las evidencias quedan disponibles para revisión.

## Elementos fuera del alcance actual

La imagen incluye conceptos que son válidos para una estrategia empresarial, pero que no están implementados actualmente en este repositorio:

- Ejecución Mobile.
- Unit tests.
- Coverage mínimo.
- Deploy real a AWS.
- Integración automática con Jira.
- Dashboard en CloudWatch.
- Ambientes Dev/Prod administrados desde este proyecto.

Estos puntos pueden incorporarse en una evolución futura, pero no deben presentarse como funcionalidades actuales del framework.

## Reportes y evidencia

Reporte público:

```txt
https://cmoreraz.github.io/technical-test-of-automation/
```

Los reportes tienen dos objetivos principales:

- Permitir al equipo técnico investigar fallos rápidamente.
- Dar visibilidad clara a stakeholders sobre qué se validó y con qué resultado.

La evidencia más importante para este proyecto es:

- Lista ordenada de evolución Pokémon en la prueba API.
- Capturas por paso funcional en el flujo E2E.
- Reporte HTML navegable.
