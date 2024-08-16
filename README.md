# Proyecto de Pruebas Automatizadas con Playwright

Este proyecto está diseñado para realizar pruebas automatizadas en la API de Pokémon utilizando Playwright. A continuación se detallan los pasos necesarios para configurar el entorno, ejecutar las pruebas y visualizar los resultados en un reporte.

## Requisitos

- **Node.js**: Se recomienda la versión 14 o superior. Puedes descargar e instalar Node.js desde [nodejs.org](https://nodejs.org/).

- **Playwright**: Se utiliza para realizar pruebas automatizadas e2e. Puedes instalarlo con el siguiente comando:

  ```bash
npm init playwright@latest

### Ejecuta el comando de instalación y selecciona lo siguiente para empezar:

Elige entre TypeScript o JavaScript (el valor predeterminado es TypeScript).
Nombre de tu carpeta de Tests (el valor predeterminado es tests o e2e si ya tienes una carpeta de tests en tu proyecto).
Agrega un flujo de trabajo de GitHub Actions para ejecutar fácilmente las pruebas en CI.( opcional)
Instalar los navegadores de Playwright (el valor predeterminado es verdadero).

Puedes acceder a https://playwright.dev/docs/intro para revisar la documentacion actualizada. 


 ### Configuración del entorno

1. Clona este repositorio en tu máquina local:

     git clone https://github.com/Alvaro-QA/ChallangePlayw.git


2. Navega al directorio del proyecto:

     cd ChallangePlayw

3. Instala las dependencias del proyecto:
     
     npm install

  ## Configuración

### Archivo `.env`

Asegúrate de crear un archivo `.env` en la raíz del proyecto con la siguiente variable de entorno para utilizar tu clave secreta:

SECRET_KEY=your-secret-key


```    
```
### Librerías adicionales utilizadas en el proyecto:

- **`dotenv`**: Carga variables de entorno desde el archivo `.env`.
- **`xlsx`**: Lee archivos Excel.
- **`node-fetch`**: Descarga imágenes desde URLs.

### Instalación de Librerías

Para instalar estas librerías, ejecuta:

```bash
npm install dotenv xlsx node-fetch   
```

## POM

Este proyecto usa el Page Object Model (POM) para organizar las pruebas. POM ayuda a separar la lógica de prueba de la interacción con la interfaz de usuario.

pages/: Contiene clases que representan páginas y encapsulan la lógica de interacción con ellas.

## Archivo `utils.ts`

Proporciona varias utilidades para la configuración, manejo de datos, y archivos dentro del proyecto. A continuación se detalla cada función y componente:

- **`dotenv.config();`**: Carga variables de entorno desde el archivo `.env`.

- **`secretKey`**: Obtiene la clave secreta de las variables de entorno.

- **`hashSecretKey`**: Calcula el hash SHA-256 de la clave secreta.

- **`PokemonData`**: Interfaz para los datos de Pokémon (`id`, `name`, `abilities`).

- **`readTestData(filePath: string): Promise<PokemonData[]>`**: Lee datos desde un archivo Excel y devuelve un array de objetos `PokemonData`.

- **`ensureDirectoryExists(directoryPath: string)`**: Crea un directorio si no existe.

- **`downloadImage(imageUrl: string, savePath: string)`**: Descarga una imagen desde una URL y la guarda en una ruta especificada.

- **`validateImageFile(filePath: string)`**: Valida la extensión y el tamaño de un archivo de imagen.



## Ejecución de las pruebas

Para ejecutar las pruebas en conjunto utiliza el siguiente comando:

npx playwright test

## Ejecutar pruebas específicas:

npx playwright test wiki.web.spec.ts

npx playwright test pokemon.api.spec.ts


## Visualización de los resultados

Después de ejecutar las pruebas, puedes generar un reporte HTML para visualizar los resultados. Utiliza el siguiente comando:

 npx playwright show-report

##