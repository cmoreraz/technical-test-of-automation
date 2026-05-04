# Technical Test QA Automation

Proyecto de automatización técnica construido con **Playwright** y **TypeScript**.

## Resumen ejecutivo

Este proyecto automatiza los dos escenarios solicitados en la prueba técnica: una validación de API sobre PokéAPI y un flujo Front/E2E sobre SauceDemo. La solución permite ejecutar las pruebas de forma local o desde CI, generar evidencia de ejecución y consultar un reporte público de Playwright para revisar los resultados.

El enfoque prioriza pruebas claras, mantenibles y fáciles de revisar por QA, desarrollo y stakeholders técnicos.

La prueba técnica está compuesta por dos partes:

- **Prueba de API:** valida la cadena evolutiva de **Squirtle** usando la PokéAPI, obtiene el nombre y peso de cada Pokémon involucrado, los ordena alfabéticamente sin usar `.sort()` y muestra el resultado en la salida de la prueba.
- **Prueba Front/E2E:** valida un flujo de compra de extremo a extremo, desde el login hasta la confirmación de la orden.

## Resultados cubiertos

- **API:** evolución de Squirtle ordenada alfabéticamente con nombre y peso.
- **Front/E2E:** compra del producto **Sauce Labs Fleece Jacket**, validando que el nombre y precio coincidan entre productos y carrito.
- **Evidencia:** reporte HTML de Playwright, salida de la prueba API y capturas por pasos funcionales en el flujo E2E.

## Estado de cumplimiento

| Componente | Estado |
| --- | --- |
| Prueba API PokéAPI | Completado |
| Prueba Front/E2E SauceDemo | Completado |
| Evidencia en reporte Playwright | Completado |
| Ejecución en CI/CD | Completado |
| Reporte público | Disponible |

## Reporte público

- [Reporte público de Playwright](https://cmoreraz.github.io/technical-test-of-automation/)

## Configuración

### Documentación

- [Estrategia de Automatización de Pruebas](./docs/test-strategy.md)
- [Pipeline CI/CD, Quality Gates y Reportes](./docs/cicd-strategy.md)

### Clonar el repositorio

```bash
git clone git@github.com:cmoreraz/technical-test-of-automation.git
```
> ⚠️ Nota: si no tenés Git instalado, podés descargarlo desde la [página de Git](https://git-scm.com/downloads).

```bash
cd technical-test-of-automation
```

```bash
nvm use v22
```

> ⚠️ Nota: si no tenés NVM instalado, seguí la [guía oficial de instalación de NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

### Instalar dependencias

```bash
npm install
```

```bash
npx playwright install
```

### Ejecutar el proyecto

Ejecutar toda la suite:

```bash
npx playwright test
```

Ejecutar solo la prueba API:

```bash
npx playwright test --project=api
```

Ejecutar solo la prueba Front/E2E:

```bash
npx playwright test --project=e2e-chromium
```

## Credenciales de prueba

El flujo E2E usa las credenciales públicas disponibles en SauceDemo. Para mantener los tests simples de ejecutar, el proyecto define valores por defecto en `config/credentials.ts`:

```txt
Usuario: standard_user
Contraseña: secret_sauce
```

Si se necesita probar con otro usuario, los valores se pueden sobrescribir con variables de entorno:

```bash
export E2E_USERNAME=my_user
export E2E_PASSWORD=my_pass
npx playwright test tests/e2e/checkout.spec.ts --project=e2e-chromium
```

## Arquitectura del proyecto

La arquitectura está dividida en piezas pequeñas y claras: `pages/` encapsula las acciones sobre la UI, `tasks/` orquesta los flujos principales y `assertions/` concentra las validaciones. Así el archivo `.spec` se mantiene simple y legible, y cada cambio cae en el lugar correcto.

También se aplican principios **SOLID** mediante interfaces como `PokemonApiGateway` y `PokemonSorter`. Gracias a eso, el flujo que obtiene la evolución de Squirtle no queda amarrado a una implementación específica de API ni a una única forma de ordenar. Si mañana cambia la fuente de datos o la estrategia de ordenamiento, se puede reemplazar esa pieza sin reescribir el escenario completo.

#### Generación de datos con Faker

Se utiliza **@faker-js/faker** para generar datos dinámicos en el flujo E2E. Los datos de checkout (firstName, lastName, postalCode) se crean automáticamente en cada ejecución a través de `FakerTestDataFactory`, implementación de la interfaz `TestDataFactoryInterface`. Esto evita valores quemados y asegura que cada test tenga datos frescos y variados.

La estructura separa las responsabilidades principales del framework: pruebas, páginas, flujos de negocio, validaciones, modelos, configuración y utilidades reutilizables.

```txt
technical-test-of-automation/
├── api/
│   ├── HttpStatusValidator.ts
│   ├── PokeApiClient.ts
│   └── PokemonApiGateway.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── OrderConfirmationPage.ts
├── tasks/
│   ├── GetPokemonEvolutionTask.ts
│   ├── LoginTask.ts
│   ├── AddProductToCartTask.ts
│   └── CompleteCheckoutTask.ts
├── assertions/
│   ├── PokemonAssertions.ts
│   ├── CartAssertions.ts
│   └── CheckoutAssertions.ts
├── models/
│   ├── Pokemon.ts
│   ├── Product.ts
│   └── CheckoutCustomer.ts
├── config/
│   ├── credentials.ts
│   ├── url.ts
│   └── routes.ts
├── utils/
│   ├── AlphabeticalPokemonSorter.ts
│   ├── PokemonSorter.ts
│   ├── ScreenshotReporter.ts
│   └── helpers/
│       ├── TestDataFactoryInterface.ts
│       └── TestDataFactory.ts
├── tests/
│   ├── api/
│   │   └── pokemon-evolution.spec.ts
│   └── e2e/
│       └── checkout.spec.ts
└── playwright.config.ts
```
