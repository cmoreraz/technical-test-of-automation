# technical-test-of-automation

Proyecto de automatización técnica construido con **Playwright** y **TypeScript**.

La prueba técnica está compuesta por dos partes:

- **Prueba de API:** valida la cadena evolutiva de **Squirtle** usando la PokéAPI, obtiene el nombre y peso de cada Pokémon involucrado, los ordena alfabéticamente sin usar `.sort()` y muestra el resultado en la salida de la prueba.
- **Prueba Front/E2E:** valida un flujo de compra de extremo a extremo, desde el login hasta la confirmación de la orden.

## Arquitectura del proyecto

La arquitectura usa una aproximación **Screenplay-lite**: el test no concentra toda la lógica en el archivo `.spec`, sino que delega el flujo principal a `tasks/`. Esto hace que el escenario sea más fácil de leer: la prueba cuenta qué se valida, mientras las tareas resuelven cómo obtener y preparar la información.

También se aplican principios **SOLID** mediante interfaces como `PokemonApiGateway` y `PokemonSorter`. Gracias a eso, el flujo que obtiene la evolución de Squirtle no queda amarrado a una implementación específica de API ni a una única forma de ordenar. Si mañana cambia la fuente de datos o la estrategia de ordenamiento, se puede reemplazar esa pieza sin reescribir el escenario completo.

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

## Configuración

### Documentación

- [Pipeline CI/CD, Quality Gates y Reportes](./docs/CI_CD.md)

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

```bash
npx playwright test
```

## Credenciales de prueba

Las credenciales usadas en el flujo E2E ya no están quemadas en los tests: se centralizaron en `config/credentials.ts`.

Por defecto los valores son `standard_user` / `secret_sauce`, pero se pueden sobrescribir con variables de entorno:

```bash
export E2E_USERNAME=my_user
export E2E_PASSWORD=my_pass
npx playwright test tests/e2e/checkout.spec.ts --project=e2e-chromium
```

## Reporte público

- [Reporte público de Playwright](https://cmoreraz.github.io/technical-test-of-automation/)

